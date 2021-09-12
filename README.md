# TastyWorld

## Restaurant app

### Prerequisitos:
  npm install
### Levantar el servicio:
  node app

- heroku: https://tasty-world-backend.herokuapp.com/
- local: localhost:4005

### usuariosPath

  - get todos los usuarios: "/api/usuarios/get
  - post crear usuario:  "/api/usuarios/
      ```
      body
      {
          "nombre":"rocio",
          "email":"rocio@tastyworld.com",
          "password":"Abelardo",
          "rol": "ADMIN_ROLE"
      }
      
      response
      {
          "msg": "Usuario creado",
          "usuario": {
              "nombre": "rocio",
              "email": "rocio@tastyworld.com",
              "rol": "ADMIN_ROLE",
              "estado": true,
              "uid": "613d8bed9acf76244de4527f"
          }
      }
      ```
  - put modificar usuario:  "/api/usuarios/{id}
      ```
      body
      {
          "nombre":"",
          "email":"",
          "password":"",
          "rol": ""
      }
      
      response
      {
          "msg": "Usuario modificado",
          "usuario": {
              "nombre": "",
              "email": "",
              "rol": "",
          }
      }
      ```
  - del inhabilitar usuario:  "/api/usuarios/{id}
    
### authPath = "/api/auth";
  - post login /api/auth/login
      ```
      body
      {
          "email":"rocio@tastyworld.com",
          "password":"Abelardo"
      }
      response
      {
          "msg": "Usuario validado",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTNkOGJlZDlhY2Y3NjI0NGRlNDUyN2YiLCJpYXQiOjE2MzE0MjM1MDgsImV4cCI6MTYzMTQzMDcwOH0.j5wqjBim5BnTaN69trGg7WCV_lwawpFqVI3tVG1MnPY"
      }
      ```
### menuesPath="/api/menues";
### mesasPath="/api/mesas";
### comandasPath="/api/comandas";
### comandasCocinaPath="/api/comandas/cocina";
### comandasBarraPath="/api/comandas/barra";
