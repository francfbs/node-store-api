'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async () => {
    return Customer.find({});
}

exports.create = async (data) => {
    var customer = new Customer(data);
    return customer.save();
}

exports.authenticate = async (data) => {
    return Customer.findOne({
        email: data.email,
        password: data.password
    }, "name email roles");
}

exports.getById = async (id) => {
    return Customer.findById(id, "name email roles");
}