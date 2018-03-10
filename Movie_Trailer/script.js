$(document).ready(function(){

 //------------------------Creating Elements----------------------------//

 function newElement(element) {
    return document.createElement(element);
  }

  //---------------------Defining Variables----------------------------//
    const ul = document.getElementById('thumbnail');
    const picurl="https://scotch-mvplayer-api.herokuapp.com/api/v1";
    let i=0;
    let movie_array = [];
    let details_array = [];

 //----------------------------The code------------------------------//
    fetch(picurl)
    .then((response) => response.json())
    .then(function(data){
        let movies = data;
       console.log(movies);
        return movies.map(function (movie) {
            
            let div = newElement("div"); //creating div element
            div.className = "thumbnail"+i; //setting class of created div
            div.id="thumbnail"; //setting id of created div

            //-----------Creating Frame------------------------------//
            let trailer = movie.trailer;
            let frame = newElement("iframe");
            frame.src=trailer;
            frame.id="screen";


            movie_array.push(frame); //storing each frame in an array.

            // document.getElementById("video-player").appendChild(movie_array[0]);
            
            let name = movie.name;
            let year = movie.year;
            
            details_array.push({name: name, year: year});

            document.getElementById(""+i+"").appendChild(div);

            
            
            $(".thumbnail"+i+"").css('background-image', 'url('+movie.poster+')'); //adding poster for each movie to a div.
            
            i=i+1; //incrementing i to keep track of each movie.

            

        })

    })
    .catch(function(error) {
        console.log(error);
    });

    $(".preview").on('mouseenter', function(){
        var id = $(this).attr("id");
        var movie_name = details_array[id].name;
        var movie_year = details_array[id].year;
        var content = "<div class='preview_overlay'><span class='title'>"+movie_name+"</span><span class='year'>"+movie_year+"</span></div";

        $(".thumbnail"+id).html(content);
    });

    $('.preview').on('mouseleave', function() {
        var id = $(this).attr("id");
        
        $(".thumbnail"+id).html(" ");
    });

    $(".preview").click(function(){
        var id = $(this).attr("id");
        document.getElementById("screen").outerHTML = movie_array[id].outerHTML;
    });

});