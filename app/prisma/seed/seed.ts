import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const createUsers = () => {
  return [...Array(5)].map(
    (): Prisma.UserCreateInput => ({
      email: faker.internet.email(),
      name: faker.name.firstName(),
    }),
  );
};

const main = async () => {
  const users = createUsers();
  try {
    console.log('===Userを登録します===');
    await prisma.user.createMany({ data: users });
    console.log(`Userを${users.length}件登録しました`);
  } catch (error) {
    console.error(error);
    console.log('===Userの登録に失敗しました===');
  } finally {
    console.log('===Userの登録を終了します===');
    await prisma.$disconnect();
  }
};

main();
