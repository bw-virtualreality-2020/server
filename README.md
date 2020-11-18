# Virtual Reality Venture API

DATABASE SCHEMA:

![alt text](https://github.com/bw-virtualreality-2020/server/blob/main/images/db-schema.png?raw=true)

ENDPOINTS 

BASE URL: https://bw-virtualreality-2020.herokuapp.com/

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

