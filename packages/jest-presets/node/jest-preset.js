"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    roots: ["<rootDir>"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    modulePathIgnorePatterns: [
        "<rootDir>/test/__fixtures__",
        "<rootDir>/node_modules",
        "<rootDir>/dist",
    ],
    preset: "ts-jest",
};
exports.default = config;
