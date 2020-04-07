var randMArray=['Star Wars', 'Game Of Thrones', 'The Big Bang Theory'];

function buscarPorTitulo(){
  var titulo = document.getElementById("titulo").value;
  var detalles="";
  if(titulo==""){
    detalles = "<tr>" + 
    "<td colspan='5'>No informacion disponible...</td>" +
    "</tr>";
    document.getElementById("informacion").innerHTML = detalles;

  }else{
    if(window.XMLHttpRequest){
      xmlhttp = new XMLHttpRequest();

    }else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        var data = JSON.parse(this.responseText)
        data.Search.forEach(movie => {
          detalles += "<tr>"+
                      "<td><a href='#' onclick=\"buscarPorID{'"+movie.imdbID + "')\">"+
                      "<td>" + movie.Title + "</td>" +
                      "<td>" + movie.Year + "</td>" +
                      "<td>" + movie.Type + "</td>" +
                      "<td><img src="+movie.Poster + "></td" +
                      "</tr>";                      
        });
        document.getElementById("informacion").innerHTML = detalles;
      }
    };
    //console.log(data)
    xmlhttp.open("GET", "https://www.omdbapi.com/?apikey=70833c90&s="+titulo +"&plot=full",true);
    xmlhttp.send();
  }
}


/*

function movieSearch(q){
  $.get("https://www.omdbapi.com/?s="+q+"&apikey=70833c90", function(rawdata){
  
  var rawString = JSON.stringify(rawdata);
  data = JSON.parse(rawString);
  for(var i=0; i < data.length;i++){

  }
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
*/