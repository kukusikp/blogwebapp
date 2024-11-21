import express from "express";

const app = express();
const port = 443;
const bodyPars = express.urlencoded({extended:true});
let posts = [];
let currentPost = new Post("", "");

function Post (title, content) {
  this.id = new Date().getTime();
  this.title = title;
  this.content = content;
}

function savePost(posts, post) {
  let index = findPostIndex(posts, post.id);
  if (index !== -1) {
    posts[index] = post;
  } else {
    posts.push(post);
  }
}

function deletePost(posts, post) {
  let index = findPostIndex(posts, post.id);
  if (index !== -1) {
    posts.splice(index, 1);
  }
}

function findPostIndex(posts, id) {
  let index = -1;
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id == id) {
      index = i;
      break;
    }
  }
  return index;
}

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

app.post("/", (req, res) => {
  res.redirect("/");
});

app.post("/view", bodyPars, (req, res) => {
  let index = findPostIndex(posts, req.body["id"]);
  currentPost = posts[index];
  res.render("view.ejs", { post: currentPost });
});

app.post("/edit", bodyPars, (req, res) => {
  let index = findPostIndex(posts, req.body["id"]);
  currentPost = posts[index];
  res.render("edit.ejs", { post: currentPost });
});

app.post("/save", bodyPars, (req, res) => {
  let success = false;
  currentPost.id = req.body["id"];
  currentPost.title = req.body["title"];
  currentPost.content = req.body["content"];
  if ((currentPost.title !== "") || (currentPost.content !== "")) {
    savePost(posts, currentPost);
    success = true;  
  }
  res.render("edit.ejs", { post: currentPost, success: success });
});

app.get("/write", (req, res) => {
  currentPost = new Post("", "");
  res.render("edit.ejs", { post: currentPost });
});

app.post("/delete", bodyPars, (req, res) => {
  currentPost.id = req.body["id"];
  currentPost.title = req.body["title"];
  currentPost.content = req.body["content"];
  deletePost(posts, currentPost);
  res.redirect("/");
});

app.all("*", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  initialize();
  console.log(`Server running on port ${port}`);
});

function initialize() {
  currentPost = new Post("Cras ex ante, elementum in dictum ac, scelerisque eu nibh.", "Fusce vel malesuada est, a cursus est. Nullam massa turpis, interdum et vulputate at, congue in dui. Maecenas sed odio vel augue porta sollicitudin in non tellus. Donec id augue placerat, tempus lacus quis, tincidunt nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam sed magna gravida, vulputate risus nec, convallis ligula. Pellentesque feugiat mauris ac leo tincidunt convallis. Nulla viverra consectetur lorem, vitae laoreet nisi blandit ornare. Praesent auctor eros lacus, in porttitor nulla ornare tristique. Vivamus quis dignissim urna. Vivamus semper pharetra leo, vehicula rhoncus mi commodo quis. Donec imperdiet, odio non sodales tristique, orci sapien hendrerit odio, quis scelerisque felis dui in arcu. In augue libero, condimentum vitae est nec, elementum viverra velit. Maecenas lacinia auctor metus nec ultrices. Sed ultricies eros vel quam accumsan, in aliquet orci congue. Donec id elementum libero.");
  currentPost.id -= 4;
  savePost(posts, currentPost);
  currentPost = new Post("Nullam auctor sodales enim ut consectetur.", "Integer fermentum lacinia enim et posuere. Vestibulum euismod lacus eros, vel ultrices nunc luctus at. Ut placerat, dui eget rhoncus interdum, lectus libero malesuada nisi, eget imperdiet sem sapien sit amet neque. Nullam maximus, nisi eget pulvinar scelerisque, nunc ante dignissim felis, sed venenatis leo urna nec ligula. Vivamus vehicula egestas sollicitudin. Curabitur vitae lobortis risus. Etiam vehicula, massa non blandit laoreet, erat nisi elementum ligula, a aliquet diam urna vitae tortor. Donec vehicula, justo sit amet laoreet sagittis, velit orci sagittis leo, ac vestibulum elit purus at nulla.");
  currentPost.id -= 3;
  savePost(posts, currentPost);
  currentPost = new Post("Praesent faucibus egestas scelerisque.", "Vestibulum mi ligula, maximus at sollicitudin non, eleifend nec ex. Cras eleifend felis ac condimentum pulvinar. Nullam sed imperdiet tortor. Aenean non hendrerit magna. Quisque mauris arcu, rutrum et leo eu, consequat interdum leo. Morbi eget aliquam quam. Proin euismod aliquam nibh. Aliquam in congue urna, nec viverra eros.");
  currentPost.id -= 2;
  savePost(posts, currentPost);
  currentPost = new Post("Integer ex urna, blandit sit amet iaculis tincidunt.", "Mauris a nisl eu est suscipit facilisis. Nullam et ipsum convallis, lacinia ligula sit amet, condimentum mi. Maecenas id vehicula nibh. Aliquam sed nisi id risus consectetur commodo non vitae enim. In sed porta sapien. Donec feugiat nibh diam, quis tincidunt turpis varius eu. Pellentesque sodales massa a orci ultricies vehicula id vitae ex. Duis viverra elementum vestibulum. Cras finibus finibus elit eget fermentum. Proin et sodales leo, ut rutrum tortor. Sed eget malesuada ligula, sed mattis libero. Quisque quis pellentesque magna. Donec sollicitudin pharetra erat, at congue elit imperdiet vitae. Integer sollicitudin scelerisque nisl. Duis nec turpis volutpat, bibendum tellus a, sagittis mauris.");
  currentPost.id -= 1;
  savePost(posts, currentPost);
  currentPost = new Post("Mauris eu mattis odio.", "Nunc cursus rutrum suscipit. In efficitur justo nec odio tempus sodales. Integer faucibus ex ex, eget fringilla urna malesuada nec. Aliquam erat volutpat. Donec eleifend eros nec nibh aliquam cursus. Mauris semper sapien eu augue posuere, vel rhoncus turpis semper. Integer sit amet libero ac odio facilisis pulvinar at at elit. Quisque in condimentum lacus. Proin risus ligula, accumsan in ligula ac, tristique ultricies arcu.");
  savePost(posts, currentPost);
  currentPost = new Post("", "");
}
