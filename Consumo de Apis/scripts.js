
var data;
var detallesPeli; //esta es para los detalles especificos de una pelicula
var total;

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
var pagina = 1 ;



function buscarPorTitulo(){
  //obtenemos el valor que esta almacenando en nuestro input de tipo texto con un id ='titulo'
  var titulo = document.getElementById("titulo").value;

  var detalles = "";
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
      if(this.readyState == 4 && this.status == 200){
        //usamos JSON.parse para transformar los datos que se van a obtener de la respuesta
        data = JSON.parse(this.responseText)
        total = Math.round((data.totalResults)/10);
        bloquear();
        //un for each para iterar por cada uno de los elementos de la respuesta
        // movie => es una funcion lambda para optener el objeto de la respuesta
        data.Search.forEach(movie =>{
          detalles += "<tr>"+
          //vamos a obtener cado uno de las variables del objeto JSON
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

function nextPage() {  
  pagina = pagina + 1;
  paginacion(pagina);
}

function prevPage() { 

  pagina = pagina - 1;
  paginacion(pagina);

}
function bloquear(){
  var btnAtras = document.getElementById("btn-atras");
  var btnAdelante = document.getElementById("btn-adel");

  btnAdelante.disabled = false;

  if(pagina==1){
      btnAtras.disabled = true;
  }else {
      btnAtras.disabled = false;
  }

  if(pagina<total){
      btnAdelante.disabled = false;
  }else if(pagina==total){
      btnAdelante.disabled = true;
  }

  if(total==0){
      btnAdeltante.disabled = true;
      btnAtras.disabled = true;
  }
}


function paginacion(pagina) {
  var titulo = document.getElementById("titulo").value;
  var detalles = "";
  bloquear();
  if (titulo == "") {
      detalles = "<tr>" +
          "<td colspan='5'>No informacion disponible...</td>" +
          "</tr>";
      document.getElementById("tableDetallesPeliculas").innerHTML = detalles;
  } else {
      if (window.XMLHttpRequest) {
          xmlhttp = new XMLHttpRequest();
      } else {
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              data = JSON.parse(this.responseText)
              data.Search.forEach(movie => {
                  detalles += "<tr>" +
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

      xmlhttp.open("GET", "https://www.omdbapi.com/?apikey=e38ce2e0&s=" + titulo + "&plot=full&page=" + pagina, true);
      xmlhttp.send();
  }
}
