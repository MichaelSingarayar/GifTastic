$(document).ready(function () {

    var topics = ["Dachshund", "Tiger", "Bear", "Penguin", "Lion", "Cat", "Monkey", "Shark"];

    function renderButtons() {

        $("#animal-button").empty();
        for (var i = 0; i < topics.length; i++) {

            var a = $("<button>");
            a.addClass("animal");
            a.addClass("btn btn-dark")
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#animal-button").append(a);
        }
    }
    console.log(topics);
    renderButtons();

    $(".add-animal").on("click", function (event) {
        event.preventDefault();
        var ani = $("#animal-input").val().trim();
        if (ani == "") {
            return false;
        }
        topics.push(ani);
        renderButtons();
        return false;


    })


    function gifDis() {
        var roar = $(this).attr("data-name");




        console.log(this);

        console.log(roar);


        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + roar + "&api_key=QvEjzQdUUhnST1hMdDjH22swcp2OzLqn&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r") {
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gif")
                    
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    
                    var animalImg = $("<img>");
                    animalImg.attr("src", results[i].images.fixed_height_still.url);
                    animalImg.attr("data-still", results[i].images.fixed_height_still.url);
                    animalImg.attr("data-animate", results[i].images.fixed_height.url);
                    animalImg.attr("data-state", "still");
                    animalImg.addClass("image")

                    
                    gifDiv.append(animalImg);
                    gifDiv.append(p);

                    $("#gifs-here").prepend(gifDiv);
                }






            }



        });










    };

    $(document).on("click", ".animal", gifDis);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });



});