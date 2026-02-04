import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const roles = [
  {
    name: "DevOps Engineer",
    slug: "devops-engineer",
    category: "DevOps/SRE",
    avgSalary: "$150k-$220k",
    isPopular: true,
    sortOrder: 1,
  },
  {
    name: "Site Reliability Engineer",
    slug: "site-reliability-engineer",
    category: "DevOps/SRE",
    avgSalary: "$160k-$230k",
    isPopular: true,
    sortOrder: 2,
  },
  {
    name: "Platform Engineer",
    slug: "platform-engineer",
    category: "Platform",
    avgSalary: "$160k-$240k",
    isPopular: true,
    sortOrder: 3,
  },
  {
    name: "Engineering Manager",
    slug: "engineering-manager",
    category: "Engineering Management",
    avgSalary: "$170k-$250k",
    isPopular: true,
    sortOrder: 4,
  },
  {
    name: "Director of Engineering",
    slug: "director-of-engineering",
    category: "Engineering Management",
    avgSalary: "$200k-$300k",
    isPopular: false,
    sortOrder: 5,
  },
  {
    name: "Senior Backend Engineer",
    slug: "senior-backend-engineer",
    category: "Backend",
    avgSalary: "$160k-$230k",
    isPopular: true,
    sortOrder: 6,
  },
  {
    name: "Senior Frontend Engineer",
    slug: "senior-frontend-engineer",
    category: "Frontend",
    avgSalary: "$150k-$210k",
    isPopular: true,
    sortOrder: 7,
  },
  {
    name: "Staff Engineer",
    slug: "staff-engineer",
    category: "Backend",
    avgSalary: "$190k-$260k",
    isPopular: false,
    sortOrder: 8,
  },
  {
    name: "Principal Engineer",
    slug: "principal-engineer",
    category: "Backend",
    avgSalary: "$210k-$300k",
    isPopular: false,
    sortOrder: 9,
  },
  {
    name: "Cloud Architect",
    slug: "cloud-architect",
    category: "Platform",
    avgSalary: "$180k-$250k",
    isPopular: false,
    sortOrder: 10,
  },
];

const companies = [
  { name: "Google", slug: "google", category: "FAANG", sortOrder: 1 },
  { name: "Amazon", slug: "amazon", category: "FAANG", sortOrder: 2 },
  { name: "Microsoft", slug: "microsoft", category: "FAANG", sortOrder: 3 },
  { name: "Meta", slug: "meta", category: "FAANG", sortOrder: 4 },
  { name: "Apple", slug: "apple", category: "FAANG", sortOrder: 5 },
  { name: "Netflix", slug: "netflix", category: "FAANG", sortOrder: 6 },
  { name: "Stripe", slug: "stripe", category: "Unicorn", sortOrder: 7 },
  { name: "Datadog", slug: "datadog", category: "Unicorn", sortOrder: 8 },
  { name: "Snowflake", slug: "snowflake", category: "Unicorn", sortOrder: 9 },
  { name: "Shopify", slug: "shopify", category: "Unicorn", sortOrder: 10 },
  { name: "Airbnb", slug: "airbnb", category: "Unicorn", sortOrder: 11 },
  { name: "Uber", slug: "uber", category: "Unicorn", sortOrder: 12 },
  { name: "LinkedIn", slug: "linkedin", category: "Enterprise", sortOrder: 13 },
  { name: "Salesforce", slug: "salesforce", category: "Enterprise", sortOrder: 14 },
  { name: "Oracle", slug: "oracle", category: "Enterprise", sortOrder: 15 },
  { name: "IBM", slug: "ibm", category: "Enterprise", sortOrder: 16 },
  { name: "JPMorgan Chase", slug: "jpmorgan-chase", category: "Finance", sortOrder: 17 },
  { name: "Goldman Sachs", slug: "goldman-sachs", category: "Finance", sortOrder: 18 },
  { name: "Capital One", slug: "capital-one", category: "Finance", sortOrder: 19 },
  { name: "Block (Square)", slug: "block", category: "Unicorn", sortOrder: 20 },
];

async function main() {
  for (const role of roles) {
    const existing = await prisma.role.findUnique({ where: { slug: role.slug } });
    if (existing) {
      await prisma.role.update({ where: { slug: role.slug }, data: role });
    } else {
      await prisma.role.create({ data: role });
    }
  }

  for (const company of companies) {
    const existing = await prisma.company.findUnique({ where: { slug: company.slug } });
    const data = {
      ...company,
      isPopular: true,
      logoUrl: `/logos/${company.slug}.svg`,
      website: company.slug === "jpmorgan-chase" ? "https://www.jpmorganchase.com" : company.slug === "capital-one" ? "https://www.capitalone.com" : company.slug === "block" ? "https://block.xyz" : `https://www.${company.slug}.com`,
      employeeCount: "1k-10k",
      headquarters: "",
    };
    if (existing) {
      await prisma.company.update({ where: { slug: company.slug }, data });
    } else {
      await prisma.company.create({ data });
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
