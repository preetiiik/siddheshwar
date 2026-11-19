# Unified catalogue merge report

Distinct products: **116**. Sources: 38 approved entries + 79 Akubela entries - 1 confirmed duplicate.

## Products by category

| Category | Products |
|---|---:|
| Smart Keypad Switches | 20 |
| Smart Remote Controls | 4 |
| Curtain Controllers | 5 |
| Actuators & Gateways | 15 |
| Smart Touch Panels | 23 |
| Video Door Phones (VDP) | 2 |
| Smart Door Locks | 10 |
| Smart Sensors & Detectors | 9 |
| Smart Lighting & Dimmers | 14 |
| Smart Plugs & Accessories | 5 |
| Climate & Temperature Control | 5 |
| Smart Home Software & Cloud | 4 |

## Products by brand

| Brand | Products |
|---|---:|
| Akubela | 84 |
| Basalte | 6 |
| MDT | 8 |
| Moorgen | 7 |
| OneTouch | 5 |
| Schneider Electric | 2 |
| Somfy | 2 |
| Theben | 2 |

## Merged duplicates

- Aura Series Smart Switch: retained `akubela-aura-series-smart-switch`, merged `approved-akubela-aura-series-smart-switch`. Exact brand and verified product-name match; identical product image. Existing manufacturer URL and image are retained; former IDs remain aliases.

## Uncertain matches retained separately

- Compact Rotary Control Panel: Generic marketing description; insufficient manufacturer model information to match a specific HyPanel.
- Desktop Smart Control Panel: Generic marketing description; insufficient manufacturer model information to match a specific HyPanel.
- Premium Central Control Panel: Generic marketing description; insufficient manufacturer model information to match a specific HyPanel.
- Premium Rotary Control Panel: Generic marketing description; insufficient manufacturer model information to match a specific HyPanel.
- Touchscreen Keypad Panel: Generic marketing description; insufficient manufacturer model information to match a specific HyPanel.
- OneTouch: OT 630, Digital Door Lock OT 630. Shared OT 630 reference, but no manufacturer part numbers or documentation establishing that these user-supplied entries are identical; retained separately.

## Photography and verification

All 116 image paths loaded. **35 entries still use the previously approved dummy artwork**, clearly labelled. These are missing exact model photography rather than broken image URLs.
All 79 original Akubela product detail routes were opened and their headings verified. Broken routes: 0. Missing image files: 0.
35 retained user-supplied entries need manufacturer/model documentation before additional technical claims can be made. Theben's two products retain their supplied PDF technical information. Akubela entries retain the existing source catalogue references.

## Models awaiting exact photography

- Basalte ? Chopin
- Basalte ? Deseo
- Basalte ? Fibonacci
- Basalte ? Sentido
- MDT ? Pushbutton Light 55
- MDT ? Glass Pushbutton II Smart
- Moorgen ? 2-Fold Metal Pushbutton Cover
- Moorgen ? Smart Thermostat
- Schneider Electric ? Unica KNX Pushbutton â€“ 6 Key Silver
- Schneider Electric ? Unica KNX Thermostat â€“ 8 Key Metallic Silver
- Moorgen ? M18 Series â€“ Smart Remote Control
- Moorgen ? M50 Series â€“ 8-Key Smart Remote Control
- Moorgen ? M56 Series â€“ 4-Key Rotary Smart Remote Control
- Moorgen ? M78 Series â€“ Crystal Smart Remote Control
- Somfy ? Glydea Ultra 35e RTS MTC
- Somfy ? Designo 35 WT
- MDT ? JAL Shutter Actuator
- MDT ? AKD 320V Dimming Actuator
- MDT ? DALI Control PRO64 Gateway
- Akubela ? Compact Rotary Control Panel
- Akubela ? Desktop Smart Control Panel
- Akubela ? Premium Central Control Panel
- Akubela ? Premium Rotary Control Panel
- Akubela ? Touchscreen Keypad Panel
- Basalte ? Ellie
- Basalte ? Lisa
- MDT ? Aurelio
- MDT ? Glass Pushbutton Plus
- MDT ? Glass Room Temperature Controller
- Moorgen ? KNX Smart Touch S10
- OneTouch ? IP Video Door Phone
- OneTouch ? Video Door Phone Kit
- OneTouch ? OT 630
- OneTouch ? Smart Door Lock OT 630 Pro
- OneTouch ? Digital Door Lock OT 630

## Classification decisions

Curtain panel, curtain module and shades motor use Curtain Controllers. The temperature-control panel uses Climate & Temperature Control. Dimmers, LED controllers and drivers use Smart Lighting & Dimmers, retaining original collection/type metadata. IR22 remains an installation controller under Actuators & Gateways. No Akubela handheld remote or dedicated VDP was invented. The four cloud/app/web/assistant entries are marked software rather than physical hardware.

The central export in `src/site/unified-catalogue.ts` is used by the main catalogue and collection galleries. Original source manifests are imported without duplicating displayed records. The homepage retains its existing seven curated tiles plus an Explore All 12 Categories link; brand logos now link to the matching brand filter.
