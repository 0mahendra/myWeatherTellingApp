const express =require("express");
const path =require('path');
const hbs=require("hbs");
const app = express();

// imp 
app.use(express.json());
app.use(express.urlencoded({extended:false})); // iisi ki help se haam data ko get karege from the main site 


const port =  process.env.PORT ||8080;
const registration = require("./models/registration");
// yeh database ka schema ko add and connect karne ke liye 
// db wali file yah add karne ke liye 
require("./db/conn");
const staticpath=path.join(__dirname,"../public");
const changedName = path.join(__dirname,"../templets/views");
const partialPath = path.join(__dirname,"../templets/partials");
app.set("views" ,changedName);
app.set("view engine",'hbs');
hbs.registerPartials(partialPath);
app.use(express.static(staticpath));

app.get("/registration",(req,res)=>{
    res.render('registration');
})
app.get("/",(req,res)=>{
    res.render('login');
})

app.get("/home",(req,res)=>{
   res.render('index');
})
app.get("/about",(req,res)=>{
    res.render('about');
})
app.get("/weather",(req,res)=>{
    res.render('weather');
})
app.get("/train",(req,res)=>{
    res.render('train');
})
app.post("/registration",async (req,res)=>{
    try{
     const password1= req.body.pwd;
     const c1password = req.body.cpassward;
     if(password1==c1password){
       const takedata = new registration({
        Name:req.body.Name,
        UserName:req.body.UserName,
        age:password1,
        gender:c1password,
        email:req.body.email
        
       })
        //  console.log(req.body.pwd);
        //  console.log(req.body.cpassward);
        const studentData=await registration.insertMany(takedata);
        console.log(studentData);
        res.render("home");
        
     }
     
     else{
        res.send("password are not matching try again ");
     }

    }catch(err){
        console.log(err);
    }
})
app.post("/login",async(req,res)=>{
    try{
        const UserName = req.body.UserName;
        const pwd1 = req.body.pwd;
         
        console.log(UserName);
        console.log(pwd1);
        const userData = await registration.findOne({UserName:UserName});
        console.log(userData);
        if(userData.age == pwd1){
            res.render("home");
        }
        else{
            res.send("then password or email is not matching ")
        }
        

    }
    catch(err){
        console.log(err);
    }
})
app.get("*",(req,res)=>{
    res.render('404error');
       
});
app.listen(port,()=>{
    console.log(`listeniing to the port ${port}`);
});