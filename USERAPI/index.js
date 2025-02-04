const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use("/api/products", productRoute);




app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});


mongoose
  .connect(
    "mongodb+srv://susmithaannalex:icwEYG8N910mvsFp@backenddb.i1uho.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });


/*const http = require("http");
const fs = require("fs");
const path = require("path");


const server = http.createServer((req,res)=> {

    fs.readFile(path.join(__dirname,"views", "index.html"),"utf8",(err,data)=> {
        if (err) throw err;
        res.writeHead(200,{"Content-Type" :"text/html"});
        //res.write("This is Node.js");
    
        console.log(req.url);
    
        res.end(data);

    })

    if(req.url ==="/contact"){
        fs.readFile(path.join(__dirname,"contact", "contact.html"),"utf8",(err,data)=> {
            if (err) throw err;
            res.writeHead(200,{"Content-Type" :"text/html"});
            //res.write("This is Node.js");
        
            console.log(req.url);
        
            res.end(data);
    
        })
    }
        
   
});

const PORT =process.env.PORT || 3001;


server.listen(PORT,()=>console.log(`Server running on ${PORT}`));
*/