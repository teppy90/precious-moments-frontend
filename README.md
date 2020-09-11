
## Table of contents
* Project Title
* Project Demo
* Project Motivation
* Technologies
* Wireframes
* Project scope and implementation
* Challenges
* Improvements

## Project Title : Precious Moments- a video uploading site
developed by Helen, Shi Jie & Danny


## Project Demo
* https://preciousmoment.herokuapp.com/
* https://github.com/teppy90/precious-moments-frontend
* https://github.com/teoshijie/preciousmoments-backend


## Project motivation
Precious Moments is a video uploading website that allows users to share upload videos and share with their friends and families. 

## Project Scope 
* MVP 
* Login page - with google authentication
* Able to upload and delete videos and description- using multer,  cloudinary and react drag and drog download
* Able to add comments 

* Stretch goals
* Create a live video streaming function

## Technologies
* Node.js,
* Express
* Axios
* React.js
  - React Router Dom
  - React Context API
* User authentication
   - passport.js
   - JsonWebToken
   - React-Google-Login
* Video Uploading
  -Multer 
  -Cloudinary
* MongoDB
* Mongoose
* Bootstrap
* Ant Design
* CSS

## Wireframes



## Project implementation :

The architecture of our application is based on MVC and Microservices model. They are:

* Client Tier (Front-end/View)
It was written in Javascript, HTML and CSS using ReactJS as the framework. User will interact with the server by accessing the features of our application.

* The Business Logic Tier (Back-end/Controller)
It was written using NodeJS and ExpressJS, and this tier represents the Application Server that will act as a bridge of communication for the Client Tier and Database Tier. This tier will accept API HTTP requests from the user and follow with the appropriate response.

* Database Tier (Model)
MongoDB is used to store all crucial data our application needs to function.


This project contains 3 parts:

1) Build a good structured SERVER App with NodeJS/ExpressJS/MongoDB and
   to implement user authentication with PassportJS and JSONWebToken (JWT).
2) Build a ReactJS app and integrate it with the SERVER.
3) Heroku Deployment

Project structure

```
project
 └── upsell-backend (server)
   └── controller   — Storing APIs (GET, POST, PUT, DELETE)
      |__ listings.js/orders.js/user.js
   |__ db
    ├── index.js

   └── database
    ├── model       — store all the models of the project
    └── schema      — create attribute for each model
   ├── routes
   └── Server.js    — Everything a server needs to start

  └── upsell-frontend (client)
     └── Public  
        |__ index.html
     ├── components - store all the react components
     └── hocs
          |__ PrivateRoute.js
     └── services  - store all the API calls  
     ├── App.js
     └── App.css
     |__ AuthContext.js - centralized users' information
     |__ context.js - centralized listings' information
     |__ index.js
```


## Challenges
* Herokuapp.com that does not allow cookies- This creates problems when Google Authentication is carried out in the backend as the user data cannot be passed to the front end. As a result React-Google-Login is used instead to carry out Google Authentication at the front end.
* We didn't implement the video chat functionality because we ran out of time to fully understand Socket.IO and WebRTC. 
* User profile image does not load initially when user is redirected to the home page. 
* Integration of 3 parties codes 

## Improvements
* To implement forget password feature and email verification for user authentication 
* To video streaming function through socket.io and WebRTC 
* To allow users to delete and edit their comments 
* To create a search bar 
* A share button to allow users to easily share videos to others 
