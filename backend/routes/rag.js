const { ingestProds, queryProds } = require("../controllers/ragControllers");
const express = require('express');
const router = express.Router()

// const requireAuth = require('../middleware/requireAuth');

// router.use(requireAuth);

router.get('/eat',ingestProds);

router.post('/query',queryProds);

module.exports = router;