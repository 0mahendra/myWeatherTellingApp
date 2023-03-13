const express =require("express");
const path =require('path');
const hbs=require("hbs");
const app = express();

const port =  process.env.PORT ||8080;
const staticpath=path.join(__dirname,"../public");
const changedName = path.join(__dirname,"../templets/views");
const partialPath = path.join(__dirname,"../templets/partials/");
app.set("views" ,changedName);
app.set("view engine",'hbs');
hbs.registerPartials(partialPath);
app.use(express.static(staticpath));


app.get("/",(req,res)=>{
   res.render('index');
});
app.get("/about",(req,res)=>{
    res.render('about');
});
app.get("/weather",(req,res)=>{
    res.render('weather');
});
app.get("/train",(req,res)=>{
    res.render('train');
});
app.get("*",(req,res)=>{
    res.render('404error');
       
});
app.listen(port,()=>{
    console.log(`listeniing to the port ${port}`);
});