'use strict'

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async () => {
    return Order.find({}, 'number status')
        .populate('customer', 'name')
        .populate('items.product', 'title');
}

exports.create = async (data) => {
    var order = new Order(data);
    return order.save();
}
