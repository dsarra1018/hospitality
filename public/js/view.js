//get information from add form
$("#search-btn").on("click", function() {
    $("patientRecord").toggle();
    // CHAD: #name-search can cause problems. i've renamed the variabel "name" here and in view.html.
    let searchedPatient= $("#name").val().trim(); // cannot be a const. you cannot assing a new value to const.

    searchedPatient = searchedPatient.replace(/\s+/g, "").toLowerCase();

    // CHAD: is this is a get or a post? if a get, why is the api called "add". I would rename this;
    // it is confusing. 
    $.get("/api/add", function(data) {
      console.log('this is the data' + data);
      if (data) {
        $("#patientRecord").show();
        $("#inputFirstName").text(data.first_name),
        $("#inputLastName").text(data.last_name),
        $("#inputDOB").text(data.dob),
        $("#textareaSymptoms").text(data.symptoms),
        $("#textareaDiagnosis").text(data.diagnosis),
        $("#textareaTreatment").text(data.treatment)
      } else {
        $("#inputFirstName","#inputLastName").text(
          "No patient found");
          $("#patientRecord").hide();
      }
    });
});
    
    // search for patient
    $.get('/search', (req, res) => {
        const {term} = req.query;
        console.log(req.query);
    })


$(function() {

  // Add a new burger.
  $(".create-form").on("submit", function(event) {
      event.preventDefault();

      var newBurger = {
          burger_name: $("#newburger").val().trim(),
          devoured: 0
      };

      // Send the POST request.
      $.ajax("/api/burgers", {
          type: "POST",
          data: newBurger
      }).then(function() {
          console.log("Added new burger");
          // Reload the page to get the updated burger list.
          location.reload();
      });
  });

  $(".eatburger").on("click", function(event) {
      event.preventDefault();

      var id = $(this).data("id");
      var devouredState = {
          devoured: 1
      };

      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
          type: "PUT",
          data: devouredState
      }).then(function() {
          console.log("Burger devoured");
          location.reload();
      });
  });

  $(".trashburger").on("click", function(event) {
      event.preventDefault();

      var id = $(this).data("id");

      // Send the DELETE request.
      $.ajax({
          type: "DELETE",
          url: "/api/burgers/" + id
      }).then(location.reload());
  });

})
