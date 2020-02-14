'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer.controller');
const authService = require('../services/auth.service');
const authenticateContract = require('../models/contracts/authenticate.contract');
const createContract = require('../models/contracts/create-customer.contract');

router.post('/', createContract.validate, controller.post);
router.post('/authenticate', authenticateContract.validate, controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);

module.exports = router;