var randMArray=['Star Wars', 'Game Of Thrones', 'The Big Bang Theory'];
var data;
var detalles;
var detallesPeli; //esta es para los detalles especificos de una pelicula

//vamos a definir variables las cuales van a optener datos de la respuesta a nuestra peticion, esto con la finalidad de
//presentarlas mediante una inyeccion con AJAX
var title;
var poster;
var rated;
var anio;
var genero;
var director;
var escritor;
var imdbRat;
var production;
var plot;

function paginacion(){


}
function buscarPorTitulo(){
  //obtenemos el valor que esta almacenando en nuestro input de tipo texto con un id ='titulo'
  var titulo = document.getElementById("titulo").value;

  detalles="";
  //si el cuadro de texto input esta vacio entonces retornamos que no se ha encontrado nada
  if(titulo==""){
    detalles = "<tr>" + 
    "<td colspan='5'>No se encontro nada...</td>" +
    "</tr>";
    //iyeccion a html con ajax
    document.getElementById("informacion").innerHTML = detalles;

  }else{
    //si el cuadro de busqueda tiene contenido entonces
    //verificamos la peticion y sino hay una entonces la creamos
    if(window.XMLHttpRequest){

      //definimos una vaiable con esta respuesta
      xmlhttp = new XMLHttpRequest();

    }else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //una vez ya esta la peticion lista entonces enviamos una funcion vacia para verificar que se la haya procesado correctamente
    xmlhttp.onreadystatechange = function(){
      // una respuesta de 200 significa que ha sido satisfactoria
      if(this.readyState == 4 && this.status == 200){

        //usamos JSON.parse para transformar los datos que se van a obtener de la respuesta
        data = JSON.parse(this.responseText)

        //un for each para iterar por cada uno de los elementos de la respuesta
        // movie => es una funcion lambda para optener el objeto de la respuesta
        data.Search.forEach(movie => {

          //lo que se va a inyectar en nuestra pagina
          detalles += "<tr>"+
                      //vamos a obtener cado uno de las variables del objeto JSON
                      "<td><img src="+movie.Poster + "></td" +
                      "<td></td>"+
                      "<td>" + movie.Title + "</td>" +
                      "<td>" + movie.Year + "</td>" +
                      "<td>" + movie.Type + "</td>" +
                      "<td><a href='#'  style='text-decoration:none'     onclick=\"buscarPorID('" + movie.imdbID + "')\">'<i class='fa fa-eye'></i>'</a>" +
                      "</tr>";     
                      console.log(data.totalResults);
                      console.log(this.responseText);     
                                  
        });
        //para hacer un inyeccion con ajax, en nuestro html tenemos un div con un id = "informacion"
        document.getElementById("informacion").innerHTML = detalles;
      }
    };
    //especificamos el tipo de request que vamos a hacer, establecemos a donde vamos a realizar este quest
    xmlhttp.open("GET", "https://www.omdbapi.com/?apikey=70833c90&s="+titulo +"&plot=full&page=9",true);
    //enviamos nuestro request
    xmlhttp.send();
  }
}

//esta funcion es para cuando se le da click en el ojo de 'detalles'
function displayFullInfo(idMovie){

  //verificar que haya un entrada de parte del usuario
  if (idMovie == ""){
    "<td colspan = 5>No hay informacion disponible por el momento... </td>" +
    "</tr>";

    //para realizar una inyeccion con ajax en html
    document.getElementById("informacion").innerHTML = detalles;
  } else {
    if(window.XMLHttpRequest){
      xmlhttp = new XMLHttpRequest();
    }else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //cuando ya este todo listo mandamos una funccion vacia
    xmlhttp.onreadystatechange = function () {
      //cuando se recibe una respuesta con estatus 200 significa que el request fue bien, que se ha hecho la conexion
      if(this.readyState == 4 && this.status ==200){
        
        detallesPeli = JSON.parse(this.responseText)
        poster = "<img src="+detallesPeli.Poster +">";
        title = detallesPeli.Title;
        anio = detallesPeli.Year;
        genero = detallesPeli.Genre;
        rated = detallesPeli.Rated;
        imdbRat = detallesPeli.imdbRating;
        director = detallesPeli.Director;
        plot = detallesPeli.Plot;
        
        document.getElementById("txtTitle").innerHTML = title;
        document.getElementById("poster").innerHTML = poster;
        document.getElementById("anio").innerHTML = anio;
        document.getElementById("rated").innerHTML = rated;
        document.getElementById("imDB").innerHTML = imdbRat;
        document.getElementById("genero").innerHTML = genero;
        document.getElementById("Director").innerHTML = director;
        document.getElementById("plot").innerHTML = plot;
      }
    };
    xmlhttp.open("GET", "https://www.omdbapi.com/?i=" + idMovie + "&apikey=70833c90&s", true);
    xmlhttp.send();

  }

}
function buscarPorID(id) {
  data.Search.forEach(mov => {
      if (mov.imdbID == id) {
          displayFullInfo(id);
      }

  });
  overlay = document.getElementById('popupWindow');
  popup = document.getElementById('popup');



  overlay.classList.add('active');
  popup.classList.add('active');
}


function cerrarPopup() {
    overlay = document.getElementById('popupWindow');
    popup = document.getElementById('popup');
    overlay.classList.remove('active');
    popup.classList.remove('active');
}
