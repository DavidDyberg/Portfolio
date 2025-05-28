# Portfolio REST API - DESIGN

This API manages information for my portfolio, including projects, skills and information about me. It is built using Node.js, Express, TypeScript and MongoDB.

## 1. Object Modeling

Below are the structures for the resources handled by the API.

### Project Model

| Field         | Type          | Description                      |
| ------------- | ------------- | -------------------------------- |
| `_id`         | String        | Project ID                       |
| `title`       | String        | Project title (required)         |
| `description` | String        | Project description (required)   |
| `techStack`   | Array[String] | Technologies used (optional)     |
| `githubLink`  | String        | GitHub repository URL (optional) |
| `liveDemo`    | String        | Deployed project URL (optional)  |
| `image`       | String        | Image URL (optional)             |
| `createdAt`   | Date          | Timestamp (default: now)         |
| `updatedAt`   | Date          | Timestamp (default: now)         |

---

### About Model

| Field          | Type            | Description                 |
| -------------- | --------------- | --------------------------- |
| `_id`          | String          | Primary key                 |
| `firstName`    | String          | My first name               |
| `lastName`     | String          | My last name                |
| `email`        | String          | My email                    |
| `password`     | String (hashed) | My password                 |
| `age`          | Number          | My age                      |
| `bio`          | String          | My biography                |
| `phoneNumber`  | String          | My phone number             |
| `profileImage` | String          | URL to the my profile image |
| `skills`       | Array[String]   | List of my skills           |
| `socials`      | Array[Object]   | My social media links       |

## 2. Recource URIS

The API follows RESTful principles and uses the following URI structure:

| Resource     | URI             | Description                                           |
| ------------ | --------------- | ----------------------------------------------------- |
| **Projects** | `/api/projects` | Manages portfolio projects                            |
| **About**    | `/api/about`    | Manages information about me                          |
| **Login**    | `/auth/login`   | For me to login to be able to perform CRUD operations |

## 3. Resource Representations

These endpoints return JSON representations of the resources.

**Example: Retrieve all projects** (GET /api/projects)

```json
{
  "_id": "67d81701db328e5ebbc4d096",
  "title": "IMBD-CLONE",
  "description": "A website for managing your favourite movies",
  "techStack": ["PHP", "Laravel", "MariaDB"],
  "githubLink": "https://github.com/daviddyberg/imbd-clone",
  "liveDemo": "https://imbd-clone.vercel.app",
  "image": "https://example.com/project-image.jpg",
  "createdAt": "2025-03-04T12:00:00Z",
  "uddatedAt": "2025-03-04T12:00:00Z"
}
```

**Example: Retrieve all information about me** (GET /api/about)

```json
{
  "_id": "67d81701db328e5ebb246556",
  "firstName": "David",
  "lastName": "Dyberg",
  "email": "david@example.com",
  "password": "password",
  "age": 23,
  "bio": "Fullstack Developer passionate about web technologies.",
  "phoneNumber": "+4673123456",
  "profileImage": "https://example.com/profile-image.jpg",
  "skills": ["JavaScript", "React", "Tailwind CSS", "PHP", "Laravel"],
  "socials": {
    "github": "https://github.com/daviddyberg",
    "linkedin": "https://linkedin.com/in/daviddyberg"
  },
  "createdAt": "2025-03-04T12:00:00Z",
  "updatedAt": "2025-03-04T12:00:00Z"
}
```

## 4. Assigning of HTTP Methods

Each resource supports different HTTP methods depending on access permissions:

### Projects:

| Method   | Endpoint Example    | Description               | Access Control |
| -------- | ------------------- | ------------------------- | -------------- |
| `GET`    | `/api/projects`     | Retrieve all projects     | ✅ Public      |
| `GET`    | `/api/projects/:id` | Retrieve a single project | ✅ Public      |
| `POST`   | `/api/projects`     | Add a new project         | ❌ Restricted  |
| `PUT`    | `/api/projects/:id` | Update a project          | ❌ Restricted  |
| `DELETE` | `/api/projects/:id` | Delete a project          | ❌ Restricted  |

### About:

| Method | Endpoint Example | Description                  | Access Control |
| ------ | ---------------- | ---------------------------- | -------------- |
| `GET`  | `/api/about`     | Retrieve my personal details | ✅ Public      |
| `POST` | `/api/about`     | Create a profile             | ❌ Restricted  |
| `PUT`  | `/api/about`     | Update personal details      | ❌ Restricted  |

