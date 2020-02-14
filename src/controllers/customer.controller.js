'use strict';

const Result = require('../controllers/result');
const repository = require('../repositories/customer.repo');
const md5 = require('md5');
const emailService = require('../services/email.service');
const authService = require('../services/auth.service');

exports.post = async (req, res, next) => {
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ["user"]
        });

        emailService.send(
            req.body.email,
            'Bem vindo ao App Teste',
            global.EMAIL_TMPL.replace('{0}', req.body.name)
        );

        res.status(201).send(Result.ok());
    } catch (e) { next(e); }
};

exports.authenticate = async (req, res, next) => {
    try {
        const user = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });
        if(!user) {
            res.status(400).send(Result.fail("Usuário ou senha inválidos"));
            return;
        }
        const token = await authService.generateToken({ id: user._id, email: user.email, name: user.name, roles: user.roles });
        res.status(201).send(Result.ok({ token: token, user: user }));
    } catch (e) { next(e); }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const token = await authService.decodeToken(req);
        const user = await repository.getById(token.id);
        if(!user) {
            res.status(400).send(Result.fail("Cliente não encontrado"));
            return;
        }

        const refreshedToken = await authService.generateToken({ id: user._id, email: user.email, name: user.name, roles: user.roles });
        res.status(201).send(Result.ok({ token: refreshedToken, user: user }));
    } catch (e) { next(e); }
};