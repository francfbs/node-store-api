'use strict';

const Result = require('../controllers/result');
const repository = require('../repositories/product.repo');

exports.get = async (req, res, next) => {
    try {
        const products = await repository.get();
        res.status(200).send(Result.ok(products));
    } catch (e) { next(e); }
}

exports.getBySlug = async (req, res, next) => {
    try {
        const data = await repository.getBySlug(req.params.slug);
        res.status(200).send(Result.ok(data));
    } catch (e) { next(e); }
}

exports.getById = async (req, res, next) => {
    try {
        const data = await repository.getById(req.params.id);
        data.status(200).send(Result.ok(data));
    } catch (e) { next(e); }
}

exports.getByTag = async (req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(Result.ok(data));
    } catch (e) { next(e); }
}

exports.post = async (req, res, next) => {
    try {
        await repository.create(req.body);
        res.status(201).send(Result.ok());
    } catch (e) { next(e); }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send(Result.ok());
    } catch (e) { next(e); }
};

exports.delete = async (req, res) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send(Result.ok());
    } catch (e) { next(e); }

};