### Login:

| Method | Endpoint Example | Description                                                            | Access Control |
| ------ | ---------------- | ---------------------------------------------------------------------- | -------------- |
| `POST` | `/auth/login`    | This endpoint is for myself so I can login and perform CRUD operations | ✅ Public      |

---

✅ **Public** → Anyone can access  
❌ **Restricted** → Only the API owner/admin can modify data

# Curl examples deployed version

## Login:

### This will generate an access token

I have a mockUser with email=email and password=password. Use theese credentials to get an acces token

```
curl -X POST -H "Content-Type: application/json" -d '{"email": "email", "password": "password"}' https://david-dyberg-portfolio-api.vercel.app/auth/login
```

## Projects:

### Fetch all projects:

```
curl https://david-dyberg-portfolio-api.vercel.app/api/projects
```

### Fetch projects with limit:

```
curl https://david-dyberg-portfolio-api.vercel.app/api/projects?limit={LIMIT}
```

### Fetch projects with search:

```
curl https://david-dyberg-portfolio-api.vercel.app/api/projects?search={SEARCH_QUERY}
```

### Fetch a single project by id:

```
curl https://david-dyberg-portfolio-api.vercel.app/api/projects/YOUR_PROJECT_ID
```

### Create a project (token required)

```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -d '{
  "title": "Your title",
  "description": "Your description"
}' https://david-dyberg-portfolio-api.vercel.app/api/projects
```

### Update a project by id (token required)

```
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -d '{
  "title": "Updated Project Title",
  "description": "This is an updated description"
}' https://david-dyberg-portfolio-api.vercel.app/api/projects/YOUR_PROJECT_ID
```

### Delete a project by id (token required)

```
curl -X DELETE -H "Authorization: Bearer YOUR_BEARER_TOKEN" https://david-dyberg-portfolio-api.vercel.app/api/projects/YOUR_PROJECT_ID
```

## About

### Fetch information about me

```
curl https://david-dyberg-portfolio-api.vercel.app/api/about
```

### Update information about me (token required)

```
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -d '{
  "firstName": "Updated name",
  "lastName": "Updated lastname"
}' https://david-dyberg-portfolio-api.vercel.app/api/about/USER_ID
```

### Create new profile (token required)

```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -d '{
  "firstName": "Name",
  "lastName": "Lastname",
  "email": "email",
  "password": "password"
}' https://david-dyberg-portfolio-api.vercel.app/api/about/
```

# Curl examples locally

## Login:

### This will generate an access token

I have a mockUser with email=email and password=password. Use theese credentials to get an acces token

```
curl -X POST -H "Content-Type: application/json" -d '{"email": "email", "password": "password"}' http://localhost:4000/auth/login
```

## Projects:

### Fetch all projects:

```
curl http://localhost:4000/api/projects
```

### Fetch projects with limit:

```
curl http://localhost:4000/api/projects?limit={LIMIT}
```

### Fetch projects with search:

```
curl http://localhost:4000/api/projects?search={SEARCH_QUERY}
```

### Fetch a single project by id:

```
curl http://localhost:4000/api/projects/YOUR_PROJECT_ID
```

### Create a project (token required)

```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -d '{
  "title": "Your title",
  "description": "Your description"
}' http://localhost:4000/api/projects
```

### Update a project by id (token required)

```
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -d '{
  "title": "Updated Project Title",
  "description": "This is an updated description"
}' http://localhost:4000/api/projects/YOUR_PROJECT_ID
```

### Delete a project by id (token required)

```
curl -X DELETE -H "Authorization: Bearer YOUR_BEARER_TOKEN" http://localhost:4000/api/projects/YOUR_PROJECT_ID
```

## About

### Fetch information about me

```
curl http://localhost:4000/api/about
```

### Update information about me (token required)

```
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -d '{
  "firstName": "Updated name",
  "lastName": "Updated lastname"
}' http://localhost:4000/api/about/USER_ID
```

### Create new profile (token required)

```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -d '{
  "firstName": "Name",
  "lastName": "Lastname",
  "email": "email",
  "password": "password"
}' http://localhost:4000/api/about/
```
