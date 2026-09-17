// Como funciona este codigo:
// document.addEventListener = Documento presta atencion a lo siguiente
// 'DOMContentLoaded = Cuando la pagina termide de cargar
// function() {} = Y cuando pase, ejecuta el siguiente codigo que este adentro de las {}

document.addEventListener('DOMContentLoaded', function(){
    // Console.log para verificar que la pagina este cargando correctamente
    console.log('Pagina Cargando');

    // Aqui capturamos el formulario
    // const formulario = Crea una caja llamada formulario que guarda una referencia al formulario
    // document.getElementById('registerForm') = Busca en el documento el elemento con el ID loginForm
    const formulario = document.getElementById('registerForm');

    // Cuando el formulario se envie el (click en el boton)
    formulario.addEventListener('submit', async function(evento) {
        evento.preventDefault(); // Esto evita que la pagina se recargue
        console.log('Alguien hizo click en el boton de registrarse');

        // Obtenemos lo que el usuario escribio
        // document.getElementById('correo').value; = Busca el campo con ID 'correo' y obten su valor mediante el .value
        const nombre = document.getElementById('nombre').value
        const apellido = document.getElementById('apellido').value
        const correo = document.getElementById('correo').value
        const contraseña = document.getElementById('contraseña').value
        const contraseña2 = document.getElementById('contraseña2').value

        // Creamos un objeto con los datos obtenidos
        const datosEnvio = {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            contraseña: contraseña,
            repetirContraseña: contraseña2
        };

        // Enviamos los datos al backend
        // El trycatch funciona de la siguiente manera:
        // Try: Prueba esto y si falla atrapa el error desde el catch
        try {
            console.log('1. Voy a enviar los datos');

            // El fetch (la llamada a la url)
            // El await signigica: Espero que el backend responda antes de continuar
            const respuesta = await fetch('http://localhost:3000/register', {
                method: 'POST', // Metodo post osea que estoy enviando algo
                headers: {
                    'Content-Type': 'application/json' 
                    // Con este headers le estoy diciendo al backend:
                    // Te ando enviando un JSON
                },
                body: JSON.stringify(datosEnvio) // Convierto mis datos de envio a JSON
            });

            // Aqui me debe responder con el status = El codigo 200,401,404 etc
            console.log('2. Respuesta recibida, status:', respuesta.status);

            // Aqui me debe responder true si es 200 - 299, false si es un error
            console.log('3. La respuesta recibida fue exitosa?', respuesta.ok);

            const datos = await respuesta.json();
            console.log('4. Datos recibidos del backend:', datos);
            
            // alert(JSON.stringify(datos.message, null, 2)) // Esto convierte la respuesta JSON del backend en algo visible por el usuario
            // alert(JSON.stringify(datos.error, null, 2)) 

            // Aqui validaremos si el login es exitoso mediante respuesta.ok
            // respuesta.ok = true ejecutara el if, en caso de ser false ejecutara el else
            if (respuesta.ok) {
                // Registro exitoso 
                console.log('Registro exitoso');
                const token = datos.token;
                console.log('Token recibido', token);

                // Guardar el token en localStorage
                localStorage.setItem('token', token);
                console.log('Token guardado en localStorage');

                // Mostrar un mensaje de exito
                alert('Registro exitoso, Redirigiendo');
                // Redigirir a productos despues de 2 segundos
                setTimeout(() => {
                    window.location.href = 'iniciarSesion.html';
                }, 2000);

            } else {
                // Registro fallido
                console.log('Registro fallido');
                console.log('Mensaje de error:', datos.mensaje || datos.error);

                // Mostrar mensaje de error
                alert((datos.mensaje || 'Error intentando crear el usuario, intente de nuevo'));
                alert((datos.error))

            }

            
        } catch (error) {
            console.error('Error al enviar', error);
            console.log('Error al intentar conectar con el backend');
        }




    })




});