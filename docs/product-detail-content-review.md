# Dynamic product detail pages: implementation and content review

## Coverage

One reusable `ProductDetailPage` renders all 116 canonical catalogue records. The 79 original Akubela URLs remain canonical. The remaining 37 products use `/products/:productSlug`; identity aliases resolve with replacement navigation to the same canonical page. There is no second detail template.

All catalogue and category gallery cards link directly to their canonical detail pages. Category/brand breadcrumbs return to filtered catalogue views. Related records are selected by category first, then brand; the current record is excluded. Existing enquiry forms receive product, brand and model as visible enquiry context and hidden submission fields.

## Structured content availability

- 116 records have working detail-page definitions.
- 35 records use previously approved neutral illustrative placeholders and require exact model photography.
- 114 records have no structured, verified model-specific feature list.
- 114 records have no structured technical specifications beyond catalogue identity/type metadata.
- 35 user-supplied records require manufacturer identity confirmation before additional technical claims are added.

Theben iON Prime PB KNX and iON Prime CP4 KNX retain their supplied PDF-derived features and specifications. The current Akubela adapter supplies manufacturer collection descriptions, brand and collection fields, source PDF pages and original imagery, but not structured model-level engineering features/specifications. Collection labels are excluded from the feature grid. Original PDF links remain accessible for further verification. Missing structured content is not replaced with generic technical claims.

Software pages show platform/type information without fabricated power, mounting, dimension or hardware compatibility fields. Products with up to three available specification fields use cards; larger specification sets use a responsive table.

No additional gallery images are invented. The gallery supports additional verified images when added to the product record.

## Records requiring review

