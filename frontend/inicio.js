export function botonCatalogo (){
    console.log("Boton Funcional"); 
}

document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("catalogoButton");
    if (boton) {
        boton.addEventListener("click", botonCatalogo)
    }
})