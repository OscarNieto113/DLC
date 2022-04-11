# Read ME
Cambios en la base de datos ACTUALIZAR DB

Horas desperdiciadas en los datepickers = 16

Horas despercidiciadas en archivos de reportes mensuales = 5

Horas desperdiciadas en centrar el carousel de noticias = 2

Horas desperdiciadas en los toast = 10

Veces en las que el cris ha dicho una mafufada en discord = 6

Veces en las que el oscar le peta algo porque no sabe copiar y pegar = 6

Veces en las que el cris le peta algo porque no sabe copiar y pegar = 7
## Comandos NPM

Para correr el sitio ten encuenta los siguientes puntos:

1. Instalar todas las dependencias: npm install
2. Tener XAMPP corriendo y con la base de datos dentro (se debe de llamar dlc)
3. De preferencia correrlo en la consola de PowerShell
4. Correr el programa: npm start


## Webpage sites

### Pagina PRINCIPAL
http://localhost:3000/users/login
correo: A01705004@natgas.com.mx
contraseña: 1234

## Cosas por hacer

1. Conexión con Auth0
2. Reportes Mensuales () /EN PROCESO
3. Pulir todo lo relacionado con NG Blocks /LISTO
4. Busqueda de empleado por AJAX /LISTO
5. Eliminar solicitudes en estado pendiente / LISTO
6. Postear con tu no_empleado
7. Registrar Empleado (No jala departamento, agregar rol a la pestaña) / Ya jala departamento, falta roles
8. Agregar Vacaciones y NG Blocks adicionales / LISTO
9. Modificar Rol desde el perfil
10. Calcular los dias de vacaciones restantes
11. Cookies y Toast

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
