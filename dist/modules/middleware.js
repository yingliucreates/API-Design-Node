"use strict";
exports.__esModule = true;
exports.handleInputErrors = void 0;
var express_validator_1 = require("express-validator");
var handleInputErrors = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.handleInputErrors = handleInputErrors;
//# sourceMappingURL=middleware.js.map