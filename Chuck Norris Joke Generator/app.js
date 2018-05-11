document.querySelector(".get-jokes").addEventListener("click", getJokes);

function getJokes(e) {
  const number = document.querySelector('input[type="number"]').value;
  // console.log(number);

  const xhr = new XMLHttpRequest();

  xhr.open("GET", `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      console.log(response);

      // Empty and let, as it will be changed
      let output = "";

      if (response.type === "success") {
        // Response its an object, not an array, but we need to loop through it. You need to check first how the API is formatted, in this case the API returns an array inside a value object
        response.value.forEach(function(joke) {
          // Append, not overwrite
          output += `<li>${joke.joke}</li>`;
        });
      } else {
        // Append, not overwrite
        output += "<li>Something went wrong</li>";
      }

      document.querySelector(".jokes").innerHTML = output;
    }
  };

  xhr.send();
  e.preventDefault();
}
