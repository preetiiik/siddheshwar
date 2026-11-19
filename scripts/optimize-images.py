"""Create web-sized copies without changing supplied originals. Requires Pillow."""
from pathlib import Path
import json
from collections import Counter
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
public = root / 'public'
manifest = {}
saved = 0
sources = [p for p in public.rglob('*') if p.is_file() and 'optimized' not in p.relative_to(public).parts and p.suffix.lower() in {'.jpg', '.jpeg', '.png', '.webp'}]
names = Counter(p.relative_to(public).with_suffix('.webp') for p in sources)
for source in sources:
    relative = source.relative_to(public)
    target = relative.with_suffix('.webp')
    if names[target] > 1:
        target = relative.with_suffix(relative.suffix + '.webp')
    destination = public / 'optimized' / target
    destination.parent.mkdir(parents=True, exist_ok=True)
    try:
        if not destination.exists() or destination.stat().st_mtime < source.stat().st_mtime:
            with Image.open(source) as original:
                image = ImageOps.exif_transpose(original)
                image.thumbnail((1600, 1200), Image.Resampling.LANCZOS)
                image.save(destination, 'WEBP', quality=82, method=6)
        manifest['/' + relative.as_posix()] = '/' + destination.relative_to(public).as_posix()
        saved += source.stat().st_size - destination.stat().st_size
    except (OSError, ValueError) as error:
        print(f'Skipped {relative}: {error}')
(root / 'src/site/image-manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
print(f'Optimized {len(manifest)} images; reduced image bytes by {saved / 1024 / 1024:.1f} MiB.')
