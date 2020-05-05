$(document).ready(function() {

    // Get information from add form
    $("#search-btn").on("click", function() {
        $("#patientRecord").toggle();
        let name = $("#name").val().trim();
        let formatted_name = name.replace(/\s/g, "_").toLowerCase();

        $.get("/api/patient/name/" + formatted_name, function(data) {

            if (data) {
                $("#patientRecord").show();
                $("#inputFirstName").text(data.first_name),
                $("#inputLastName").text(data.last_name),
                console.log("Last Name: ", data.last_name),
                $("#inputDOB").text(data.dob),
                $("#textareaSymptoms").text(data.symptoms),
                $("#textareaDiagnosis").text(data.diagnosis),
                $("#textareaTreatment").text(data.treatment)
            } else {
                $("#inputFistName","#inputLastName").text("No patient found");
                $("#patientRecord").hide();
            }
        });
    });

    // Delete information from database
});
