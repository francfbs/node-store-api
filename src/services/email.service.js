'use strict';

var config = require('../config');
var sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'hello@fbs.io',
        subject: subject,
        html: body
    })
}