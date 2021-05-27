import express from 'express';
import fs from 'fs';

const app = express();

const puerto = 8080;

function obtenerRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let contadorVisitasRuta1 = 0;
let contadorVisitasRuta2 = 0;

app.get('/items', (req, res) => {
    let archivo = fs.readFileSync('./productos.txt');
    let productos = JSON.parse(archivo);
    contadorVisitasRuta1++
    res.json({ items: productos, cantidad: productos.length });
});

app.get('/item-random', (req, res) => {
    let archivo = fs.readFileSync('./productos.txt');
    let productos = JSON.parse(archivo);
    let numeroRandom = obtenerRandom(0, productos.length)
    contadorVisitasRuta2++
    res.json({ item: productos[numeroRandom] });
});

app.get('/visitas', (req, res) => {
    res.json({ visitas: { '/items': contadorVisitasRuta1, '/item-random': contadorVisitasRuta2 } });
});

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

server.on('error', error => {
    console.log('error en el servidor:', error);
});