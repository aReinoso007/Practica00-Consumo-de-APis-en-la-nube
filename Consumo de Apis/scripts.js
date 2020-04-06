var randMArray = ['Star Wars', 'Game Of Thrones', 'Harry Potter','The Big Bang Theory'];


function apiCall() {
  
  //$. para correr JQueries
  var randNumb = Math.floor((Math.random() * randMArray.length - 1) + 1 );
  var randMovie = randMArray[randNumb];

  $.getJSON('https://www.omdbapi.com/?t=' + encodeURI(randMovie)+'&apikey=70833c90').then(function(response){
    
    var image = response.Poster;
    if(image !== 'N/A'){
      //si el request retorna falso a la respuesta N/A entonces se reemplaza la foto de 'no image' por la que se obtiene de la respuesta
      $('img').attr('src', image)
    }

  });
  //.then es una promesa, es algo que se haga una vez se ha obtenido los datos, 
}

//obtiene la variable 'button'
apiCall();