// Collapse all the sections
$("section").children(":not(h2,h3,h4,h5,h6)").hide();

// When a section's header is clicked...
$("section h2,h3,h4,h5,h6").click(function () {
    // ...toggle the section's content
    $(this).parent().children(":not(h2,h3,h4,h5,h6)").toggle();
});
