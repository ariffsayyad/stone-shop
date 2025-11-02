const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const prisma = new PrismaClient();
  try {
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = await prisma.user.create({
      data: {
        id: 'admin-user-id',
        name: 'Admin User',
        email: 'admin@gocart.com',
        image: '',
        password: hashedPassword,
        role: 'admin'
      }
    });
    console.log('Admin created:', admin);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

