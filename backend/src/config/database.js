const { PrismaClient } = require('@prisma/client');

// Create a single instance of PrismaClient to be used throughout the app
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Handle graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

// Handle unexpected errors
process.on('uncaughtException', async (err) => {
  console.error('Uncaught Exception:', err);
  await prisma.$disconnect();
  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  await prisma.$disconnect();
  process.exit(1);
});

module.exports = prisma; 