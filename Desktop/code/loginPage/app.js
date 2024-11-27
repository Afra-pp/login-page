const express = require("express")
const session = require("express-session")
const nocache = require('nocache');

const app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))

app.use(nocache())
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");

const PORT = 3000;

app.get("/",(req,res)=>{
    if(req.session.isAuth){
        res.redirect("/home");
    }else{
        res.redirect("/login");
    }
})

app.get("/login",(req,res)=>{
    if(req.session.isAuth){
        res.redirect("/home")
        }else{
            res.render("login")
        }
})

const data = {
    name:"afra",
    password:"1234"
}

app.post("/login",(req,res)=>{
    if(data.name === req.body.name && data.password === req.body.password){
        req.session.isAuth = true;
        res.render("home");
    }else{
        res.redirect("/login")
    }
})

app.get("/home",(req,res)=>{
    if(req.session.isAuth){
        res.render("home");
    }else{
         res.redirect("/")
    }  
})

app.get("/logout",(req,res)=>{
    req.session.destroy()
    res.redirect("/")
})

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})