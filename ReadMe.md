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
