import { Destination } from "../types";

export const DESTINATIONS: Destination[] = [
  {
    id: "maldives-atolls",
    name: "Maldives",
    country: "Republic of Maldives",
    region: "Asia",
    coordinates: { lat: 4.1755, lon: 73.5093 },
    tagline: "Crystalline Turquoise Lagoons, White Sand Shores & Swaying Coconut Palms",
    description:
      "An archipelago of pristine coral atolls scattered across the equator in the Indian Ocean. Renowned for pure powdery white-sand beaches, gently leaning coconut palm groves, warm translucent waters, and vibrant marine biodiversity.",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80",
    ],
    bestTimeToVisit: "November to April (Dry Northeast Monsoon, calm sea, radiant sunshine)",
    language: "Dhivehi (English widely spoken across all resorts and islands)",
    currency: "Maldivian Rufiyaa (MVR) / US Dollar (USD $)",
    timezone: "MVT (UTC+5)",
    costLevel: "$$$$",
    vibes: ["Coastal & Islands", "Culinary"],
    quickFacts: [
      { label: "Islands", value: "1,192 coral islands in 26 atolls" },
      { label: "Water Clarity", value: "Up to 40m visibility" },
      { label: "Marine Life", value: "Manta rays, whale sharks, sea turtles" },
      { label: "Transit", value: "Speedboats & DHC-6 Twin Otter Seaplanes" },
    ],
    famousPlaces: [
      {
        id: "palm-lagoon-beach",
        name: "Palm Tree Lagoon & Coral Shore",
        category: "Nature & Scenic",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Iconic white-sand shoreline fringed by leaning tropical coconut palms and rustic ocean swings facing the calm turquoise Indian Ocean lagoon.",
        highlights: [
          "Crystal-clear shallow waters with powdery soft white coral sand",
          "Ocean swings hung from leaning coconut palms for golden hour photography",
          "Gentle calm waves ideal for swimming and stand-up paddleboarding",
        ],
        visitorTips:
          "Visit in the early morning for peaceful solitude and calm water, or at late afternoon for warm sunset reflections.",
        bestTimeToExplore: "Morning and golden hour sunset",
        entryFee: "Free for island guests",
      },
      {
        id: "banana-reef",
        name: "Banana Reef Marine Sanctuary",
        category: "Nature & Scenic",
        image:
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
        description:
          "The Maldives' premier designated marine reserve, featuring dramatic overhangs, caves, and coral pinnacles teeming with schooling bannerfish and reef sharks.",
        highlights: [
          "Vibrant soft corals and dramatic underwater canyon walls",
          "Frequent sightings of moray eels, barracudas, and friendly turtles",
          "Snorkeling and diving suitable for both beginners and advanced divers",
        ],
        visitorTips:
          "Take a morning boat excursion when tides are gentle and underwater visibility peaks above 30 meters.",
        bestTimeToExplore: "9:00 AM – 1:00 PM",
        entryFee: "$45 - $80 excursion fee",
      },
      {
        id: "vaadhoo-sea-of-stars",
        name: "Vaadhoo Island (Sea of Stars)",
        category: "Nature & Scenic",
        image:
          "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1000&q=80",
        description:
          "Famous for its ethereal natural bioluminescence where microscopic dinoflagellates glow electric neon blue in breaking shoreline waves.",
        highlights: [
          "Bioluminescent neon blue waves lapping gently against dark sands",
          "Unreal stargazing far from mainland urban light pollution",
          "Local Maldivian island culture and artisanal seafood dining",
        ],
        visitorTips:
          "Bioluminescence is most vivid during moonless nights from late summer through winter months.",
        bestTimeToExplore: "Late night (after 10:00 PM)",
        entryFee: "Free access",
      },
    ],
  },
  {
    id: "kyoto-japan",
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    coordinates: { lat: 35.0116, lon: 135.7681 },
    tagline: "Millennium of Zen, Bamboo Groves & Silent Shrines",
    description:
      "Former imperial capital for over a thousand years, Kyoto remains the cultural soul of Japan. Here, ancient wooden machiya houses stand beside mossy gardens, centuries-old tea houses host timeless ceremonies, and thousand vermilion torii gates snake through sacred hills.",
    heroImage:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2000&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80",
    ],
    bestTimeToVisit: "March to May (Cherry Blossoms) & October to November (Vibrant Autumn Foliage)",
    language: "Japanese",
    currency: "Japanese Yen (JPY ¥)",
    timezone: "JST (UTC+9)",
    costLevel: "$$$",
    vibes: ["Cultural", "Historic", "Culinary"],
    quickFacts: [
      { label: "UNESCO Sites", value: "17 World Heritage Sites" },
      { label: "Temples & Shrines", value: "Over 2,000" },
      { label: "Local Specialty", value: "Kaiseki & Matcha" },
      { label: "Transit", value: "Kyoto City Subway & IC Card Buses" },
    ],
    famousPlaces: [
      {
        id: "fushimi-inari",
        name: "Fushimi Inari Taisha",
        category: "Monument",
        image:
          "https://images.unsplash.com/photo-1478436127897-769e00d2c715?auto=format&fit=crop&w=1000&q=80",
        description:
          "The iconic head shrine of the god Inari, famous for its mesmerizing path of over 10,000 vibrant vermilion torii gates climbing Mt. Inari.",
        highlights: [
          "Endless torii tunnel through mystic forest",
          "Fox (kitsune) stone messengers clutching keys",
          "Panoramic dusk overlook of southern Kyoto",
        ],
        visitorTips:
          "Hike at dawn (around 6:30 AM) or after sunset to witness the lantern-lit gates without the crowds.",
        bestTimeToExplore: "Early morning or twilight",
        entryFee: "Free admission",
      },
      {
        id: "arashiyama-bamboo",
        name: "Arashiyama Bamboo Grove & Tenryu-ji",
        category: "Nature & Scenic",
        image:
          "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
        description:
          "Towering emerald stalks sway with the breeze, casting ethereal light across pathways leading to the Zen rock gardens of Tenryu-ji.",
        highlights: [
          "Sogo Soundscape of Japan registered audio experience",
          "14th-century Sogenchi garden reflection pond",
          "Historic wooden Togetsukyo Bridge",
        ],
        visitorTips:
          "Rent a city bicycle from Saga-Arashiyama Station to explore the nearby northern temples.",
        bestTimeToExplore: "Sunrise (7:00 AM - 8:30 AM)",
        entryFee: "¥500 for Tenryu-ji gardens",
      },
      {
        id: "kinkaku-ji",
        name: "Kinkaku-ji (The Golden Pavilion)",
        category: "Architectural Icon",
        image:
          "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1000&q=80",
        description:
          "A stunning Zen Buddhist temple whose top two floors are completely covered in gleaming gold leaf, reflected gracefully in the Mirror Pond.",
        highlights: [
          "Pure gold leaf exterior over wooden architecture",
          "Kyoko-chi (Mirror Pond) with miniature islet pine trees",
          "Traditional Edo-period tea house Sekkatei",
        ],
        visitorTips:
          "Best photographed in late afternoon when the setting sun illuminates the western gold facade.",
        bestTimeToExplore: "Mid-afternoon (2:30 PM - 4:00 PM)",
        entryFee: "¥500 per adult",
      },
      {
        id: "gion-district",
        name: "Gion & Pontocho Alley",
        category: "Historic Quarter",
        image:
          "https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&w=1000&q=80",
        description:
          "The heart of geisha (geiko) culture, lined with narrow stone alleys, traditional wooden tea houses, and riverfront dining terraces.",
        highlights: [
          "Preserved 17th-century machiya townhouses",
          "Kamogawa riverside promenade under willow trees",
          "Intimate Michelin-starred yakitori and tempura counters",
        ],
        visitorTips:
          "Be strictly respectful of working geiko; do not photograph them up close or block their paths.",
        bestTimeToExplore: "Blue hour (6:00 PM - 9:00 PM)",
        entryFee: "Free to wander",
      },
    ],
  },
  {
    id: "santorini-greece",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    coordinates: { lat: 36.3932, lon: 25.4615 },
    tagline: "Caldera Cliffs, Aegean Blues & Whitewashed Elegance",
    description:
      "Perched atop volcanic caldera cliffs that plunge into the deep cobalt Aegean Sea, Santorini is the quintessential Cycladic dream. Whitewashed cliffside cubist dwellings, cobalt-domed chapels, and world-renowned sunset spectacles define this Aegean gem.",
    heroImage:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2000&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    ],
    bestTimeToVisit: "May to June & September to October (Warm sea breezes, crystal skies, mild crowds)",
    language: "Greek (English widely spoken)",
    currency: "Euro (EUR €)",
    timezone: "EEST (UTC+3)",
    costLevel: "$$$$",
    vibes: ["Coastal & Islands", "Culinary", "Urban Architecture"],
    quickFacts: [
      { label: "Island Type", value: "Volcanic Caldera" },
      { label: "Signature Wine", value: "Assyrtiko (Crisp volcanic white)" },
      { label: "Signature Dish", value: "Fava Santorinis & Tomatokeftedes" },
      { label: "Coastline", value: "Red Beach, Perissa Black Sand" },
    ],
    famousPlaces: [
      {
        id: "oia-village",
        name: "Oia Cliffside & Sunset Lookout",
        category: "Architectural Icon",
        image:
          "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
        description:
          "The crowning village of Santorini, built directly into cliff volcanic crevices with pastel cave houses, iconic blue domes, and ancient Venetian ruins.",
        highlights: [
          "Anastasi Church blue domes framed by caldera sea",
          "Sunset amphitheater over Ammoudi Bay",
          "Artisan galleries and rooftop seafood tavernas",
        ],
        visitorTips:
          "Stroll the marble alleyways before 10 AM before cruise ship arrivals fill the main thoroughfare.",
        bestTimeToExplore: "Golden hour into dusk",
        entryFee: "Free admission",
      },
      {
        id: "fira-oia-trail",
        name: "Fira to Oia Caldera Hike",
        category: "Nature & Scenic",
        image:
          "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80",
        description:
          "A spectacular 10-kilometer coastal ridge trail linking the island's whitewashed cliff villages with uninhibited panoramas of the submerged volcanic caldera.",
        highlights: [
          "Dramatic cliff drop-offs above cobalt water",
          "Skaros Rock promontory overlooking Imerovigli",
          "Historic lonely chapels clinging to lava ridges",
        ],
        visitorTips:
          "Carry at least 1.5L of water and wear trail shoes; start before 8:30 AM to avoid midday heat.",
        bestTimeToExplore: "Morning (7:30 AM - 11:00 AM)",
        entryFee: "Free",
      },
      {
        id: "akrotiri-ruins",
        name: "Prehistoric Akrotiri Archaeological Site",
        category: "Historic Quarter",
        image:
          "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1000&q=80",
        description:
          "Often called the 'Minoan Pompeii', an incredibly preserved bronze age settlement buried beneath volcanic ash in 1600 BC.",
        highlights: [
          "Three-story preserved stone residences",
          "Intricate Minoan fresco reproductions",
          "Advanced subterranean drainage systems 3,500 years old",
        ],
        visitorTips:
          "Hire a certified guide at the entrance to fully grasp the astonishing sophistication of this civilization.",
        bestTimeToExplore: "11:00 AM - 1:00 PM (Fully covered biome roof)",
        entryFee: "€12 per adult",
      },
      {
        id: "ammoudi-bay",
        name: "Ammoudi Bay & Cliff Diving",
        category: "Culinary & Market",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
        description:
          "A picturesque fishing cove situated 300 steps below Oia, celebrated for waterfront octopus grills and swimming spots near Saint Nicholas isle.",
        highlights: [
          "Fresh catch grilled directly beside gently lapping waves",
          "Deep volcanic swimming cove with cliff jump ledge",
          "Sunset view directly from water level",
        ],
        visitorTips:
          "Reserve a waterfront table at Sunset Taverna or Dimitris at least two days in advance.",
        bestTimeToExplore: "Late afternoon for swimming followed by dinner",
        entryFee: "Free",
      },
    ],
  },
  {
    id: "banff-canada",
    name: "Banff & Lake Louise",
    country: "Canada",
    region: "Americas",
    coordinates: { lat: 51.1784, lon: -115.5708 },
    tagline: "Glacial Turquoise Lakes, Jagged Peaks & Alpine Majesty",
    description:
      "Nestled inside the Canadian Rocky Mountain Parks UNESCO site, Banff is an alpine wonderland of surreal neon-turquoise glacial lakes, towering limestone pyramids, steaming hot springs, and roaming grizzly and elk sanctuaries.",
    heroImage:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=2000&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    ],
    bestTimeToVisit: "June to September (Glacier lake canoeing & alpine hikes) & December to March (Skiing & frozen ice bubbles)",
    language: "English & French",
    currency: "Canadian Dollar (CAD $)",
    timezone: "MST (UTC-7)",
    costLevel: "$$$",
    vibes: ["Mountain & Adventure", "Nature & Scenic"],
    quickFacts: [
      { label: "Park Founded", value: "1885 (Canada's 1st National Park)" },
      { label: "Iconic Highway", value: "Icefields Parkway (Hwy 93)" },
      { label: "Wildlife", value: "Grizzlies, Elk, Bighorn Sheep" },
      { label: "Elevation", value: "1,383 m (Banff Townsite)" },
    ],
    famousPlaces: [
      {
        id: "moraine-lake",
        name: "Moraine Lake & Valley of the Ten Peaks",
        category: "Nature & Scenic",
        image:
          "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1000&q=80",
        description:
          "Glacier-fed waters of piercing crystalline cyan cradled by ten rugged 3,000m limestone peaks, once featured on the Canadian $20 bill.",
        highlights: [
          "Rockpile trail viewpoint over the neon blue water",
          "Handcrafted cedar canoe paddling along glacial runoff",
          "Consolation Lakes backcountry alpine trail",
        ],
        visitorTips:
          "Private personal vehicles are restricted; book the Parks Canada shuttle or Roam Transit weeks ahead.",
        bestTimeToExplore: "Sunrise (6:00 AM) for mirror reflections",
        entryFee: "Included in Parks Canada Discovery Pass ($11 CAD/day)",
      },
      {
        id: "lake-louise",
        name: "Lake Louise & Plain of Six Glaciers",
        category: "Nature & Scenic",
        image:
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
        description:
          "The jewel of the Rockies with Victoria Glacier looming in the distance, fronted by the grand Chateau Lake Louise.",
        highlights: [
          "Lake Agnes historic alpine tea house built in 1905",
          "Plain of Six Glaciers dramatic hanging ice falls",
          "Winter ice skating and fairy-tale ice castles",
        ],
        visitorTips:
          "Hike up to the Lake Agnes Tea House for fresh baked biscuits and mountain spring tea (bring cash!).",
        bestTimeToExplore: "Morning before 9:00 AM",
        entryFee: "Included in National Park Pass",
      },
      {
        id: "banff-gondola",
        name: "Sulphur Mountain Gondola & Boardwalk",
        category: "Monument",
        image:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
        description:
          "Ascends 698 meters in 8 minutes to a high ridge summit offering 360-degree vistas of six Rocky Mountain ranges.",
        highlights: [
          "Sanson's Peak historic 1903 meteorological observatory",
          "Sky Bistro rooftop dining with panoramic valley views",
          "Interpretive boardwalk traversing mountain crests",
        ],
        visitorTips:
          "Combine your gondola ticket with an evening soak at Banff Upper Hot Springs located at the base.",
        bestTimeToExplore: "Sunset (around 8:00 PM in summer)",
        entryFee: "$65 - $78 CAD",
      },
      {
        id: "johnston-canyon",
        name: "Johnston Canyon & Ink Pots",
        category: "Nature & Scenic",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
        description:
          "Cantilevered steel walkways suspended over a deep limestone gorge with rushing turquoise torrents and thunderous waterfalls.",
        highlights: [
          "Lower Falls natural limestone tunnel walkthrough",
          "Upper Falls 30-meter sheer plunging cascade",
          "Cold spring mineral 'Ink Pots' bubbling year-round",
        ],
        visitorTips:
          "In winter, rent ice cleats in town to witness towering frozen ice curtains and climbers.",
        bestTimeToExplore: "Early morning before 8:30 AM",
        entryFee: "Free with park pass",
      },
    ],
  },
  {
    id: "cape-town-south-africa",
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    coordinates: { lat: -33.9249, lon: 18.4241 },
    tagline: "Where Table Mountain Meets Two Colliding Oceans",
    description:
      "Crowned by the flat-topped monolith of Table Mountain and flanked by wild Atlantic and Indian oceans, Cape Town is a dynamic fusion of dramatic topography, Cape Dutch vineyards, coastal penguin colonies, and vibrant culinary creativity.",
    heroImage:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=2000&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
    ],
    bestTimeToVisit: "November to March (Long Mediterranean summer days, beach weather, harvest season)",
    language: "English, Afrikaans & Xhosa",
    currency: "South African Rand (ZAR R)",
    timezone: "SAST (UTC+2)",
    costLevel: "$$",
    vibes: ["Coastal & Islands", "Mountain & Adventure", "Culinary"],
    quickFacts: [
      { label: "Flora Kingdom", value: "Cape Floral Region (9,000+ plant species)" },
      { label: "Key Landmarks", value: "Table Mountain, Cape of Good Hope" },
      { label: "Wine Regions", value: "Constantia, Stellenbosch, Franschhoek" },
      { label: "Top Scenic Drive", value: "Chapman's Peak Drive" },
    ],
    famousPlaces: [
      {
        id: "table-mountain",
        name: "Table Mountain & Cableway",
        category: "Nature & Scenic",
        image:
          "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1000&q=80",
        description:
          "A 1,086-meter flat-topped sandstone mountain over 600 million years old, often draped in a mystic billowing cloud 'tablecloth'.",
        highlights: [
          "Rotating 360-degree aerial cableway carriage",
          "Summit walking trails through indigenous fynbos",
          "Panoramic views over Robben Island and Camps Bay",
        ],
        visitorTips:
          "Check the official cableway live webcams in the morning; clear calm days can turn windy rapidly.",
        bestTimeToExplore: "Morning or 2 hours prior to sunset",
        entryFee: "R420 - R490 return cableway",
      },
      {
        id: "boulders-beach",
        name: "Boulders Beach Penguin Colony",
        category: "Nature & Scenic",
        image:
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80",
        description:
          "Sheltered cove of gigantic granite boulders home to a protected breeding colony of thousands of wild African penguins.",
        highlights: [
          "Raised wooden boardwalks weaving through nesting dunes",
          "Turquoise calm swimming coves beside penguins",
          "Simon's Town historic naval heritage nearby",
        ],
        visitorTips:
          "Walk to Foxy Beach boardwalk for viewing, then head to Boulders Beach itself to swim in the sheltered waters.",
        bestTimeToExplore: "10:00 AM - 1:00 PM",
        entryFee: "R190 for international visitors",
      },
      {
        id: "cape-point",
        name: "Cape of Good Hope & Cape Point",
        category: "Nature & Scenic",
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80",
        description:
          "The dramatic southwestern tip of the African continent where towering 200m sea cliffs plunge into roaring ocean swells.",
        highlights: [
          "Flying Dutchman funicular to the historic old lighthouse",
          "Shipwreck hiking trails across desolate coastal fynbos",
          "Wild baboons, ostriches, and mountain zebras roaming free",
        ],
        visitorTips:
          "Drive back to Cape Town via Chapman's Peak Drive during sunset for one of the world's greatest coastal routes.",
        bestTimeToExplore: "Early afternoon",
        entryFee: "R376 for international visitors",
      },
      {
        id: "bo-kaap",
        name: "Bo-Kaap & Cape Malay Quarter",
        category: "Historic Quarter",
        image:
          "https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&w=1000&q=80",
        description:
          "A vibrant historic neighborhood at the foot of Signal Hill celebrated for its brilliantly colored 18th-century houses and aromatic Cape Malay spice cuisine.",
        highlights: [
          "Pastel and electric colored cobblestone streetscapes",
          "Auwal Mosque, the oldest mosque in South Africa (1794)",
          "Artisanal bobotie, samosa, and koesister food tours",
        ],
        visitorTips:
          "Take a Cape Malay cooking class with a local family in their heritage home.",
        bestTimeToExplore: "Mid-morning (10:00 AM - 12:30 PM)",
        entryFee: "Free to explore",
      },
    ],
  },
  {
    id: "paris-france",
    name: "Paris",
    country: "France",
    region: "Europe",
    coordinates: { lat: 48.8566, lon: 2.3522 },
    tagline: "Haussmann Boulevards, World Artistry & Seine Reflections",
    description:
      "The City of Light remains the eternal benchmark for elegance, monumental architecture, and effortless joie de vivre. From the limestone arches of the Louvre to zinc-roofed corner bistros, Paris rewards curious flâneurs at every cobblestone turn.",
    heroImage:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1471623432079-b009d30b6729?auto=format&fit=crop&w=1200&q=80",
    ],
    bestTimeToVisit: "April to June & September to October (Crisp mornings, blooming Luxembourg gardens, radiant cafe terraces)",
    language: "French",
    currency: "Euro (EUR €)",
    timezone: "CEST (UTC+2)",
    costLevel: "$$$",
    vibes: ["Cultural", "Culinary", "Urban Architecture"],
    quickFacts: [
      { label: "Arrondissements", value: "20 Distinct Districts" },
      { label: "Bridges over Seine", value: "37 Bridges" },
      { label: "Bakeries & Cafes", value: "Over 30,000" },
      { label: "Key Icon", value: "Eiffel Tower (330m iron lattice)" },
    ],
    famousPlaces: [
      {
        id: "eiffel-tower",
        name: "Eiffel Tower & Champ de Mars",
        category: "Architectural Icon",
        image:
          "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1000&q=80",
        description:
          "Gustave Eiffel's 1889 wrought-iron masterpiece soaring over the Seine, sparkling with 20,000 golden lamps on the hour every evening.",
        highlights: [
          "Summit glass elevator with 360-degree Paris panorama",
          "Picnicking on Champ de Mars lawns with fresh baguettes",
          "Evening hourly golden sparkle show",
        ],
        visitorTips:
          "View from Passerelle Debilly or Pont de Bir-Hakeim for unobstructed architectural lines without security fences.",
        bestTimeToExplore: "Twilight into night",
        entryFee: "€18 - €29 (elevator to summit)",
      },
      {
        id: "louvre-museum",
        name: "Musée du Louvre & Tuileries",
        category: "Museum & Art",
        image:
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1000&q=80",
        description:
          "The world's largest art museum, housed in a former royal fortress fronted by I.M. Pei's iconic glass pyramid.",
        highlights: [
          "Winged Victory of Samothrace commanding the grand staircase",
          "Mona Lisa and Venus de Milo masterpieces",
          "Richelieu wing French sculpture courtyards flooded in natural glass light",
        ],
        visitorTips:
          "Book the Wednesday or Friday evening late-opening slots (open until 9:45 PM) for quiet galleries.",
        bestTimeToExplore: "Evening opening hours",
        entryFee: "€22 per adult",
      },
      {
        id: "montmartre",
        name: "Montmartre & Sacré-Cœur Basilica",
        category: "Historic Quarter",
        image:
          "https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=1000&q=80",
        description:
          "A bohemian hilltop village with steep staircases, ivy-covered windmills, and panoramic vistas from the travertine domes of Sacré-Cœur.",
        highlights: [
          "Place du Tertre open-air painters and portraitists",
          "Rue de l'Abreuvoir and La Maison Rose pastel facade",
          "Vignes du Clos Montmartre, Paris's last working vineyard",
        ],
        visitorTips:
          "Climb the dome of Sacré-Cœur (300 steps) for the highest natural view of Paris after the Eiffel Tower.",
        bestTimeToExplore: "Early morning (8:00 AM) or sunset",
        entryFee: "Basilica free; Dome climb €7",
      },
      {
        id: "le-marais",
        name: "Le Marais & Place des Vosges",
        category: "Culinary & Market",
        image:
          "https://images.unsplash.com/photo-1471623432079-b009d30b6729?auto=format&fit=crop&w=1000&q=80",
        description:
          "The aristocrats' 17th-century mansions turned modern epicenter of chic design galleries, historic Jewish quarter bakeries, and courtyard cafes.",
        highlights: [
          "Place des Vosges, the oldest planned square in Paris (1612)",
          "Rue des Rosiers famous falafel at L'As du Fallafel",
          "Musée Picasso housed in the Hotel Salé mansion",
        ],
        visitorTips:
          "Sunday afternoons in the Marais feature pedestrianized streets and lively sidewalk terrace energy.",
        bestTimeToExplore: "Afternoon (1:00 PM - 6:00 PM)",
        entryFee: "Free to explore",
      },
    ],
  },
  {
    id: "reykjavik-iceland",
    name: "Reykjavík & The South Coast",
    country: "Iceland",
    region: "Europe",
    coordinates: { lat: 64.1466, lon: -21.9426 },
    tagline: "Volcanoes, Aurora Borealis & Steaming Geothermal Fjords",
    description:
      "The world's northernmost capital is the launchpad for a land of extreme contrasts: cascading glacial waterfalls, jet-black basalt sand beaches, roaring geysers, and steaming outdoor geothermal pools framed by snowcapped volcanic ridges.",
    heroImage:
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=2000&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
    ],
    bestTimeToVisit: "September to March (Aurora Borealis & Ice Caves) & June to August (Midnight Sun & Lupine meadows)",
    language: "Icelandic (English universally fluent)",
    currency: "Icelandic Króna (ISK kr)",
    timezone: "GMT (UTC+0)",
    costLevel: "$$$$",
    vibes: ["Mountain & Adventure", "Nature & Scenic"],
    quickFacts: [
      { label: "Natural Phenomenon", value: "Northern Lights & Midnight Sun" },
      { label: "Energy Source", value: "100% Geothermal & Hydroelectric" },
      { label: "Top Thermal Lagoon", value: "Blue Lagoon & Sky Lagoon" },
      { label: "Water Purity", value: "Glacial runoff drinkable anywhere" },
    ],
    famousPlaces: [
      {
        id: "hallgrimskirkja",
        name: "Hallgrímskirkja & Old Harbour",
        category: "Architectural Icon",
        image:
          "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=1000&q=80",
        description:
          "Reykjavík's iconic expressionist cathedral, designed to evoke the basalt lava columns characteristic of Iceland's volcanic landscape.",
        highlights: [
          "74.5-meter tower lookout with 360-degree coastal and mountain views",
          "5,275-pipe monumental concert organ",
          "Statue of Leif Erikson guarding the plaza",
        ],
        visitorTips:
          "Take the elevator to the tower deck right at opening before tour buses arrive.",
        bestTimeToExplore: "9:00 AM - 11:00 AM",
        entryFee: "1,400 ISK for tower lift",
      },
      {
        id: "gullfoss-geysir",
        name: "Gullfoss Waterfall & Strokkur Geysir",
        category: "Nature & Scenic",
        image:
          "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1000&q=80",
        description:
          "The thunderous two-tiered glacial cataract of the Golden Circle paired with Strokkur, which blasts boiling geothermal water 30 meters into the air every 6-10 minutes.",
        highlights: [
          "Golden falls spray rainbows over Hvítá river canyon",
          "Steaming mineral pools and bubbling turquoise vents",
          "Thingvellir tectonic continental rift nearby",
        ],
        visitorTips:
          "Bring waterproof outerwear; the glacial mist will saturate regular jackets within minutes.",
        bestTimeToExplore: "Late afternoon when the sun hits the falls",
        entryFee: "Free",
      },
      {
        id: "reynisfjara",
        name: "Reynisfjara Black Sand Beach & Basalt Columns",
        category: "Nature & Scenic",
        image:
          "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1000&q=80",
        description:
          "World-famous volcanic black sand shoreline framed by geometric hexagonal basalt columns and roaring North Atlantic sea stacks.",
        highlights: [
          "Towering Gardar basalt cliff formation reminiscent of an organ",
          "Reynisdrangar jagged offshore sea stacks",
          "Puffins nesting in the coastal cliffs during summer",
        ],
        visitorTips:
          "Strict warning: Never turn your back to the sea; sneaker waves here are extremely powerful and dangerous.",
        bestTimeToExplore: "Afternoon low tide",
        entryFee: "Free",
      },
      {
        id: "sky-lagoon",
        name: "Sky Lagoon Geothermal Ocean Infinity Pool",
        category: "Historic Quarter",
        image:
          "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1000&q=80",
        description:
          "An oceanfront geothermal sanctuary with a 70-meter infinity edge blending directly into the wild North Atlantic horizon.",
        highlights: [
          "The Seven-Step Ritual (Laug, Cold Plunge, Sauna, Mist, Scrub, Steam)",
          "Turf-roofed authentic Icelandic architecture",
          "In-water swim-up bar serving Nordic craft beer",
        ],
        visitorTips:
          "Book the Pure Pass for twilight or evening; on clear winter nights you can watch the Northern Lights directly from the warm water.",
        bestTimeToExplore: "Sunset into dark",
        entryFee: "9,990 ISK (~$72 USD)",
      },
    ],
  },
  {
    id: "queenstown-new-zealand",
    name: "Queenstown & Milford Sound",
    country: "New Zealand",
    region: "Oceania",
    coordinates: { lat: -45.0312, lon: 168.6626 },
    tagline: "Adventure Capital, Glacial Fjords & The Remarkables",
    description:
      "Surrounded by the razor-sharp jagged ridges of The Remarkables and set against the deep sapphire waters of Lake Wakatipu, Queenstown is the world's premier adventure and scenic sanctuary, leading into the misty waterfalls of Fiordland.",
    heroImage:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=2000&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    ],
    bestTimeToVisit: "December to February (Lakeside summer adventures & long twilight) & June to August (World-class powder skiing)",
    language: "English & Māori",
    currency: "New Zealand Dollar (NZD $)",
    timezone: "NZST (UTC+12)",
    costLevel: "$$$",
    vibes: ["Mountain & Adventure", "Nature & Scenic"],
    quickFacts: [
      { label: "Nickname", value: "Adventure Capital of the World" },
      { label: "Fjord Landmark", value: "Milford Sound (Eighth Wonder of the World)" },
      { label: "Wine Specialty", value: "Central Otago Pinot Noir" },
      { label: "Lake", value: "Lake Wakatipu (80km long glacial trench)" },
    ],
    famousPlaces: [
      {
        id: "milford-sound",
        name: "Milford Sound (Piopiotahi) Cruise",
        category: "Nature & Scenic",
        image:
          "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1000&q=80",
        description:
          "Rudyard Kipling called it the Eighth Wonder of the World: sheer vertical rock faces rising 1,200m above ink-dark waters, dripping with permanent waterfalls.",
        highlights: [
          "Mitre Peak soaring straight out of the glacial fjord",
          "Stirling Falls shower right under boat bow",
          "Fur seals basking on Seal Rock and bottlenose dolphins",
        ],
        visitorTips:
          "Milford Sound is actually even more dramatic when it rains, as hundreds of temporary waterfalls cascade down the cliff faces.",
        bestTimeToExplore: "Midday boat cruise",
        entryFee: "$95 - $145 NZD cruise ticket",
      },
      {
        id: "bob-peak-skyline",
        name: "Skyline Gondola & The Luge",
        category: "Monument",
        image:
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80",
        description:
          "The steepest cable car lift in the Southern Hemisphere, transporting you 450 meters up Bob's Peak above Queenstown and Lake Wakatipu.",
        highlights: [
          "Spectacular panoramic viewing deck of Coronet Peak and Walter Peak",
          "Gravity-fuelled downhill luge tracks with banked turns",
          "Stargazing tours in designated dark sky reserve zones",
        ],
        visitorTips:
          "Buy at least 3 luge rides; once is never enough on the scenic track.",
        bestTimeToExplore: "Late afternoon for golden hour views",
        entryFee: "$52 NZD gondola + luge package",
      },
      {
        id: "arrowtown",
        name: "Arrowtown Historic Gold Mining Village",
        category: "Historic Quarter",
        image:
          "https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&w=1000&q=80",
        description:
          "A living historic gold rush settlement 20 minutes from Queenstown, shaded by European sycamores and preserved miner cottages from 1862.",
        highlights: [
          "Historic Chinese Settlement along the Arrow River",
          "Buckingham Street wooden storefronts, cafes and sweet shops",
          "Gold panning in the crystal clear Arrow River",
        ],
        visitorTips:
          "Visit in April/May during autumn when the hillsides erupt in brilliant amber and scarlet foliage.",
        bestTimeToExplore: "10:00 AM - 2:00 PM",
        entryFee: "Free to wander",
      },
      {
        id: "lake-wakatipu-tss",
        name: "TSS Earnslaw & Walter Peak High Country Farm",
        category: "Culinary & Market",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
        description:
          "A voyage aboard the 'Lady of the Lake', a historic 1912 coal-fired vintage steamship cruising across Lake Wakatipu to an alpine sheep station.",
        highlights: [
          "Watch the engine room stokers shovel coal into fireboxes",
          "Gourmet BBQ lakeside lunch at Colonel's Homestead",
          "Sheepdog demonstrations on the high-country pastures",
        ],
        visitorTips:
          "Sit on the forward open deck during the return voyage for crisp alpine breezes and acoustic singalongs.",
        bestTimeToExplore: "12:00 PM lunch departure",
        entryFee: "$119 - $155 NZD",
      },
    ],
  },
  {
    id: "marrakesh-morocco",
    name: "Marrakesh",
    country: "Morocco",
    region: "Africa",
    coordinates: { lat: 31.6295, lon: -7.9811 },
    tagline: "Ochre Medina Walls, Fragrant Souks & Cobalt Courtyards",
    description:
      "Framed by the snowcapped Atlas Mountains and terracotta pisé city walls, Marrakesh is a sensory masterpiece of labyrinthine alleyways, aromatic spice pyramids, intricately carved cedar riads, and the electric spectacle of Jemaa el-Fnaa.",
    heroImage:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=2000&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&w=1200&q=80",
    ],
    bestTimeToVisit: "March to May & September to November (Pleasant warm sun, cool desert evenings, blooming orange blossoms)",
    language: "Arabic, Berber & French",
    currency: "Moroccan Dirham (MAD DH)",
    timezone: "WET (UTC+1)",
    costLevel: "$$",
    vibes: ["Cultural", "Historic", "Culinary"],
    quickFacts: [
      { label: "City Nickname", value: "The Red City (Al-Hamra)" },
      { label: "Medina Founded", value: "1070 AD by the Almoravids" },
      { label: "UNESCO Site", value: "Medina of Marrakesh (1985)" },
      { label: "Crafts", value: "Leather Tanneries, Handwoven Berber Rugs" },
    ],
    famousPlaces: [
      {
        id: "jemaa-el-fnaa",
        name: "Jemaa el-Fnaa Square & Night Food Stalls",
        category: "Culinary & Market",
        image:
          "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1000&q=80",
        description:
          "The pulsating heartbeat of Marrakesh, transforming at twilight into an open-air theater of storytellers, musicians, and sizzling tagine food stalls.",
        highlights: [
          "Spectacular panoramic sunset views from rooftop cafes (Le Grand Balcon)",
          "Aromatic skewers of spiced merguez, lamb tangia, and harira soup",
          "Fresh squeezed Valencia orange juice stalls (Stand #14)",
        ],
        visitorTips:
          "Claim a second-floor terrace seat around 5:30 PM with mint tea to watch the hundred food stalls assemble below.",
        bestTimeToExplore: "Dusk to midnight",
        entryFee: "Free to enter",
      },
      {
        id: "jardin-majorelle",
        name: "Jardin Majorelle & Yves Saint Laurent Museum",
        category: "Architectural Icon",
        image:
          "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1000&q=80",
        description:
          "A botanical oasis created by French painter Jacques Majorelle and lovingly restored by Yves Saint Laurent, saturated in iconic electric Majorelle Blue.",
        highlights: [
          "Electric cobalt blue cubist villa surrounded by giant cacti and bamboo",
          "Pierre Bergé Museum of Berber Arts inside the painter's studio",
          "Yves Saint Laurent Museum next door highlighting haute couture",
        ],
        visitorTips:
          "Tickets are sold strictly online in advance; they sell out days ahead during peak season.",
        bestTimeToExplore: "9:00 AM slot for soft light and calm pathways",
        entryFee: "150 DH (~$15 USD)",
      },
      {
        id: "ben-youssef-madrasa",
        name: "Ben Youssef Madrasa",
        category: "Historic Quarter",
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80",
        description:
          "The largest Islamic college in North Africa, founded in the 14th century, showcasing the pinnacle of Moroccan zellij tilework and carved stucco.",
        highlights: [
          "Grand central courtyard of Italian Carrara marble with reflective pool",
          "Exquisite hand-carved cedar wooden lintels and honeycomb muqarnas",
          "130 historic student dormitory dorms overlooking inner courtyards",
        ],
        visitorTips:
          "Peer out from the small wooden windows of the upper floor dormitories to capture symmetrical aerial photos of the courtyard.",
        bestTimeToExplore: "12:00 PM - 2:00 PM",
        entryFee: "50 DH",
      },
      {
        id: "bahia-palace",
        name: "Bahia Palace & Grand Courtyard",
        category: "Monument",
        image:
          "https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&w=1000&q=80",
        description:
          "A sprawling 19th-century palace complex of 150 rooms designed to be the greatest palace of its time ('Bahia' means 'brilliance').",
        highlights: [
          "Court of Honor with expansive marble floor and ceramic fountain basins",
          "Intricate stained glass and painted cedar wood ceilings",
          "Peaceful shaded courtyards filled with orange trees and jasmine",
        ],
        visitorTips:
          "Look up at the ceilings; every single room features a completely unique hand-painted geometric motif.",
        bestTimeToExplore: "9:00 AM - 10:30 AM",
        entryFee: "70 DH",
      },
    ],
  },
];

// Helper: Haversine distance formula in kilometers
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export function formatDistance(km: number, unit: string = "km"): string {
  if (unit === "mi" || unit === "F") {
    const miles = Math.round(km * 0.621371);
    return `${miles.toLocaleString()} mi`;
  }
  return `${km.toLocaleString()} km`;
}

export const DEFAULT_USER_LOCATION = {
  id: "default",
  cityName: "San Francisco",
  country: "United States",
  countryCode: "US",
  latitude: 37.7749,
  longitude: -122.4194,
  isDetected: false,
};
