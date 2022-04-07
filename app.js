const homeStartingContent = "To read a blog   'COMPOSE'    first!";

const aboutContent = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam sunt accusamus quibusdam, ea, nobis dolor adipisci quasi, qui expedita possimus delectus eos quas officia saepe neque esse iste facere exercitationem!";

const contactContent = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum molestiae ea quam ipsum commodi perspiciatis error quasi nam laboriosam maiores recusandae ab odio sunt cupiditate, ipsa doloremque soluta neque exercitationem?"

const express = require("express");
const bodyParser = require('body-parser');
const lodash = require('lodash');

const posts = [];

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/",function(req, res){
    res.render("index",{
        homeContent : homeStartingContent, 
        allPosts : posts,
    });
})
app.get("/about",function(req,res){
    res.render("about",{aboutContent : aboutContent});
})
app.get("/contact", function(req,res){
    res.render("contact",{contactContent : contactContent});
})
app.get("/compose",function(req,res){
    res.render("compose");
})
app.get("/posts/:post", function(req,res){
    var requestedTitle = lodash.lowerCase(req.params.post);
    
    var pos = lodash.findIndex(posts,function(post){
        return lodash.lowerCase(post.title) == requestedTitle;
    })
    res.render("posts",{ post : posts[pos]});
   // posts.forEach(function(post){
   //     var existingTitle = lodash.lowerCase(post.title);
   //     if(requestedtitle==existingTitle){
   // }});
})

app.post("/",function(req,res){
    var titles = req.body.blogTitle;
    var bodys = req.body.blogContent;
    var post = {
        title : titles, 
        body : bodys,
    }
    posts.push(post);
    res.redirect("/");
})

app.listen(process.env.PORT||3000, function(){
    console.log("listening on PORT 3000!");
})