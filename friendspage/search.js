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
            template.innerHTML = friendInfoTemplate.trim()
            let img = template.content.querySelector('.profileImg')
            img.src = '../resources/straight-post-it.png';
            let h2 = template.content.querySelector('.profileName')
            h2.textContent = friend.name;
            let followBtn = template.content.querySelector('.follow-button')
            followBtn.title = 'Segui';
            followBtn.textContent = 'Segui';
            followBtn.addEventListener("click", function(){
                $.ajax({
                    type: "get",
                    url: "addfriend.php",
                    data: {email: friend.email},
                    success: function(response){
                        if (response === "Success") {
                            followBtn.title = 'Segui già';
                            followBtn.textContent = 'Segui già';
                        }
                    }
                });
            });
            $("#results").append(template.content);
        });
      }
    });
});