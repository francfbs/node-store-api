'use strict';

const Result = require('../../controllers/result');
const ValidationContract = require('../../validators/validator');

class AuthenticateContract {

    static validate(req, res, next) {
        const contract = new ValidationContract();
        contract.isEmail(req.body.email, 'Email inválido');
        contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');

        if(!contract.isValid())
            res.status(400).send(Result.fail(contract.errors()));
        else
            next();
    }
}

module.exports = AuthenticateContract;

