"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.protect = exports.createJWT = exports.hashPassword = exports.comparePasswords = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var comparePasswords = function (password, hash) {
    return bcrypt_1["default"].compare(password, hash);
};
exports.comparePasswords = comparePasswords;
var hashPassword = function (password) {
    var salt = 5;
    return bcrypt_1["default"].hash(password, salt);
};
exports.hashPassword = hashPassword;
var createJWT = function (user) {
    var token = jsonwebtoken_1["default"].sign({
        id: user.id,
        name: user.name
    }, process.env.JWT_SECRET);
    return token;
};
exports.createJWT = createJWT;
var protect = function (req, res, next) {
    var bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401);
        res.json({ message: 'not authorized' });
        return;
    }
    var _a = bearer.split(' '), _ = _a[0], token = _a[1];
    if (!token) {
        res.status(401);
        res.json({ message: 'not valid token' });
        return;
    }
    try {
        var user = jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (e) {
        console.error(e.message);
        res.status(401);
        res.json({ message: 'not valid token' });
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map