const express = require('express');
const { body, validationResult } = require('express-validator');
const Item = require('../models/Item');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get items near user location
router.get('/nearby', async (req, res) => {
  try {
    const { latitude, longitude, maxDistance = 50000 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'latitude and longitude required' });
    }

    const items = await Item.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(maxDistance),
        },
      },
      available: true,
    })
      .populate('owner', 'username avatar rating')
      .limit(50);

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all items with filtering
router.get('/', async (req, res) => {
  try {
    const { category, condition, owner, search } = req.query;
    const filter = { available: true };

    if (category) filter.category = category;
    if (condition) filter.condition = condition;
    if (owner) filter.owner = owner;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const items = await Item.find(filter)
      .populate('owner', 'username avatar rating')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get item by ID
router.get('/:itemId', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.itemId,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('owner', 'username avatar rating completedTrades');

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create item
router.post(
  '/',
  authMiddleware,
  [
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('category').isIn([
      'Electronics',
      'Furniture',
      'Clothing',
      'Books',
      'Sports',
      'Tools',
      'Toys',
      'Kitchen',
      'Garden',
      'Art',
      'Music',
      'Other',
    ]),
    body('condition').isIn(['Like New', 'Good', 'Fair', 'Used']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, category, condition, estimatedValue, latitude, longitude } =
        req.body;

      const item = new Item({
        title,
        description,
        category,
        condition,
        estimatedValue,
        owner: req.userId,
        ...(latitude &&
          longitude && {
            location: {
              type: 'Point',
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
          }),
      });

      await item.save();
      await item.populate('owner', 'username avatar');

      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update item
router.put('/:itemId', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (item.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { title, description, condition, available } = req.body;

    if (title) item.title = title;
    if (description) item.description = description;
    if (condition) item.condition = condition;
    if (available !== undefined) item.available = available;

    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete item
router.delete('/:itemId', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (item.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Item.findByIdAndDelete(req.params.itemId);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
