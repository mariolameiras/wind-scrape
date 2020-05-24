"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("./utils"));
function windguru(extractedData) {
    // Group the data by day
    const models = extractedData.models.map(model => {
        const days = [];
        let currentDay = '';
        let count = -1;
        // Group the data by hour
        model.data.forEach(modelData => {
            const parsedDate = utils_1.default.windguru.getDate(modelData.date);
            if (currentDay !== parsedDate) {
                currentDay = parsedDate;
                count++;
                days[count] = {
                    date: parsedDate,
                    hours: []
                };
            }
            modelData.hour = utils_1.default.windguru.getHour(modelData.date);
            delete modelData.date;
            days[count].hours.push(modelData);
        });
        return {
            name: model.name,
            days
        };
    });
    return {
        spot: extractedData.spot,
        models
    };
}
exports.default = {
    windguru
};
