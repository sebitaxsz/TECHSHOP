// document.addEventListener = Documento presta atención a lo siguiente
// 'DOMContentLoaded' = Cuando la página termine de cargar
document.addEventListener('DOMContentLoaded', function() {
    
    // document.querySelectorAll = Busca TODOS los elementos que tengan la clase '.iniciarButton'
    // Guardamos todos esos botones en una lista llamada 'botonesLogin'
    const botonesLogin = document.querySelectorAll('.iniciarButton');

    // Buscamos en el almacenamiento local el 'token' que guardaste en login.js
    const token = localStorage.getItem('token'); 

    // forEach = Por cada botón que encontramos en la página, haz lo siguiente:
    botonesLogin.forEach(function(boton) {
        
        // Validamos si existe un token guardado
        if (token) {
            // SI HAY TOKEN = El usuario tiene sesión activa
            boton.textContent = ("Sesion iniciada");

            
            // Le cambiamos el comportamiento al botón. Si le dan click, cerrará la sesión
            boton.addEventListener('click', function(evento) {
                evento.preventDefault(); // Evitamos que navegue a la página de login
                
                // Muestra un alert de que se cerro la sesion si se le da click
                alert("Sesion cerrada correctamente");

                // Borramos el token de la memoria del navegador
                localStorage.removeItem('token');
                console.log('Sesión cerrada. Token eliminado.');
                
                // Recargamos la página para que los botones vuelvan a decir "Iniciar sesión"
                // window.location.reload(); 

                // Redigirir a inicio despues de 2 segundos
                setTimeout(() => {
                    window.location.href = '../inicio.html';
                }, 2000);
                
            });

        } else {
            // SI NO HAY TOKEN = El usuario no ha iniciado sesión
            // Nos aseguramos de que el texto sea el normal
            boton.textContent = "Iniciar sesión";
        }
    });

});