# Backend application

### Endpoints:
* `POST /registration`

Sample usage of this endpoint:
```
curl localhost:8080/registration -XPOST -H 'Content-type: application/json' -d \
'{
  "username": "test",
  "password": "test",
  "email": "test@test.com",
  "name": "Test",
  "lastName": "Test",
  "role": {
    "role": "teacher"
  },
  "active": "true"
}'

```
