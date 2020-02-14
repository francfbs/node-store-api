'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
    return Product.find({ active: true }, 'title price slug');
}

exports.getBySlug = async (slug) => {
    return Product.findOne({
        slug: slug,
        active: true
    }, 'title description price slug tags');
}

exports.getById = async (id) => {
    return Product.findById(id);
}

exports.getByTag = async (tag) => {
    return Product.findOne({
        tags: tag,
        active: true
    }, 'title description price slug tags');
}

exports.create = async (data) => {
    var product = new Product(data);
    product.save();
}

exports.update = async (id, data) => {
    Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    });
}

exports.delete = async (id) => {
    await Product.findByIdAndRemove(id);
}