$(document).ready(function() {

    // Get information from add form
    $("#search-btn").on("click", function() {
        $("#patientRecord").toggle();
        let name = $("#name").val().trim();
        let formatted_name = name.replace(/\s/g, "_");
        let full_name = "";

        $.get("/api/patient/name/" + formatted_name, function(data) {

            if (data) {
                $("#patientRecord").show();
                full_name += data.last_name,
                full_name += ", ",
                full_name += data.first_name,
                $("#inputName").text(full_name),
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

    // Add minus icon for collapse element which is open by default
    $(".collapse.show").each(function() {
        $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
    });

    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on('show.bs.collapse', function() {
        $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
    }).on('hide.bs.collapse', function() {
        $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
    });

    // Delete information from database
    $("#trashbutton").on("click", function() {
        let id = $(this).data("id");
        console.log(id);
        $.ajax({
            method: "DELETE",
            url: "/api/patient/" + id
        });
    });
});
