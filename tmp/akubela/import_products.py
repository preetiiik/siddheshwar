import json
import pathlib
import re
import pymupdf

root = pathlib.Path.cwd()
out = root / 'public/products/akubela'
out.mkdir(parents=True, exist_ok=True)
listing = pymupdf.open(r'C:\Users\lenovo\Downloads\Akubela_Product_List.pdf')
images = pymupdf.open(r'C:\Users\lenovo\Downloads\Akubela_Only_Product_Images2.pdf')
catalog = pymupdf.open(root / 'public/akubela Smart Home Catalogue260701.pdf')
entries = []
for page in listing:
    for match in re.finditer(r'(?m)^(\d+)\n([^\n]+)$', page.get_text()):
        entries.append((int(match[1]), match[2], page.number + 1))
assert [e[0] for e in entries] == list(range(1, 78))
# Match the image-only PDF by visual position, not PDF resource order.
xrefs = list(range(3, 14)) + [23] + [None] * 7 + [None, 27] + list(range(29, 41)) + list(range(42, 54)) + [55,56,57,58,58,59,60,61,62,63,64,None,65,66] + list(range(68, 80)) + [None, None] + [None] * 4
assert len(xrefs) == 77
pages = list(range(28, 50, 2)) + [51] + list(range(53, 60)) + [61] + [63]*4 + [64]*4 + [65]*4 + [66]*3 + [67]*4 + [68]*3 + [69]*4 + [70]*4 + [71]*4 + [72]*3 + [73]*3 + [75]*3 + [76]*3 + [77]*4 + [79]*2 + list(range(81,85))
# Explicit page mapping avoids confusing printed page numbers with PDF pages.
pages = {**{i+1: 28+i*2 for i in range(11)}, 12:51, **{i:53+i-13 for i in range(13,20)},20:61,
 **{i:63 for i in range(21,25)}, **{i:64 for i in range(25,29)}, **{i:65 for i in range(29,33)},33:66,34:66,35:66,
 **{i:67 for i in range(36,40)}, **{i:68 for i in range(40,44)}, **{i:69 for i in range(44,47)}, **{i:70 for i in range(47,51)},
 **{i:71 for i in range(51,55)}, **{i:72 for i in range(55,59)}, **{i:73 for i in range(59,62)},
 **{i:75 for i in range(62,66)}, **{i:76 for i in range(66,69)}, **{i:77 for i in range(69,72)},72:79,73:79,74:81,75:82,76:83,77:84}
groups = [(11,'HyPanels'),(12,'Smart Switches'),(19,'Smart Locks'),(20,'Matter Add-ons'),(28,'ZigBee Electrical & Switches'),(39,'ZigBee Plugs & Climate'),(50,'ZigBee Lighting'),(59,'ZigBee Security & Sensors'),(61,'ZigBee Other'),(71,'KNX Add-ons'),(73,'RS485 Add-ons'),(77,'Software Platforms')]
result = []
for number, name, list_page in entries:
    name = name.replace('Gateway (G30)', 'Gateway (G31)').replace('6 Gang 0–10V', '4 Gang 0–10V')
    slug = 'akubela-' + re.sub(r'[^a-z0-9]+','-',name.lower()).strip('-')
    file = out / f'{slug}.webp'
    xref = xrefs[number-1]
    if number in [27,28]:
        page = catalog[63]
        clip = pymupdf.Rect(35,460,130,640) if number == 27 else pymupdf.Rect(35,650,130,755)
        pix = page.get_pixmap(matrix=pymupdf.Matrix(2,2), clip=clip, alpha=False)
    elif xref:
        pix = pymupdf.Pixmap(images, xref)
    else:
        page = catalog[pages[number]-1]
        if 13 <= number <= 19:
            clip = pymupdf.Rect(35, 30, 510, 365)
        elif number == 20:
            clip = pymupdf.Rect(35, 100, 130, 205)
        elif number == 57:
            clip = pymupdf.Rect(35,470,130,590)
        elif number == 72:
            clip = pymupdf.Rect(35,100,130,180)
        elif number == 73:
            clip = pymupdf.Rect(35,345,130,400)
        else:
            clip = page.rect
        pix = page.get_pixmap(matrix=pymupdf.Matrix(1.5,1.5), clip=clip, alpha=False)
    from PIL import Image
    im = Image.frombytes('RGB', (pix.width,pix.height), pix.samples)
    if number == 49:
        im = im.crop((0,0,im.width,65))
    elif number == 50:
        im = im.crop((0,270,im.width,im.height))
    elif number == 56:
        im = im.crop((0,0,im.width,180))
    elif number == 58:
        im = im.crop((0,220,im.width,im.height))
    elif number == 59:
        im = im.crop((0,0,im.width,230))
    im.thumbnail((1100,1100))
    im.save(file, 'WEBP', quality=88)
    result.append(dict(name=name, slug=slug, group=next(g for end,g in groups if number<=end), image='/products/akubela/'+file.name, page=pages[number], listPage=list_page))
(root/'src/akubela-products.json').write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n',encoding='utf-8')
print(f'Imported {len(result)} entries and images')
