Configure an Express.js back end to serve static HTML files.

Configure an Express.js back end to create an API to handle GET and POST requests.

Parse parameters in server-side routes.

Submit form data to a server.

Implement separation of concerns for routing.

Deploy a server-side application to the Heroku platform.

11.1.3 Set up the initial files. The big thing here was we set up a new style of file called animals.json in the data folder which holds an object that has an array named "animals" inside of it. Made an empty server.js in the root.
11.1.4 Used npm init -y and then npm i express to install express.js. Then in server.js we required it, then added --const app = express();-- and finally opened a port for 3001 using app.listen().
11.1.5 The start of using .send to test if things work and then .get to actually grab the objects array from the animals.json. Then we set up filterByQuery function and called it in the .get so when we use the browser looks like this --http://localhost:3001/api/animals?name=Erica-- we can get Erica's object by her name. Very dense. May need to read agian.
