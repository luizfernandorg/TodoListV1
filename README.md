# TODO List
# Still in production

The purpose of this project is to demonstrate a little of the use of EJS, with Express and NodeJS.

### Tecnologies
- HTML5
- CSS3
- SCSS
- Javascript
- NodeJS
- Express
- EJS
- Jquery

### Environment

Only one environment variable is in use in this project,
the variable is PORT, the variable is used by Express to listen on this PORT or it'll use the port 3000 if the variable doesn't exist. I did this way in case I upload the code to Heroku.

### How to use
````
$ git clone https://github.com/luizfernandorg/TodoListV1.git
$ cd TodoListV1
$ npm install
````

then if you want you can set the .env file on the project root folder and then set the variable PORT=0000 to set the port you want to use on this project.

then use:
````
$ node app.js
````