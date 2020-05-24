"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.windguru = void 0;
const extract_data_1 = __importDefault(require("./partials/extract-data"));
const parser_1 = __importDefault(require("./partials/parser"));
const utils_1 = __importDefault(require("./partials/utils"));
async function windguru(spot) {
    if (!spot)
        throw new Error('No spot number specified!');
    if (typeof spot !== 'number' && typeof spot !== 'string')
        throw new TypeError('Spotnumber must be a number or a string!');
    const url = utils_1.default.createRequestUrl(spot);
    try {
        const res = await fetch(url);
        const html = await res.text();
        const extractedData = extract_data_1.default.windguruData(html);
        const data = parser_1.default.windguru(extractedData);
        return data;
    }
    catch (err) {
        throw err;
    }
}
exports.windguru = windguru;
