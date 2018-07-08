# Subscriptions

## Dev Setup
* install `serverless`
* run `sls dynamodb install` to install the local version of dynamodb for development
* run `yarn dev`
* import postman api script from `/docs` into Postman and hit the api's 🍻
> any change to the package.json file break local dynamo db installation as per the bug mentioned [here](https://github.com/99xt/serverless-dynamodb-local/issues/127). The workaround is running `sls dynamodb remove && sls dynamodb install`

## Commands

## Deployment

## Resources
* [serverless documentation](https://serverless.com/)
* [storing sensitive information in env variables](https://docs.aws.amazon.com/lambda/latest/dg/tutorial-env_console.html)

## Tasks List
* [x] setup aws lambda project with serverless and dynamodb
* [x] create and get api
* [x] batch get apis
* [ ] unit test 
* [ ] functional test
* [ ] deployment scripts
* [ ] ci-cd

## Limitations
* no pagination added to list api's

--------------------------------------

## API
Following is the list of spradshare subscription api


### Subscribe
`POST /{userId}/subscriptions/{publicationId}`

#### Request Body:
Fields:
* *channel*: `rss` or `email`
* *frequency*: `monthly`, `weekly` or `daily`
* *email*: required if channel type is `email`

Example:
```
{
	"channel": "email",
	"frequency": "monthly",
	"email": "example@email.com"
}
```

#### Response Codes:
200

-----------

### Unsubscribe a user from a publication channel
`DELETE /{userId}/subscriptions/{publicationId}/{channel}`

#### Response Codes:
200

-----------

### Get a single subscription for user and publicationId given a channel
`GET /{userId}/subscriptions/{publicationId}/{channel}`

#### Response Body:
```
{
    "userId": "125",
    "publicationId": "abc",
    "channel": "email",
    "email": "some@email.com",
    "frequency": "monthly",
    "updatedAt": 1531045707855,
    "createdAt": 1531045707855
}
```

#### Response Codes:
200, 404

-----------

### Get all user subscriptions
`GET /{userId}/subscriptions`

#### Response Body:
```
[
    {
        "userId": "125",
        "publicationId": "abc",
        "channel": "email",
        "email": "some@email.com",
        "frequency": "monthly",
        "updatedAt": 1531045709237,
        "createdAt": 1531045707855
    },
    {
        "userId": "125",
        "publicationId": "efg",
        "channel": "email",
        "email": "some@email.com",
        "frequency": "daily",
        "updatedAt": 1531045707855,
        "createdAt": 1531045707855
    },
    {
        "userId": "125",
        "publicationId": "xyz",
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

-----------

### Get all subscriptions for a publication
`GET /subscriptions/{publicationId}`

#### Response Body:
```
[
    {
        "userId": "129",
        "publicationId": "abc",
        "channel": "email",
        "email": "some@email.com",
        "frequency": "monthly",
        "updatedAt": 1531045709237,
        "createdAt": 1531045707855
    },
    {
        "userId": "121",
        "publicationId": "abc",
        "channel": "email",
        "email": "some@email.com",
        "frequency": "daily",
        "updatedAt": 1531045707855,
        "createdAt": 1531045707855
    },
    {
        "userId": "562",
        "publicationId": "abc",
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

-----------

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
