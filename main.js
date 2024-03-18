const fs = require("fs");

class ProductManager {
    static lastId = 0;
    constructor(archivo) {
        this.path = archivo;
        this.products = [];
        this.getProducts();
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios. Por favor revise los valores.");
            return;
        }
        if (this.products.some(item => item.code === code)) {
            console.log("Se repite el código de los productos. Por favor revise los valores.");
            return;
        }
        const newProduct = {
            id: ++ProductManager.lastId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(newProduct);
        this.guardarArchivos();
        // Cada vez que se agregue un producto al array se guarda automáticamente.
    }

    // Guardar archivo con productos
    guardarArchivos = async () => {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }

    // Leer productos
    getProducts = async () => {
        let respuesta = await fs.promises.readFile(this.path, "utf-8");
        this.products = JSON.parse(respuesta);
        console.log(this.products);
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(item => item.id === id);

        if (!product) {
            console.log("Producto no encontrado");
            return null;
        } else {
            console.log("Producto encontrado!");
            return product;
        }
    }
    // Borrar productos
    deleteProducts = async (id) => {
        this.products = this.products.filter(item => item.id !== id);
        await this.guardarArchivos();
        console.log("Producto eliminado correctamente");
    }
}

const ruta = new ProductManager("./archivo-productos.json");

ruta.addProduct("Campera", "Campera de invierno impermiable con capucha disponible en los colores rojo, verde y azul.", 500, "Sin imagen", "C001", 10);
ruta.addProduct("Camisa", "Camisa a cuadros unisex disponible en los colores rojo, verde y gris.", 1500, "Sin imagen", "C002", 5);
ruta.addProduct("Zapatillas", "Zapatillas marca Jaguar unisex hasta el tobillo desde talle 30 hasta 37, consultar previamente por colores disponibles.", 2000, "Sin imagen", "C003", 20);
ruta.addProduct("Medias", "Medias de abejita amarillas con rayas negras disponible en los talles 20 hasta 37", 500, "Sin imagen", "C004", 40);

ruta.deleteProducts(3);
console.log(ruta.getProducts());
