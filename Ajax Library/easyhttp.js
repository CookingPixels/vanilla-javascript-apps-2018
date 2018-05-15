// ES6 Constructor
function easyHTTP() {
  this.http = new XMLHttpRequest();
}

// Make an HTTP GET request (added callback to make it asynch)
easyHTTP.prototype.get = function(url, callback) {
  this.http.open("GET", url, true);

  let self = this; // 'this' reassignment can be avoided using arrow functions

  this.http.onload = function() {
    if (self.http.status === 200) {
      callback(null, self.http.responseText);
    } else {
      callback("Error: " + self.http.status);
    }
  };

  this.http.send();
};

// Make an HTTP POST request (used to update resources, or when you don't know where a resource is, so you can let the server decide, if action is omitted it creates the resource item with the data sent in the request)
easyHTTP.prototype.post = function(url, data, callback) {
  this.http.open("POST", url, true);

  this.http.setRequestHeader("Content-type", "application/json");

  let self = this;
  this.http.onload = function() {
    // we don't need to check for status as it's a post request
    callback(null, self.http.responseText);
  };

  this.http.send(JSON.stringify(data));
};

// Make an HTTP PUT request (used to create resources or when you know where a resource is, the resource item must exist before you can PUT)
easyHTTP.prototype.put = function(url, data, callback) {
  this.http.open("PUT", url, true);

  this.http.setRequestHeader("Content-type", "application/json");

  let self = this;
  this.http.onload = function() {
    // we don't need to check for status
    callback(null, self.http.responseText);
  };

  this.http.send(JSON.stringify(data));
};

// Make an HTTP DELETE request, doesn't need data
easyHTTP.prototype.delete = function(url, callback) {
  this.http.open("DELETE", url, true);

  let self = this;
  this.http.onload = function() {
    if (self.http.status === 200) {
      callback(null, "Post Deleted");
    } else {
      callback("Error: " + self.http.status);
    }
  };

  this.http.send();
};
