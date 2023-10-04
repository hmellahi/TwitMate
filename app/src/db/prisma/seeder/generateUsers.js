"use strict";
// import { User } from "./types/User";
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
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var fs_1 = require("fs");
var path_1 = require("path");
var upload_images_ts_1 = require("../../../lib/upload-images.ts");
// const { User } = require("./types/User");
var prepareRandomUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var currentDir, filePath, data, users, selectedUsers, creationPromises;
    return __generator(this, function (_a) {
        currentDir = __dirname;
        filePath = path_1.default.join(currentDir, "./data/users.json");
        data = fs_1.default.readFileSync(filePath, "utf-8");
        users = JSON.parse(data).results;
        selectedUsers = users.slice(0, 2);
        creationPromises = selectedUsers.map(function (user) { return __awaiter(void 0, void 0, void 0, function () {
            var name, _a, city, country, gender, imgLink, UploadedImages, _b, userLocation, generatedUser;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        name = user.name, _a = user.location, city = _a.city, country = _a.country, gender = user.gender;
                        imgLink = user.picture.large;
                        _b = "wtf";
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, upload_images_ts_1.default)([imgLink])];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        UploadedImages = _b;
                        userLocation = "".concat(city, ", ").concat(country);
                        generatedUser = {
                            username: user.login.username,
                            name: "".concat(name.first, " ").concat(name.last),
                            image: UploadedImages[0],
                            isFake: true,
                            onboarded: true,
                            bio: faker_1.faker.person.bio(),
                            location: userLocation,
                            gender: gender,
                        };
                        return [2 /*return*/, generatedUser];
                }
            });
        }); });
        return [2 /*return*/, Promise.all(creationPromises)];
    });
}); };
var saveUsers = function (users) { return __awaiter(void 0, void 0, void 0, function () {
    var result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 5]);
                return [4 /*yield*/, prisma.user.createMany({
                        data: users,
                        skipDuplicates: true, // Skip duplicates (if applicable)
                    })];
            case 1:
                result = _a.sent();
                console.log("Created ".concat(result.count, " users in the database."));
                return [3 /*break*/, 5];
            case 2:
                e_1 = _a.sent();
                console.error("Error saving users to the database:", e_1.message);
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var generateUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                users = prepareRandomUsers();
                console.log(users);
                return [4 /*yield*/, saveUsers(users)];
            case 1:
                _a.sent();
                console.log("Finished generatating users.");
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.error("Error reading or parsing users.json:", e_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = generateUsers;
