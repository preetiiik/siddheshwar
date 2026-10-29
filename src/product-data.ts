export type ProductCategory = 'automation' | 'lighting';
export type Product = {
 id: string; name: string; title: string; slug: string; category: ProductCategory; parentId?: string;
 shortDescription: string; fullDescription: string; image: string; alt: string;
 features: string[]; applications: string[];
 relatedProductIds: string[]; aliases: string[]; products: string[];
 tagline?: string; controlledAppliances?: string[];
 specifications?: { label: string; value: string }[];
 contentSections?: { heading: string; paragraphs: string[] }[];
 closingLine?: string; contentSource?: { document: string; pages: number[] };
};
export const productCategories: Product[] = [
  {
    "id": "smart-touch-switches",
    "title": "Smart Touch Switches",
    "name": "Smart Touch Switches",
    "slug": "smart-touch-switches",
    "category": "automation",
    "shortDescription": "Smart Touch Switches provide a modern and convenient way to control home appliances.",
    "fullDescription": "Smart Touch Switches provide a modern and convenient way to control home appliances. Available in 1, 2, 3, 4 and 5-switch variations, they combine normal switching with fan dimming functionality. These switches support mobile app control and real-time power consumption monitoring, making everyday appliance management easier.",
    "image": "/products/automation/Smart%20Touch%20Switches.jpeg",
    "alt": "Smart Touch Switches in a connected interior",
    "features": [
      "Available in 1, 2, 3, 4 and 5-switch variations",
      "Built-in fan dimmer control",
      "Integrated sensor strip",
      "Control compatible appliances through a smart home app",
      "Real-time power consumption monitoring",
      "Convenient control of multiple home appliances"
    ],
    "applications": [
      "Smart homes",
      "apartments",
      "villas",
      "bedrooms",
      "living rooms",
      "offices"
    ],
    "relatedProductIds": [
      "knx-smart-touch-panels",
      "smart-dimmer-modules",
      "motorized-curtain-blind-controllers"
    ],
    "aliases": [
      "smart-touch-switches"
    ],
    "products": [
      "Smart Touch Switches"
    ],
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        1,
        2
      ]
    },
    "controlledAppliances": [
      "LED Lights",
      "Tube Lights",
      "Bulbs",
      "Sockets",
      "Fans"
    ],
    "specifications": [
      {
        "label": "Power Rating",
        "value": "6A"
      },
      {
        "label": "Input Voltage",
        "value": "230V / 50Hz"
      }
    ]
  },
  {
    "id": "knx-smart-touch-panels",
    "title": "KNX Smart Touch Panels",
    "name": "KNX Smart Touch Panels",
    "slug": "knx-smart-touch-panels",
    "category": "automation",
    "shortDescription": "Smart Control for Modern Living",
    "fullDescription": "KNX Smart Touch Panels provide a convenient and centralized way to control multiple home and building automation functions. Featuring an intuitive touch interface and elegant design, these panels simplify everyday control of lighting, curtains, climate and personalized room settings.",
    "image": "/products/automation/KNN%20touch%20panels.jpeg",
    "alt": "KNX Smart Touch Panels in a connected interior",
    "features": [
      "Touchscreen-based smart control",
      "Centralized lighting control",
      "Curtain and blind automation",
      "Temperature and HVAC control",
      "Personalized lighting scenes",
      "Integration with compatible KNX devices",
      "Modern wall-mounted design"
    ],
    "applications": [
      "Smart homes and luxury villas",
      "Apartments",
      "Hotels and hospitality spaces",
      "Corporate offices",
      "Commercial buildings"
    ],
    "relatedProductIds": [
      "smart-dimmer-modules",
      "motorized-curtain-blind-controllers",
      "knx-switching-actuators"
    ],
    "aliases": [
      "knx-smart-touch-panels"
    ],
    "products": [
      "KNX Smart Touch Panels"
    ],
    "tagline": "Smart Control for Modern Living",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        2
      ]
    }
  },
  {
    "id": "smart-dimmer-modules",
    "title": "Smart Dimmer Modules",
    "name": "Smart Dimmer Modules",
    "slug": "smart-dimmer-modules",
    "category": "automation",
    "shortDescription": "Perfect Lighting for Every Mood",
    "fullDescription": "Smart Dimmer Modules allow users to adjust the brightness of compatible lighting fixtures, creating a comfortable atmosphere for different activities. From bright lighting for work to soft illumination for relaxation, these modules provide flexible lighting control for modern homes and commercial spaces.",
    "image": "/products/automation/Smart%20Dinnner%20Modules.jpeg",
    "alt": "Smart Dimmer Modules in a connected interior",
    "features": [
      "Adjustable lighting brightness",
      "Smooth dimming with compatible lights and drivers",
      "Personalized lighting scenes",
      "Integration with compatible automation systems",
      "Centralized or app-based control on supported models",
      "Convenient lighting management"
    ],
    "applications": [
      "Living rooms and bedrooms",
      "Luxury villas and apartments",
      "Hotels and restaurants",
      "Offices and conference rooms",
      "Home theatres",
      "Architectural lighting installations"
    ],
    "relatedProductIds": [
      "motorized-curtain-blind-controllers",
      "knx-switching-actuators",
      "smart-climate-hvac-controllers"
    ],
    "aliases": [
      "smart-dimmer-modules"
    ],
    "products": [
      "Smart Dimmer Modules"
    ],
    "tagline": "Perfect Lighting for Every Mood",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        3,
        4
      ]
    }
  },
  {
    "id": "motorized-curtain-blind-controllers",
    "title": "Motorized Curtain & Blind Controllers",
    "name": "Motorized Curtain & Blind Controllers",
    "slug": "motorized-curtain-blind-controllers",
    "category": "automation",
    "shortDescription": "Motorized Curtain & Blind Controllers enable automatic opening, closing and adjustment of compatible curtains and blinds.",
    "fullDescription": "Motorized Curtain & Blind Controllers enable automatic opening, closing and adjustment of compatible curtains and blinds. These controllers integrate with smart home automation systems to provide convenient control over natural light and privacy.",
    "image": "/products/automation/motorized-curtain-blind-controllers.png",
    "alt": "Motorized Curtain & Blind Controllers in a connected interior",
    "features": [
      "Automatic opening and closing",
      "Smart scheduling and timer control",
      "Wall switch and touch panel operation",
      "Integration with compatible automation systems",
      "Group and scene control",
      "Adjustable curtain positioning on supported models"
    ],
    "applications": [
      "Homes",
      "Villas",
      "Apartments",
      "Hotels",
      "Offices",
      "Conference Rooms"
    ],
    "relatedProductIds": [
      "knx-switching-actuators",
      "smart-climate-hvac-controllers",
      "motion-presence-sensors"
    ],
    "aliases": [
      "motorized-curtain-and-blind-controllers"
    ],
    "products": [
      "Motorized Curtain & Blind Controllers"
    ],
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        4
      ]
    }
  },
  {
    "id": "knx-switching-actuators",
    "title": "KNX Switching Actuators",
    "name": "KNX Switching Actuators",
    "slug": "knx-switching-actuators",
    "category": "automation",
    "shortDescription": "Smart and Reliable Electrical Control",
    "fullDescription": "KNX Switching Actuators are advanced automation modules designed to control lighting and electrical circuits in residential and commercial buildings. They provide centralized ON/OFF switching, allowing multiple electrical loads to be managed efficiently through a KNX automation system.",
    "image": "/products/automation/KNX%20Switching%20Actuators.jpeg",
    "alt": "KNX Switching Actuators in a connected interior",
    "features": [
      "Multi-channel switching for electrical circuits",
      "Individual and group control of connected loads",
      "Seamless KNX system integration",
      "Automated scheduling and scene management",
      "Manual switching on supported models",
      "DIN-rail mounting for electrical panels"
    ],
    "applications": [
      "Smart Homes",
      "Luxury Villas",
      "Offices",
      "Hotels",
      "Commercial Buildings"
    ],
    "relatedProductIds": [
      "smart-climate-hvac-controllers",
      "motion-presence-sensors",
      "dali-lighting-controllers"
    ],
    "aliases": [
      "knx-switching-actuators"
    ],
    "products": [
      "KNX Switching Actuators"
    ],
    "tagline": "Smart and Reliable Electrical Control",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        4,
        5
      ]
    }
  },
  {
    "id": "smart-climate-hvac-controllers",
    "title": "Smart Climate & HVAC Controllers",
    "name": "Smart Climate & HVAC Controllers",
    "slug": "smart-climate-hvac-controllers",
    "category": "automation",
    "shortDescription": "Advanced Climate Management for Modern Spaces",
    "fullDescription": "Smart Climate & HVAC Controllers provide intelligent control over indoor temperature, heating, ventilation and air conditioning systems. Designed for modern homes and commercial environments, they allow users to manage room temperatures, adjust cooling settings and automate climate operations through compatible smart control systems.",
    "image": "/products/automation/smart-climate-hvac-controllers.png",
    "alt": "Smart Climate & HVAC Controllers in a connected interior",
    "features": [
      "Temperature Control: Adjust and maintain preferred indoor temperatures.",
      "HVAC Integration: Compatible with supported split AC, VRF and centralized HVAC systems.",
      "Zone-Based Control: Manage temperatures independently across different rooms or zones.",
      "Smart Scheduling: Automate climate settings according to daily routines.",
      "Climate Modes: Configure comfort, day, night and energy-saving modes on supported systems.",
      "Centralized Management: Control compatible HVAC equipment through smart panels or automation interfaces."
    ],
    "applications": [
      "Luxury Homes",
      "Villas",
      "Apartments",
      "Hotels",
      "Offices",
      "Commercial Buildings"
    ],
    "relatedProductIds": [
      "motion-presence-sensors",
      "dali-lighting-controllers",
      "smart-energy-management-controllers"
    ],
    "aliases": [
      "smart-climate-and-hvac-controllers"
    ],
    "products": [
      "Smart Climate & HVAC Controllers"
    ],
    "tagline": "Advanced Climate Management for Modern Spaces",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        5,
        6
      ]
    }
  },
  {
    "id": "motion-presence-sensors",
    "title": "Motion & Presence Sensors",
    "name": "Motion & Presence Sensors",
    "slug": "motion-presence-sensors",
    "category": "automation",
    "shortDescription": "Smart Detection. Effortless Automation.",
    "fullDescription": "Motion & Presence Sensors enable intelligent lighting control by detecting movement and occupancy within a space. These sensors automatically activate lighting when needed and switch it off when areas are unoccupied, providing greater convenience, improved energy efficiency and a seamless automation experience.",
    "image": "/products/automation/motion-presence-sensors.png",
    "alt": "Motion & Presence Sensors in a connected interior",
    "features": [
      "Intelligent Motion Detection: Automatically triggers connected lighting when movement is detected.",
      "Occupancy-Based Control: Maintains lighting based on detected room presence.",
      "Daylight Detection: Uses ambient light levels to optimize lighting operation on supported models.",
      "Automatic ON/OFF: Reduces unnecessary energy consumption through automated switching.",
      "Adjustable Detection Settings: Configurable sensitivity, detection range and time delays on compatible models.",
      "Automation Integration: Supports integration with compatible KNX and smart building control systems."
    ],
    "applications": [
      "Luxury Homes",
      "Villas",
      "Offices",
      "Hotels",
      "Corridors",
      "Staircases",
      "Meeting Rooms",
      "Commercial Spaces"
    ],
    "relatedProductIds": [
      "dali-lighting-controllers",
      "smart-energy-management-controllers",
      "hotel-room-automation-controllers"
    ],
    "aliases": [
      "motion-and-presence-sensors"
    ],
    "products": [
      "Motion & Presence Sensors"
    ],
    "tagline": "Smart Detection. Effortless Automation.",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        6,
        7
      ]
    }
  },
  {
    "id": "dali-lighting-controllers",
    "title": "DALI Lighting Controllers",
    "name": "DALI Lighting Controllers",
    "slug": "dali-lighting-controllers",
    "category": "automation",
    "shortDescription": "Intelligent Lighting Control with Precision and Flexibility",
    "fullDescription": "DALI (Digital Addressable Lighting Interface) Controllers are designed to manage and control lighting fixtures in modern buildings. They enable individual and group lighting control, precise brightness adjustments, colour control and customized lighting scenes, providing flexible and energy-efficient lighting management.",
    "image": "/products/automation/DALI%20Lighting%20Controllers.jpeg",
    "alt": "DALI Lighting Controllers in a connected interior",
    "features": [
      "Individual & Group Control: Control lighting fixtures separately or together.",
      "Precise Dimming: Adjust brightness according to lighting requirements.",
      "Colour Control: Manage light colour through compatible lighting equipment.",
      "Lighting Scenes: Create customized lighting settings for different activities.",
      "Flexible Integration: Connect compatible lighting devices within a DALI lighting system.",
      "Energy Efficiency: Optimize lighting usage to reduce unnecessary energy consumption."
    ],
    "applications": [
      "Residential Spaces",
      "Commercial Buildings",
      "Hotels",
      "Healthcare Facilities",
      "Offices",
      "Architectural Lighting"
    ],
    "relatedProductIds": [
      "smart-energy-management-controllers",
      "hotel-room-automation-controllers",
      "smart-touch-switches"
    ],
    "aliases": [
      "dali-lighting-controllers"
    ],
    "products": [
      "DALI Lighting Controllers"
    ],
    "tagline": "Intelligent Lighting Control with Precision and Flexibility",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        8
      ]
    }
  },
  {
    "id": "smart-energy-management-controllers",
    "title": "Smart Energy Management Controllers",
    "name": "Smart Energy Management Controllers",
    "slug": "smart-energy-management-controllers",
    "category": "automation",
    "shortDescription": "Intelligent Energy Monitoring for Smarter, More Efficient Buildings",
    "fullDescription": "Smart Energy Management Controllers provide an advanced solution for monitoring, managing, and optimizing electricity consumption in modern residential and commercial spaces. Designed to integrate with compatible building automation systems, these controllers enable real-time energy monitoring, intelligent load management, and automated energy control, helping improve operational efficiency and reduce unnecessary power consumption.",
    "image": "/products/automation/Smart%20Energy%20Management%20Controllers.jpeg",
    "alt": "Smart Energy Management Controllers in a connected interior",
    "features": [
      "Real-Time Energy Monitoring: Track electricity consumption and power usage through compatible energy meters.",
      "Intelligent Load Management: Monitor and manage connected electrical loads for efficient power utilization.",
      "Energy Consumption Analysis: Analyze energy usage patterns to identify opportunities for improved efficiency.",
      "Automated Energy Control: Schedule and automate connected electrical equipment based on predefined requirements.",
      "Centralized Monitoring: Access energy consumption information through compatible control panels and monitoring interfaces.",
      "Smart System Integration: Integrate with compatible KNX and building management systems for coordinated energy control.",
      "Energy Efficiency: Optimize electricity usage and minimize unnecessary energy consumption."
    ],
    "applications": [
      "Smart Homes",
      "Luxury Villas",
      "Residential Apartments",
      "Hotels & Resorts",
      "Corporate Offices",
      "Commercial Buildings",
      "Industrial Facilities"
    ],
    "relatedProductIds": [
      "hotel-room-automation-controllers",
      "smart-touch-switches",
      "knx-smart-touch-panels"
    ],
    "aliases": [
      "smart-energy-management-controllers"
    ],
    "products": [
      "Smart Energy Management Controllers"
    ],
    "tagline": "Intelligent Energy Monitoring for Smarter, More Efficient Buildings",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        9,
        10
      ]
    }
  },
  {
    "id": "hotel-room-automation-controllers",
    "title": "Hotel Room Automation Controllers (GRMS)",
    "name": "Hotel Room Automation Controllers (GRMS)",
    "slug": "hotel-room-automation-controllers",
    "category": "automation",
    "shortDescription": "Intelligent Room Control for a Seamless Hospitality Experience",
    "fullDescription": "Hotel Room Automation Controllers offer an advanced solution for managing and automating essential room functions in modern hospitality environments. Designed to enhance guest comfort and operational efficiency, these controllers enable centralized control of lighting, air conditioning, motorized curtains, and other connected systems. With intelligent automation and energy-saving capabilities, they help hotels deliver a personalized, convenient, and efficient guest experience.",
    "image": "/products/automation/Hotel%20Room%20Automation%20Controllers.jpeg",
    "alt": "Hotel Room Automation Controllers (GRMS) in a connected interior",
    "features": [
      "Centralized Room Management: Control multiple room functions through a unified automation system.",
      "Intelligent Lighting Control: Manage lighting levels, automated schedules, and customized room scenes.",
      "Smart Climate Management: Integrate with compatible HVAC systems for efficient temperature control and enhanced guest comfort.",
      "Automated Curtain Control: Operate motorized curtains and blinds for convenient light and privacy management.",
      "Occupancy-Based Automation: Automatically adjust connected room functions based on occupancy detection.",
      "Energy-Efficient Operation: Minimize unnecessary power consumption through intelligent automation and energy-saving modes.",
      "Hotel System Integration: Connect with compatible hotel management and building automation systems for streamlined room operations."
    ],
    "applications": [
      "Luxury Hotels",
      "Boutique Hotels",
      "Resorts",
      "Serviced Apartments",
      "Premium Guest Suites",
      "Hospitality Properties"
    ],
    "relatedProductIds": [
      "smart-touch-switches",
      "knx-smart-touch-panels",
      "smart-dimmer-modules"
    ],
    "aliases": [
      "hotel-room-automation-controllers-grms"
    ],
    "products": [
      "Hotel Room Automation Controllers (GRMS)"
    ],
    "tagline": "Intelligent Room Control for a Seamless Hospitality Experience",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        10,
        11
      ]
    }
  },
  {
    "id": "downlights",
    "title": "Downlights",
    "name": "Downlights",
    "slug": "downlights",
    "category": "lighting",
    "shortDescription": "Designed to Illuminate. Crafted to Complement.",
    "fullDescription": "Bring precision and elegance to every interior with modern LED Downlights. Combining compact design with efficient lighting performance, these fixtures deliver focused or evenly distributed illumination while maintaining a clean architectural finish. Ideal for creating comfortable, functional, and visually appealing spaces.",
    "image": "/products/lighting/Downlights.jpeg",
    "alt": "Downlights lighting application",
    "features": [
      "Precision Illumination: Carefully designed optics provide controlled light distribution for general, task, and accent lighting applications.",
      "Energy-Efficient Performance: Advanced LED technology delivers effective brightness while helping minimize electricity consumption.",
      "Seamless Ceiling Integration: Compact and minimalist designs complement modern ceiling layouts without overpowering the interior.",
      "Comfortable Lighting Experience: Available in different color temperatures and low-glare configurations to create the desired ambience.",
      "Flexible Lighting Solutions: A choice of wattages, beam angles, and mounting configurations supports different lighting requirements.",
      "Reliable & Durable: Quality construction and effective heat management support consistent performance and extended service life."
    ],
    "applications": [
      "Residential Interiors",
      "Luxury Villas",
      "Hotels",
      "Restaurants",
      "Retail Stores",
      "Offices",
      "Commercial Spaces"
    ],
    "relatedProductIds": [
      "wall-lights",
      "decorative-lights",
      "outdoor-lights"
    ],
    "aliases": [
      "downlights"
    ],
    "products": [
      "Downlights"
    ],
    "tagline": "Designed to Illuminate. Crafted to Complement.",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        11,
        12,
        13
      ]
    }
  },
  {
    "id": "wall-lights",
    "title": "Wall Lights",
    "name": "Wall Lights",
    "slug": "wall-lights",
    "category": "lighting",
    "shortDescription": "Transform Ordinary Walls into Beautifully Illuminated Spaces",
    "fullDescription": "Wall Lights are stylish lighting fixtures designed to enhance interiors through decorative, ambient, and accent illumination. Mounted directly onto walls, these fixtures create beautiful lighting effects, highlight architectural features, and add warmth and character to residential and commercial environments.",
    "image": "/products/lighting/Wall%20lights.jpeg",
    "alt": "Wall Lights lighting application",
    "features": [
      "Elegant Architectural Lighting: Enhances walls, textures, and interior features while adding a sophisticated decorative touch.",
      "Beautiful Lighting Effects: Creates soft, diffused, upward, or downward illumination to establish the desired ambience.",
      "Space-Saving Design: Wall-mounted fixtures provide effective lighting without occupying floor or ceiling space.",
      "Energy-Efficient LED Technology: Modern LED options deliver comfortable illumination while helping reduce electricity consumption.",
      "Versatile Designs & Finishes: Available in minimalist, contemporary, and decorative styles to complement different interiors.",
      "Functional & Decorative Lighting: Suitable for hallway illumination, bedside lighting, feature walls, and architectural accents."
    ],
    "applications": [
      "Living Rooms",
      "Bedrooms",
      "Hallways",
      "Staircases",
      "Feature Walls",
      "Hotels",
      "Restaurants",
      "Reception Areas",
      "Offices",
      "Commercial Spaces"
    ],
    "relatedProductIds": [
      "downlights",
      "decorative-lights",
      "outdoor-lights"
    ],
    "aliases": [
      "wall-lights"
    ],
    "products": [
      "Wall Lights"
    ],
    "tagline": "Transform Ordinary Walls into Beautifully Illuminated Spaces",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        21,
        22,
        23
      ]
    },
    "contentSections": [
      {
        "heading": "Lighting That Complements Your Space",
        "paragraphs": [
          "From creating a welcoming entrance to adding warmth to living spaces, Wall Lights combine practical illumination with decorative appeal. Their versatile designs make them an excellent choice for both modern homes and commercial interiors."
        ]
      }
    ],
    "closingLine": "Add depth, warmth, and elegance to every wall."
  },
  {
    "id": "decorative-lights",
    "title": "Decorative Lights",
    "name": "Decorative Lights",
    "slug": "decorative-lights",
    "category": "lighting",
    "shortDescription": "Beautiful Lighting That Brings Elegance to Every Space",
    "fullDescription": "Transform your interiors with our stunning collection of Decorative Lights, designed to combine style, elegance, and functionality. From luxurious chandeliers to modern pendant lights and designer ceiling fixtures, our lighting solutions enhance the beauty of every room while creating a warm and inviting atmosphere.",
    "image": "/products/lighting/Decorative%20Lights.jpeg",
    "alt": "Decorative Lights lighting application",
    "features": [
      "Elegant & Stylish Designs: Enhances interiors with modern, classic, and luxurious lighting styles.",
      "Beautiful Ambient Lighting: Creates a warm, comfortable, and welcoming environment.",
      "Statement Lighting Fixtures: Adds character and creates attractive focal points.",
      "Wide Range of Options: Includes Chandeliers, Pendant Lights, Hanging Lights, and Designer Ceiling Lights.",
      "Premium Finishes: Available in various designs, materials, and finishes to complement different interiors.",
      "Energy-Efficient Options: Modern LED solutions provide effective illumination with reduced energy consumption."
    ],
    "applications": [
      "Living Rooms",
      "Dining Areas",
      "Bedrooms",
      "Hotels",
      "Restaurants",
      "Cafés",
      "Offices",
      "Showrooms",
      "Reception Areas"
    ],
    "relatedProductIds": [
      "downlights",
      "wall-lights",
      "outdoor-lights"
    ],
    "aliases": [
      "decorative-lights"
    ],
    "products": [
      "Decorative Lights"
    ],
    "tagline": "Beautiful Lighting That Brings Elegance to Every Space",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        28,
        29
      ]
    },
    "contentSections": [
      {
        "heading": "Illuminate Your Space with Elegance",
        "paragraphs": [
          "Decorative Lights do more than brighten a room. They enhance your interior design, highlight architectural beauty, and create memorable spaces with the perfect balance of style and illumination."
        ]
      }
    ],
    "closingLine": "Where Beautiful Design Meets Brilliant Lighting."
  },
  {
    "id": "outdoor-lights",
    "title": "Outdoor Lights",
    "name": "Outdoor Lights",
    "slug": "outdoor-lights",
    "category": "lighting",
    "shortDescription": "Illuminate Your Outdoors with Style, Safety & Elegance",
    "fullDescription": "Enhance the beauty and functionality of your outdoor spaces with our collection of Outdoor Lights. Designed to illuminate gardens, pathways, building exteriors, and landscapes, these lighting solutions combine modern design with practical illumination to create safe, welcoming, and visually appealing environments.",
    "image": "/products/lighting/outdoor.jpeg",
    "alt": "Outdoor Lights lighting application",
    "features": [
      "Elegant & Modern Designs: Enhances the appearance of outdoor spaces with stylish lighting fixtures.",
      "Weather-Resistant Options: Designed for outdoor use, with suitable protection against rain, dust, and changing weather conditions.",
      "Energy-Efficient LED Lighting: Provides effective illumination while reducing electricity consumption.",
      "Enhanced Safety & Visibility: Illuminates pathways, entrances, and outdoor areas for safer movement after dark.",
      "Beautiful Landscape Lighting: Highlights greenery, architectural details, and decorative outdoor features.",
      "Durable Performance: Selected models offer robust construction for reliable outdoor lighting."
    ],
    "applications": [
      "Home Gardens",
      "Villas",
      "Building Exteriors",
      "Pathways",
      "Resorts",
      "Hotels",
      "Parks",
      "Commercial Landscapes",
      "Outdoor Seating Areas"
    ],
    "relatedProductIds": [
      "downlights",
      "wall-lights",
      "decorative-lights"
    ],
    "aliases": [
      "outdoor-lights"
    ],
    "products": [
      "Outdoor Lights"
    ],
    "tagline": "Illuminate Your Outdoors with Style, Safety & Elegance",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        35,
        36,
        37
      ]
    },
    "contentSections": [
      {
        "heading": "Our Outdoor Lighting Collection",
        "paragraphs": [
          "1. Garden Lights: Decorative lighting that enhances gardens, plants, and outdoor seating areas.",
          "2. Bollard Lights: Stylish ground-mounted fixtures ideal for pathways, walkways, and landscaped spaces.",
          "3. Outdoor Wall Lights: Wall-mounted lighting that enhances building exteriors, entrances, and balconies.",
          "4. Landscape Spotlights: Focused lighting designed to highlight trees, plants, sculptures, and architectural features."
        ]
      },
      {
        "heading": "Transform Your Outdoors After Sunset",
        "paragraphs": [
          "Outdoor Lights bring together beauty, functionality, and safety, turning ordinary outdoor areas into beautifully illuminated spaces."
        ]
      }
    ],
    "closingLine": "Beautiful Outdoors. Brilliant Lighting."
  }
];
export const automationProducts = productCategories.filter(product => product.category === 'automation');
export const lightingProducts = productCategories.filter(product => product.category === 'lighting');
export const lightingItems: Product[] = [
  {
    "id": "recessed",
    "title": "Recessed Downlights",
    "name": "Recessed Downlights",
    "slug": "recessed",
    "category": "lighting",
    "parentId": "downlights",
    "shortDescription": "Seamless Design. Brilliant Illumination.",
    "fullDescription": "Recessed Downlights are modern lighting fixtures installed directly into the ceiling, creating a clean and minimal appearance. Designed to provide efficient and evenly distributed illumination, these lights blend seamlessly with the ceiling while enhancing the overall ambience of residential and commercial interiors.",
    "image": "/products/lighting/Recessed%20Downlights.jpeg",
    "alt": "Recessed Downlights lighting application",
    "features": [
      "Flush Ceiling Design: Installed within the ceiling for a neat, seamless finish without visible hanging fixtures.",
      "Energy-Efficient LED Lighting: Delivers effective brightness with reduced energy consumption and minimal maintenance.",
      "Comfortable Illumination: Provides soft, balanced lighting with options for different beam angles and color temperatures.",
      "Space-Saving Installation: Compact construction makes recessed downlights ideal for modern false ceilings and interiors.",
      "Versatile Lighting Applications: Suitable for general lighting, task lighting, and highlighting specific areas of a room.",
      "Long-Lasting Performance: Designed for consistent illumination with effective heat management and reliable LED performance."
    ],
    "applications": [
      "Living Rooms",
      "Bedrooms",
      "Kitchens",
      "Hallways",
      "Hotels",
      "Restaurants",
      "Retail Showrooms",
      "Offices",
      "Commercial Spaces"
    ],
    "relatedProductIds": [
      "surface",
      "cob",
      "adjustable-spotlights"
    ],
    "aliases": [
      "recessed"
    ],
    "products": [
      "Recessed Downlights"
    ],
    "tagline": "Seamless Design. Brilliant Illumination.",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        13,
        14
      ]
    }
  },
  {
    "id": "surface",
    "title": "Surface Downlights",
    "name": "Surface Downlights",
    "slug": "surface",
    "category": "lighting",
    "parentId": "downlights",
    "shortDescription": "Smart Lighting Solutions for Every Ceiling",
    "fullDescription": "Enhance your interiors with stylish and functional Surface Downlights. Designed to mount directly onto ceilings, these modern LED fixtures offer powerful illumination without the need for recessed installation. Their compact structure and contemporary finish make them an excellent choice for both residential and commercial spaces.",
    "image": "/products/lighting/Surface%20Downlights.jpeg",
    "alt": "Surface Downlights lighting application",
    "features": [
      "Easy Ceiling Installation: Mounts directly onto compatible ceiling surfaces without requiring large cutouts or concealed fixture housings.",
      "Clean & Contemporary Design: Available in elegant cylindrical and square profiles that complement modern interiors.",
      "Bright & Efficient Lighting: LED technology provides effective illumination while consuming less energy than traditional lighting solutions.",
      "Customizable Lighting Experience: Different wattages, beam angles, and color temperature options help create the desired lighting effect."
    ],
    "applications": [
      "Residential Spaces: Living rooms, bedrooms, kitchens, and hallways",
      "Commercial Interiors: Offices, meeting rooms, and reception areas",
      "Retail Environments: Showrooms, boutiques, and display sections",
      "Hospitality Spaces: Hotels, cafés, restaurants, and corridors"
    ],
    "relatedProductIds": [
      "recessed",
      "cob",
      "adjustable-spotlights"
    ],
    "aliases": [
      "surface"
    ],
    "products": [
      "Surface Downlights"
    ],
    "tagline": "Smart Lighting Solutions for Every Ceiling",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        15,
        16
      ]
    },
    "contentSections": [
      {
        "heading": "Designed for Versatility",
        "paragraphs": [
          "Surface Downlights can be used to illuminate entire rooms, brighten specific work areas, or highlight architectural details. Their surface-mounted construction makes them especially useful in spaces with concrete ceilings or limited ceiling depth."
        ]
      }
    ],
    "closingLine": "A perfect balance of modern aesthetics, installation flexibility, and dependable illumination."
  },
  {
    "id": "cob",
    "title": "COB Downlights",
    "name": "COB Downlights",
    "slug": "cob",
    "category": "lighting",
    "parentId": "downlights",
    "shortDescription": "Focused Brilliance. Exceptional Clarity.",
    "fullDescription": "COB (Chip on Board) Downlights are advanced LED lighting fixtures designed to deliver concentrated, uniform illumination with excellent visual clarity. Featuring multiple LED chips integrated into a single module, these lights provide a powerful and consistent light output, making them ideal for highlighting architectural details, interiors, and display areas.",
    "image": "/products/lighting/COB%20Downlights.jpeg",
    "alt": "COB Downlights lighting application",
    "features": [
      "Precision-Focused Lighting: Designed to direct light onto specific areas, creating attractive highlights and enhancing architectural features.",
      "High-Quality Illumination: COB LED technology produces a uniform light source, helping reduce visible individual LED points.",
      "Enhanced Colour Rendering: Available with high colour-rendering options to showcase furniture, artwork, merchandise, and interior finishes more naturally.",
      "Energy-Efficient Performance: Delivers strong illumination with efficient LED technology and reduced energy consumption.",
      "Modern & Compact Design: Sleek fixtures integrate beautifully into contemporary ceiling designs while maintaining a refined appearance.",
      "Multiple Beam Angle Options: Available with different beam spreads for focused accent lighting or wider illumination, depending on the fixture."
    ],
    "applications": [
      "Residential Interiors: Living rooms, bedrooms, feature walls, and decorative spaces",
      "Retail & Showrooms: Product displays, fashion boutiques, jewellery stores, and exhibition areas",
      "Hospitality: Hotels, restaurants, reception areas, and premium interiors",
      "Commercial Spaces: Offices, galleries, display counters, and architectural features"
    ],
    "relatedProductIds": [
      "recessed",
      "surface",
      "adjustable-spotlights"
    ],
    "aliases": [
      "cob"
    ],
    "products": [
      "COB Downlights"
    ],
    "tagline": "Focused Brilliance. Exceptional Clarity.",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        16,
        17,
        18
      ]
    },
    "contentSections": [
      {
        "heading": "Perfect for Highlighting Every Detail",
        "paragraphs": [
          "COB Downlights are particularly effective in spaces where lighting needs to do more than provide brightness. They create visual depth, emphasize textures, and draw attention to important design elements."
        ]
      }
    ],
    "closingLine": "Illuminate with precision. Highlight with elegance."
  },
  {
    "id": "adjustable-spotlights",
    "title": "Adjustable Spotlights",
    "name": "Adjustable Spotlights",
    "slug": "adjustable-spotlights",
    "category": "lighting",
    "parentId": "downlights",
    "shortDescription": "Direct the Light. Highlight Every Detail.",
    "fullDescription": "Adjustable Spotlights are versatile lighting fixtures designed to provide precise and directional illumination. Featuring tiltable or rotatable light heads, these fixtures allow you to control where the light falls, making them ideal for highlighting artwork, architectural details, furniture, and decorative elements. Their sleek design and flexible functionality make them a perfect addition to modern residential and commercial interiors.",
    "image": "/products/lighting/Adjustable%20Spotlights.jpeg",
    "alt": "Adjustable Spotlights lighting application",
    "features": [
      "Directional Lighting Control: Adjustable light heads allow illumination to be directed toward specific areas, objects, or architectural features.",
      "Precision Accent Lighting: Ideal for highlighting artwork, wall textures, display products, and decorative interiors.",
      "Flexible Beam Positioning: Tilting and rotating mechanisms offer convenient lighting adjustments to suit changing requirements.",
      "Energy-Efficient LED Technology: Provides effective illumination with reduced power consumption and long-lasting performance.",
      "Sleek Architectural Design: Compact, modern fixtures complement contemporary ceiling designs without distracting from the interior.",
      "Customizable Lighting Options: Available in different beam angles, wattages, finishes, and colour temperatures, depending on the model."
    ],
    "applications": [
      "Residential Spaces: Living rooms, bedrooms, feature walls, and artwork displays",
      "Retail Environments: Fashion boutiques, jewellery showrooms, and product displays",
      "Hospitality Spaces: Hotels, restaurants, cafés, and reception areas",
      "Commercial Interiors: Offices, galleries, exhibition spaces, and display counters"
    ],
    "relatedProductIds": [
      "recessed",
      "surface",
      "cob"
    ],
    "aliases": [
      "adjustable-spotlights"
    ],
    "products": [
      "Adjustable Spotlights"
    ],
    "tagline": "Direct the Light. Highlight Every Detail.",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        19,
        20,
        21
      ]
    },
    "contentSections": [
      {
        "heading": "Lighting That Adapts to Your Space",
        "paragraphs": [
          "Unlike fixed lighting fixtures, Adjustable Spotlights offer greater flexibility by allowing light to be repositioned whenever required. Whether illuminating a feature wall, highlighting a product display, or creating a focused lighting effect, they bring precision and versatility to interior lighting."
        ]
      }
    ],
    "closingLine": "Flexible illumination that brings every detail into focus."
  },
  {
    "id": "wall-sconces",
    "title": "Wall Sconces",
    "name": "Wall Sconces",
    "slug": "wall-sconces",
    "category": "lighting",
    "parentId": "wall-lights",
    "shortDescription": "Elegant Wall Lighting for Warm and Inviting Spaces",
    "fullDescription": "Enhance your interiors with stylish Wall Sconces that combine decorative beauty with functional lighting. Designed to provide soft, comfortable illumination, these wall-mounted lights create a welcoming atmosphere while adding elegance to your space.",
    "image": "/products/lighting/Wall%20Sconces.jpeg",
    "alt": "Wall Sconces lighting application",
    "features": [
      "Elegant Designs: Stylish fixtures that complement modern and classic interiors.",
      "Warm Ambient Lighting: Creates a relaxing and comfortable atmosphere.",
      "Space-Saving: Wall-mounted design keeps floors and tables clutter-free.",
      "Decorative Appeal: Adds character and sophistication to walls.",
      "Versatile Applications: Suitable for both residential and commercial spaces."
    ],
    "applications": [
      "Bedrooms",
      "Living Rooms",
      "Hallways",
      "Hotels",
      "Restaurants",
      "Lounge Areas"
    ],
    "relatedProductIds": [
      "up-down",
      "led-wall",
      "picture-lights"
    ],
    "aliases": [
      "wall-sconces"
    ],
    "products": [
      "Wall Sconces"
    ],
    "tagline": "Elegant Wall Lighting for Warm and Inviting Spaces",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        23,
        24
      ]
    },
    "closingLine": "Illuminate Your Walls with Style and Elegance."
  },
  {
    "id": "up-down",
    "title": "Up-Down Wall Lights",
    "name": "Up-Down Wall Lights",
    "slug": "up-down",
    "category": "lighting",
    "parentId": "wall-lights",
    "shortDescription": "Modern Lighting That Adds Depth and Elegance to Every Wall",
    "fullDescription": "Transform ordinary walls into beautiful architectural features with Up-Down Wall Lights. Designed to project light both upward and downward, these stylish fixtures create attractive lighting patterns while enhancing the overall ambience of your space.",
    "image": "/products/lighting/Up-Down%20Wall%20lights.jpeg",
    "alt": "Up-Down Wall Lights lighting application",
    "features": [
      "Dual-Direction Lighting: Illuminates both upward and downward for a balanced lighting effect.",
      "Modern & Minimalist Design: Sleek fixtures that complement contemporary interiors and exteriors.",
      "Beautiful Lighting Patterns: Creates attractive light beams that highlight wall textures and architectural details.",
      "Energy-Efficient LED Technology: Provides effective illumination with low energy consumption.",
      "Space-Saving Design: Compact wall-mounted fixtures that blend seamlessly into the surroundings.",
      "Versatile Applications: Suitable for decorative and ambient lighting in residential and commercial spaces."
    ],
    "applications": [
      "Living Rooms",
      "Bedrooms",
      "Hallways",
      "Staircases",
      "Building Facades",
      "Hotels",
      "Restaurants",
      "Entrance Areas"
    ],
    "relatedProductIds": [
      "wall-sconces",
      "led-wall",
      "picture-lights"
    ],
    "aliases": [
      "up-down"
    ],
    "products": [
      "Up-Down Wall Lights"
    ],
    "tagline": "Modern Lighting That Adds Depth and Elegance to Every Wall",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        24,
        25
      ]
    },
    "contentSections": [
      {
        "heading": "Enhance Every Wall with Beautiful Lighting",
        "paragraphs": [
          "Up-Down Wall Lights combine modern design with functional illumination, adding warmth, depth, and a sophisticated finishing touch to your interiors and exteriors."
        ]
      }
    ],
    "closingLine": "Light Up. Light Down. Elevate Your Space."
  },
  {
    "id": "led-wall",
    "title": "LED Wall Lights",
    "name": "LED Wall Lights",
    "slug": "led-wall",
    "category": "lighting",
    "parentId": "wall-lights",
    "shortDescription": "Smart, Stylish Lighting for Modern Spaces",
    "fullDescription": "Enhance your interiors with modern LED Wall Lights that combine elegant design, energy efficiency, and comfortable illumination. These sleek wall-mounted fixtures create a warm and inviting atmosphere while adding a sophisticated touch to your walls.",
    "image": "/products/lighting/LED%20Wall%20Lights.jpeg",
    "alt": "LED Wall Lights lighting application",
    "features": [
      "Modern & Sleek Design: Minimalist lighting fixtures that complement contemporary interiors.",
      "Energy-Efficient Lighting: LED technology provides effective illumination while consuming less electricity.",
      "Soft & Comfortable Glow: Creates pleasant ambient lighting for a relaxing atmosphere.",
      "Long-Lasting Performance: Designed for durability and reduced maintenance.",
      "Space-Saving Installation: Wall-mounted fixtures that keep your space clean and uncluttered.",
      "Decorative Lighting Effects: Highlights wall textures, architectural features, and interior details."
    ],
    "applications": [
      "Living Rooms",
      "Bedrooms",
      "Hallways",
      "Staircases",
      "Hotels",
      "Restaurants",
      "Offices",
      "Reception Areas"
    ],
    "relatedProductIds": [
      "wall-sconces",
      "up-down",
      "picture-lights"
    ],
    "aliases": [
      "led-wall"
    ],
    "products": [
      "LED Wall Lights"
    ],
    "tagline": "Smart, Stylish Lighting for Modern Spaces",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        25,
        26
      ]
    },
    "contentSections": [
      {
        "heading": "Illuminate Your Space with Modern Elegance",
        "paragraphs": [
          "LED Wall Lights offer the perfect combination of style and functionality, transforming ordinary walls into attractive design elements with beautiful illumination."
        ]
      }
    ],
    "closingLine": "Modern Design. Beautiful Glow. Lasting Elegance."
  },
  {
    "id": "picture-lights",
    "title": "Picture Lights",
    "name": "Picture Lights",
    "slug": "picture-lights",
    "category": "lighting",
    "parentId": "wall-lights",
    "shortDescription": "Highlight Your Artwork with Elegant Illumination",
    "fullDescription": "Bring your artwork, photographs, and decorative displays to life with beautifully designed Picture Lights. These specially designed lighting fixtures provide focused illumination, enhancing the colours, textures, and details of your favourite pieces while adding a sophisticated touch to your interiors.",
    "image": "/products/lighting/Picture%20Lights.jpeg",
    "alt": "Picture Lights lighting application",
    "features": [
      "Focused Illumination: Directs light onto paintings, photographs, and decorative displays.",
      "Elegant & Minimalist Design: Sleek fixtures that complement modern and traditional interiors.",
      "Enhanced Visual Appeal: Highlights the colours, textures, and fine details of artwork.",
      "Energy-Efficient LED Options: Offers effective illumination with reduced electricity consumption.",
      "Adjustable Lighting Options: Selected models allow you to direct light for better coverage.",
      "Premium Finishes: Available in stylish finishes that blend beautifully with interior décor."
    ],
    "applications": [
      "Living Rooms",
      "Art Galleries",
      "Bedrooms",
      "Hallways",
      "Hotels",
      "Museums",
      "Offices",
      "Showrooms"
    ],
    "relatedProductIds": [
      "wall-sconces",
      "up-down",
      "led-wall"
    ],
    "aliases": [
      "picture-lights"
    ],
    "products": [
      "Picture Lights"
    ],
    "tagline": "Highlight Your Artwork with Elegant Illumination",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        27,
        28
      ]
    },
    "contentSections": [
      {
        "heading": "Bring Every Detail into Focus",
        "paragraphs": [
          "Picture Lights add beauty and depth to your walls by drawing attention to your most treasured artwork and decorative elements. Whether highlighting a family portrait or a statement painting, they create an elegant and inviting atmosphere."
        ]
      }
    ],
    "closingLine": "Highlight the Art. Enhance the Space."
  },
  {
    "id": "chandeliers",
    "title": "Chandeliers",
    "name": "Chandeliers",
    "slug": "chandeliers",
    "category": "lighting",
    "parentId": "decorative-lights",
    "shortDescription": "Timeless Elegance That Illuminates Every Space",
    "fullDescription": "Add a touch of luxury and sophistication to your interiors with our beautiful collection of Chandeliers. Designed to create a stunning visual impact, these decorative lighting fixtures combine elegant craftsmanship with beautiful illumination, transforming ordinary spaces into extraordinary interiors.",
    "image": "/products/lighting/Chandeliers.jpeg",
    "alt": "Chandeliers lighting application",
    "features": [
      "Elegant & Luxurious Designs: Beautifully crafted fixtures that enhance the overall appearance of your interiors.",
      "Statement Lighting: Creates an attractive focal point that adds character and grandeur to any room.",
      "Beautiful Ambient Illumination: Provides warm and inviting lighting for a comfortable atmosphere.",
      "Wide Range of Styles: Available in modern, contemporary, classic, and decorative designs.",
      "Premium Finishes: Stylish materials and finishes that complement different interior themes.",
      "Energy-Efficient Options: Compatible models offer LED lighting for effective illumination with reduced energy consumption."
    ],
    "applications": [
      "Living Rooms",
      "Dining Areas",
      "Luxury Bedrooms",
      "Hotel Lobbies",
      "Banquet Halls",
      "Restaurants",
      "Reception Areas",
      "Villas"
    ],
    "relatedProductIds": [
      "pendants",
      "hanging",
      "designer-ceiling-lights"
    ],
    "aliases": [
      "chandeliers"
    ],
    "products": [
      "Chandeliers"
    ],
    "tagline": "Timeless Elegance That Illuminates Every Space",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        30,
        31
      ]
    },
    "contentSections": [
      {
        "heading": "Create a Lasting Impression",
        "paragraphs": [
          "Chandeliers are more than lighting fixtures. They are statement pieces that enhance the beauty of your interiors, creating a perfect balance of luxury, style, and functionality."
        ]
      }
    ],
    "closingLine": "Elevate Your Interiors with Timeless Brilliance."
  },
  {
    "id": "pendants",
    "title": "Pendant Lights",
    "name": "Pendant Lights",
    "slug": "pendants",
    "category": "lighting",
    "parentId": "decorative-lights",
    "shortDescription": "Modern Elegance That Brings Style to Every Space",
    "fullDescription": "Enhance your interiors with our stylish collection of Pendant Lights, designed to combine modern aesthetics with beautiful illumination. Suspended elegantly from the ceiling, these lighting fixtures add warmth, character, and sophistication while creating an attractive focal point in any room.",
    "image": "/products/lighting/Pendent%20Lights.jpeg",
    "alt": "Pendant Lights lighting application",
    "features": [
      "Stylish & Modern Designs: Sleek and elegant lighting fixtures that complement contemporary and traditional interiors.",
      "Focused Illumination: Provides effective lighting for dining tables, kitchen islands, and specific areas.",
      "Decorative Appeal: Adds visual interest and enhances the overall beauty of your interiors.",
      "Versatile Styles: Available in minimalist, industrial, classic, and designer patterns.",
      "Adjustable Hanging Heights: Selected models offer flexible installation heights to suit different spaces.",
      "Energy-Efficient Options: Compatible LED models provide effective illumination with lower energy consumption."
    ],
    "applications": [
      "Dining Areas",
      "Kitchen Islands",
      "Living Rooms",
      "Bedrooms",
      "Cafés",
      "Restaurants",
      "Hotels",
      "Reception Areas",
      "Commercial Spaces"
    ],
    "relatedProductIds": [
      "chandeliers",
      "hanging",
      "designer-ceiling-lights"
    ],
    "aliases": [
      "pendants"
    ],
    "products": [
      "Pendant Lights"
    ],
    "tagline": "Modern Elegance That Brings Style to Every Space",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        31,
        32
      ]
    },
    "contentSections": [
      {
        "heading": "Illuminate with Style and Purpose",
        "paragraphs": [
          "Pendant Lights offer the perfect balance of decorative beauty and functional lighting. Whether installed individually or arranged in a group, they create a welcoming atmosphere while enhancing the character of your interiors."
        ]
      }
    ],
    "closingLine": "Elegant Designs. Focused Lighting. Beautiful Spaces."
  },
  {
    "id": "hanging",
    "title": "Hanging Lights",
    "name": "Hanging Lights",
    "slug": "hanging",
    "category": "lighting",
    "parentId": "decorative-lights",
    "shortDescription": "Beautiful Lighting That Adds Charm to Every Interior",
    "fullDescription": "Bring warmth, elegance, and creativity to your interiors with our exclusive collection of Hanging Lights. Designed to enhance the beauty of your space, these decorative ceiling-suspended fixtures create an inviting atmosphere while adding a unique touch of style and sophistication.",
    "image": "/products/lighting/hanging%20%20lights.jpeg",
    "alt": "Hanging Lights lighting application",
    "features": [
      "Elegant & Decorative Designs: Beautifully designed fixtures that enhance the visual appeal of any interior.",
      "Warm & Inviting Illumination: Creates a comfortable and welcoming atmosphere.",
      "Versatile Design Options: Available in contemporary, traditional, industrial, and artistic styles.",
      "Attractive Ceiling Décor: Adds character and creates a stylish focal point in your space.",
      "Flexible Hanging Arrangements: Selected models can be installed individually or in decorative clusters.",
      "Energy-Efficient Options: Compatible LED lighting solutions offer effective illumination with reduced energy consumption."
    ],
    "applications": [
      "Living Rooms",
      "Dining Areas",
      "Bedrooms",
      "Cafés",
      "Restaurants",
      "Hotels",
      "Staircases",
      "Reception Areas",
      "Commercial Spaces"
    ],
    "relatedProductIds": [
      "chandeliers",
      "pendants",
      "designer-ceiling-lights"
    ],
    "aliases": [
      "hanging"
    ],
    "products": [
      "Hanging Lights"
    ],
    "tagline": "Beautiful Lighting That Adds Charm to Every Interior",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        32,
        33,
        34
      ]
    },
    "contentSections": [
      {
        "heading": "Add a Touch of Elegance from Above",
        "paragraphs": [
          "Hanging Lights combine decorative beauty with practical illumination, transforming ordinary ceilings into attractive design features. Whether used as a single statement piece or arranged in a creative combination, they bring personality and charm to every interior."
        ]
      }
    ],
    "closingLine": "Hang in Style. Shine with Elegance."
  },
  {
    "id": "designer-ceiling-lights",
    "title": "Designer Ceiling Lights",
    "name": "Designer Ceiling Lights",
    "slug": "designer-ceiling-lights",
    "category": "lighting",
    "parentId": "decorative-lights",
    "shortDescription": "Creative Lighting That Transforms Your Ceiling into a Statement",
    "fullDescription": "Elevate your interiors with our exclusive collection of Designer Ceiling Lights, where modern innovation meets artistic elegance. Designed to enhance the beauty of your ceiling, these stylish lighting fixtures combine unique patterns, sophisticated finishes, and beautiful illumination to create an impressive atmosphere in every space.",
    "image": "/products/lighting/Designer%20ceiling%20Light.jpeg",
    "alt": "Designer Ceiling Lights lighting application",
    "features": [
      "Unique & Artistic Designs: Creative lighting fixtures that add personality and elegance to your interiors.",
      "Modern & Contemporary Styles: Sleek designs that complement minimalist, luxurious, and modern spaces.",
      "Beautiful Ambient Illumination: Provides comfortable and balanced lighting for a welcoming atmosphere.",
      "Premium Finishes: Available in a variety of attractive materials, colours, and finishes to match different interior themes.",
      "Space-Efficient Designs: Selected flush-mounted and semi-flush-mounted models are suitable for rooms with limited ceiling height.",
      "Energy-Efficient LED Options: Offers effective illumination with reduced energy consumption and long-lasting performance."
    ],
    "applications": [
      "Living Rooms",
      "Bedrooms",
      "Dining Areas",
      "Luxury Apartments",
      "Villas",
      "Hotels",
      "Restaurants",
      "Offices",
      "Reception Areas",
      "Showrooms"
    ],
    "relatedProductIds": [
      "chandeliers",
      "pendants",
      "hanging"
    ],
    "aliases": [
      "designer-ceiling-lights"
    ],
    "products": [
      "Designer Ceiling Lights"
    ],
    "tagline": "Creative Lighting That Transforms Your Ceiling into a Statement",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        34,
        35
      ]
    },
    "contentSections": [
      {
        "heading": "Redefine Your Interiors with Beautiful Lighting",
        "paragraphs": [
          "Designer Ceiling Lights go beyond ordinary illumination by transforming ceilings into attractive architectural features. Whether you prefer a minimalist design or a bold decorative statement, these fixtures bring together creativity, elegance, and functionality."
        ]
      }
    ],
    "closingLine": "Inspired Designs. Beautiful Ceilings. Brilliant Spaces."
  },
  {
    "id": "garden",
    "title": "Garden Lights",
    "name": "Garden Lights",
    "slug": "garden",
    "category": "lighting",
    "parentId": "outdoor-lights",
    "shortDescription": "Illuminate Your Outdoors with Beauty and Elegance",
    "fullDescription": "Transform your garden into a beautiful and welcoming space with our stylish collection of Garden Lights. Designed to enhance outdoor landscapes, these lighting solutions provide gentle illumination while highlighting plants, pathways, and decorative garden features.",
    "image": "/products/lighting/garden%20lights.jpeg",
    "alt": "Garden Lights lighting application",
    "features": [
      "Elegant Outdoor Designs: Enhances the beauty of gardens and landscaped spaces.",
      "Warm & Inviting Illumination: Creates a relaxing and welcoming outdoor atmosphere.",
      "Weather-Resistant Options: Selected fixtures are designed to withstand outdoor environmental conditions.",
      "Energy-Efficient LED Technology: Provides effective illumination with lower energy consumption.",
      "Landscape Enhancement: Highlights plants, pathways, flower beds, and decorative features.",
      "Versatile Installation: Suitable for residential gardens, commercial landscapes, and outdoor recreational spaces."
    ],
    "applications": [
      "Home Gardens",
      "Villas",
      "Resorts",
      "Parks",
      "Walkways",
      "Landscaped Areas",
      "Outdoor Seating Spaces"
    ],
    "relatedProductIds": [
      "bollard",
      "outdoor-wall",
      "landscape-spotlights"
    ],
    "aliases": [
      "garden"
    ],
    "products": [
      "Garden Lights"
    ],
    "tagline": "Illuminate Your Outdoors with Beauty and Elegance",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        37,
        38,
        39
      ]
    },
    "contentSections": [
      {
        "heading": "Bring Your Garden to Life",
        "paragraphs": [
          "Garden Lights combine decorative beauty with functional illumination, transforming outdoor spaces into attractive environments that can be enjoyed after sunset."
        ]
      }
    ],
    "closingLine": "Beautiful Gardens. Brilliant Evenings."
  },
  {
    "id": "bollard",
    "title": "Bollard Lights",
    "name": "Bollard Lights",
    "slug": "bollard",
    "category": "lighting",
    "parentId": "outdoor-lights",
    "shortDescription": "Elegant Pathway Lighting for Safe and Beautiful Outdoor Spaces",
    "fullDescription": "Enhance your outdoor spaces with our modern collection of Bollard Lights, designed to provide stylish and functional illumination. These ground-mounted lighting fixtures are ideal for lighting pathways, gardens, walkways, and landscaped areas while adding a sophisticated touch to outdoor environments.",
    "image": "/products/lighting/Bollard.jpeg",
    "alt": "Bollard Lights lighting application",
    "features": [
      "Modern & Elegant Designs: Sleek lighting fixtures that complement contemporary outdoor landscapes.",
      "Safe Pathway Illumination: Improves visibility along walkways, entrances, and garden paths.",
      "Weather-Resistant Construction: Outdoor-rated models are designed to withstand rain, dust, and changing weather conditions.",
      "Energy-Efficient LED Technology: Provides effective illumination with lower electricity consumption.",
      "Durable & Reliable Performance: Robust construction suitable for long-term outdoor use.",
      "Beautiful Landscape Enhancement: Adds decorative appeal while creating a warm and welcoming atmosphere."
    ],
    "applications": [
      "Garden Pathways",
      "Walkways",
      "Villas",
      "Resorts",
      "Parks",
      "Residential Complexes",
      "Commercial Landscapes",
      "Building Entrances"
    ],
    "relatedProductIds": [
      "garden",
      "outdoor-wall",
      "landscape-spotlights"
    ],
    "aliases": [
      "bollard"
    ],
    "products": [
      "Bollard Lights"
    ],
    "tagline": "Elegant Pathway Lighting for Safe and Beautiful Outdoor Spaces",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        39,
        40
      ]
    },
    "contentSections": [
      {
        "heading": "Illuminate Every Path with Elegance",
        "paragraphs": [
          "Bollard Lights combine modern design with practical illumination, making outdoor spaces safer, more attractive, and welcoming after sunset."
        ]
      }
    ],
    "closingLine": "Light Every Path. Enhance Every Landscape."
  },
  {
    "id": "outdoor-wall",
    "title": "Outdoor Wall Lights",
    "name": "Outdoor Wall Lights",
    "slug": "outdoor-wall",
    "category": "lighting",
    "parentId": "outdoor-lights",
    "shortDescription": "Stylish Exterior Lighting That Enhances Beauty and Safety",
    "fullDescription": "Illuminate your outdoor spaces with our elegant collection of Outdoor Wall Lights, designed to combine modern aesthetics with functional lighting. These wall-mounted fixtures enhance building exteriors, entrances, balconies, and outdoor areas while creating a warm, welcoming, and secure environment.",
    "image": "/products/lighting/outdoor%20wall%20lights.jpeg",
    "alt": "Outdoor Wall Lights lighting application",
    "features": [
      "Modern & Elegant Designs: Stylish fixtures that complement contemporary and traditional building exteriors.",
      "Beautiful Ambient Illumination: Creates attractive lighting effects that enhance outdoor walls and architectural features.",
      "Weather-Resistant Construction: Outdoor-rated models offer protection against rain, dust, and changing weather conditions.",
      "Energy-Efficient LED Technology: Provides effective illumination while reducing electricity consumption.",
      "Enhanced Safety & Visibility: Improves lighting around entrances, balconies, and outdoor pathways.",
      "Durable & Reliable Performance: Designed for long-lasting performance with minimal maintenance."
    ],
    "applications": [
      "Building Exteriors",
      "Home Entrances",
      "Balconies",
      "Villas",
      "Hotels",
      "Resorts",
      "Outdoor Corridors",
      "Commercial Buildings",
      "Terrace Areas"
    ],
    "relatedProductIds": [
      "garden",
      "bollard",
      "landscape-spotlights"
    ],
    "aliases": [
      "outdoor-wall"
    ],
    "products": [
      "Outdoor Wall Lights"
    ],
    "tagline": "Stylish Exterior Lighting That Enhances Beauty and Safety",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        40,
        41
      ]
    },
    "contentSections": [
      {
        "heading": "Enhance Your Exteriors with Beautiful Lighting",
        "paragraphs": [
          "Outdoor Wall Lights offer the perfect combination of style, functionality, and safety. Whether highlighting architectural details or illuminating entrances, these fixtures create an elegant and welcoming atmosphere after sunset."
        ]
      }
    ],
    "closingLine": "Illuminate Your Walls. Elevate Your Outdoors."
  },
  {
    "id": "landscape-spotlights",
    "title": "Landscape Spotlights",
    "name": "Landscape Spotlights",
    "slug": "landscape-spotlights",
    "category": "lighting",
    "parentId": "outdoor-lights",
    "shortDescription": "Highlight the Beauty of Your Outdoors with Focused Illumination",
    "fullDescription": "Bring your outdoor landscapes to life with our premium collection of Landscape Spotlights. Designed to highlight trees, plants, sculptures, and architectural features, these lighting fixtures provide focused illumination that enhances the beauty and depth of your outdoor spaces.",
    "image": "/products/lighting/landscape%20spotlights.jpeg",
    "alt": "Landscape Spotlights lighting application",
    "features": [
      "Focused & Directional Lighting: Highlights specific landscape features with precise illumination.",
      "Elegant Outdoor Lighting: Enhances the appearance of gardens, trees, sculptures, and architectural elements.",
      "Adjustable Lighting Angles: Selected models allow flexible positioning to direct light where needed.",
      "Weather-Resistant Construction: Outdoor-rated fixtures are designed to withstand rain, dust, and changing weather conditions.",
      "Energy-Efficient LED Technology: Provides effective illumination with reduced electricity consumption.",
      "Durable & Long-Lasting Performance: Robust construction suitable for outdoor environments."
    ],
    "applications": [
      "Home Gardens",
      "Landscape Areas",
      "Villas",
      "Resorts",
      "Parks",
      "Building Facades",
      "Outdoor Sculptures",
      "Commercial Landscapes",
      "Pathways"
    ],
    "relatedProductIds": [
      "garden",
      "bollard",
      "outdoor-wall"
    ],
    "aliases": [
      "landscape-spotlights"
    ],
    "products": [
      "Landscape Spotlights"
    ],
    "tagline": "Highlight the Beauty of Your Outdoors with Focused Illumination",
    "contentSource": {
      "document": "product content.pdf",
      "pages": [
        42,
        43
      ]
    },
    "contentSections": [
      {
        "heading": "Bring Your Landscape to Life After Sunset",
        "paragraphs": [
          "Landscape Spotlights combine focused illumination with elegant design, transforming ordinary outdoor features into stunning visual highlights. Whether illuminating a beautiful tree, a garden sculpture, or an architectural detail, they create depth, character, and a welcoming outdoor atmosphere."
        ]
      }
    ],
    "closingLine": "Highlight Every Detail. Illuminate Every Landscape."
  }
];
export const catalogProducts = [...automationProducts, ...lightingItems];
export const allProducts = [...productCategories, ...lightingItems];
export const productGroups = [
 { title: 'Automation Products', slug: 'automation', products: automationProducts, image: '/products/automation/Switch.jpeg', alt: 'Smart touch control panel and integrated interior lighting', description: 'Experience intelligent living with advanced automation solutions that seamlessly connect lighting, curtains, climate, energy and everyday controls.' },
 { title: 'Lighting Products', slug: 'lighting', products: lightingItems, image: '/lighting-home.png', alt: 'Warm architectural ceiling lighting in an elegant living room', description: 'Transform every space with thoughtfully designed architectural and decorative lighting that brings beauty, comfort and character.' },
];
export const productHref = (product: Product) => `/products/${product.category}/${product.parentId ? product.parentId + '/' : ''}${product.slug}`;
export function resolveProduct(path: string) {
 const parts = path.split('/');
 if (parts.length > 3) return undefined;
 const slug = parts.at(-1);
 return allProducts.find(product => (product.slug === slug || product.aliases.includes(slug ?? '')) && (parts.length === 1 || product.category === parts[0]) && (parts.length < 3 || product.parentId === parts[1]));
}
