import { prisma } from '../prisma/prisma' // adjust path if needed

async function CreateUser() {
  const email = process.argv[2];
  const role = process.argv[3]?.toUpperCase() === 'ADMIN' ? 'ADMIN' : 'USER';

  if (!email) {
    console.error('❌ Please provide an email');
    process.exit(1);
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(`⚠️ User with email ${email} already exists`);
    process.exit(0);
  }

  const user = await prisma.user.create({
    data: {
      email,
      role,
    },
  });

  console.log(`✅ Created user: ${user.email} (role: ${user.role})`);
}

CreateUser()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
