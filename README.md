# Virtual Reality Venture API

## Database Schema

![alt text](https://github.com/bw-virtualreality-2020/server/blob/main/images/Screen%20Shot%202020-11-18%20at%201.42.31%20PM.png?raw=true)

## Endpoints

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
- **role** _(required)_ string, must be either "fundraiser" or "funder"
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

### [POST] /api/projects

Endpoint: `https://bw-virtualreality-2020.herokuapp.com/api/projects`

Description: Creates new project; returns new project object.

**Accepted Fields**

- **project_name** _(required)_ string, must be unique, 128 chars. max
- **project_description** _(optional)_ string, 255 chars. max
- **project_goal** _(optional)_ number, must be a positive decimal
- **project_image** _(optional)_ string, must be valid url, 255 chars. max

**Sample Request**

```js
{
    "project_name": "Virtual Reality Venture",
    "project_description": "",
    "project_goal": 5000,
    "project_image": "https://cdn.pixabay.com/photo/2019/01/31/20/52/web-3967926_960_720.jpg"
}
```

### [GET] /api/categories

Endpoint: `https://bw-virtualreality-2020.herokuapp.com/api/categories`

Description: Returns array of all saved categories.

**Sample Response**

```js
{
    "categories": [
        {
            "category_id": 1,
            "category_name": "Augmented Reality"
        }
    ]
}
```
### [GET] /api/categories/:id

Endpoint: `https://bw-virtualreality-2020.herokuapp.com/api/categories/:id`

Description: Returns category object by id.

**Sample Response**

```js
{
    "category": {
        "category_id": 1,
        "category_name": "Augmented Reality"
    }
}
```

### [POST] /api/categories

Endpoint: `https://bw-virtualreality-2020.herokuapp.com/api/categories`

Description: Creates new category; returns new category object.

**Accepted Fields**

- **category_name** _(required)_ string, must be unique, 128 chars. max

**Sample Request**

```js
{
    "category_name": Augmented Reality",
}
```



