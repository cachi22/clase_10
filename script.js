let stockProductos = [
    {id: 1, nombre: "fiambre", tipo: "item", desc: "embutidos artesanales", precio: 1200, img: 'img/sausage-platter-668676_640.jpg'},
    {id: 2, nombre: "leche ", tipo: "item", desc: "leche entera natural", precio: 1100, img: 'img/cereal.jpg'},
    {id: 3, nombre: "coca-cola", tipo: "item", desc: "botella de gaseosa", precio: 1200, img: 'img/coca-cola.jpg'},
    {id: 4, nombre: "cerveza", tipo: "item", desc: "botella de cerveza", precio: 1400, img: 'img/craft-beer.jpg'},
    {id: 5, nombre: "frutillas", tipo: "item", desc: "frutillas de estacion", precio: 1200, img: 'img/frutillas.jpg'},
    {id: 6, nombre: "miel", tipo: "item", desc: "miel pura de aveja", precio: 1500, img: 'img/miel.jpg'},
    {id: 7, nombre: "naranjas", tipo: "item", desc: "naranja para jugo", precio: 500, img: 'img/naranja.jpg'},
    {id: 8, nombre: "pasta fresca", tipo: "item", desc: "pasta fresca artesanal", precio: 500, img: 'img/pasta.jpg'},
    {id: 9, nombre: "conservas de campo", tipo: "item", desc: "conservas artesanales", precio: 500, img: 'img/pepinos.jpg'},
    {id: 10, nombre: "energizante monster", tipo: "item", desc: "bebida energizante", precio: 700, img: 'img/monster.jpg'},
    
]

let carrito = [];
let contenedor = document.getElementById('contenedorProductos');
let buscador = document.getElementById('buscador');
let listaCarrito = document.getElementById('listaProductos');

buscador.addEventListener('input', () => {
    console.log(buscador.value);
    mostrarProductos(stockProductos.filter(item => item.nombre.toLowerCase().includes(buscador.value.toLowerCase())));
});

mostrarProductos(stockProductos);

function mostrarProductos(array) {
    contenedor.innerHTML = '';

    for (const producto of array) {
        let div = document.createElement('div');
        div.setAttribute('data-price', '10');
        div.className = 'product';
        div.innerHTML = `<h3>${producto.nombre}</h3>
                        <img src=${producto.img} alt="">
                        <p>${producto.desc}</p>
                        <p> $${producto.precio}</p>
                        <button class="add-to-cart-btn" id="${producto.id}">Agregar</button>`;

        contenedor.appendChild(div);
    }
}

contenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        let producto = stockProductos.find(prod => prod.id == e.target.id);

        
        let productoEnCarrito = carrito.find(prod => prod.id == producto.id);

        if (productoEnCarrito) {
            
            productoEnCarrito.cantidad++;
            
            productoEnCarrito.elementoLi.querySelector('.cantidad').textContent = `Cant: ${productoEnCarrito.cantidad}`;
        } else {
            producto.cantidad = 1;
            carrito.push(producto);

            let li = document.createElement('li');
            li.innerHTML = `${producto.nombre} - <span class="cantidad">Cant: ${producto.cantidad}</span> - $${producto.precio} <i class='bx bxs-trash' id="eliminar${producto.id}"></i>`;
            listaCarrito.appendChild(li);
            producto.elementoLi = li; 
        }

        total();
    }
});

function total() {
    let totalDeCompra = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    let spanTotal = document.querySelector('.total-price');

    spanTotal.textContent = totalDeCompra;
}

let vaciarCarritoBtn = document.getElementById('vaciarCarrito');

if (vaciarCarritoBtn) {
    vaciarCarritoBtn.addEventListener('click', () => {
        carrito = [];
        listaCarrito.innerHTML = '';
        total();
    });
} else {
    console.error('Error: No se encontró el elemento con el id "vaciarCarrito"');
}


