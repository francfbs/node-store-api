'use strict';

const ValidationContract = require('../../validators/validator');
const Result = require('../../controllers/result');

class CreateCustomerContract {

    static validate(req, res, next) {
        
        const contract = new ValidationContract();
        contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
        contract.isEmail(req.body.email, 'Email inválido');
        contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');

        if(!contract.isValid())
            res.status(400).send(Result.fail(contract.errors()));
        else
            next();
    }
}

module.exports = CreateCustomerContract;

