import { obtenerTareas } from './helpers/get.js';
import { guardarTarea } from './helpers/post.js';
import { editarTarea } from './helpers/put.js';
import { borrarTarea } from './helpers/delete.js';

const tareaForm = document.getElementById('tareaForm');
const tareaInput = document.getElementById('tareaInput');
const listarTareas = document.getElementById('listarTareas');

// Función para que aparescan las tareas en una lista
function lista() {
    listarTareas.innerHTML = '';
    const tareas = obtenerTareas();

    tareas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${tarea.nombre}</span>
            <button class="btn-edit" data-id="${index}">Editar</button>
            <button class="btn-delete" data-id="${index}">Eliminar</button>
        `;
        listarTareas.appendChild(li);
    });
}

// Evento Guardar
tareaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (tareaInput.value.trim()) {
        guardarTarea(tareaInput.value.trim());
        tareaInput.value = '';
        lista();
    }
});

// Editar y Eliminar 
listarTareas.addEventListener('click', (e) => {
    const index = e.target.dataset.id;
    
    if (e.target.classList.contains('btn-edit')) {
        const nuevo = prompt("Nuevo nombre:");
        if (nuevo) {
            editarTarea(index, nuevo);
            lista();
        }
    }

    if (e.target.classList.contains('btn-delete')) {
        if (confirm("¿Eliminar?")) {
            borrarTarea(index);
            lista();
        }
    }
});

lista();
