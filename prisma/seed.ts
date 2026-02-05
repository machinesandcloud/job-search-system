import { PrismaClient } from "@prisma/client";
import { companySeed } from "../src/lib/company-data";
import { roles as roleProfiles } from "../src/lib/roles";

const prisma = new PrismaClient();

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const roles = roleProfiles.map((role, index) => ({
  name: role.title,
  slug: slugify(role.title),
  category: "General",
  avgSalary: null,
  isPopular: index < 20,
  sortOrder: index + 1,
}));

const companies = companySeed.slice(0, 1000).map((company, index) => ({
  name: company.name,
  slug: slugify(company.name),
  category: company.industry || "Technology",
  sortOrder: index + 1,
  logoUrl: company.domain ? `https://logo.clearbit.com/${company.domain}` : null,
  website: company.domain ? `https://${company.domain}` : null,
  employeeCount: company.size || null,
  headquarters: "",
  isPopular: index < 20,
}));

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
      name: company.name,
      slug: company.slug,
      category: company.category,
      sortOrder: company.sortOrder,
      isPopular: company.isPopular,
      logoUrl: company.logoUrl,
      website: company.website,
      employeeCount: company.employeeCount,
      headquarters: company.headquarters,
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
