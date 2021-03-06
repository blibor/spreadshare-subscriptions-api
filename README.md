# Subscriptions

Subscriptions api for spreadshare

## Dev Setup

- install `serverless`
- run `sls dynamodb install` to install the local version of dynamodb for development
- run `yarn dev`
- import postman api script from `/docs` into Postman and hit the api's 🍻
  > any change to the package.json file break local dynamo db installation as per the bug mentioned [here](https://github.com/99xt/serverless-dynamodb-local/issues/127). The workaround is running `sls dynamodb remove && sls dynamodb install`

## Commands

See the scripts section in package.json

## Deployment

- for `dynamodb table` deployment, see `spreadshare-devops` repo
- deploy using `yarn deploy:stage` for stage deployment
- deploy using `yarn deploy:prod` for prod deployment
- note down the api key returned by deployments. The api are private and the key is needed to be passed in `x-api-key` header for authentication.
- Please also refer serverless docs for detailed deployment config params.

## Resources

- [serverless documentation](https://serverless.com/)

## Tasks List

- [x] setup aws lambda project with serverless and dynamodb
- [x] create and get api
- [x] batch get apis
- [ ] unit test
- [ ] functional test
- [x] deployment scripts
- [ ] ci-cd
- [ ] slack integration
- [ ] handle timeout alarms

## Limitations

- no pagination added to list api's

---

## API

Following is the list of spradshare subscription api

### Subscribe

`POST /{userId}/subscriptions/{streamId}`

#### Request Body:

Fields:

- channel - `rss` or `email`.
- frequency - `monthly`, `weekly` or `daily`.
- email - required if channel type is `email`.

Example:
`POST /125/subscriptions/abc`

```
{
	"channel": "email",
	"frequency": "monthly",
	"email": "example@email.com"
}
```

#### Response Codes and Body:

200

Result:

```
{
    "userId": "125",
    "streamId": "abc",
    "channel": "email",
    "frequency": "monthly",
    "email": "example@email.com",
    "createdAt": 1532880199167,
    "updatedAt": 1532880199167
}
```

---

### Unsubscribe a user from a stream channel

`DELETE /{userId}/subscriptions/{streamId}/{channel}`

#### Response Codes:

200

---

### Get a single subscription for user and streamId given a channel

`GET /{userId}/subscriptions/{streamId}/{channel}`

#### Response Body:

```
{
    "userId": "125",
    "streamId": "abc",
    "channel": "email",
    "email": "some@email.com",
    "frequency": "monthly",
    "updatedAt": 1531045707855,
    "createdAt": 1531045707855
}
```

#### Response Codes:

200, 404

---

### Get all user subscriptions [CURRENTLY INACTIVE]

`GET /{userId}/subscriptions`

### Query params

`channel: email | rss`

#### Response Body:

```
[
    {
        "userId": "125",
        "streamId": "abc",
        "channel": "email",
        "email": "some@email.com",
        "frequency": "monthly",
        "updatedAt": 1531045709237,
        "createdAt": 1531045707855
    },
    {
        "userId": "125",
        "streamId": "efg",
        "channel": "email",
        "email": "some@email.com",
        "frequency": "daily",
        "updatedAt": 1531045707855,
        "createdAt": 1531045707855
    },
    {
        "userId": "125",
        "streamId": "xyz",
        "channel": "rss",
        "frequency": "weekly",
        "updatedAt": 1531045708152,
        "createdAt": 1531045707855
    },
    ...
]
```

#### Response Codes:

200, 404

---

### Get all subscriptions for a stream [CURRENTLY INACTIVE]

`GET /subscriptions/{streamId}`

### Query params

`channel: email | rss`

#### Response Body:

```
[
    {
        "userId": "129",
        "streamId": "abc",
        "channel": "email",
        "email": "some@email.com",
        "frequency": "monthly",
        "updatedAt": 1531045709237,
        "createdAt": 1531045707855
    },
    {
        "userId": "121",
        "streamId": "abc",
        "channel": "email",
        "email": "some@email.com",
        "frequency": "daily",
        "updatedAt": 1531045707855,
        "createdAt": 1531045707855
    },
    {
        "userId": "562",
        "streamId": "abc",
        "channel": "rss",
        "frequency": "weekly",
        "updatedAt": 1531045708152,
        "createdAt": 1531045707855
    },
    ...
]
```

#### Response Codes:

200, 404

---

### Error format for all api's

Error format for all enpoints is based on [jsonApi](http://jsonapi.org/examples/#error-objects-basics) standard with `status` and `detail` field always present.
Example:

```
{
  "errors": [
    {
      "status": "422",
      "detail": "First name must contain at least three characters."
    }
  ]
}
```
