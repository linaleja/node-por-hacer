const fs = require('fs');

let listadoPorHacer = [];

const guardarBD = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`./bd/data.json`, data, (err) => {
        if (err) throw new Error('No se puedo guardar');
        console.log('Se agregó la tarea');
    });
}


const cargarBD = () => {
    try {
        listadoPorHacer = require('../bd/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}


const getListado = () => {
    cargarBD();
    return listadoPorHacer;
}

const crear = (descripcion) => {
    cargarBD();
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarBD();
    return porHacer;
}

const actualizar = (descripcion, completado) => {
    cargarBD();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)

    if (index >= 0) {
        listadoPorHacer[index].completado = completado
        guardarBD();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarBD();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (nuevoListado.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarBD();
        return true;
    }
}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}