import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        fullname: "admin",
        email: "admin@email.com",
        password: "$2b$10$RSqIk2GdtGM/Lrd4hOIFy.V3kg3gvbvpWm647GU3QXK4N1oY7o3zS",
        token: null,
      },
    ],
  });
  await prisma.product.createMany({
    data: [
      {
        title: "Biscuit",
        price: 6000,
        quantity: 5,
        author_id: 1,
      },
      {
        title: "Chips",
        price: 8000,
        quantity: 2,
        author_id: 1,
      },
      {
        title: "Oreo",
        price: 10000,
        quantity: 1,
        author_id: 1,
      },
      {
        title: "Tango",
        price: 12000,
        quantity: 3,
        author_id: 1,
      },
      {
        title: "Cokelat",
        price: 15000,
        quantity: 2,
        author_id: 1,
      },
    ],
  });
  await prisma.currency_denom.createMany({
    data: [
      {
        value: 2000,
        author_id: 1,
      },
      {
        value: 5000,
        author_id: 1,
      },
      {
        value: 10000,
        author_id: 1,
      },
      {
        value: 20000,
        author_id: 1,
      },
      {
        value: 50000,
        author_id: 1,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
