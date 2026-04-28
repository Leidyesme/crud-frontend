import { obtenerTareas } from './get.js';

export function guardarTarea(nombre) {
    const tareas = obtenerTareas();
    const nuevaTarea = { nombre };
    tareas.push(nuevaTarea);
    localStorage.setItem('tareas_crud', JSON.stringify(tareas));
}