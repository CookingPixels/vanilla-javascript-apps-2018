const http = new easyHTTP();

// Get posts synch
// const posts = http.get("https://jsonplaceholder.typicode.com/posts");
// console.log(posts);

// Get posts asynch, with a callback already defined in the library as 'self.http.responseText'
// http.get("https://jsonplaceholder.typicode.com/posts", function(err, posts) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(posts);
//   }
// });

// Get single post
// http.get("https://jsonplaceholder.typicode.com/posts/1", function(err, post) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

// Create Data
const data = {
  title: "Custom Post",
  body: "This is a custom post"
  // ID gets added automatically by the API, it should return 'ID: 101' (the last one + 1)
};

// Create POST request
// http.post("https://jsonplaceholder.typicode.com/posts/", data, function(
//   err,
//   post
// ) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

// Update Post
// http.put("https://jsonplaceholder.typicode.com/posts/5", data, function(
//   err,
//   post
// ) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

// Delete post
http.delete("https://jsonplaceholder.typicode.com/posts/1", function(
  err,
  response
) {
  if (err) {
    console.log(err);
  } else {
    console.log(response);
  }
});
