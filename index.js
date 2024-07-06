const express=require("express");
const app=express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

const port=8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"barsha",
        content:"I am coding these days."
    },
    {
        id:uuidv4(),
        username:"barsha",
        content:"I am coding these days."
    },
    {
        id:uuidv4(),
        username:"barsha",
        content:"I am coding these days."
    }
];
//--------------------------------------------All posts-----------------------------------------------------------
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
//--------------------------------------------create new post-----------------------------------------------------------
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
//--------------------------------------------assign id to all posts-----------------------------------------------------------
app.post("/posts",(req,res)=>{
    // console.log(req.body);
    let id=uuidv4();
    let {username,content}=req.body;
    posts.push({id,username,content});
    res.redirect("/posts");
});
//--------------------------------------------show individual post-----------------------------------------------------------
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});
//-------------------------------------------------------------edit-----------------------------------------------------------
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    let newContent=req.body.content;
    post.content=newContent;
    // console.log(post);
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});
//------------------------------------------------------------delete-----------------------------------------------------------
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    // console.log(posts);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
});