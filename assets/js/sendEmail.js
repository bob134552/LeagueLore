  
function sendMail(ideaForm) {
    emailjs.send("gmail", "leaguelore", {
        "from_name": ideaForm.name.value,
        "from_email": ideaForm.emailaddress.value,
        "idea_suggestions": ideaForm.idea.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;
}