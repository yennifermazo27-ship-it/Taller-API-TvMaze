MOVIE EXPLORER

-Descripción del proyecto:
Esta es una aplicación que hace uso del lenguaje de etiquetas HTML, los estilos del CSS y la manipulación de la lógica y el DOM por medio de javascript.

La aplicación consume una API llamada TV Maze. Con ella se puede obtener información de películas y series. En el home aparecen algunas opciones del contenido que tiene la API. En la aplicación, el usuario puede buscar las películas que quiera y consultar su información a darle clic en el botón "Ver detalles". Además, las películas o series que se quieran guardar en el LocalStorage del navegador, solo hay que darle en el botón de "Favoritos" para hacerlo.

-Integrantes:
Yennifer Mazo
Juan Andrés Felipe Castro Londoño

-Funcionalidades implementadas:

Yennifer -> Desarrolló el buscador de películas, el filtro por géneros, la paginación, la función para guardar favoritos.

Juan Andrés Felipe -> Enlazó la sección de información detallada de las películas o series, a la aplicación.

-INSTRCCIONES PARA EJECUTAR EL PROYECTO:
Taller: Movie Explorer con
TVMaze

Desarrollar una aplicación web multipágina utilizando HTML, CSS y JavaScript
que permita explorar series o películas utilizando una API pública. La aplicación
debe permitir navegar entre resultados, buscar contenido, ver detalles de una
serie y gestionar una lista de favoritos persistente usando almacenamiento del
navegador. Además, debe de verse bien en todos los dispositivos.

La API a utilizar será:
https://api.tvmaze.com

Ejemplos de endpoints útiles:
https://api.tvmaze.com/shows
https://api.tvmaze.com/search/shows?q=batman

El proyecto debe desarrollarse en equipos de tres personas utilizando Git para integrar el trabajo.

Estructura del proyecto

El proyecto debe organizarse con la siguiente estructura base:

movie-explorer/
    index.html
    otros...
        
        css/
            styles.css
            otros...

        js/
            main.js
            ui.js
            persistance.js
            storage.js
            service.js
            state.js

            assets/

Los archivos de JavaScript pueden mantenerse como archivos únicos o convertirse en carpetas con módulos internos si el equipo lo considera necesario.

Ejemplos válidos:
    
    js/service.js

o

    js/service/movies.js
    js/service/search.js

Otro ejemplo:

    js/ui.js

o

    js/ui/renderMovies.js
    js/ui/renderPagination.js

La estructura elegida debe mantenerse consistente durante todo el proyecto.

Página principal
La página principal será index.html .
Al ingresar a la aplicación se debe cargar automáticamente una lista de series o
películas desde la API de TVMaze.
La información se debe mostrar en forma de tarjetas con al menos:
-imagen
-nombre
-géneros
-rating

Las tarjetas deben generarse dinámicamente utilizando JavaScript.
Ejemplo visual esperado:

[ imagen ]

Nombre de la serie
Géneros
Rating
Ver detalles
Agregar a favoritos

Buscador en la página principal

En la parte superior de la página principal debe existir un campo de búsqueda.
El usuario debe poder escribir el nombre de una serie o película y obtener
resultados desde la API.

Ejemplo de uso:

    Buscar serie o película: [_________]

La búsqueda debe realizarse mediante fetch hacia el endpoint:
    
    https://api.tvmaze.com/search/shows?q=termino

Los resultados deben mostrarse en la misma interfaz donde se muestran las series iniciales.

Sistema de paginación:
La lista de resultados debe estar paginada.
El sistema de paginación debe incluir:
-botón para página anterior
-botón para página siguiente
-indicador de página actual
-selector para definir cuántos elementos mostrar por página

Ejemplo:

    Mostrar por página:
        10 | 20 | 50

Al modificar esta opción se debe recalcular la paginación.
La paginación debe implementarse completamente en JavaScript manipulando el
DOM.

Página de detalle:
Al hacer clic en una serie o película se debe abrir una página de detalle.

Ejemplo de URL:
    
    show.html?id=123

Esta página debe obtener el parámetro id desde la URL y consultar la API para obtener la información completa.

Ejemplo de consulta:
    
    https://api.tvmaze.com/shows/123

La página de detalle debe mostrar:
-imagen
-nombre
-resumen
-géneros
-rating
-idioma
-estado
-fecha de estreno
-También debe existir un botón para agregar la serie a favoritos.

Página sistema de favoritos:
La aplicación debe permitir guardar series o películas como favoritas. Al agregar una serie a favoritos se debe almacenar en localStorage. Las series favoritas no deben duplicarse. Debe existir una página dedicada para visualizar los favoritos.

Ejemplo:

    favorites.html

Esta página debe mostrar:

-imagen
-nombre
-enlace para ver detalles
-botón para eliminar de favoritos

Si no existen favoritos debe mostrarse un mensaje indicando que la lista está
vacía.

istorial de búsquedas:
El sistema debe guardar en localStorage las búsquedas realizadas por el usuario. La aplicación debe mostrar un listado de búsquedas recientes.

Ejemplo:

    Búsquedas recientes
        batman
        game of thrones
        vikings

Al hacer clic en una búsqueda del historial se debe ejecutar nuevamente la
consulta.

Sistema de filtrado:
La página principal debe permitir filtrar las series por género.

Ejemplo:
-Todos
-Drama
-Comedy
-Action
-Crime

Al seleccionar un género se deben mostrar únicamente las series que coincidan. Este filtrado debe realizarse con JavaScript en el cliente.

Persistencia de datos:
Se debe utilizar localStorage para almacenar:
-favoritos
-historial de búsquedas
-cantidad de elementos por página seleccionada

Estos datos deben mantenerse incluso después de recargar la página.

Uso de Fetch:
Todas las consultas a la API deben realizarse mediante fetch. Se recomienda centralizar las llamadas a la API dentro de service.js .

Ejemplo conceptual:
    getShows()
    searchShows(query)
    getShowById(id)

Gestión del estado:
La aplicación debe mantener un estado en memoria para controlar:
-lista de resultados
-página actual
-filtros activos
-resultados de búsqueda

Este estado debe gestionarse desde state.js .

Interacción con el DOM:
El proyecto debe utilizar manipulación del DOM para:
-generar tarjetas dinámicamente
-actualizar paginación
-mostrar resultados de búsqueda
-actualizar favoritos
-aplicar filtros

Estas responsabilidades pueden ubicarse dentro de ui.js .

Uso de Git:
El proyecto debe desarrollarse en un repositorio compartido.
Se deben utilizar ramas para implementar funcionalidades.

Ejemplo:

    main
    develop
    feature/search
    feature/pagination
    feature/favorites
    feature/show-details
    ...

Los commits deben describir claramente los cambios realizados.
Ejemplos:
    feat: implement show pagination
    feat: add favorites storage
    feat: implement search input
    fix: pagination navigation bug

Entregables:
-Repositorio en GitHub que incluya:
-código fuente completo
-estructura organizada
-rama main
-rama develop
-todas las ramas creadas
-README

El README debe incluir:
-descripción del proyecto
-integrantes
-funcionalidades implementadas
-instrucciones para ejecutar el proyecto
