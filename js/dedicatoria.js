const API_URL = "https://script.google.com/macros/s/AKfycbxZjE-EE635Z-xkzWzhuo8H8WDb6g8l5mn3GKusLUxZW3mIIhoQgR2CffcRJBlVeOaCUg/exec";
const galeria = document.getElementById("galeriaProductos");

async function cargarDedicatorias() {
  galeria.innerHTML = "<p>Cargando dedicatorias...</p>";

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    galeria.innerHTML = "";

    if (!data.length) {
      galeria.innerHTML = "<p>No hay dedicatorias aún 💌</p>";
      return;
    }

    data.forEach(d => {
      const div = document.createElement("div");
      div.classList.add("producto", "colapsado");

      const titulo = document.createElement("h3");
      titulo.textContent = d.nombre?.replace(/_/g, " ") || "Sin nombre";
      div.appendChild(titulo);

      const contenido = document.createElement("p");
      const texto = d.contenido?.trim() || "(sin mensaje)";
      contenido.textContent = texto;
      div.appendChild(contenido);

      // --- Agregamos el botón SIEMPRE ---
      const boton = document.createElement("button");
      boton.classList.add("verMasBtn");
      boton.textContent = "Ver más";

      boton.addEventListener("click", (e) => {
        e.stopPropagation();
        div.classList.toggle("expandido");
        div.classList.toggle("colapsado");

        boton.textContent = div.classList.contains("expandido")
          ? "Ver menos"
          : "Ver más";
      });

      div.appendChild(boton);
      galeria.appendChild(div);
    });
  } catch (error) {
    console.error("Error:", error);
    galeria.innerHTML = "<p>Error al cargar las dedicatorias 😔</p>";
  }
}

document.addEventListener("DOMContentLoaded", cargarDedicatorias);
