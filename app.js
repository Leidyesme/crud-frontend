const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const tareaForm = document.querySelector('#tareaForm');
const tareaInput = document.querySelector('#tareaInput');
const listaTareas = document.querySelector('#listaTareas');
const mensajeInfo = document.querySelector('#mensajeInfo');

let tareas = [];

function mostrarMensaje(texto, error = false) {
    mensajeInfo.textContent = texto;
    mensajeInfo.classList.toggle('tarea__info--error', error);
}

function limpiarLista() {
    listaTareas.innerHTML = '';
}

function crearElementoTarea(tarea) {
    const item = document.createElement('li');
    item.className = 'tarea__item';

    const texto = document.createElement('span');
    texto.textContent = tarea.title;
    texto.className = 'tarea__texto';

    const botones = document.createElement('div');
    botones.className = 'tarea__botones';

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'boton boton--editar';
    btnEditar.addEventListener('click', () => editarTarea(tarea.id));

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.className = 'boton boton--eliminar';
    btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id));

    botones.append(btnEditar, btnEliminar);
    item.append(texto, botones);

    return item;
}

function renderizarTareas() {
    limpiarLista();

    if (tareas.length === 0) {
        const mensaje = document.createElement('li');
        mensaje.textContent = 'No hay tareas aún. Agrega una tarea.';
        mensaje.className = 'tarea__vacio';
        listaTareas.appendChild(mensaje);
        return;
    }

    tareas.forEach((tarea) => {
        listaTareas.appendChild(crearElementoTarea(tarea));
    });
}

async function obtenerTareas() {
    mostrarMensaje('Cargando tareas...');
    try {
        const response = await fetch(`${API_URL}?_limit=5`);
        const datos = await response.json();
        console.log('Respuesta GET /todos:', datos);
        tareas = datos;
        renderizarTareas();
        mostrarMensaje('Tareas cargadas correctamente.');
    } catch (error) {
        console.error('Error al cargar tareas:', error);
        mostrarMensaje('No se pudieron cargar las tareas.', true);
    }
}

async function crearTarea(titulo) {
    mostrarMensaje('Creando tarea...');
    try {
        const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: titulo, completed: false, userId: 1 }),
        });
        const nuevaTarea = await response.json();
        console.log('Respuesta POST /todos:', nuevaTarea);
        tareas.unshift(nuevaTarea);
        renderizarTareas();
        mostrarMensaje('Tarea creada con éxito.');
    } catch (error) {
        console.error('Error al crear tarea:', error);
        mostrarMensaje('No se pudo crear la tarea.', true);
    }
}

async function eliminarTarea(id) {
    mostrarMensaje('Eliminando tarea...');
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        console.log(`Respuesta DELETE /todos/${id}:`, response.status);
        if (!response.ok) {
        throw new Error('Error en la eliminación');
        }
        tareas = tareas.filter((tarea) => tarea.id !== id);
        renderizarTareas();
        mostrarMensaje('Tarea eliminada.');
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        mostrarMensaje('No se pudo eliminar la tarea.', true);
    }
}

async function editarTarea(id) {
    const tarea = tareas.find((item) => item.id === id);
    if (!tarea) return;

    const nuevoTitulo = prompt('Edita el nombre de la tarea:', tarea.title);
    if (nuevoTitulo === null) return;
    const tituloTrim = nuevoTitulo.trim();
    if (!tituloTrim) {
        mostrarMensaje('El título no puede estar vacío.', true);
        return;
    }

    mostrarMensaje('Actualizando tarea...');
    try {
        const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: tituloTrim }),
        });
        const tareaActualizada = await response.json();
        console.log(`Respuesta PATCH /todos/${id}:`, tareaActualizada);
        tareas = tareas.map((item) =>
        item.id === id ? { ...item, title: tituloTrim } : item
        );
        renderizarTareas();
        mostrarMensaje('Tarea actualizada.');
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        mostrarMensaje('No se pudo actualizar la tarea.', true);
    }
}

function manejarEnvio(event) {
    event.preventDefault();
    const texto = tareaInput.value.trim();
    if (!texto) {
        mostrarMensaje('Escribe una tarea antes de guardar.', true);
        return;
    }

    crearTarea(texto);
    tareaInput.value = '';
    tareaInput.focus();
}

function inicializar() {
    tareaForm.addEventListener('submit', manejarEnvio);
    obtenerTareas();
}

document.addEventListener('DOMContentLoaded', inicializar);

function crearTarea(texto) {
    const tarea = document.createElement('li');
    tarea.textContent = texto;
    tarea.className = 'tarea__item';
    return tarea;
}


