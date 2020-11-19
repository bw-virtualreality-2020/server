# Virtual Reality Venture API

## Database Schema

![alt text](https://github.com/bw-virtualreality-2020/server/blob/main/images/db-schema.png?raw=true)

## Endpoints

BASE URL: https://bw-virtualreality-2020.herokuapp.com/

--All routes require valid token in **authorization** header except `/api/auth/register` and `/api/auth/login`.

| Method | Endpoint                     | Description                                       |
| :----- | :--------------------------- | :------------------------------------------------ |
| POST   | /api/auth/register           | Creates user; returns new user object and token   |
| POST   | /api/auth/login              | Authenticates user; returns user object and token |
| GET    | /api/projects                | Returns array of saved projects                   |
| GET    | /api/projects/:id            | Returns project object by id                      |
| POST   | /api/projects                | Creates project; returns new project object       |
| PUT    | /api/projects/:id            | Updates project; returns updated project object   |
| DELETE | /api/projects/:id            | Deletes project; returns number of deleted items  |
| GET    | /api/categories              | Returns array of saved categories                 |
| GET    | /api/categories/:id          | Returns category object by id                     | 
| POST   | /api/categories              | Creates category; returns new category object     |
| GET    | /api/users                   | Returns array of saved users                      |
| GET    | /api/users/:id               | Returns user object by id                         |
| PUT    | /api/users/:id               | Updates user; returns new user object             |
| DELETE | /api/users/:id               | Deletes user; returns number of deleted users     |


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

### [PUT] /api/projects/:id

Endpoint: `https://bw-virtualreality-2020.herokuapp.com/api/projects/:id`

Description: Updates existing project; on success returns updated project object. Failure to update a project returns null.

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

### [DELETE] /api/projects/:id

Endpoint: `https://bw-virtualreality-2020.herokuapp.com/api/projects/:id`

Description: Deletes existing project; returns number of deleted items (1 on successful deletion or 0 on failure).


**Sample Response**

```js
{
    "deletedProjects": 1
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

### [GET] /api/users (admin only)

Endpoint: `https://bw-virtualreality-2020.herokuapp.com/api/users`

Description: Returns array of all saved users.

**Sample Response**

```js
{
    "users": [
        {
            "user_id": 1,
            "user_username": "john_doe",
            "user_password": "[encrypted password]",
            "user_role": "admin",
            "user_email": "example@gmail.com",
            "user_bio": null,
            "user_image": null
        }
    ]
}
```
### [GET] /api/users/:id (user can only access their own account info)

Endpoint: `https://bw-virtualreality-2020.herokuapp.com/api/users/:id`

Description: Returns user object by id.

**Sample Response**

```js
{
    "user": {
        "user_id": 5,
        "user_username": "john_doe",
        "user_password": "[encrypted password]",
        "user_role": "fundraiser",
        "user_email": "example@gmail.com",
        "user_bio": null,
        "user_image": null
    }
}
```

### [PUT] /api/users/:id (user may only update their own account info)

Endpoint: `https://bw-virtualreality-2020.herokuapp.com/api/users/:id`

Description: Updates existing user; on success returns updated user object. Failure to update a user returns null.

**Accepted Fields**

- **username** _(optional)_ string, must be unique, 128 chars. max
- **password** _(optional)_ string, 128 chars. max
- **email** _(optional)_ string, must be unique, 128 chars. max
- **role** _(optional)_ string, must be either "fundraiser" or "funder"
- **bio** _(optional)_ string, 255 chars. max
- **image** _(optional)_ string, 255 chars. max

**Sample Request**

```js
{
  user_username: "john_doe"
  user_password: "password123",
  user_email: "johndoe@email.com",
  user_role: "fundraiser",
  user_bio: "",
  user_image: "",
}
```

### [DELETE] /api/projects/:id (admin only)

Endpoint: `https://bw-virtualreality-2020.herokuapp.com/api/users/:id`

Description: Deletes existing user; returns number of deleted items (1 on successful deletion or 0 on failure).


**Sample Response**

```js
{
    "deletedProjects": 1
}
```



