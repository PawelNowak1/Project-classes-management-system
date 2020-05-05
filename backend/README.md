# Backend application

In our system are available three roles: `ROLE_ADMIN`, `ROLE_TEACHER` and `ROLE_STUDENT`. Every role has different accessible paths based on authorization.

Authorization in our system is based on JSON Web Token (JWT).

Default user with `ROLE_ADMIN` is defined with username **admin** and password **admin**.

### Endpoints:

* `POST /login` - available for all users

Sample usage of this endpoint:
```
curl -XPOST localhost:8080/login -H 'Content-type: application/json' -d \
 '{
  "username": "admin",
  "password": "admin"
}'
```
In response to made request you will get your secret JWT token, which will be used for further authorization in system by adding it to **Authorization** header of your request.
```
{
  "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTU4NTQ5ODExNiwiZXhwIjoxNTg1NTAxNzE2fQ.lPRQnwBEYt-yK-S1HgnLZ2eNlykDoMt1Bm62MHVgolGsorp3HWh-aoHoyehD1OS4-mHsBN4E4huqn9TZ8i7pFg",
  "type": "Bearer",
  "id": 27,
  "username": "admin",
  "email": "admin@admin.com",
  "role": "ROLE_ADMIN"
}

```
* `POST /registration` - available only for users with `ROLE_ADMIN`

Sample usage of this endpoint:
```
curl -XPOST localhost:8080/registration \
-H 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTU4NTQ5ODM1MiwiZXhwIjoxNTg1NTAxOTUyfQ.XW6pCfTsaZPHtxFLUZr_I9DkC1gQd6a7yE2J8sZFMsju9a1gWJAHSBmAUKdNY_BLK-QgWzdykmHZGD3IAVeXmg' \
-H 'Content-type: application/json' -d \
'{
  "username": "teacher",
  "password": "teacher",
  "email": "teacher@teacher.com",
  "name": "Teacher",
  "lastName": "Teacher",
  "role": "teacher",
  "active": "true"
}'
```
If you are authorized (you are signed in and has `ROLE_ADMIN`) and everything went succesfuly, you will receive this response:

`User teacher registered successfully!`

When you try to reach endpoint to which you are not authorized you will receive:
```
{
  "timestamp": "2020-03-29T16:23:59.432+0000",
  "status": 403,
  "error": "Forbidden",
  "message": "Forbidden",
  "path": "/registration"
}
```

When you try to send request without your token in 'Authorization' header
```
{
  "timestamp": "2020-03-29T16:26:07.499+0000",
  "status": 401,
  "error": "Unauthorized",
  "message": "error: unauthorized",
  "path": "/registration"
}

```

* `GET /token/verify/{token}` - available for all users

This endpoint allows you to verify JSON Web Token. If token is valid and already not expired, in response to made request it will return username, for which token is signed and information, that token is valid, otherwise information indicating that token is not valid anymore (for example expired or malformed).

Sample usage of this endpoint:
```
curl localhost:8080/token/verify/some_token

```
If token is valid and not expired you will receive this response (for user admin in this example):
```
{
  "username": "admin",
  "valid": "yes"
}
```
Otherwise endpoint will return this response:
```
{
  "valid": "no"
}
```

* `POST /file/upload` - available only for users with `ROLE_STUDENT`

This endpoint allows students to upload files (like reports or images)

Sample usage of this endpoint:

```
curl -XPOST localhost:8080/file/upload \
-H 'Authorization: Bearer $students_token' \
-F 'file=@test.png' -F 'description=test file upload' -F 'studentId=1' -F 'sectionId=1'
```

If file was uploaded successfully, this respons will be received:

```
{
  "file_id": "1",
  "file_name": "test.png",
  "file_type": "image/png",
  "insert_date": "Tue May 05 22:22:28 CEST 2020",
  "file_size": "1292965"
}
```

* `GET /file/download/{fileId}` - available only for users with `ROLE_STUDENT`

This endpoint allows students to get files stored in database

Sample usage of this endpoint:

```
curl localhost:8080/file/download/2 \
-H 'Authorization: Bearer $students_token'\
 --output test.png
```
If everything was successful, your file will be now saved in file passed as --output argument (test.png in this case).

Tech Stack:
* Spring Boot
* Spring security
* Maven
