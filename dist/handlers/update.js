"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deleteUpdate = exports.updateUpdate = exports.createUpdate = exports.getUpdates = exports.getOneUpdate = void 0;
var db_1 = __importDefault(require("../db"));
//get one
var getOneUpdate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var update;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1["default"].update.findUnique({
                    where: {
                        id: req.params.id
                    }
                })];
            case 1:
                update = _a.sent();
                res.json({ data: update });
                return [2 /*return*/];
        }
    });
}); };
exports.getOneUpdate = getOneUpdate;
//get all
var getUpdates = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, updates;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1["default"].product.findMany({
                    where: {
                        belongsToId: req.user.id
                    },
                    include: {
                        updates: true
                    }
                })];
            case 1:
                products = _a.sent();
                updates = products.reduce(function (allUpdates, products) { return __spreadArray(__spreadArray([], allUpdates, true), products.updates, true); }, []);
                res.json({ data: updates });
                return [2 /*return*/];
        }
    });
}); };
exports.getUpdates = getUpdates;
//create
var createUpdate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, update;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1["default"].product.findUnique({
                    where: {
                        id: req.body.productId
                    }
                })];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.json({ message: 'nope' })];
                }
                return [4 /*yield*/, db_1["default"].update.create({
                        data: {
                            title: req.body.title,
                            body: req.body.body,
                            product: { connect: { id: product.id } }
                        }
                    })];
            case 2:
                update = _a.sent();
                res.json({ data: update });
                return [2 /*return*/];
        }
    });
}); };
exports.createUpdate = createUpdate;
//update
var updateUpdate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, updates, match, updatedUpdate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1["default"].product.findMany({
                    where: {
                        belongsToId: req.user.id
                    },
                    include: {
                        updates: true
                    }
                })];
            case 1:
                products = _a.sent();
                updates = products.reduce(function (allUpdates, products) { return __spreadArray(__spreadArray([], allUpdates, true), products.updates, true); }, []);
                match = updates.find(function (update) { return update.id === req.params.id; });
                if (!match) {
                    return [2 /*return*/, res.json({ message: 'nope' })];
                }
                return [4 /*yield*/, db_1["default"].update.update({
                        where: {
                            id: req.params.id
                        },
                        data: req.body
                    })];
            case 2:
                updatedUpdate = _a.sent();
                res.json({ data: updatedUpdate });
                return [2 /*return*/];
        }
    });
}); };
exports.updateUpdate = updateUpdate;
var deleteUpdate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, updates, match, deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1["default"].product.findMany({
                    where: {
                        belongsToId: req.user.id
                    },
                    include: {
                        updates: true
                    }
                })];
            case 1:
                products = _a.sent();
                updates = products.reduce(function (allUpdates, products) { return __spreadArray(__spreadArray([], allUpdates, true), products.updates, true); }, []);
                match = updates.find(function (update) { return update.id === req.params.id; });
                if (!match) {
                    return [2 /*return*/, res.json({ message: 'nope' })];
                }
                return [4 /*yield*/, db_1["default"].update["delete"]({
                        where: {
                            id: req.params.id
                        }
                    })];
            case 2:
                deleted = _a.sent();
                res.json({ data: deleted });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteUpdate = deleteUpdate;
//# sourceMappingURL=update.js.map