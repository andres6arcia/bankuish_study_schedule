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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = __importDefault(require("../configurations"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const index_route_1 = __importDefault(require("./Routes/index.route"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.initialize();
    }
    getApp() {
        return this.app;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.configuration();
            yield this.routes();
            yield this.start();
        });
    }
    configuration() {
        return __awaiter(this, void 0, void 0, function* () {
            // Settings
            this.app.set(configurations_1.default.SERVER.SETTINGS.PROPERTY_PORT, configurations_1.default.SERVER.SETTINGS.PORT);
            // Middlewares
            this.app.use((0, morgan_1.default)(configurations_1.default.SERVER.SETTINGS.MORGAN_SETTINGS));
            this.app.use(express_1.default.json());
        });
    }
    routes() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(index_route_1.default);
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get(configurations_1.default.SERVER.SETTINGS.PROPERTY_PORT));
            console.log(configurations_1.default.SERVER.MESSAGES.SERVER_ON, this.app.get(configurations_1.default.SERVER.SETTINGS.PROPERTY_PORT));
        });
    }
}
exports.default = Server;
