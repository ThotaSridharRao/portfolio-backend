const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

app.post('/messages', async (req, res) => {
  const { name, email, message } = req.body;
  const newMessage = await prisma.message.create({
    data: {
      name,
      email,
      message,
    },
  });
  res.json(newMessage);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});