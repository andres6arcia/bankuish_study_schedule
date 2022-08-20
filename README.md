# Bankuish Study Schedule
Develop a service implementation that can create a study schedule that lists courses in an order that respects the constraints.

Create a backend REST service that will receive the list of desired micro-courses in JSON format. The payload data is not organized in any specific order.

## TODO: 
* Autenticación con Firebase

## Instrucciones para ejecutar el proyecto
Ejecutar los siguientes comandos:
```CMD
npm run build
npm run start
```
* * *


## **Post:Courses:** Permite asignarle cursos a un estudiante
### Endpoint: localhost:3000/courses

### Parámetros:
**userId:** Identificación del estudiante a quien se le van a asignar los cursos
**courses:** Lista de los cursos que debe ver el estudiante, cada uno puede tener un prerrequisito
    * **desiredCourse:** Nombre que identifica el curso
    * **requiredCourse:** Nombre que identifica el curso prerrequisito

### Retorna:
* **ok** Campo que indica que la solicitud se resolvió satisfactoriamente 
* **message:** Mensaje que indica el resultado del proceso
* **data:** Contiene la carga útil de la respuesta, en este caso tiene la lista de cursos enviados 
    * **id:** Número asignado automaticamente para identificar el ténico creado.
* * *  


## **Get:Courses:** Trae los cursos de un estudiante enviando la identificación
### Endpoint: localhost:3000/courses/:userId

### Retorna:
* **ok** Campo que indica que la solicitud se resolvió satisfactoriamente 
* **message:** Mensaje que indica el resultado del proceso
* **data:** Contiene la carga útil de la respuesta, en este caso tiene la lista de cursos ordenados de forma que se vean antes los prerrequisitos necesarios para cada uno 
* * *  

