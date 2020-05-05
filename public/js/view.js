//get information from add form
$("#search-btn").on("click", function() {
    $("patientRecord").toggle();
    let searchedPatient= $("#name").val().trim();

    searchedPatient = searchedPatient.replace(/\s+/g, "").toLowerCase();

    $.get("/api/add", function(data) {
      console.log("this is the data" + data);
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
