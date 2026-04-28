export function obtenerTareas() {
    const tareas = JSON.parse(localStorage.getItem('tareas_crud')) || [];
    return tareas;
}