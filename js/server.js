const express = require('express');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./db');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());

const publicDirectoryPath = path.join('R:', 'Docs', 'KEC', 'Sem 7', 'training FE', 'Pet Adoption');
app.use(express.static(publicDirectoryPath));

let db;

async function startServer() {
  try {
    db = await connectToDatabase();

    // Root route
    app.get('/', (req, res) => {
      res.sendFile(path.join(publicDirectoryPath, 'index.html'));
    });

    // Register route
    app.post('/register', async (req, res) => {
      try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { name, email, password: hashedPassword };
        
        const result = await db.collection('users').insertOne(user);
        res.status(201).json({ message: 'User created', userId: result.insertedId });
      } catch (error) {
        console.error('Error in /register route:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    
    app.post('/login', async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await db.collection('users').findOne({ email });

        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
        res.status(200).json({ message: 'Login successful', token });
      } catch (error) {
        console.error('Error in /login route:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    const PORT = process.env.PORT || 3000; 
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();
