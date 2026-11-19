"""Refresh hero WebP variants after replacing public/hero/1.png through 5.png.

Run with: python scripts/optimize-hero.py (requires Pillow).
Original PNGs are preserved. Normal npm builds do not require Python.
"""
from pathlib import Path
import re
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
folder = root / 'public/hero'
mapping = {
    1: 'akubela-sl60',
    2: 'akubela-hypanel-supreme',
    3: 'akubela-sl30',
    4: 'akubela-aura-series',
    5: 'akubela-hypanel-keyplus',
}
component = root / 'src/site/components.tsx'
content = component.read_text(encoding='utf-8')

def save_webp(image, destination, **options):
    # Keep the previous valid asset available while the replacement is encoding.
    temporary = destination.with_suffix('.tmp.webp')
    image.save(temporary, 'WEBP', **options)
    temporary.replace(destination)

for number, name in mapping.items():
    with Image.open(folder / f'{number}.png') as original:
        image = ImageOps.exif_transpose(original)
        width, height = image.size
        save_webp(image, folder / f'{name}-wide.webp', lossless=True, quality=100, method=6, exact=True)
        for size in (640, 1024):
            responsive = image.copy()
            responsive.thumbnail((size, 2000), Image.Resampling.LANCZOS)
            save_webp(responsive, folder / f'{name}-{size}.webp', quality=95, method=6)
    # Keep the intrinsic dimensions and responsive source descriptor accurate.
    pattern = rf"(image: '/hero/{re.escape(name)}-wide\.webp'[^\n]+?width: )\d+(, height: )\d+"
    content, count = re.subn(pattern, lambda match: f'{match[1]}{width}{match[2]}{height}', content)
    if count != 1:
        raise RuntimeError(f'Expected one slide for {name}; found {count}.')
    if number == 5:
        index = root / 'index.html'
        html = index.read_text(encoding='utf-8')
        html = re.sub(r'(/hero/akubela-hypanel-keyplus-wide\.webp )\d+w', rf'\g<1>{width}w', html)
        index.write_text(html, encoding='utf-8')
    print(f'{number}.png -> {name}: {width} x {height}; wide, 1024px and 640px refreshed')
component.write_text(content, encoding='utf-8')
