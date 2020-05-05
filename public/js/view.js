$(document).ready(function() {

    // Get information from add form
    $("#search-btn").on("click", function() {
        $("#patientRecord").toggle();
        let name = $("#name").val().trim();
        let formatted_name = name.replace(/\s/g, "_");

        $.get("/api/patient/name/" + formatted_name, function(data) {

            if (data) {
                $("#patientRecord").show();
                $("#inputFirstName").text(data.first_name),
                $("#inputLastName").text(data.last_name),
                $("#inputDOB").text(data.dob),
                $("#textareaSymptoms").text(data.symptoms),
                $("#textareaDiagnosis").text(data.diagnosis),
                $("#textareaTreatment").text(data.treatment)
            } else {
                $("#patientRecord").show();
                $("#result").text("No Patient Found");
                $(".bs-example").hide();
                $("#trashbutton").hide();
            }
        });
    });
});
