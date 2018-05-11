// Book CONSTRUCTOR
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI CONSTRUCTOR
function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  // Create tr element
  const row = document.createElement("tr");

  // Insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="" class="delete">X</a></td>
  `;

  // Append created row to the empty tbody
  list.appendChild(row);
  // console.log(row);
};

// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement("div");
  // Add classes
  div.className = `alert ${className}`;
  // Add text, append it and use the message that comes from the function
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector(".container");
  // Get the form
  const form = document.querySelector("#book-form");
  // Insert alert, what we want to insert and what we want to insert before
  container.insertBefore(div, form);

  // Dissappear after 3 seconds
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete book
// Target only the 'X'
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    // DOM traversing from the X up to the <td>
    target.parentElement.parentElement.remove();
  }
};

// Clear fields
UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};
function Store() {}

Store.prototype.getBooks = function() {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  return books;
};
Store.prototype.displayBooks = function() {
  const books = Store.prototype.getBooks();

  books.forEach(function(book) {
    const ui = new UI();

    // Add book to UI
    ui.addBookToList(book);
  });
};
Store.prototype.addBook = function(book) {
  // We use the class name as we don't need it to instantiate, it's a static method
  const books = Store.prototype.getBooks();

  books.push(book);

  localStorage.setItem("books", JSON.stringify(books));
};
Store.prototype.removeBook = function(isbn) {
  // We need a unique identifier to know which entry we should remove, so we can use the ISBN
  // console.log(isbn);
  const books = Store.prototype.getBooks();

  books.forEach(function(book, index) {
    if (book.isbn === isbn) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem("books", JSON.stringify(books));
};

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.prototype.displayBooks());

// Event Listeners for add book
document.getElementById("book-form").addEventListener("submit", function(e) {
  // Get input form field values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);
  // console.log(book); // Already returns an object with every parameter

  // Instantiate UI
  const ui = new UI();

  console.log(ui);

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    Store.prototype.addBook(book);

    // Show success
    ui.showAlert("Book added!", "success");

    // Clear fields
    ui.clearFields();
  }

  // So, it doesn't submit
  e.preventDefault();
});

// If we have something that will show up more than once with the same class or something that is not there when the page loads but is dinamically added we use event delegation

// Event Listener for delete
document.getElementById("book-list").addEventListener("click", function(e) {
  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  Store.prototype.removeBook(
    e.target.parentElement.previousElementSibling.textContent
  );
  // Show message
  ui.showAlert("Book removed!", "success");

  e.preventDefault();
});
