const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.post('/register', async (req, res) => {
  const client = new MongoClient('mongodb://mongo:27017');
  try {
    await client.connect();
    const db = client.db('auth');
    const users = db.collection('users');
    const result = await users.insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send(err.toString());
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});
