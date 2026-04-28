import { obtenerTareas } from './get.js';

export function borrarTarea(index) {
    const tareas = obtenerTareas();
    tareas.splice(index, 1);
    localStorage.setItem('tareas_crud', JSON.stringify(tareas));
}