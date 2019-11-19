const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var dishesInfoSchema = new Schema({
  _id: false,
  platesBowlsAndContainers: {
    type: Number,
    default: 0,
    // required: true,
    // price: 0.4
  },
  potsAndPans: {
    type: Number,
    default: 0,
    // required: true,
    // price: 0.5
  },
  utensilsCupsAndGlasses: {
    type: Number,
    default: 0,
    // required: true,
    // price: 0.30
  }
});


const RequestSchema = new Schema({
    dishesToClean: {type: dishesInfoSchema, default: () => ({})},
    status: {
      type: String,
      default: 'Draft',
      required: true
    },
    washerId: {
      type: Number,
      default: false,
      required: true
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    dateCreated: {
      type: Date,
      default: Date.now
    },
    dateFulfilled: {
      type: Date,
      default: null
    },
    lastModified: {
      type: Date,
      default: null
    },
    note: {
      type: String,
      default: ""
    }
  })


  module.exports = Request = mongoose.model('request', RequestSchema);