const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    listing_time: {
        type: Number,
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    product_sku:{
        type: Number,
        required: true
    },
    product_price:{
        type: Number,
        required: true
    },
    sell_price:{
        type: Number,
        required: true
    },
    stock_quantity:{
        type: Number,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('data', DataSchema);