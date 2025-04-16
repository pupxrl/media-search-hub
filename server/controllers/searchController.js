const axios = require('axios');

// This function will handle searching for media items (e.g., music, movies) on iTunes
const searchItems = async (req, res) => {
  const { term, mediaType } = req.query;

  // Validate the search term and media type
  if (!term || !mediaType) {
    return res.status(400).json({ error: 'Missing search term or media type.' });
  }

  try {
    // Make a request to the iTunes Search API
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: term,
        media: mediaType,
        limit: 10, // Limit the number of results to 10
      },
    });

    // Return the results from the iTunes API
    res.json(response.data);
  } catch (err) {
    // Handle any error that occurs during the API request
    console.error('Error fetching data from iTunes:', err);
    res.status(500).json({ error: 'Failed to fetch data from iTunes' });
  }
};

module.exports = { searchItems };
