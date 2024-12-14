const express=require("express");
  
const app=express();

const auth=require('./middleware/auth');

const dbconnection=require("./database/db")

console.log(auth.middleware);


// Middleware to parse JSON body
app.use(express.json());

//reques handler

// basic route
app.get("/product",auth.middleware,(req,res)=>{
    res.send("list of product availble here");
})

app.get("/getuser",(req,res)=>{
    res.send("list of users::");
})

//route with parameters::

app.get("/users/:id",(req,res)=>{
    //get id or other thing from url use req.params
    let user_id=req.params.id;
    res.send(`here is user id ${user_id}`)
})
app.get("/users/:id/:book_id",(req,res)=>{
    //get id or other thing from url use req.params
    let user_id=req.params.id;
    let book_id=req.params.book_id;
    res.send(`here is user id ${user_id} and book id is ${book_id}`)
})

//query parameters:
//query parameter is pass after url with ? symbol ::
app.get('/queryparameter',(req,res)=>{
    console.log(req.query);
    const {first,second}=req.query;
    res.send(`first val is ${first} and second one is ${second}`);
})

app.get('/login', (req, res) => { // Access data from the body
    res.send(`login successfully ::`);
  });


  app.post('/login', (req, res) => {
    const { username, password } = req.body; // Access data from the body
    res.send(`Username: ${username}, Password: ${password}`);
  });





app.post("product?user_id=1",(req,res)=>{
    console.log(req.params);
    console.log("geting user id");
    
})


app.use("/",(req,res)=>{
   return  res.send("base url functionality::");
})


//server listen
app.listen(4000,()=>{
    console.log("Server is successfully listing on port 4000....");
});
console.log("Creating project using mongodb,node.js and react.js ");  
