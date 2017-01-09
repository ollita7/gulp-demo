 $.ajax({
        url: "https://restcountries.eu/rest/v1/all"
    }).then(function(data) {
        $.each( data, function( key, value ) {
            $("#country-list").append("<p>Nombre: " + value.name + "(" + value.alpha2Code + ")");
        });

      console.log(data);
    });