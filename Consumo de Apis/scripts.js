
var randMArray = ['Star Wars', 'Game Of Thrones', 'Harry Potter','The Big Bang Theory'];
var data;

function movieSearch(q){
  $.get("https://www.omdbapi.com/?s="+q+"&apikey=70833c90", function(rawdata){
  
  var rawString = JSON.stringify(rawdata);
  data = JSON.parse(rawString);
  var titulo = data.Search[0].Title;
  var anio = data.Search[0].Year;
  var url = "https://www.imdb.com/title/"+data.Search[0].imdbID+"/";

  var poster = data.Search[0].Poster;
    
  document.getElementById('answer').innerHTML="<h1>"+titulo+"</h1><br> <img src= '"+poster+"'><br><p> Year Released:"+anio+"</p> <br> <p> IMDB page: <a href='"+url+"'target='_blank'>"+url+"</a></p>"; 
  });
}
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