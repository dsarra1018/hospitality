

//get information from add form
$("#search-btn").on("click", function() {
    $("patientRecord").toggle();
    const searchedPatient= $("#name-search").val().trim();

    
    
    searchedPatient = searchedPatient.replace(/\s+/g, "").toLowerCase();

    $.get("/api/add/" + searchedPatient, function(data) {
      console.log(data);
      if (data) {
        $("#patientRecord").show();
        $("#inputFirstName").text(data.firstName),
        $("#inputLastName").text(data.lastName),
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
app.get('/search', (req, res) => {
    const {term} = req.query;

})

