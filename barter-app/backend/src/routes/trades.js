const express = require('express');
const { body, validationResult } = require('express-validator');
const Trade = require('../models/Trade');
const Item = require('../models/Item');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Propose a trade
router.post(
  '/',
  authMiddleware,
  [
    body('proposerItemId').notEmpty(),
    body('receiverId').notEmpty(),
    body('receiverItemId').notEmpty(),
    body('message').optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { proposerItemId, receiverId, receiverItemId, message } = req.body;

      // Verify items exist and are available
      const [proposerItem, receiverItem] = await Promise.all([
        Item.findById(proposerItemId),
        Item.findById(receiverItemId),
      ]);

      if (!proposerItem || !receiverItem) {
        return res.status(404).json({ error: 'Item not found' });
      }

      if (!proposerItem.available || !receiverItem.available) {
        return res.status(400).json({ error: 'One or more items are not available' });
      }

      // Verify ownership
      if (proposerItem.owner.toString() !== req.userId) {
        return res.status(403).json({ error: 'Not authorized to propose with this item' });
      }

      if (receiverItem.owner.toString() !== receiverId) {
        return res.status(403).json({ error: 'Receiver does not own the item' });
      }

      const trade = new Trade({
        proposer: req.userId,
        proposerItem: proposerItemId,
        receiver: receiverId,
        receiverItem: receiverItemId,
        proposerMessage: message,
      });

      await trade.save();
      await trade.populate([
        { path: 'proposer', select: 'username avatar' },
        { path: 'receiver', select: 'username avatar' },
        { path: 'proposerItem', select: 'title images' },
        { path: 'receiverItem', select: 'title images' },
      ]);

      res.status(201).json(trade);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get trades for current user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {
      $or: [{ proposer: req.userId }, { receiver: req.userId }],
    };

    if (status) filter.status = status;

    const trades = await Trade.find(filter).sort({ createdAt: -1 });

    res.json(trades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trade by ID
router.get('/:tradeId', async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.tradeId);

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    res.json(trade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Accept trade
router.put('/:tradeId/accept', authMiddleware, async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.tradeId);

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    if (trade.receiver.toString() !== req.userId && trade.proposer.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    trade.status = 'accepted';
    await trade.save();

    res.json(trade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark trade as completed and add rating
router.put(
  '/:tradeId/complete',
  authMiddleware,
  [body('rating').isInt({ min: 1, max: 5 }), body('review').optional().trim()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { rating, review } = req.body;
      const trade = await Trade.findById(req.params.tradeId);

      if (!trade) {
        return res.status(404).json({ error: 'Trade not found' });
      }

      if (trade.status !== 'accepted') {
        return res.status(400).json({ error: 'Trade must be accepted first' });
      }

      // Determine who is rating
      const isProposer = trade.proposer.toString() === req.userId;
      const isReceiver = trade.receiver.toString() === req.userId;

      if (!isProposer && !isReceiver) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      if (isProposer) {
        trade.proposerRating = { rating, review, createdAt: new Date() };
      } else {
        trade.receiverRating = { rating, review, createdAt: new Date() };
      }

      // Mark as completed if both have rated
      if (trade.proposerRating && trade.receiverRating) {
        trade.status = 'completed';
        trade.completedAt = new Date();

        // Update user ratings and completed trades
        const avgProposerRating = trade.proposerRating.rating;
        const avgReceiverRating = trade.receiverRating.rating;

        const proposer = await User.findById(trade.proposer);
        const receiver = await User.findById(trade.receiver);

        proposer.completedTrades += 1;
        proposer.rating =
          (proposer.rating * (proposer.completedTrades - 1) + avgReceiverRating) /
          proposer.completedTrades;

        receiver.completedTrades += 1;
        receiver.rating =
          (receiver.rating * (receiver.completedTrades - 1) + avgProposerRating) /
          receiver.completedTrades;

        await Promise.all([proposer.save(), receiver.save()]);
      }

      await trade.save();
      res.json(trade);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Decline trade
router.put('/:tradeId/decline', authMiddleware, async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.tradeId);

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    if (trade.receiver.toString() !== req.userId && trade.proposer.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    trade.status = 'declined';
    await trade.save();

    res.json(trade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
