// src/data.ts
export const categories = [
  "Product Management",
  "Strategy & Leadership",
  "Business Management",
  "Fintech",
  "Senior Management",
  "Data Science",
  "Digital Transformation",
  "Business Analytics"
] as const;

type Category = typeof categories[number];

interface Program {
  name: string;
  referrerBonus: string;
  refereeBonus: string;
}

export const programs: Record<Category, Program[]> = {
  "Product Management": [
    { name: "Professional Certificate Program in Product Management", referrerBonus: "₹ 7,000", refereeBonus: "₹ 9,000" },
    { name: "PG Certificate Program in Strategic Product Management", referrerBonus: "₹ 9,000", refereeBonus: "₹ 11,000" },
    { name: "Executive Program in Data Driven Product Management", referrerBonus: "₹ 10,000", refereeBonus: "₹ 10,000" },
    { name: "Executive Program in Product Management and Digital Transformation", referrerBonus: "₹ 10,000", refereeBonus: "₹ 10,000" },
    { name: "Executive Program in Product Management", referrerBonus: "₹ 10,000", refereeBonus: "₹ 10,000" },
    { name: "Advanced Certification in Product Management", referrerBonus: "₹ 10,000", refereeBonus: "₹ 10,000" },
    { name: "Executive Program in Product Management and Project Management", referrerBonus: "₹ 10,000", refereeBonus: "₹ 10,000" },
  ],
  "Strategy & Leadership": [
    { name: "Strategy Program 1", referrerBonus: "₹ 8,000", refereeBonus: "₹ 10,000" },
    { name: "Strategy Program 2", referrerBonus: "₹ 9,000", refereeBonus: "₹ 11,000" }
  ],
  "Business Management": [
    { name: "Business Management Program 1", referrerBonus: "₹ 7,000", refereeBonus: "₹ 9,000" },
    { name: "Business Management Program 2", referrerBonus: "₹ 8,000", refereeBonus: "₹ 10,000" }
  ],
  "Fintech": [
    { name: "Fintech Program 1", referrerBonus: "₹ 10,000", refereeBonus: "₹ 12,000" },
    { name: "Fintech Program 2", referrerBonus: "₹ 11,000", refereeBonus: "₹ 13,000" }
  ],
  "Senior Management": [
    { name: "Senior Management Program 1", referrerBonus: "₹ 9,000", refereeBonus: "₹ 10,000" },
    { name: "Senior Management Program 2", referrerBonus: "₹ 10,000", refereeBonus: "₹ 11,000" }
  ],
  "Data Science": [
    { name: "Data Science Program 1", referrerBonus: "₹ 12,000", refereeBonus: "₹ 14,000" },
    { name: "Data Science Program 2", referrerBonus: "₹ 13,000", refereeBonus: "₹ 15,000" }
  ],
  "Digital Transformation": [
    { name: "Digital Transformation Program 1", referrerBonus: "₹ 11,000", refereeBonus: "₹ 13,000" },
    { name: "Digital Transformation Program 2", referrerBonus: "₹ 12,000", refereeBonus: "₹ 14,000" }
  ],
  "Business Analytics": [
    { name: "Business Analytics Program 1", referrerBonus: "₹ 10,000", refereeBonus: "₹ 12,000" },
    { name: "Business Analytics Program 2", referrerBonus: "₹ 11,000", refereeBonus: "₹ 13,000" }
  ],
};
