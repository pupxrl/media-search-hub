const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// middleware to validate JWT Token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // get token from the Authorization header

  if (!token) {
    return res.status(403).send('Token is required');
  }

  // remove "Bearer " from the token string
  const tokenWithoutBearer = token.split(' ')[1];

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid Token');
    }
    req.user = decoded; // attach decoded user data to the request object
    next();
  });
};

// route to generate the token
app.get('/api/generate-token', (req, res) => {
  try {
    const token = jwt.sign(
      { user: 'testUser' }, // payload
      process.env.JWT_SECRET_KEY, // secret key
      { expiresIn: '1h' } // expiration time
    );

    console.log('Token generated successfully:', token);
    res.json({ message: 'Token generated successfully', token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).send('Error generating token');
  }
});

// protected Route Example that performs search
app.get('/api/search', verifyToken, async (req, res) => {
  const { term, mediaType } = req.query;

  try {
    // make a request to the iTunes API with the provided search term and media type
    const response = await axios.get(`https://itunes.apple.com/search`, {
      params: {
        term: term,
        media: mediaType,
        limit: 10, // limit the results to 10
      },
    });

    // send the search results back to the client
    res.json({ results: response.data.results });
  } catch (error) {
    console.error('Error fetching search results from iTunes API:', error);
    res.status(500).send('Error fetching search results');
  }
});

// server react app
app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
