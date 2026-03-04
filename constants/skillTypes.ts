// Comprehensive skill types organized by category > sub-category > skills
// Last updated: March 4, 2026

export type SkillSubCategory = {
  name: string;
  skills: string[];
};

export type SkillCategory = {
  name: string;
  subCategories: SkillSubCategory[];
};

export const skillTree: SkillCategory[] = [
  {
    name: "Construction & Technical Trades",
    subCategories: [
      {
        name: "Automotive",
        skills: ["Vehicle Mechanic", "Motorbike Mechanic"]
      },
      {
        name: "Electrical & Solar",
        skills: ["Electrician", "Solar Electrician", "Solar PV Installer"]
      },
      {
        name: "Building & Structural",
        skills: ["Bricklayer", "Mason", "Screeder", "Carpenter", "Furniture Maker", "Welder", "Fabricator"]
      },
      {
        name: "Finishing & Installation",
        skills: ["Painter", "Tiler", "Glazier (Glass Installer)", "Frame Maker", "Roof Installer", "Fence Installer", "Gate Installer"]
      },
      {
        name: "Mechanical Systems",
        skills: ["Plumber", "AC Technician"]
      }
    ]
  },
  {
    name: "Home & Property Services",
    subCategories: [
      {
        name: "Cleaning & Maintenance",
        skills: ["General Cleaner", "Industrial Cleaner", "Laundry Services", "Dry Cleaner", "Pest Control Technician"]
      },
      {
        name: "Home Improvement & Décor",
        skills: ["Interior Decorator", "Home Decorator"]
      },
      {
        name: "Home Assistance",
        skills: ["Maid (Home Helper)", "Nanny", "Errand Services"]
      }
    ]
  },
  {
    name: "Fashion & Clothing",
    subCategories: [
      {
        name: "Fashion & Clothing",
        skills: ["Tailor", "Seamstress", "Fashion Designer", "Fashion Stylist", "Aso-Oke Specialist"]
      }
    ]
  },
  {
    name: "Hair & Grooming",
    subCategories: [
      {
        name: "Hair & Grooming",
        skills: ["Barber", "Hairdresser / Hair Stylist"]
      }
    ]
  },
  {
    name: "Beauty & Cosmetics",
    subCategories: [
      {
        name: "Beauty & Cosmetics",
        skills: ["Beautician", "Makeup Artist", "Gele Tying Specialist", "Tattoo Artist"]
      },
      {
        name: "Nail Care",
        skills: ["Manicurist", "Pedicurist"]
      }
    ]
  },
  {
    name: "Events & Hospitality",
    subCategories: [
      {
        name: "Food & Beverage",
        skills: ["Catering Services", "Chef", "Baker", "Cocktail Services"]
      },
      {
        name: "Event Planning & Coordination",
        skills: ["Event Planner", "Event Host / MC", "Event Decorator", "Event Branding"]
      },
      {
        name: "Event Support Services",
        skills: ["Event Security / Crowd Control", "Ushers", "Event Rentals / Party Rentals", "Event Centre / Hall Provider", "Gift Packaging", "Souvenir Maker"]
      }
    ]
  },
  {
    name: "Entertainment & Creative Industry",
    subCategories: [
      {
        name: "Performing Arts",
        skills: ["Actor / Actress", "Singer", "Musician", "DJ", "Live Band", "Dance Choreographer", "Model / Movie Extra"]
      },
      {
        name: "Production & Creative Direction",
        skills: ["Music Producer", "Sound Engineer / Technician", "Scriptwriter", "Creative Director", "Storyboard Artist"]
      },
      {
        name: "Visual & Craft Arts",
        skills: ["Artist", "Animator", "Bead Maker", "Voice-over Artist / Voice Coach"]
      }
    ]
  },
  {
    name: "Tech, Media & Digital Services",
    subCategories: [
      {
        name: "Software & Development",
        skills: ["Software Developer", "Web Developer", "Mobile App Developer", "UX Specialist", "Website Manager"]
      },
      {
        name: "Data & Marketing",
        skills: ["Data Analyst", "SEO Specialist", "Email Marketing Specialist", "Social Media Manager"]
      },
      {
        name: "Creative & Content",
        skills: ["Graphic Designer", "Brand Designer", "Content Creator", "Blogger", "Copywriter", "AI Content Creator", "Podcast Creator"]
      },
      {
        name: "Media Production",
        skills: ["Videographer", "Video Editor", "Drone Operator", "Photographer", "Brand Photographer"]
      },
      {
        name: "IT & Technical Support",
        skills: ["Computer Technician", "Phone Technician", "Satellite Cable Installer"]
      }
    ]
  },
  {
    name: "Professional & Business Services",
    subCategories: [
      {
        name: "Professional & Business Services",
        skills: ["Project Manager", "Account Manager", "Customer Support Specialist", "Virtual Assistant", "Tutor"]
      }
    ]
  },
  {
    name: "Transport & Logistics",
    subCategories: [
      {
        name: "Transport & Logistics",
        skills: ["Vehicle Driver", "Motorbike Driver / Dispatch Rider", "Logistics Services Provider"]
      }
    ]
  }
];

// Flat map for backward compatibility (used in filters, search, display)
export const skillCategories: Record<string, string[]> = Object.fromEntries(
  skillTree.map(cat => [
    cat.name,
    cat.subCategories.flatMap(sub => sub.skills)
  ])
);

// Flatten all skills into a single array (derived from skillTree for accuracy)
export const allSkills = skillTree.flatMap(cat =>
  cat.subCategories.flatMap(sub =>
    sub.skills.map(skill => ({ category: cat.name, subCategory: sub.name, skill }))
  )
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
