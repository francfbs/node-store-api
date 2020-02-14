'use strict';

const Result = require('../../controllers/result');
const ValidationContract = require('../../validators/validator');

class CreateProductContract {

    static validate(req, res, next) {
        const contract = new ValidationContract();
        contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
        contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
        contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

        if(!contract.isValid())
            res.status(400).send(Result.fail(contract.errors()));
        else
            next();
    }
}

module.exports = CreateProductContract;

