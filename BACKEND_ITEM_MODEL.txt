const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide item title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide item description'],
    },
    category: {
      type: String,
      required: [true, 'Please provide item category'],
      enum: [
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
      ],
    },
    condition: {
      type: String,
      required: [true, 'Please provide item condition'],
      enum: ['Like New', 'Good', 'Fair', 'Used'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    images: [String],
    estimatedValue: {
      type: Number,
      min: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
      },
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Geospatial index for location-based queries
itemSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Item', itemSchema);
