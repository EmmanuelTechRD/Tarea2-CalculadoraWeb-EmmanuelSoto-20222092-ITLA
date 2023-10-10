const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");
const historial = JSON.parse(localStorage.getItem("historial")) || [];

// Función para mostrar el historial en la pantalla.
function mostrarHistorial() {
  pantalla.innerHTML = historial.map(item => `${item.operacion} = ${item.resultado}`).join("<br>");
}

// Función para agregar una entrada al historial.
function agregarAlHistorial(operacion, resultado) {
  historial.push({ operacion, resultado });
  localStorage.setItem("historial", JSON.stringify(historial));
}

// Función para eliminar el historial.
function eliminarHistorial() {
  localStorage.removeItem("historial");
  historial.length = 0;
  alert("Historial eliminado.");
  mostrarHistorial();
}

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const botonApretado = boton.textContent;

    if (boton.id === "c") {
      pantalla.textContent = "0";
      return;
    }

    if (boton.id === "h") {
      mostrarHistorial();
      return;
    }
    
    if (boton.id === "borrarH") {
      eliminarHistorial();
      return;
    }

    if (boton.id === "borrar") {
      if (pantalla.textContent.length === 1 || pantalla.textContent === "Resultado indefinido.") {
        pantalla.textContent = "0";
      } else {
        pantalla.textContent = pantalla.textContent.slice(0, -1);
      }
      return;
    }

    if (boton.id === "igual") {
      try {
        const resultado = eval(pantalla.textContent);
        const operacion = pantalla.textContent;
        pantalla.textContent = resultado;
        agregarAlHistorial(operacion, resultado);
      } catch {
        pantalla.textContent = "Resultado indefinido.";
      }
      return;
    }

    if (pantalla.textContent === "0" || pantalla.textContent === "Resultado indefinido.") {
      pantalla.textContent = botonApretado;
    } else {
      pantalla.textContent += botonApretado;
    }
  });
});