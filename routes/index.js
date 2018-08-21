const express = require('express');
const router = express.Router();
const { User, Thing, UserThing } = require('../models/db').models;

router.get('/', async (req, res, next) => {
  try {
    const data = await User.findAll({
      include: [
        {
          model: UserThing,
          include: [Thing],
        },
      ],
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/users', async (req, res, next) => {
  try {
    const data = await User.findAll({
      include: [
        {
          model: UserThing,
          include: [Thing],
        },
      ],
    });

    const f = data.filter(function(element) {
      if (element.userthings.length) return true;
    });
    res.json(f);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
