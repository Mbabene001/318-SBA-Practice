// require 
const express = require ('express')
// invoke
const app = express()
// Port # 

const PORT= 3000;

// const movies = [{title: "The Godfather", content: 1970}, {title: "The Interview", content:1998}, {title:"Talaash", content:2012}]



// //Middleware
// // Server static files from the styles directory 
// app.use(express.static("./styles"))

// //require the filesystem module
// const fs = require("fs")

// // define the template engine
// app.engine("perscholas", (filePath, options, callback) => {
//     fs.readFile(filePath, (err, content) => {
//       if (err) return callback(err);
  
//       // Here, we take the content of the template file,
//       // convert it to a string, and replace sections of
//       // it with the values being passed to the engine.
//       const rendered = content
//         .toString()
//         .replaceAll("#title#", `${options.title}`)
//         .replace("#content#", `${options.content}`);
//       return callback(null, rendered);
//     });
//   });

//   app.set("views", "./views"); // specify the views directory
// app.set("view engine", "perscholas"); // register the template engine





//Routes

app.get ('/', (req, res)=>{
    
    
    
    
    res.send("Movies");
})


//listening
app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`)
})




