$(document).ready(function() {
    //get information from add form
    $("#search-btn").on("click", function() {
        $("patientRecord").toggle();
        let name = $("#name").val().trim();                             // First Last
        let formattedName = name.replace(/\s/g, '_').toLowerCase();     // first_last
      
         $.get("/api/patient/name/" + formattedName, function(data) {

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
});
