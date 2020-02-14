'use strict';

let errors = [];

class ValidationContract {
    constructor() {
        errors = [];
    }
    isRequired(value, message) {
        if (!value || value.length <= 0)
        errors.push(message);
    }
    hasMinLen(value, min, message) {
        if (!value || value.length < min)
        errors.push(message);
    }
    hasMaxLen(value, max, message) {
        if (!value || value.length > max)
        errors.push(message);
    }
    isFixedLen(value, len, message) {
        if (value.length != len)
        errors.push(message);
    }
    isEmail(value, message) {
        var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if (!reg.test(value))
        errors.push(message);
    }
    errors() {
        return errors;
    }
    clear() {
        errors = [];
    }
    isValid() {
        return errors.length == 0;
    }
}

module.exports = ValidationContract;