class Autenticacion {
  autEmailPass (email, password) {

    firebase.auth().signInWithEmailAndPassword(email,password)
        .then(result => {
          if (result.user.emailVerified){
            $('#avatar').attr('src', 'imagenes/usuario_auth.png')
            Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
          }else{
              firebase.auth().signOut()
              Materialize.toast(`Porfavor realiza la verificacion de la cuenta`, 5000)

          }
        })
      $('.modal').modal('close')
    //$('#avatar').attr('src', 'imagenes/usuario_auth.png')
    //Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
    //$('.modal').modal('close')

  }

  resetPassword(email) {
      firebase.auth().sendPasswordResetEmail(email)
          .then(result => {
              Materialize.toast(`Por favor verifica tu correo ${email} `, 5000)
          })
          .catch(err => {
              Materialize.toast(`Error porfavor verifica tus datos ${err}`, 5000)
          })
  }


  crearCuentaEmailPass (email, password, nombres) {
    firebase.auth().createUserWithEmailAndPassword(email,password)
        .then( result =>{
          result.user.updateProfile({
            displayName: nombres
          })

          const configuration = {
            url:'http://localhost:3000/'
          }

          result.user.sendEmailVerification(configuration)
              .catch(error => {
                console.log(error)
                Materialize.toast(error.message, 4000)
              })
          firebase.auth().signOut()
          Materialize.toast(
              `Bienvenido ${nombres}, debes realizar el proceso de verificacion`, 4000
          )
          $('.modal').modal('close')
        })
        .catch(error => {
          console.log(error)
          Materialize.toast(error.message, 4000)
        })

    /*Materialize.toast(
      `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
      4000
    )

    $('.modal').modal('close')*/

  }

  authCuentaGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
          .then(result => {
              $('#avatar').attr('src', result.user.photoURL)
              $('.modal').modal('close')
              Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
          })
          .catch(err =>{
              console.log(err)
              Materialize.toast(`Error de logueo ${err} !! `, 4000)
          })
    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authCuentaFacebook () {
      const provider = new firebase.auth.FacebookAuthProvider()

      firebase.auth().signInWithPopup(provider)
          .then(result => {
              $('#avatar').attr('src', result.user.photoURL)
              $('.modal').modal('close')
              Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)

          })
          .catch(err =>{
              console.log(err)
              Materialize.toast(`Error de logueo ${err} !! `, 4000)
          })


    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authTwitter () {
    // TODO: Crear auth con twitter
  }
}
