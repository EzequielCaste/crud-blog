const express = require('express');
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/article');
const methodOverride = require('method-override')
const app = express ();

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/crud-blog", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }).catch(err=>{
  console.log(err)
})

app.set("view engine", "ejs");

//we can access all parameters from article Form inside our article route by accessing req.body.title
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname+"/public"))
app.use(methodOverride('_method'))


app.get('/', async (req,res)=>{
  const articles = await Article.find().sort({
    createdAt: 'desc' })
  res.render("./articles/index", { articles: articles })
})


app.use('/articles', articleRouter)

let port_number = app.listen(process.env.PORT || 3000);
app.listen(port_number);

