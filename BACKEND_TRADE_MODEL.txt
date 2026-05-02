const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema(
  {
    proposer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    proposerItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    status: {
      type: String,
      enum: ['proposed', 'counter-offered', 'accepted', 'completed', 'declined', 'cancelled'],
      default: 'proposed',
    },
    countOffers: [
      {
        offerer: mongoose.Schema.Types.ObjectId,
        item: mongoose.Schema.Types.ObjectId,
        message: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    proposerMessage: String,
    completedAt: Date,
    proposerRating: {
      rating: { type: Number, min: 1, max: 5 },
      review: String,
      createdAt: Date,
    },
    receiverRating: {
      rating: { type: Number, min: 1, max: 5 },
      review: String,
      createdAt: Date,
    },
  },
  { timestamps: true }
);

tradeSchema.pre('find', function () {
  this.populate('proposer', 'username avatar rating')
    .populate('receiver', 'username avatar rating')
    .populate('proposerItem', 'title images')
    .populate('receiverItem', 'title images');
});

module.exports = mongoose.model('Trade', tradeSchema);
