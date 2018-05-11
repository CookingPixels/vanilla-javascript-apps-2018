// Refactor into ES6

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
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
  }

  showAlert(message, className) {
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
  }

  deleteBook(target) {
    if (target.className === "delete") {
      // DOM traversing from the X up to the <td>
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Local storage class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI();

      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    // We use the class name as we don't need it to instantiate, it's a static method
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    // We need a unique identifier to know which entry we should remove, so we can use the ISBN
    // console.log(isbn);
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

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

    // Add to LS
    Store.addBook(book);

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

  // Remove from LS, we get the ISBN number to use as ID
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show message
  ui.showAlert("Book removed!", "success");

  e.preventDefault();
});

// UI.prototype.addBookToList = function(book) {...}

// UI.prototype.showAlert = function(message, className) {...}

// IS EQUIVALENT IN ES6:

// class UI {
//   addBookToList(book) {...}
//   showAlert(message, className) {...}
// }
