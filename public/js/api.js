//Decalring the Different Variable and Objects
var new_cases = document.getElementById("new_case");
var new_death = document.getElementById("new_death");
var total_death = document.getElementById("total_death");
var total_recovered = document.getElementById("total_recovered");
var total_cases = document.getElementById("total_cases");
// Fetching the Data from the server

//Fetching the World Data
fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
    "x-rapidapi-key": "ca23d0e808mshd2f630ae62cc87ep1afbd9jsn0afe9162f63a"
  }
})
  .then(function(response) {
    response.json().then(function(data) {
      console.log(data);
      total_cases.innerHTML = data.total_cases;
      new_cases.innerHTML = data.new_cases;
      new_death.innerHTML = data.new_deaths;
      total_death.innerHTML = data.total_deaths;
      total_recovered.innerHTML = data.total_recovered;
    });
  })
  .catch(function(err) {
    console.log(err);
  });
