$(document).ready(function() {
  // Get information from add form
  $("#search-btn").on("click", function() {
    $("#patientRecord").toggle();
    var name = $("#name")
      .val()
      .trim();
    var formatted_name = name.replace(/\s/g, "_");
    console.log(formatted_name);
    var full_name = "";

    $.get("/api/patient/name/" + formatted_name, function(data) {
      if (data) {
        $("#name").val("");
        $("#patientRecord").show();
        full_name += data.first_name;
        full_name += " ";
        full_name += data.last_name;
        $("#result").text("Patient Record");
        $(".bs-example").show();
        $("#notes").show();
        $("#trashbutton").show();
        $("#inputName").text(full_name);
        $("#inputDOB").text(data.dob);
        $("#textareaSymptoms").text(data.symptoms);
        $("#textareaDiagnosis").text(data.diagnosis);
        $("#textareaTreatment").text(data.treatment);
      } else {
        $("#name").val("");
        $("#patientRecord").show();
        $("#result").text("No Patient Found");
        $("#inputName").text("");
        $("#inputDOB").text("");
        $(".bs-example").hide();
        $("#notes").hide();
        $("#trashbutton").hide();
      }
    });
  });

  // Add minus icon for collapse element which is open by default
  $(".collapse.show").each(function() {
    $(this)
      .prev(".card-header")
      .find(".fa")
      .addClass("fa-minus")
      .removeClass("fa-plus");
  });

  // Toggle plus minus icon on show hide of collapse element
  $(".collapse")
    .on("show.bs.collapse", function() {
      $(this)
        .prev(".card-header")
        .find(".fa")
        .removeClass("fa-plus")
        .addClass("fa-minus");
    })
    .on("hide.bs.collapse", function() {
      $(this)
        .prev(".card-header")
        .find(".fa")
        .removeClass("fa-minus")
        .addClass("fa-plus");
    });

  // Devare information from database
  $("#trashbutton").on("click", function() {
    var name = $("#inputName")
      .text()
      .replace(/\s/g, "_");
    console.log(name);

    $.get("/api/patient/name/" + name, function(data) {
      $.ajax({
        method: "DELETE",
        url: "/api/patient/" + data.id
      });
      alert("Deleting patients...");
      $("#inputName").text("");
      $("#inputDOB").text("");
      $("#textareaSymptoms").text("");
      $("#textareaDiagnosis").text("");
      $("#textareaTreatment").text("");
    });
  });
});
