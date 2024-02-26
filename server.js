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

// Middleware
// Server static files from the styles directory 
app.use(express.static("./styles"))



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





//Routes

app.get ('/:number', (req, res)=>{
    

    res.render ("index", movies[req.params.number]);
    
    
    
    // res.send("Movies");
});


//listening
app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`)
})




