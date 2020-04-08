var randMArray=['Star Wars', 'Game Of Thrones', 'The Big Bang Theory'];

function buscarPorTitulo(){
  var titulo = document.getElementById("titulo").value;
  var detalles="";
  if(titulo==""){
    detalles = "<tr>" + 
    "<td colspan='5'>No se encontro nada...</td>" +
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
                      
                      "<td><img src="+movie.Poster + "></td" +
                      "<td></td>"+
                      "<td>" + movie.Title + "</td>" +
                      "<td>" + movie.Year + "</td>" +
                      "<td>" + movie.Type + "</td>" +
                      "<td><a href='#'  style='text-decoration:none'     onclick=\"buscarPorID('" + movie.imdbID + "')\">'<i class='fa fa-eye'></i>'</a>" +
                      "</tr>";          
                                  
        });
        document.getElementById("informacion").innerHTML = detalles;
      }
    };

    xmlhttp.open("GET", "https://www.omdbapi.com/?apikey=70833c90&s="+titulo +"&plot=full",true);
    xmlhttp.send();
  }
}


