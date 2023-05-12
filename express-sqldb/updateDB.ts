import axios from "axios";
import { questionType, apiQuestionType } from "./src/types/tableTyes";
import query from "./src/models/query";
import { readFile } from 'fs';

const params: any = {}

for (let i = 2; i < process.argv.length; i++) {
    const paramKey = process.argv[i].split('=')[0];
    const paramValue = process.argv[i].split('=')[1];
    params[paramKey] = paramValue
}

function escapeSingleQuotes(str: string): string {
    return str.replace(/'/g, "''");
}

const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AccessToken': params.token
    }
};

const questionToInsert = (item: apiQuestionType): questionType => ({
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
})

const subjectToInsert = (item: string) => ({
    name: item
})

const userToInsert = () => ({
    name: 'Ugege Daniel',
    email: 'admin@jakk.com',
    password: '$2a$05$C3HaM4ywB6apzQocypzUCeLpehXPvfU.4AvJlDLY8ExUDpzi1aRBC',
    role_id: '04d0a1fc-493e-4e94-a6f1-7e5859ca5783',
})

const updateQuestionTable = async (data: apiQuestionType[], tableName: string) => {
    const queryStrings: string[] = [];
    data.forEach((item: apiQuestionType) => {
        const itemsToInsert = questionToInsert(item);
        const values = `${[...Object.values(itemsToInsert)].join("', '")}`;
        const columnNames = [`${tableName}_uid`, ...Object.keys(itemsToInsert)];
        const queryString = `
        INSERT INTO ${tableName} 
        (${columnNames})
        VALUES (uuid_generate_v4(), '${values}');`;
        queryStrings.push(queryString);
    })

    const insertionQueryString = queryStrings.join('');
    const queryResponse = await query(insertionQueryString);
    console.log(queryResponse);
}

