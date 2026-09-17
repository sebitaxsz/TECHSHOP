// Como funciona este codigo:
// document.addEventListener = Documento presta atencion a lo siguiente
// 'DOMContentLoaded = Cuando la pagina termide de cargar
// function() {} = Y cuando pase, ejecuta el siguiente codigo que este adentro de las {}

document.addEventListener('DOMContentLoaded', function() {
    console.log("La pagina termino de cargar");

    // Aqui capturamos el formulario
    // const formulario = Crea una caja llamada formulario que guarda una referencia al formulario
    // document.getElementById('loginForm') = Busca en el documento el elemento con el ID loginForm
    const formulario = document.getElementById('loginForm'); 
    
    // Cuando el formulario se envie el (click en el boton)
    formulario.addEventListener('submit', async function(evento) {
        evento.preventDefault(); // Esto evita que la pagina se recargue
        console.log('Alguien hizo click en el boton Iniciar Sesion');
        
        // Obteniendo lo que el usuario escribio
        // document.getElementById('correo').value; = Busca el campo con ID 'correo' y obten su valor mediante el .value
        const correo = document.getElementById('correo').value;
        const contraseña = document.getElementById('contraseña').value;
        
        // Creamos un objeto con los datos obtenidos
        const datosEnvio = {
            correo: correo,
            contraseña: contraseña
        };
        
        // Enviamos los datos al backend
        // El trycatch funciona de la siguiente manera:
        // Try: Prueba esto y si falla atrapa el error desde el catch
        try {
            console.log('1. Voy a enviar los datos');

            // El fetch (la llamada a la url)
            // El await signigica: Espero que el backend responda antes de continuar
            const respuesta = await fetch('http://localhost:3000/login', {
                method: 'POST', // Metodo post osea que estoy enviando algo
                headers: {
                    'Content-Type': 'application/json' 
                    // Con este headers le estoy diciendo al backend:
                    // Te ando enviando un JSON
                },
                body: JSON.stringify(datosEnvio) // Convierto mi objeto a texto JSON
            });

            // Aqui me debe responder con el status = El codigo 200,401,404 etc
            console.log('2. Respuesta recibida, status:', respuesta.status);

            // Aqui me debe responder true si es 200 - 299, false si es un error
            console.log('3. La respuesta recibida fue exitosa?', respuesta.ok);

            // CONVERTIR LA RESPUESTA A JSON
            const datos = await respuesta.json();
            console.log('4. Datos recibidos del backend:', datos);


            // Aqui validaremos si el login es exitoso mediante respuesta.ok
            // respuesta.ok = true ejecutara el if, en caso de ser false ejecutara el else
            if (respuesta.ok) {
                // Login exitoso
                console.log('Login exitoso');
                const token = datos.token;
                console.log('Token recibido', token);

                // Guardar el token en localStorage
                localStorage.setItem('token', token);
                console.log('Token guardado en localStorage');

                // Mostrar un mensaje de exito
                alert('Login exitoso');

                // Redigirir a productos despues de 2 segundos
                setTimeout(() => {
                    window.location.href = 'productos.html';
                }, 2000);
            } else {
                // Login fallido
                console.log('Login fallido');
                console.log('Mensaje de error:', datos.mensaje);

                // Mostrar mensaje de error
                alert('Error: ' + (datos.mensaje || 'Credenciales incorrectas'));
            }


        } catch (error) {   
            console.error('Error al enviar', error);
            console.log('Error al intentar conectar con el backend');
        }

    });

});