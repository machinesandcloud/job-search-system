import { PrismaClient, CompanySource } from "@prisma/client";
import { companySeed } from "../src/lib/company-data";

const prisma = new PrismaClient();

async function main() {
  for (const company of companySeed) {
    const existing = await prisma.company.findFirst({ where: { name: company.name } });
    if (existing) {
      await prisma.company.update({
        where: { id: existing.id },
        data: {
          domain: company.domain,
          industry: company.industry,
          sizeRange: company.size,
          source: CompanySource.LOCAL,
        },
      });
      continue;
    }
    await prisma.company.create({
      data: {
        name: company.name,
        domain: company.domain,
        industry: company.industry,
        sizeRange: company.size,
        source: CompanySource.LOCAL,
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
