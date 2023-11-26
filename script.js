let stockProductos = [
    {id: 1, nombre: "fiambre", tipo: "item", desc: "embutidos artesanales", precio: 1200, img: 'img/sausage-platter-668676_640.jpg'},
    {id: 2, nombre: "leche ", tipo: "item", desc: "leche entera natural", precio: 1100, img: 'img/cereal.jpg'},
    {id: 3, nombre: "item 3", tipo: "item", desc: "Un producto para la venta", precio: 1200, img: 'img/coca-cola.jpg'},
    {id: 4, nombre: "item 4", tipo: "item", desc: "Un producto para la venta", precio: 1400, img: 'img/craft-beer.jpg'},
    {id: 5, nombre: "item 5", tipo: "item", desc: "Un producto para la venta", precio: 1200, img: 'img/frutillas.jpg'},
    {id: 6, nombre: "item 6", tipo: "item", desc: "Un producto para la venta", precio: 1500, img: 'img/miel.jpg'},
    {id: 7, nombre: "item 7", tipo: "item", desc: "Un producto para la venta", precio: 500, img: 'img/naranja.jpg'},
    {id: 8, nombre: "item 8", tipo: "item", desc: "Un producto para la venta", precio: 500, img: 'img/pasta.jpg'},
    {id: 9, nombre: "item 9", tipo: "item", desc: "Un producto para la venta", precio: 500, img: 'img/pepinos.jpg'},
    {id: 10, nombre: "item 10", tipo: "item", desc: "Un producto para la venta", precio: 700, img: 'img/monster.jpg'},
    
]

let carrito = []


let contenedor = document.getElementById('contenedorProductos')
let buscador = document.getElementById('buscador')

buscador.addEventListener('input',() => {
    console.log(buscador.value);
    
    mostrarProductos(stockProductos.filter(item => item.nombre.toLowerCase().includes(buscador.value.toLowerCase())))
});

mostrarProductos(stockProductos);

function mostrarProductos(array){ 
    contenedor.innerHTML = '';


for (const productos of array) {
    
    let div = document.createElement('div')
    div.setAttribute('data-price', '10')
    div.className = 'product'
    div.innerHTML = `<h3>${productos.nombre}</h3>
                    <img src=${productos.img} alt="">
                    <p>${productos.desc}</p>
                    <p> $${productos.precio}</p>
                    <button class="add-to-cart-btn" id="${productos.id}">Agregar</button>`

    contenedor.appendChild(div)
    }
}

let boton = document.querySelectorAll('.add-to-cart-btn')
let listaCarrito = document.getElementById('listaProductos')

for (const btn of boton) {
    btn.addEventListener('click', (e) => {
        let producto = stockProductos.find(prod => prod.id == btn.id);
        carrito.push(producto);

        let li = document.createElement('li');
        li.innerHTML = `${producto.nombre} - $${producto.precio} <i class='bx bxs-trash' id="eliminar${producto.id}"></i>`;
        listaCarrito.appendChild(li);

        total();

        let btnEliminar = document.getElementById(`eliminar${producto.id}`);
        btnEliminar.addEventListener('click', () => {
            carrito = carrito.filter(prod => prod.id != producto.id);
            btnEliminar.parentElement.remove();
            total();
        });
    });
}


function total(){
    let totalDeCompra = carrito.reduce((acc,el)=> acc + el.precio, 0)

    let spanTotal = document.querySelector(' .total-price')

    spanTotal.textContent = totalDeCompra
}

