#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers

- auth.js
- jobs.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit
- 
Using Postman
Set Global Variable
eg. VARIABLE: PROD_URL, VALUE:https://jays-job-db.onrender.com/api/v1

Routes
Login: POST {{global variable set}}/auth0/login
Register:POST {{global variable set}}/auth0/register

Dynamically add tokens by creating token value under tests of login and register 
eg: const jsonData = pm.response.json()
pm.globals.set("accessToken", jsonData.token);

Now select Bearer Token under Authorization for remaining routes below
Get All Jobs:GET  {{Global Variable Set}}/jobs
Create Job :POST  {{Global Variable Set}}/jobs
Get Single Job:GET   {{Global Variable Set}}/jobs/your_job_id
Update Job: PATCH {{Global Variable Set}}/jobs/your_job_id
Delete Job:DELETE {{Global Variable Set}}/jobs/your_job_id
