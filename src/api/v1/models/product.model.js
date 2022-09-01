const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const { schemaOptions } = require('./modelOptions');

const ProductSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive'],
    },
    quantity: {
      type: Number,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  schemaOptions
);

module.exports = mongoose.model('Product', ProductSchema);
