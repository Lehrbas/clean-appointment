import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pro = await prisma.user.upsert({
    where: { email: 'pro@pro.com' },
    update: {},
    create: {
      email: 'pro@pro.com',
      password: 'secret',
      role: 'professional',
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: 'customer@customer.com' },
    update: {},
    create: {
      email: 'customer@customer.com',
      password: 'secret',
      role: 'customer',
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      password: 'secret',
      role: 'admin',
    },
  });

  await prisma.professional.create({
    data: {
      userId: pro.id,
      name: 'Mike',
      field: 'Psychology',
    },
  });

  await prisma.customer.create({
    data: {
      userId: customer.id,
      name: 'Bob Customer',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