| Brand | Product | Exact image needed | Feature review | Specification review | Identity review |
|---|---|---|---|---|---|
| Basalte | Chopin | Yes | Yes | Yes | Yes |
| Basalte | Deseo | Yes | Yes | Yes | Yes |
| Basalte | Fibonacci | Yes | Yes | Yes | Yes |
| Basalte | Sentido | Yes | Yes | Yes | Yes |
| MDT | Pushbutton Light 55 | Yes | Yes | Yes | Yes |
| MDT | Glass Pushbutton II Smart | Yes | Yes | Yes | Yes |
| Moorgen | 2-Fold Metal Pushbutton Cover | Yes | Yes | Yes | Yes |
| Moorgen | Smart Thermostat | Yes | Yes | Yes | Yes |
| Schneider Electric | Unica KNX Pushbutton â€“ 6 Key Silver | Yes | Yes | Yes | Yes |
| Schneider Electric | Unica KNX Thermostat â€“ 8 Key Metallic Silver | Yes | Yes | Yes | Yes |
| Moorgen | M18 Series â€“ Smart Remote Control | Yes | Yes | Yes | Yes |
| Moorgen | M50 Series â€“ 8-Key Smart Remote Control | Yes | Yes | Yes | Yes |
| Moorgen | M56 Series â€“ 4-Key Rotary Smart Remote Control | Yes | Yes | Yes | Yes |
| Moorgen | M78 Series â€“ Crystal Smart Remote Control | Yes | Yes | Yes | Yes |
| Somfy | Glydea Ultra 35e RTS MTC | Yes | Yes | Yes | Yes |
| Somfy | Designo 35 WT | Yes | Yes | Yes | Yes |
| MDT | JAL Shutter Actuator | Yes | Yes | Yes | Yes |
| MDT | AKD 320V Dimming Actuator | Yes | Yes | Yes | Yes |
| MDT | DALI Control PRO64 Gateway | Yes | Yes | Yes | Yes |
| Akubela | Compact Rotary Control Panel | Yes | Yes | Yes | Yes |
| Akubela | Desktop Smart Control Panel | Yes | Yes | Yes | Yes |
| Akubela | Premium Central Control Panel | Yes | Yes | Yes | Yes |
| Akubela | Premium Rotary Control Panel | Yes | Yes | Yes | Yes |
| Akubela | Touchscreen Keypad Panel | Yes | Yes | Yes | Yes |
| Basalte | Ellie | Yes | Yes | Yes | Yes |
| Basalte | Lisa | Yes | Yes | Yes | Yes |
| MDT | Aurelio | Yes | Yes | Yes | Yes |
| MDT | Glass Pushbutton Plus | Yes | Yes | Yes | Yes |
| MDT | Glass Room Temperature Controller | Yes | Yes | Yes | Yes |
| Moorgen | KNX Smart Touch S10 | Yes | Yes | Yes | Yes |
| OneTouch | IP Video Door Phone | Yes | Yes | Yes | Yes |
| OneTouch | Video Door Phone Kit | Yes | Yes | Yes | Yes |
| OneTouch | OT 630 | Yes | Yes | Yes | Yes |
| OneTouch | Smart Door Lock OT 630 Pro | Yes | Yes | Yes | Yes |
| OneTouch | Digital Door Lock OT 630 | Yes | Yes | Yes | Yes |
| Akubela | HyPanel | ? | Yes | Yes | ? |
| Akubela | HyPanel Plus | ? | Yes | Yes | ? |
| Akubela | HyPanel Pro | ? | Yes | Yes | ? |
| Akubela | HyPanel Ultra | ? | Yes | Yes | ? |
| Akubela | HyPanel Supreme | ? | Yes | Yes | ? |
| Akubela | HyPanel Elite 7 | ? | Yes | Yes | ? |
| Akubela | HyPanel Elite 10 | ? | Yes | Yes | ? |
| Akubela | HyPanel KeyPlus | ? | Yes | Yes | ? |
| Akubela | HyPanel Lux Piano | ? | Yes | Yes | ? |
| Akubela | HyPanel Lux Ring | ? | Yes | Yes | ? |
| Akubela | HyPanel Lux Vase | ? | Yes | Yes | ? |
| Akubela | Aura Series Smart Switch | ? | Yes | Yes | ? |
| Akubela | 1/2/3/4 Gang Touch Switch â€” EU Version | ? | Yes | Yes | ? |
| Akubela | 1/2/3/4 Gang Touch Switch â€” US Version | ? | Yes | Yes | ? |
| Akubela | Smart Glass Key Switch â€” US Standard | ? | Yes | Yes | ? |
| Akubela | Smart Key Switch â€” EU Standard | ? | Yes | Yes | ? |
| Akubela | Smart Metal Key Switch â€” EU Standard | ? | Yes | Yes | ? |
| Akubela | Smart Metal Key Switch â€” US Standard | ? | Yes | Yes | ? |
| Akubela | 2/4/6/8 Button Scene Panel â€” KNX | ? | Yes | Yes | ? |
| Akubela | Scene Button | ? | Yes | Yes | ? |
| Akubela | Curtain Control Panel | ? | Yes | Yes | ? |
| Akubela | Temperature Control Panel with 4 Buttons | ? | Yes | Yes | ? |
| Akubela | Zigbee TRIAC Dimmer Panel | ? | Yes | Yes | ? |
| Akubela | C6 Smart Lock | ? | Yes | Yes | ? |
| Akubela | F2 Smart Lock | ? | Yes | Yes | ? |
| Akubela | SL20 Smart Lock | ? | Yes | Yes | ? |
| Akubela | SL21 Smart Lock | ? | Yes | Yes | ? |
| Akubela | SL30 Smart Lock | ? | Yes | Yes | ? |
| Akubela | SL50 Smart Lock | ? | Yes | Yes | ? |
| Akubela | SL60 Smart Lock | ? | Yes | Yes | ? |
| Akubela | CO Sensor | ? | Yes | Yes | ? |
| Akubela | Door/Window Sensor | ? | Yes | Yes | ? |
| Akubela | Flood Sensor | ? | Yes | Yes | ? |
| Akubela | Gas Sensor | ? | Yes | Yes | ? |
| Akubela | Human Presence Detector | ? | Yes | Yes | ? |
| Akubela | Motion Sensor | ? | Yes | Yes | ? |
| Akubela | Smart Air Quality Detector | ? | Yes | Yes | ? |
| Akubela | Smoke Sensor | ? | Yes | Yes | ? |
| Akubela | Temperature & Humidity Sensor | ? | Yes | Yes | ? |
| Akubela | Gateway G30 | ? | Yes | Yes | ? |
| Akubela | Gateway G31 | ? | Yes | Yes | ? |
| Akubela | Multifunctional Gateway G32 | ? | Yes | Yes | ? |
| Akubela | IP-485 Multifunctional Gateway | ? | Yes | Yes | ? |
| Akubela | IR Controller IR22 | ? | Yes | Yes | ? |
| Akubela | Dual Channel DALI Gateway | ? | Yes | Yes | ? |
| Akubela | 1/2 Gang Switch Module | ? | Yes | Yes | ? |
| Akubela | 4 Gang 0â€“10V Dimmer Module | ? | Yes | Yes | ? |
| Akubela | 4 Gang 300W Thyristor Dimmer Module | ? | Yes | Yes | ? |
| Akubela | 4 Gang Curtain Module | ? | Yes | Yes | ? |
| Akubela | 6 Gang 0â€“10V Dimmer Module | ? | Yes | Yes | ? |
| Akubela | Power Module 960mA | ? | Yes | Yes | ? |
| Akubela | Switch Actuator RS485 | ? | Yes | Yes | ? |
| Akubela | Switch Module 28 Gang 10A | ? | Yes | Yes | ? |
| Akubela | Switch Module 8 Gang 10A | ? | Yes | Yes | ? |
| Akubela | Switch Module 8 Gang 16A | ? | Yes | Yes | ? |
| Akubela | Zigbee AC TRIAC Dimmer | ? | Yes | Yes | ? |
| Akubela | Zigbee CCT LED Controller | ? | Yes | Yes | ? |
| Akubela | Zigbee Constant Current LED Driver | ? | Yes | Yes | ? |
| Akubela | Zigbee LED Dimmer | ? | Yes | Yes | ? |
| Akubela | Zigbee RGB+CCT LED Controller | ? | Yes | Yes | ? |
| Akubela | Zigbee RGB LED Controller | ? | Yes | Yes | ? |
| Akubela | Zigbee RGBW LED Controller | ? | Yes | Yes | ? |
| Akubela | Central AC Controller â€” Indoor | ? | Yes | Yes | ? |
| Akubela | Central AC Controller â€” Outdoor | ? | Yes | Yes | ? |
| Akubela | Fan Coil Thermostat | ? | Yes | Yes | ? |
| Akubela | Heating Thermostat | ? | Yes | Yes | ? |
| Akubela | Smart Spotlight 55mm 10W | ? | Yes | Yes | ? |
| Akubela | Smart Spotlight 55mm 9W | ? | Yes | Yes | ? |
| Akubela | Smart Spotlight 75mm 9W | ? | Yes | Yes | ? |
| Akubela | Smart Plug â€” EU | ? | Yes | Yes | ? |
| Akubela | Smart Plug â€” UK | ? | Yes | Yes | ? |
| Akubela | Smart Plug â€” US | ? | Yes | Yes | ? |
| Akubela | Smart Socket with USB | ? | Yes | Yes | ? |
| Akubela | Shades Motor | ? | Yes | Yes | ? |
| Akubela | Smart Valve | ? | Yes | Yes | ? |
| Akubela | Akubela Cloud | ? | Yes | Yes | ? |
| Akubela | Bela Smart Living Assistant | ? | Yes | Yes | ? |
| Akubela | BelaHome App | ? | Yes | Yes | ? |
| Akubela | BelaHome Web | ? | Yes | Yes | ? |
