"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
/*Morgan is an HTTP request level Middleware. It is a great tool that logs the requests along with some other information depending upon its configuration and the preset used. It proves to be very helpful while debugging and also if you want to create Log files.
 */
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var auth_1 = require("./modules/auth");
var user_1 = require("./handlers/user");
var app = (0, express_1["default"])();
//app.use() takes in a middleware;
app.use((0, cors_1["default"])());
app.use((0, morgan_1["default"])('dev'));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
//custom middleware; a function that returns a function;
var customLogger = function (middlewareName) { return function (req, res, next) {
    console.log("hello from middleware ".concat(middlewareName));
    next();
}; };
// app.use(customLogger('customLogger'));
/* catch asynchronous error
 ** explicitly tell express that there's an error by wrapping the error with next();
 ** so that it can trigger the error handler down there
 */
app.get('/', function (req, res, next) {
    // setTimeout(() => {
    // 	next(new Error('hello'));
    // }, 1);
    res.json({ message: 'hello' });
});
app.use('/api', auth_1.protect, router_1["default"]);
app.post('/user', user_1.createNewUser);
app.post('/signin', user_1.signin);
//synchronous error handling
app.use(function (err, req, res, next) {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'unauthorized' });
    }
    else if (err.type === 'input') {
        res.status(400).json({ message: 'invalid input' });
    }
    else {
        res.status(500).json({ message: 'oops thats on us' });
    }
});
exports["default"] = app;
//# sourceMappingURL=server.js.map