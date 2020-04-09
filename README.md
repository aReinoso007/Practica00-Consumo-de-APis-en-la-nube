# Practica00-Consumo-de-APis-en-la-nube
### **CARRERA:** INGENIERIA DE SISTEMAS/COMPUTACIÓN. **ASIGNATURA:** PLATAFORMAS WEB
### **NRO. PRÁCTICA:** 3. **TITULO PRÁCTICA:**  Consumo de APIs web
### **OBJETIVO**:
   * Conocer las arquitecturas y patrones arquitectónicos web para el diseño de aplicaciones web
   * Interactuar con servicios web de plataformas en la nube.

  ### INSTRUCCIONES
  Desarrollar una aplicación web usando la API de OMDb. Tener en cuenta
  que se deben aplicar buenas prácticas para el desarrollo de la interfaz
  gráfica de usuario.
###  ACTIVIDADES A DESARROLLAR
 1. Identificar gráficamente la arquitectura y el patrón de diseño de la aplicación a desarrollar.
    ![Estructura](https://github.com/aReinoso007/Practica00-Consumo-de-APis-en-la-nube/blob/master/Consumo%20de%20Apis/imagenes/arquitectura.png)
    ## Arquitectura API:
      Es un modelo en el cual expone datos backend y funcionalidades de aplicaciones para usarse en nuevas aplicaciones, en esto la aplicación seria el crear un buscador de películas haciendo uso de la API obtenida en OMDB.com. 
      
 2. Generar una llave para consumir los servicios web de la API de OMDb.  
    ## Proceso:
    Para obtener esta llave API, se necesita dirigirse al sitio web http://www.omdbapi.com/ 
    Nos dirigimos a la sección “API KEY”
    ![Estructura](https://github.com/aReinoso007/Practica00-Consumo-de-APis-en-la-nube/blob/master/Consumo%20de%20Apis/imagenes/api-1.png)
 3. Crear un repositorio en GitHub con el nombre “Practica00 – Consumo de APIs en la nube” 
 4. Desarrollar una aplicación con HTML + CSS + Javascript + Web Services para buscar películas y toda su
    información de la base de datos de OMDb.
    Requisitos:
    * La aplicación Web debe permitir buscar la información de las películas tanto por el nombre (listado) como
      por el código (id) de cada película. 
      ##Proceso:
      ![Estructura](https://github.com/aReinoso007/Practica00-Consumo-de-APis-en-la-nube/blob/master/Consumo%20de%20Apis/imagenes/api-2.png)
      ```
      function buscarPorTitulo(){
      if(this.readyState == 4 && this.status == 200){
        data = JSON.parse(this.responseText)
        total = Math.round((data.totalResults)/10);
        bloquear();
        data.Search.forEach(movie =>{
          detalles += "<tr>"+
          "<td><img src="+movie.Poster + "></td" +
          "<td></td>"+
          "<td>" + movie.Title + "</td>" +
          "<td>" + movie.Year + "</td>" +
          "<td>" + movie.Type + "</td>" +
          "<td><a href='#'  style='text-decoration:none'     onclick=\"buscarPorID('" + movie.imdbID + "')\">'<i class='fas fa-info-circle'></i>'</a>" +
          "</tr>";     

          console.log(this.responseText);

        });
        document.getElementById("informacion").innerHTML = detalles;
      }

    * Además, se deberá visualizar toda la información disponible (plot=full) de la base de datos de películas
    ```
    xmlhttp.open("GET", "https://www.omdbapi.com/?apikey=70833c90&s="+titulo +"&plot=full",true);
    xmlhttp.send();
    ```
    * También, la aplicación deberá presentar un máximo de 5 películas por búsqueda. Es decir, si la búsqueda
      retorna más de 5 películas se deberá paginar los resultados.
      ```
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
                                      "<td><a href='#'  style='text-decoration:none'     onclick=\"buscarPorID('" + movie.imdbID + "')\">'<i class='fas fa-info-circle'></i>'</a>" +
                                       "</tr>"; 
                      });
                          document.getElementById("informacion").innerHTML = detalles;
                  }
              };

                  xmlhttp.open("GET", "https://www.omdbapi.com/?apikey=e38ce2e0&s=" + titulo + "&plot=full&page=" + pagina, true);
                  xmlhttp.send();
            }
        }
        ```

      
    * Por último, la interfaz gráfica de aplicada debe ser intuitiva y sencilla aplicando conceptos de experiencia
      de usuario (justificar en el informe).
      ## Justificacion
      Para mi interfaz de usuario he optado por colores suaves, que inviten al usuario y que no sean agresivos ni que salten mucho a la vista. He decidido poner la barra de búsqueda al principio, a manera que esto sea lo primero que vea el usuario, que pueda saber el propósito de mi aplicación sin necesidad de una explicación previa. 
      Todos los componentes de mí se encuentran centralizados, de esta manera el usuario es presentado con la información de manera directa sin necesidad de cambiar el enfoque en su mirada. 
      Por ultimo en la sección del pie de página he elegido un tono cercano al blanco para que se mezcle con el fondo de la página, manteniéndolo al final y de manera organizada evitando ser invasivo. 
      ![Estructura](https://github.com/aReinoso007/Practica00-Consumo-de-APis-en-la-nube/blob/master/Consumo%20de%20Apis/imagenes/ui-principal.png)
      
      ## Visualizar Resultados
      En esta parte he optado por un modelo a manera de cuadricula en la cual se presente de derecha a izquierda las cosas más importantes y que sean de interés para el usuario. 
      De esta manera el poster de la película se presenta primero, seguido del nombre de esta, para finalizar con un icono de información el cual permite al usuario acceder a información más a detalle de la película que sea de su interés, 

      ![Estructura](https://github.com/aReinoso007/Practica00-Consumo-de-APis-en-la-nube/blob/master/Consumo%20de%20Apis/imagenes/resultados.png)

      ## "VER MÁS"
      ![Estructura](https://github.com/aReinoso007/Practica00-Consumo-de-APis-en-la-nube/blob/master/Consumo%20de%20Apis/imagenes/ver%20mas.png)
      Se ha optado por un menú ‘Pop UP” el cual toma cierta porción de la interfaz gráfica, permitiendo presentar información más detallada de la película de interés y que esta pueda ser fácilmente visualizada por el usuario sin necesidad de estar recargando una nueva página para mostrar el contenido de una sola película. 
 
 5.  Realizar varios commits en la herramienta GitHub que demuestren el desarrollo de la aplicación.
 6.  Generar el informe de la práctica con el desarrollo de cada uno de los puntos descritos anteriormente.
 7.  En el archivo README del repositorio debe constar la misma información del informe de resultados de la práctica que se indica en el punto anterior. 
 8.  Subir al AVAC el informe del proyecto en formato *.pdf. El informe debe contar con conclusiones apropiadas
      y la firma de cada estudiante
 ### RESULTADO(S) OBTENIDO(S):
  * Identifica las diferentes arquitecturas Web para el desarrollo de aplicaciones.
 ### CONCLUSIONES:
  * Los estudiantes podrán identificar arquitecturas web utilizando servicios en la nube. Así como también,
    podrán consumir APIs y manipular objetos JSON.
 ### RECOMEDACIONES:
  * Aplicar conceptos de interacción humano máquina para el desarrollo de la GUI.
