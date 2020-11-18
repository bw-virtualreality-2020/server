### Virtual Reality Venture API

### DATABASE SCHEMA:

![alt text](https://github.com/bw-virtualreality-2020/server/blob/main/images/db-schema.png?raw=true)

### ENDPOINTS 

BASE URL: https://bw-virtualreality-2020.herokuapp.com/

--All routes require valid token in **authorization** header except `/api/auth/register` and `/api/auth/login`.

| Method | Endpoint                     | Description                                       |
| :----- | :--------------------------- | :------------------------------------------------ |
| POST   | /api/auth/register           | Creates user; returns new user object and token   |
| POST   | /api/auth/login              | Authenticates user; returns user object and token |
| GET    | /api/projects                | Returns array of saved projects                   |
| GET    | /api/projects/:id            | Returns project object by id                      |
| POST   | /api/projects                | Creates project, returns new project object       |
| GET    | /api/categories              | Returns array of saved categories                 |
| GET    | /api/categories/:id          | Returns category object by id                     | 
| POST   | /api/categories              | Creates category, returns new category object     |


### [POST] /api/auth/register

Endpoint: `https://bw-virtualreality-2020.herokuapp.com/api/auth/register`
Description: Creates new user; returns new user object and signed token.

**Accepted Fields**

- **username** _(required)_ string, must be unique, 128 chars. max
- **password** _(required)_ string, 128 chars. max
- **email** _(required)_ string, must be unique, 128 chars. max
- **role** _(require)_ string, must be either "fundraiser" or "funder"
- **bio** _(optional)_ string, 255 chars. max
- **image** _(optional)_ string, 255 chars. max

**Sample Request**

```js
{
  username: "john_doe"
  password: "password123",
  email: "johndoe@email.com",
  role: "fundraiser",
  bio: "",
  image: "",
}
```

### [POST] /api/auth/login

Endpoint: `https://bw-virtualreality-2020.herokuapp.com/api/auth/login`
Description: Authenticates user; returns user object and signed token.

**Accepted Fields**

- **username** _(required)_ string, must be valid username
- **password** _(required)_ string, must be valid user password

**Sample Request**

```js
{
  username: "john_doe"
  password: "password123",
}
```

### [GET] /api/projects

Endpoint: `https://bw-virtualreality-2020.herokuapp.com/api/projects`
Description: Returns array of all saved projects.

**Sample Response**

```js
{
    "projects": [
        {
            "project_id": 1,
            "project_name": "Virtual Reality Venture",
            "project_description": "",
            "project_goal": "5000.00"
        }
    ]
}
```
### [GET] /api/projects/:id

Endpoint: `https://bw-virtualreality-2020.herokuapp.com/api/projects/:id`
Description: Returns project object by id.

**Sample Response**

```js
{
    "project": {
        "project_id": 1,
        "project_name": "Virtual Reality Venture",
        "project_description": "",
        "project_goal": "5000.00"
    }
}
```

