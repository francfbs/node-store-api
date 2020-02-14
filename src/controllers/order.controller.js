'use strict';

const Result = require('../controllers/result');
const repository = require('../repositories/order.repo');
const guid = require('guid');
const authService = require('../services/auth.service');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(Result.ok(data));
    } catch (e) { next(e); }
}

exports.post = async (req, res, next) => {
    try {
        const token = await authService.decodeToken(req);
        await repository.create({
            customer: token.id,
            number: guid.raw().substring(0,6),
            items: req.body.items
        });
        res.status(201).send(Result.ok());
    } catch (e) { next(e); }
};