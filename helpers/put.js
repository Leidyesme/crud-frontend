import { obtenerTareas } from './get.js';

export function editarTarea(index, nuevoNombre) {
    const tareas = obtenerTareas();
    tareas[index].nombre = nuevoNombre;
    localStorage.setItem('tareas_crud', JSON.stringify(tareas));
}