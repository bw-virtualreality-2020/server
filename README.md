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

Endpoint: `https://bw-virtualreality-2020.herokuapp.com/`

Description: Creates new user; returns new user object and authenticated token.

Request Body:

```js
{
  username: _(string, required, must be unique, 128 chars. max)_,
  password: _(string, required, 128 chars. max)_,
  email: _(string, required, must be unique, 128 chars. max)_,
  bio: _(string, optional, 255 chars. max)_,
  image: _(string, optional, 255 chars. max)_
}
```
  