const getFileData = (year: string) => {
    readFile(`./logs/${params.subject}-${year}.json`, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading JSON file: ${err}`);
            return;
        }
        const jsonData = JSON.parse(data);
        jsonData.data.length > 0 && updateQuestionTable(jsonData.data, 'questions')
    });
};

!params.remote && getFileData(params.year)

const requestData = async () => {
    const { subject, year } = params;
    const url = `https://questions.aloc.com.ng/api/v2/q/40?subject=${subject}&year=${year}&type=utme`
    // const subjectUrl = 'https://questions.aloc.com.ng/api/metrics/list-subjects';
    try {
        const { data } = await axios.get(url, config);
        const responseData = await data
        responseData.data.length > 0 && updateQuestionTable(responseData.data, 'questions')
    } catch (err) {
        console.log({ err })
        return { responseData: null, err }
    }
}

params.remote && requestData();

type ObjectType = {
    'physics': [2006, 2007, 2009, 2010, 2011, 2012],
    'commerce': [1900, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2016],
    'accounting': [1997, 2004, 2006, 2007, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
    'englishlit': [2006, 2007, 2008, 2009, 2010, 2012, 2013, 2015],
    'government': [1999, 2006, 2007, 2008, 2009, 2000, 2010, 2011, 2012, 2013, 2016],
    'crk': [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2015],
    'geography': [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
    'economics': [2001, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013],
    'irk': [2012],
    'civiledu': [2011, 2012, 2013, 2014, 2015, 2016],
    'insurance': [2014, 2015],
    'currentaffairs': [2013],
    'history': [2013]

}

type subjectIdsType = {
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
}

const availableYears: ObjectType = {
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
}

const subjectIds: subjectIdsType = {
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
}

// const updateDBwithRespnse: string[] = [];

// Object.keys(availableYears).forEach((subject: string) => {
//     availableYears[subject as keyof ObjectType].forEach((year: number) => {
//         const singleScript = `node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=${subject} subjectId=${subjectIds[subject as keyof subjectIdsType]} year=${year} remote=true &&`
//         updateDBwithRespnse.push(singleScript);
//     })
// })

// console.log(updateDBwithRespnse.join(''));

'tsc updateDB.ts && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=english subjectId=b12dee06-a1eb-40aa-a436-42659b27e9b0 year=2003 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=english subjectId=b12dee06-a1eb-40aa-a436-42659b27e9b0 year=2004 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=english subjectId=b12dee06-a1eb-40aa-a436-42659b27e9b0 year=2005 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=english subjectId=b12dee06-a1eb-40aa-a436-42659b27e9b0 year=2006 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=english subjectId=b12dee06-a1eb-40aa-a436-42659b27e9b0 year=2007 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=english subjectId=b12dee06-a1eb-40aa-a436-42659b27e9b0 year=2008 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=english subjectId=b12dee06-a1eb-40aa-a436-42659b27e9b0 year=2009 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=english subjectId=b12dee06-a1eb-40aa-a436-42659b27e9b0 year=2010 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=biology subjectId=68863a84-5649-410f-9269-9c62c2bed57e year=2003 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=biology subjectId=68863a84-5649-410f-9269-9c62c2bed57e year=2004 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=biology subjectId=68863a84-5649-410f-9269-9c62c2bed57e year=2005 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=biology subjectId=68863a84-5649-410f-9269-9c62c2bed57e year=2006 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=biology subjectId=68863a84-5649-410f-9269-9c62c2bed57e year=2009 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=biology subjectId=68863a84-5649-410f-9269-9c62c2bed57e year=2010 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=biology subjectId=68863a84-5649-410f-9269-9c62c2bed57e year=2011 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=biology subjectId=68863a84-5649-410f-9269-9c62c2bed57e year=2012 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=mathematics subjectId=afc4eb1a-7c28-465d-b022-e52081bb2da7 year=2006 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=mathematics subjectId=afc4eb1a-7c28-465d-b022-e52081bb2da7 year=2007 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=mathematics subjectId=afc4eb1a-7c28-465d-b022-e52081bb2da7 year=2008 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=mathematics subjectId=afc4eb1a-7c28-465d-b022-e52081bb2da7 year=2009 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=mathematics subjectId=afc4eb1a-7c28-465d-b022-e52081bb2da7 year=2013 && node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=physics subjectId=7d78222d-5edd-4755-a1f9-3ceee7406839 year=2006 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=physics subjectId=7d78222d-5edd-4755-a1f9-3ceee7406839 year=2007 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=physics subjectId=7d78222d-5edd-4755-a1f9-3ceee7406839 year=2009 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=physics subjectId=7d78222d-5edd-4755-a1f9-3ceee7406839 year=2010 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=physics subjectId=7d78222d-5edd-4755-a1f9-3ceee7406839 year=2011 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=physics subjectId=7d78222d-5edd-4755-a1f9-3ceee7406839 year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=1900 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2000 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2001 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2002 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2003 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2004 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2005 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2006 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2007 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2008 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2009 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2010 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2011 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=commerce subjectId=4f047644-f623-4388-a2e0-021a3ba56145 year=2016 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=1997 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2004 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2006 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2007 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2009 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2010 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2011 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2014 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2015 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=accounting subjectId=b0cb168c-d2f0-422c-9941-1b0a1adbf154 year=2016 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=englishlit subjectId=126b87d9-ea40-45d4-9556-06990fede8af year=2006 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=englishlit subjectId=126b87d9-ea40-45d4-9556-06990fede8af year=2007 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=englishlit subjectId=126b87d9-ea40-45d4-9556-06990fede8af year=2008 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=englishlit subjectId=126b87d9-ea40-45d4-9556-06990fede8af year=2009 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=englishlit subjectId=126b87d9-ea40-45d4-9556-06990fede8af year=2010 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=englishlit subjectId=126b87d9-ea40-45d4-9556-06990fede8af year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=englishlit subjectId=126b87d9-ea40-45d4-9556-06990fede8af year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=englishlit subjectId=126b87d9-ea40-45d4-9556-06990fede8af year=2015 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=1999 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2006 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2007 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2008 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2009 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2000 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2010 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2011 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=government subjectId=134cec6c-832a-4c4f-ab4f-040384cdfa4a year=2016 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2005 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2006 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2007 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2008 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2009 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2010 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2011 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=crk subjectId=b7d2436-c306-4a37-9247-7a90da3e54b6 year=2015 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2006 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2007 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2008 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2009 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2010 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2011 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=geography subjectId=11b3dd6b-ead6-4caa-beec-f52f5c6c59f3 year=2014 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2001 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2003 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2004 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2005 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2006 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2007 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2008 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2009 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2010 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2011 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=economics subjectId=b22c651f-ecb4-4913-b49f-0c2a5bfa3794 year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=irk subjectId=d34793de-56d0-4d3d-b797-2449be7152b5 year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=civiledu subjectId=bb7d4e87-d1a8-461f-9f9d-912685ff84c6 year=2011 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=civiledu subjectId=bb7d4e87-d1a8-461f-9f9d-912685ff84c6 year=2012 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=civiledu subjectId=bb7d4e87-d1a8-461f-9f9d-912685ff84c6 year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=civiledu subjectId=bb7d4e87-d1a8-461f-9f9d-912685ff84c6 year=2014 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=civiledu subjectId=bb7d4e87-d1a8-461f-9f9d-912685ff84c6 year=2015 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=civiledu subjectId=bb7d4e87-d1a8-461f-9f9d-912685ff84c6 year=2016 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=insurance subjectId=4e638c6d-81b9-4aa1-aa7d-db560c9418e0 year=2014 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=insurance subjectId=4e638c6d-81b9-4aa1-aa7d-db560c9418e0 year=2015 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=currentaffairs subjectId=5c7c1fc3-37a3-4232-ba47-acfa873f88cb year=2013 remote=true &&node updateDB.js token=ALOC-f15030f207dd9c1ca70f subject=history subjectId=8490f23e-37fb-4e16-84dd-51d099f780a5 year=2013 remote=true'