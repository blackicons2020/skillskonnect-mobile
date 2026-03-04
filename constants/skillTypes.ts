// Comprehensive skill types organized by category
// Last updated: March 4, 2026

export const skillCategories = {
  "Construction & Technical Trades": [
    "Vehicle Mechanic",
    "Motorbike Mechanic",
    "Electrician",
    "Solar Electrician",
    "Solar PV Installer",
    "Bricklayer",
    "Mason",
    "Screeder",
    "Carpenter",
    "Furniture Maker",
    "Welder",
    "Fabricator",
    "Painter",
    "Tiler",
    "Glazier (Glass Installer)",
    "Frame Maker",
    "Roof Installer",
    "Fence Installer",
    "Gate Installer",
    "Plumber",
    "AC Technician"
  ],
  "Home & Property Services": [
    "General Cleaner",
    "Industrial Cleaner",
    "Laundry Services",
    "Dry Cleaner",
    "Pest Control Technician",
    "Interior Decorator",
    "Home Decorator",
    "Maid (Home Helper)",
    "Nanny",
    "Errand Services"
  ],
  "Fashion & Clothing": [
    "Tailor",
    "Seamstress",
    "Fashion Designer",
    "Fashion Stylist",
    "Aso-Oke Specialist"
  ],
  "Hair & Grooming": [
    "Barber",
    "Hairdresser / Hair Stylist"
  ],
  "Beauty & Cosmetics": [
    "Beautician",
    "Makeup Artist",
    "Gele Tying Specialist",
    "Tattoo Artist",
    "Manicurist",
    "Pedicurist"
  ],
  "Events & Hospitality": [
    "Catering Services",
    "Chef",
    "Baker",
    "Cocktail Services",
    "Event Planner",
    "Event Host / MC",
    "Event Decorator",
    "Event Branding",
    "Event Security / Crowd Control",
    "Ushers",
    "Event Rentals / Party Rentals",
    "Event Centre / Hall Provider",
    "Gift Packaging",
    "Souvenir Maker"
  ],
  "Entertainment & Creative Industry": [
    "Actor / Actress",
    "Singer",
    "Musician",
    "DJ",
    "Live Band",
    "Dance Choreographer",
    "Model / Movie Extra",
    "Music Producer",
    "Sound Engineer / Technician",
    "Scriptwriter",
    "Creative Director",
    "Storyboard Artist",
    "Artist",
    "Animator",
    "Bead Maker",
    "Voice-over Artist / Voice Coach"
  ],
  "Tech, Media & Digital Services": [
    "Software Developer",
    "Web Developer",
    "Mobile App Developer",
    "UX Specialist",
    "Website Manager",
    "Data Analyst",
    "SEO Specialist",
    "Email Marketing Specialist",
    "Social Media Manager",
    "Graphic Designer",
    "Brand Designer",
    "Content Creator",
    "Blogger",
    "Copywriter",
    "AI Content Creator",
    "Podcast Creator",
    "Videographer",
    "Video Editor",
    "Drone Operator",
    "Photographer",
    "Brand Photographer",
    "Computer Technician",
    "Phone Technician",
    "Satellite Cable Installer"
  ],
  "Professional & Business Services": [
    "Project Manager",
    "Account Manager",
    "Customer Support Specialist",
    "Virtual Assistant",
    "Tutor"
  ],
  "Transport & Logistics": [
    "Vehicle Driver",
    "Motorbike Driver / Dispatch Rider",
    "Logistics Services Provider"
  ]
};

// Flatten all skills into a single array for dropdown
export const allSkills = Object.entries(skillCategories).flatMap(([category, skills]) => 
  skills.map(skill => ({ category, skill }))
);

// Get all unique skill names
export const skillNames = allSkills.map(s => s.skill);

// Charge rate types
export const chargeRateTypes = [
  "Per Hour",
  "Per Day",
  "Contract",
  "Not Fixed"
];
