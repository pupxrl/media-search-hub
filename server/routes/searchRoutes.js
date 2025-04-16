// server/routes/searchRoutes.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

// iTunes API search logic
router.get("/", async (req, res) => {
  const { term, mediaType } = req.query;

  try {
    const response = await axios.get(`https://itunes.apple.com/search`, {
      params: {
        term: term,
        media: mediaType,
        limit: 10,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
