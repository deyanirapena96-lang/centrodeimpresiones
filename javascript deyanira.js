
// Arreglo que almacena los productos seleccionados.
let carrito = [];

// Función para agregar productos.
function agregarProducto(nombre, precio) {
    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    actualizarCarrito();

    document.getElementById("mensaje").textContent =
        "Producto agregado correctamente.";
}

// Función que calcula la suma de los pedidos.
function calcularTotal() {
    return carrito.reduce(
        (suma, producto) =>
            suma + producto.precio * producto.cantidad,
        0
    );
}

// Función para mostrar los productos y actualizar el total.
function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const total = document.getElementById("total");
    const cantidad = document.getElementById("cantidad");

    lista.innerHTML = "";

    if (carrito.length === 0) {
        lista.innerHTML = "<p>Tu carrito está vacío.</p>";
    } else {
        carrito.forEach((producto, indice) => {
            const elemento = document.createElement("div");
            elemento.className = "item-carrito";

            const descripcion = document.createElement("span");
            descripcion.textContent =
                producto.nombre + " x " + producto.cantidad +
                " — RD$ " +
                (producto.precio * producto.cantidad).toLocaleString("es-DO");

            const boton = document.createElement("button");
            boton.className = "quitar-producto";
            boton.textContent = "Eliminar";
            boton.onclick = function () {
                eliminarProducto(indice);
            };

            elemento.appendChild(descripcion);
            elemento.appendChild(boton);
            lista.appendChild(elemento);
        });
    }

    // Sumar las unidades de todos los productos.
    const totalUnidades = carrito.reduce(
        (suma, producto) => suma + producto.cantidad,
        0
    );

    cantidad.textContent = totalUnidades;

    // Mostrar la suma total en pesos dominicanos.
    total.textContent =
        "RD$ " + calcularTotal().toLocaleString("es-DO");
}

// Función para eliminar un producto del carrito.
function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();

    document.getElementById("mensaje").textContent =
        "Producto eliminado del carrito.";
}

// Botón Pagar: muestra el resumen y el total.
function pagar() {
    if (carrito.length === 0) {
        document.getElementById("mensaje").textContent =
            "Agrega productos antes de pagar.";
        return;
    }

    document.getElementById("mensaje").textContent =
        "Resumen de compra: " +
        document.getElementById("total").textContent +
        ". Presiona Completar pago para finalizar.";

    document.getElementById("carrito").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Botón Vaciar carrito.
function vaciarCarrito() {
    if (carrito.length === 0) {
        document.getElementById("mensaje").textContent =
            "El carrito ya está vacío.";
        return;
    }

    carrito = [];
    actualizarCarrito();

    document.getElementById("mensaje").textContent =
        "El carrito se ha vaciado correctamente.";
}

// Botón Completar pago.
function completarPago() {
    if (carrito.length === 0) {
        document.getElementById("mensaje").textContent =
            "No puedes completar el pago porque el carrito está vacío.";
        return;
    }

    const totalCompra = calcularTotal();

    alert(
        "¡Compra completada correctamente!\n" +
        "Total pagado: RD$ " +
        totalCompra.toLocaleString("es-DO")
    );

    carrito = [];
    actualizarCarrito();

    document.getElementById("mensaje").textContent =
        "¡Gracias por comprar en Centro de Impresiones!";
}

// Mostrar el carrito vacío al abrir la página.
actualizarCarrito();
