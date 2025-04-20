devTinder - Tinder for developers

# Day 1

- created a repository
- created a server using express
- listen to port7777
- install nodemon and updated scripts inside package.json
- initialize git
- .gitignore
- install Postman app for testing API, create a workspace/collection
- test dummy GET, POST, PATCH, DELETE API Calls

# Day 2

- install mongoose library
- connect to Database "Connection-url"/devTinder
- Call the connectDB function and connect to database before starting application on 7777
- create a userSchema & User Model
- create /signup API to add data to database
- post some dummy data using API calls from postman
- error handling using try, catch
- .env to protect secret keys

# Day 3

- added express.json middleware to the app to read req.body
- made signup API dynamic to receive data from end user
- used Model.find to get data from the database
- GET /user API, GET /feed API
- create delete /user API
- patch /user API to update data

# Day 4

- added required, unique, minLength, maxLength, lowercase, trim etc in Schema
- added default value
- create custom validate function
- improve DB Schema
- add timestamps to the userSchema
- add API level validations on patch request & signup post API
- data sanitization - add API validations for each fields
- npm validator
- used validator functions for different fields like email, photoUrl
- NEVER TRUST req.body - user can send any malicious data always validate first

# Day 5

- validate data in signup API
- install bcrypt package for encryption
- create passwordHash using bcrypt.hash & save the user with encrypted password
- post /login API
- compare password for authentication and throw error invalid credentials incase of wrong input

# Day 6

- install cookie-parse
- send dummy cookie to user
- GET /profile API and check if you get cookie back
- install jsonwebtoken
- in /login API, after email & password validation, create a JWT token and send it to user in cookies
- read the cookie in /profile API and find the logged in user

# Day 7

- create userAuth middleware
- add userAuth in /profile and cleanup code
- post /sendConnectionRequest API
- set expiry for JWT token and cookies
- create userSchema method to getJWT()
- create userSchema method to compare password(passwordInputByUser)

# Day 8

- create apiList
- group multiple routes under respective router
- create routes folder for managing auth, profile, request routers
- create authRouter, profileRouter, requestRouter
- import these router in app.js
- clean up code
- post /logout API

# Day 9

- patch /profile/edit
- validateProfileEditData
- update the edits
- create connectionRequest Schema and connectionRequestModel
- post /request/send/:status/:toUserId API
- proper validation of data
- think about all corner cases
- $or query $and query in mongoose
- Schema.pre("save", function())
- indexes in MongoDB optimises the search
- compound index
