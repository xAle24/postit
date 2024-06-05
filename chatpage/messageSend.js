function sendMessage() {
    var textMessage = document.getElementById("message-input").value;
    $.ajax({
        type: "post",
        url: "messageSend.php",
        data: {text: textMessage},
        success: function(response) {
            console.log("Inviato con successo");
            document.getElementById("message-input").value = "";
        }
    });
}