## Routes

The project defines the following routes for API endpoints:

### Axios Setup

```ts
import axios from 'axios';

const baseUrl = 'http://localhost:5000';
const token = 'Bearer example-token';
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const getRequestHandler = async (endpoint: string) => {
  const reqUrl = `${baseUrl}${endpoint}`;
  try {
    const response = await axios.get(reqUrl, config);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const postRequestHandler = async (reqParams: {
  endpoint: string;
  body: {};
}) => {
  const { endpoint, body } = reqParams;
  const reqUrl = `${baseUrl}${endpoint}`;
  try {
    const response = await axios.post(reqUrl, body, config);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
```

### Sign up: POST /api/users/signup

Endpoint for user registration. Accepts user details and creates a new user account.

**Example Request**

```ts
const user = await postRequestHandler({
  endpoint: '/api/users/signup',
  body: {
    email: 'example@example.com',
    name: 'Example User',
    password: 'password123',
  },
});
```

**Example Response**

```json
{
  "succes": true,
  "user": {
    "email": "example@example.com",
    "name": "Example User",
    "verified": false
  },
  "token": "example-token"
}
```

### Sign in: POST /users/signin

Endpoint for user login. Validates user credentials and provides an access token for authenticated requests.

**Example Request**

```ts
const user = await postRequestHandler({
  endpoint: '/api/users/signin',
  body: {
    email: 'example@example.com',
    password: 'password123',
  },
});
```

**Example Response**

```json
{
  "succes": true,
  "user": {
    "email": "example@example.com",
    "name": "Example User",
    "verified": false
  },
  "token": "example-token"
}
```

### Verify Email: POST /api/users/signup/verifyEmail

Endpoint for verifying a user's email address. Users click on the email verification link received in their emails during signup to activate their accounts.

**Example Request**

```ts
const user = await postRequestHandler({
  endpoint: '/api/users/signup/verifyEmail',
  body: {
    ref: 'example reference',
  },
});
```

**Example Response**

```json
{
  "succes": true,
  "user": {
    "email": "example@example.com",
    "name": "Example User",
    "verified": true
  },
  "token": "example-token"
}
```

### Resend Email: GET /api/users/signup/resendEmail

Endpoint for resending the verification email to a user who has not yet verified their email address.

**Example Request**

```ts
const user = await getRequestHandler({
  endpoint: '/api/users/signup/resendEmail',
});
```

**Example Response**

```json
{
  "succes": true,
  "user": {
    "email": "example@example.com",
    "name": "Example User",
    "verified": false
  },
  "token": "example-token"
}
```

### Get Student Score: GET /api/users/history

Endpoint for retrieving a student's history by their unique identifier.
**Example Request**

```ts
const user = await getRequestHandler({
  endpoint: '/api/users/history',
});
```

**Example Response**

```json
{
  "succes": true,
  "history": [
    {
      "time_of_test": "time of saving in milliseconds",
      "score": "30.34",
      "year": "2003",
      "subject": "english"
    },
    {
      "time_of_test": "time of saving in milliseconds",
      "score": "75.34",
      "year": "2013",
      "subject": "biology"
    }
  ],
  "token": "example-token"
}
```

### Save Student Score: POST /api/score/save

Endpoint for saving a student's score. Accepts the student's score data and stores it in the database.
**Example Request**

```ts
const user = await postRequestHandler({
  endpoint: '/api/users/signup',
  body: {
    subjectId: 'example-subjectId',
    score: '30.34',
    year: '2003',
  },
});
```

**Example Response**

```json
{
  "success": true
}
```

### Add Subject (Admin): POST /api/subjects/new

Endpoint for adding a new subject to the system. This route is accessible only to administrators.
**Example Request**

```ts
const user = await getRequestHandler({
  endpoint: '/api/subjects/new',
});
```

**Example Response**

```json
{
  "success": true
}
```

### Get All Subjects: GET /api/subjects

Endpoint for adding a new subject to the system. This route is accessible only to administrators.

**Example Request**

```ts
const user = await getRequestHandler({
  endpoint: '/api/subjects',
});
```

**Example Response**

```json
{
  "success": true,
  "subjects": [
    {
      "subjects_uid": "example id",
      "name": "example subject"
    },
    {
      "subjects_uid": "example id",
      "name": "example subject"
    }
  ]
}
```

### Get Available Years: POST /api/questions/availableyears

Endpoint for adding a new subject to the system. This route is accessible only to administrators.

**Example Request**

```ts
const user = await postRequestHandler({
  endpoint: '/api/questions/availableyears',
  body: {
    subjectId: 'example id',
  },
});
```

**Example Response**

```json
{
  "success": true,
  "years": [2003, 2004, 2005],
  "token": "example-token"
}
```

### Add new Question: POST /api/questions/new

Endpoint for adding a new subject to the system. This route is accessible only to administrators.

**Example Request**

```ts
const user = await postRequestHandler({
  endpoint: '/api/users/signup',
  body: {
    examYear: 2003,
    question: 'example question',
    section: 'answer all questions',
    image: 'image url',
    optiona: 'example optiona',
    optionb: 'example optionb',
    optionc: 'example optionc',
    optiond: 'example optiond',
    optione: 'example optione',
    subjectId: 'example subject id',
    answer: 'example answer',
    examType: 'utme',
  },
});
```

**Example Response**

```json
 { "success": true,
  "newQuestion":{
  "examYear": 2003,
  "question": "example question",
  "section": "answer all questions",
  "image": "image url",
  "optiona": "example optiona",
  "optionb": "example optionb",
  "optionc": "example optionc",
  "optiond": "example optiond",
  "optione": "example optione",
  "subjectId": "example subject id",
  "answer": "example answer",
  "examType": "utme",
  "contributor_id": "example admin id"
}}
```

### Get Question: GET /api/questions/

Endpoint for adding a new subject to the system. This route is accessible only to administrators.

**Example Request**

```ts
const user = await getRequestHandler({
  endpoint: '/api/questions/',
});
```

**Example Response**

```json
{
  "success": true,
  "questions": [
    {
      "examYear": 2003,
      "question": "example question",
      "section": "answer all questions",
      "image": "image url",
      "optiona": "example optiona",
      "optionb": "example optionb",
      "optionc": "example optionc",
      "optiond": "example optiond",
      "optione": "example optione",
      "subjectId": "example subject id",
      "answer": "example answer",
      "examType": "utme",
      "contributor_id": "example admin id"
    },
    {
      "examYear": 2003,
      "question": "example question",
      "section": "answer all questions",
      "image": "image url",
      "optiona": "example optiona",
      "optionb": "example optionb",
      "optionc": "example optionc",
      "optiond": "example optiond",
      "optione": "example optione",
      "subjectId": "example subject id",
      "answer": "example answer",
      "examType": "utme",
      "contributor_id": "example admin id"
    }
  ]
}
```
