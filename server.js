// Require filesystem 
const express = require ('express')
const fs = require("fs")

// Invoke and Declare port #
const app = express()
const PORT= 3000;

// List favorite movies
const movies = [
    {id: 1, title: "The Godfather", content: 1970},
    {id: 2, title: "The Interview", content:1998}, 
    {id: 3, title:"Talaash", content:2012}
];

// Middleware: 

// Server static files from the styles directory 
app.use(express.static("./styles"))
app.use(express.json());

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



// Routes.............
app.get('/', (req, res) => {
    res.send('Best Movies Collections');
  });
  
// Route to fetch all movies
app.get('/movies', (req, res) => {
    res.json(movies);
  });

// Route to fetch indvidual movies
app.route('/:number')
  .get((req, res) => {
    const index = req.params.number;
    if (index >= 0 && index < movies.length) {
        res.render("index", movies[index]);
    } else {
        res.status(404).send('Movie not found');
    }
});


// POST Route to add a new movie
app.route('/movies')
  .get((req, res) => {
    res.json(movies);
  })
  .post((req, res) => {
    if (req.body.title && req.body.content) {
      const movie = {
        id: movies.length > 0 ? movies[movies.length - 1].id + 1 : 1,
        title: req.body.title,
        content: req.body.content,
      };

      movies.push(movie);
      res.status(201).json(movie);
    } else {
      res.status(400).json({ error: "Insufficient Data" });
    }
  });

  // PATCH Route to make changes to an existing movie in the database.
  app.route('/movies/:id')
    .get((req, res, next) => {
    const movie = movies.find((m) => m.id == req.params.id);
    if (movie) res.json(movie);
    else next();
  })
  .patch((req, res, next) => {

    const movie = movies.find((m, i) => {
      if (m.id == req.params.id) {
        for (const key in req.body) {
          movies[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (movie) res.json(movie);
    else next();
  });
  // DELETE Route to delete a movie
  app.route('/movies/:id')
    .delete((req, res, next) => {

    const movieIndex = movies.findIndex((m, i) => {
      if (m.id == req.params.id) {
        movies.splice(i, 1);
        return true;
      }
    });

    if (movieIndex !== -1) {
      res.json(movies[movieIndex]);
    } else {
      next();
    }
  });

//Listening
app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`)
})




