const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put(
  '/',
  authMiddleware,
  [
    body('firstName').optional().trim(),
    body('lastName').optional().trim(),
    body('bio').optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { firstName, lastName, bio, locationText, latitude, longitude } = req.body;

      const user = await User.findByIdAndUpdate(
        req.userId,
        {
          firstName,
          lastName,
          bio,
          locationText,
          ...(latitude &&
            longitude && {
              location: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },
            }),
        },
        { new: true, runValidators: true }
      );

      res.json(user.toJSON());
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
