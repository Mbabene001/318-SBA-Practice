// require filesystem 
const express = require ('express')
const fs = require("fs")

// invoke and declare port #
const app = express()
const PORT= 3000;

// List favorite movies

const movies = [
    {title: "The Godfather", content: 1970},
    {title: "The Interview", content:1998}, 
    {title:"Talaash", content:2012}
];

// Middleware: 

// Server static files from the styles directory 
app.use(express.static("./styles"))

//Logging middleware 

app.use ((req, res, next) => {
    console.log (`${req.method} ${req.url}`);
    next()
});



// Middleware to handle errors

app.use ((err, req, res, next) => {
    console.error (err.stack);
    res.status(500). send ('Something aint right');
});









// define the template engine " copied from sandbox"
app.engine("perscholas", (filePath, options, callback) => {
     fs.readFile(filePath, (err, content) => {
       if (err) return callback(err);
  
//Here, we take the content of the template file,
//convert it to a string, and replace sections of
//it with the values being passed to the engine.
       const rendered = content.toString()
         .replaceAll("#title#", `${options.title}`)
         .replace("#content#", `${options.content}`);
       return callback(null, rendered);
     });
   });

   app.set("views", "./views"); // specify the views directory
 app.set("view engine", "perscholas"); // register the template engine








// Routes

app.get('/', (req, res) => {
    res.send('Best Movies Collections');
  });
  
  // Route to fetch all movies
app.get('/movies', (req, res) => {
    res.json(movies);
  });
  
  app.get('/:number', (req, res) => {
    res.render("index", movies[req.params.number]);
  });
  


//listening
app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`)
})




