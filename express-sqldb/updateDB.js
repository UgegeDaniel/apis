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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var query_1 = require("./src/models/query");
var fs_1 = require("fs");
var params = {};
for (var i = 2; i < process.argv.length; i++) {
    var paramKey = process.argv[i].split('=')[0];
    var paramValue = process.argv[i].split('=')[1];
    params[paramKey] = paramValue;
}
function escapeSingleQuotes(str) {
    return str.replace(/'/g, "''");
}
var config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AccessToken': params.token
    }
};
var questionToInsert = function (item) { return ({
    examYear: item.examyear,
    question: escapeSingleQuotes(item.question),
    section: escapeSingleQuotes(item.section),
    image: escapeSingleQuotes(item.image),
    optiona: escapeSingleQuotes(item.option.a),
    optionb: escapeSingleQuotes(item.option.b),
    optionc: escapeSingleQuotes(item.option.c),
    optiond: escapeSingleQuotes(item.option.d),
    optione: escapeSingleQuotes(item.option.e),
    answer: escapeSingleQuotes(item.answer),
    subjectId: params.subjectId,
    contributor_id: 'c9f3aae1-149e-48eb-a61b-48ee2a13e454',
    examType: escapeSingleQuotes(item.examtype),
}); };
var subjectToInsert = function (item) { return ({
    name: item
}); };
var userToInsert = function () { return ({
    name: 'Ugege Daniel',
    email: 'admin@jakk.com',
    password: '$2a$05$C3HaM4ywB6apzQocypzUCeLpehXPvfU.4AvJlDLY8ExUDpzi1aRBC',
    role_id: '04d0a1fc-493e-4e94-a6f1-7e5859ca5783',
}); };
var updateQuestionTable = function (data, tableName) { return __awaiter(void 0, void 0, void 0, function () {
    var queryStrings, insertionQueryString, queryResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryStrings = [];
                data.forEach(function (item) {
                    var itemsToInsert = questionToInsert(item);
                    var values = "".concat(__spreadArray([], Object.values(itemsToInsert), true).join("', '"));
                    var columnNames = __spreadArray(["".concat(tableName, "_uid")], Object.keys(itemsToInsert), true);
                    var queryString = "\n        INSERT INTO ".concat(tableName, " \n        (").concat(columnNames, ")\n        VALUES (uuid_generate_v4(), '").concat(values, "');");
                    queryStrings.push(queryString);
                });
                insertionQueryString = queryStrings.join('');
                return [4 /*yield*/, (0, query_1.default)(insertionQueryString)];
            case 1:
                queryResponse = _a.sent();
                console.log(queryResponse);
                return [2 /*return*/];
        }
    });
}); };
var getFileData = function (year) {
    (0, fs_1.readFile)("./logs/".concat(params.subject, "-").concat(year, ".json"), 'utf8', function (err, data) {
        if (err) {
            console.error("Error reading JSON file: ".concat(err));
            return;
        }
        var jsonData = JSON.parse(data);
        jsonData.data.length > 0 && updateQuestionTable(jsonData.data, 'questions');
    });
};
!params.remote && getFileData(params.year);
var requestData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var subject, year, url, data, responseData, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                subject = params.subject, year = params.year;
                url = "https://questions.aloc.com.ng/api/v2/q/40?subject=".concat(subject, "&year=").concat(year, "&type=utme");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, axios_1.default.get(url, config)];
            case 2:
                data = (_a.sent()).data;
                return [4 /*yield*/, data];
            case 3:
                responseData = _a.sent();
                responseData.data.length > 0 && updateQuestionTable(responseData.data, 'questions');
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.log({ err: err_1 });
                return [2 /*return*/, { responseData: null, err: err_1 }];
            case 5: return [2 /*return*/];
        }
    });
}); };
params.remote && requestData();
var availableYears = {
    physics: [2006, 2007, 2009, 2010, 2011, 2012],
    commerce: [1900, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2016],
    accounting: [1997, 2004, 2006, 2007, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
    englishlit: [2006, 2007, 2008, 2009, 2010, 2012, 2013, 2015],
    government: [1999, 2006, 2007, 2008, 2009, 2000, 2010, 2011, 2012, 2013, 2016],
    crk: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2015],
    geography: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
    economics: [2001, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013],
    irk: [2012],
    civiledu: [2011, 2012, 2013, 2014, 2015, 2016],
    insurance: [2014, 2015],
    currentaffairs: [2013],
    history: [2013],
};
var subjectIds = {
    english: 'b12dee06-a1eb-40aa-a436-42659b27e9b0',
    mathematics: 'afc4eb1a-7c28-465d-b022-e52081bb2da7',
    commerce: '4f047644-f623-4388-a2e0-021a3ba56145',
    accounting: 'b0cb168c-d2f0-422c-9941-1b0a1adbf154',
    biology: '68863a84-5649-410f-9269-9c62c2bed57e',
    physics: '7d78222d-5edd-4755-a1f9-3ceee7406839',
    chemistry: '6327c9a9-19da-4b8b-b444-44ed91167d17',
    englishlit: '126b87d9-ea40-45d4-9556-06990fede8af',
    government: '134cec6c-832a-4c4f-ab4f-040384cdfa4a',
    crk: 'b7d2436-c306-4a37-9247-7a90da3e54b6',
    geography: '11b3dd6b-ead6-4caa-beec-f52f5c6c59f3',
    economics: 'b22c651f-ecb4-4913-b49f-0c2a5bfa3794',
    irk: 'd34793de-56d0-4d3d-b797-2449be7152b5',
    civiledu: 'bb7d4e87-d1a8-461f-9f9d-912685ff84c6',
    insurance: '4e638c6d-81b9-4aa1-aa7d-db560c9418e0',
    currentaffairs: '5c7c1fc3-37a3-4232-ba47-acfa873f88cb',
    history: '8490f23e-37fb-4e16-84dd-51d099f780a5'
};
// const updateDBwithRespnse: string[] = [];
// Object.keys(availableYears).forEach((subject: string) => {
//     availableYears[subject as keyof ObjectType].forEach((year: number) => {
//         const singleScript = `node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=${subject} subjectId=${subjectIds[subject as keyof subjectIdsType]} year=${year} remote=true &&`
//         updateDBwithRespnse.push(singleScript);
//     })
// })
// console.log(updateDBwithRespnse.join(''));
'tsc updateDB.ts && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=english subjectId=b12dee06-a1eb-40aa-a436-42659b27e9b0 year=2003 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=english subjectId=b12dee06-a1eb-40aa-a436-42659b27e9b0 year=2004 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=english subjectId=b12dee06-a1eb-40aa-a436-42659b27e9b0 year=2005 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=english subjectId=b12dee06-a1eb-40aa-a436-42659b27e9b0 year=2006 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=english subjectId=b12dee06-a1eb-40aa-a436-42659b27e9b0 year=2007 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=english subjectId=b12dee06-a1eb-40aa-a436-42659b27e9b0 year=2008 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=english subjectId=b12dee06-a1eb-40aa-a436-42659b27e9b0 year=2009 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=english subjectId=b12dee06-a1eb-40aa-a436-42659b27e9b0 year=2010 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=biology subjectId=68863a84-5649-410f-9269-9c62c2bed57e year=2003 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=biology subjectId=68863a84-5649-410f-9269-9c62c2bed57e year=2004 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=biology subjectId=68863a84-5649-410f-9269-9c62c2bed57e year=2005 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=biology subjectId=68863a84-5649-410f-9269-9c62c2bed57e year=2006 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=biology subjectId=68863a84-5649-410f-9269-9c62c2bed57e year=2009 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=biology subjectId=68863a84-5649-410f-9269-9c62c2bed57e year=2010 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=biology subjectId=68863a84-5649-410f-9269-9c62c2bed57e year=2011 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=biology subjectId=68863a84-5649-410f-9269-9c62c2bed57e year=2012 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=mathematics subjectId=afc4eb1a-7c28-465d-b022-e52081bb2da7 year=2006 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=mathematics subjectId=afc4eb1a-7c28-465d-b022-e52081bb2da7 year=2007 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=mathematics subjectId=afc4eb1a-7c28-465d-b022-e52081bb2da7 year=2008 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=mathematics subjectId=afc4eb1a-7c28-465d-b022-e52081bb2da7 year=2009 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=mathematics subjectId=afc4eb1a-7c28-465d-b022-e52081bb2da7 year=2013 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=physics subjectId=7d78222d-5edd-4755-a1f9-3ceee7406839 year=2006 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=physics subjectId=7d78222d-5edd-4755-a1f9-3ceee7406839 year=2007 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=physics subjectId=7d78222d-5edd-4755-a1f9-3ceee7406839 year=2009 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=physics subjectId=7d78222d-5edd-4755-a1f9-3ceee7406839 year=2010 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=physics subjectId=7d78222d-5edd-4755-a1f9-3ceee7406839 year=2011 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=physics subjectId=7d78222d-5edd-4755-a1f9-3ceee7406839 year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=1900 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2000 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2001 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2002 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2003 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2004 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2005 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2006 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2007 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2008 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2009 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2010 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2011 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2016 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=1997 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2004 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2006 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2007 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2009 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2010 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2011 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2014 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2015 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2016 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=englishlit subjectId=126b87d9-ea40-45d4-9556-06990fede8af year=2006 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=englishlit subjectId=126b87d9-ea40-45d4-9556-06990fede8af year=2007 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=englishlit subjectId=126b87d9-ea40-45d4-9556-06990fede8af year=2008 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=englishlit subjectId=126b87d9-ea40-45d4-9556-06990fede8af year=2009 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=englishlit subjectId=126b87d9-ea40-45d4-9556-06990fede8af year=2010 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=englishlit subjectId=126b87d9-ea40-45d4-9556-06990fede8af year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=englishlit subjectId=126b87d9-ea40-45d4-9556-06990fede8af year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=englishlit subjectId=126b87d9-ea40-45d4-9556-06990fede8af year=2015 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=1999 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2006 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2007 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2008 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2009 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2000 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2010 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2011 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2016 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2005 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2006 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2007 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2008 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2009 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2010 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2011 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2015 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2006 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2007 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2008 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2009 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2010 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2011 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2014 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2001 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2003 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2004 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2005 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2006 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2007 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2008 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2009 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2010 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2011 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=irk subjectId=d34793de-56d0-4d3d-b797-2449be7152b5 year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=civiledu subjectId=bb7d4e87-d1a8-461f-9f9d-912685ff84c6 year=2011 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=civiledu subjectId=bb7d4e87-d1a8-461f-9f9d-912685ff84c6 year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=civiledu subjectId=bb7d4e87-d1a8-461f-9f9d-912685ff84c6 year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=civiledu subjectId=bb7d4e87-d1a8-461f-9f9d-912685ff84c6 year=2014 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=civiledu subjectId=bb7d4e87-d1a8-461f-9f9d-912685ff84c6 year=2015 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=civiledu subjectId=bb7d4e87-d1a8-461f-9f9d-912685ff84c6 year=2016 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=insurance subjectId=4e638c6d-81b9-4aa1-aa7d-db560c9418e0 year=2014 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=insurance subjectId=4e638c6d-81b9-4aa1-aa7d-db560c9418e0 year=2015 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=currentaffairs subjectId=5c7c1fc3-37a3-4232-ba47-acfa873f88cb year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=history subjectId=8490f23e-37fb-4e16-84dd-51d099f780a5 year=2013 remote=true';
