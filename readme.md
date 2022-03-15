# Read ME

## Comandos NPM

Corre estos comandos para que funcione el sitio:

1. npm init
2. npm install --save-dev nodemon        
   > Para correr página web
3. npm install --save express            
   > Manejo de rutas
4. npm install --save body-parser        
   > Manipular datos de las peticiones
5. npm install --save ejs                
6. > HTML dinamico
7. npm install --save cookie-parser
   > Manejo de cookies
8. npm install --save express-session
   > Manejo de sesiones
9.  npm install --save bootstrap
    > Tema de la web app
10. npm install --save bootstrap-icons
    > Iconos para la web app
11. npm install --save-dev vanillajs-datepicker 
    > Date picker 
12. npm install --save csurf

## Webpage sites

### Pagina PRINCIPAL
http://localhost:3000/DLC   


## Comandos básicos GIT
`git clone ruta_repositorio_remoto`: Clona el repositorio remoto en la computadora en la que se está trabajando dentro de una carpeta con el nombre del repositorio. Hay que seleccionar la carpeta para poder manipular el repositorio, esto se hace con: cd nombre_repositorio.

`git status`: Muestra el estado del repositorio.

`git add -A`: Rastrea los archivos para incluirlos en la transacción.

`git commit -m "mensaje descriptivo en imperativo"`: Guarda los cambios en una transacción.

`git push`: Copia los commits locales en el repositorio remoto.

### Comandos ramas GIT

`git branch`: Lista las ramas del repositorio e indica en cuál se está trabajando.

`git checkout nombre_rama`: Te cambia a la rama nombre_rama

`git checkout -b nombre_rama`: Crea una nueva rama nombre_rama y te cambia a ella.

`git merge nombre_rama`: Junta los cambios de nombre_rama con la rama en la que te encuentras.

`git push origin nombre_rama`: Copia los commits de la rama en la que te encuentras hacia la rama en el repositorio remoto llamada nombre_rama

### Comandos para trabajar en equipo
`git pull` Jalar los cambios del repositorio remoto al repositorio local

`git pull` y `git push` pueden recibir como parámetros: origin nombre_rama_remota. Por ejemplo: `git pull origin develop`

## Políticas de trabajo en equipo:
* Integra frecuentemente tu rama personal con rama develop
* No se hacen commits directamente en develop ni en main. Develop y main se utilizan para integrar
* Siempre que te cambies de rama, haz un `git pull`
