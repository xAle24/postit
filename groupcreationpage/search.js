$("#searchbar").on("input", function() {
    var searchQuery = $(this).val();
    $.ajax({
      url: 'search.php',
      type: 'POST',
      data: {search: searchQuery},
      success: function(data) {
        var results = JSON.parse(data);
        // Clear the list
        $("#results").empty();
        // Add each friend to the list
        $.each(results, function(index, friend) {
            console.log(friend);
            let template = document.createElement('template')
            template.innerHTML = studentInfoTemplate.trim()
            let img = template.content.querySelector('.profileImg')
            img.src = '../resources/straight-post-it.png';
            let h2 = template.content.querySelector('.profileName')
            h2.textContent = friend.name;
            let addBtn = template.content.querySelector('.add-button')
            addBtn.title = 'Aggiungi';
            addBtn.textContent = 'Aggiungi';
            addBtn.addEventListener("click", function(){
                $.ajax({
                    type: "get",
                    url: "addstudent.php",
                    data: {email: friend.email, groupName: document.getElementById("groupInput").value},
                    success: function(response){
                        if (response === "Success") {
                            addBtn.title = 'Aggiunto';
                            addBtn.textContent = 'Aggiunto';
                        }
                    }
                });
            });
            $("#results").append(template.content);
        });
      }
    });
});