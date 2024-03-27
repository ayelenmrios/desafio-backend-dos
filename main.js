const fs = require("fs");

// PRODUCT MANAGER
class ProductManager {
    static lastId = 0;

    constructor(archivo) {
        this.products = [];
        this.path = archivo;
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
        }

        this.products.push(newProduct);
        this.guardarArchivos();
        // Cada vez que se agregue un producto al array se guarda automáticamente.
    }
    /////////////////////////////////
    // MÉTODOS
    // getProducts
    async getProducts(){
        // Llamo al metodo leerProducts();
        const lectura = await this.leerProductos();
        return lectura;
    }
    async leerProductos() {
        try {
            const lectura = await fs.promises.readFile(this.path, "utf-8");
            const respuesta = JSON.parse(lectura);
            return respuesta;

        } catch (error) {
            console.log("Se guardaron mal los productos, no se pueden leer", error);
        }
    }
    // Método getProductById
    getProductById(id) {
        const product = this.products.find(item => item.id === id);

        if (!product) {
            console.log("Producto no encontrado");
            return null;
        } else {
            console.log("Producto encontrado!");
            console.log(product);
            return product;
        }
    }
    // Guardar archivo con productos
    async guardarArchivos() {
       await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }

    // Actualizar el producto
    async updateProduct(id, propiedad, nuevoValor) {
        const idBuscado = this.products.findIndex(item => item.id === id);
        if (idBuscado !== -1) {
            this.products[idBuscado][propiedad] = Number(nuevoValor);
            await this.guardarArchivos();
        } else {
            console.log("Ese id no existe");
        }
    }
    // Borrar producto del array
    async deleteProduct(id) {
        try {
            let productos = await this.leerProductos(); 
            let indice = productos.findIndex(producto => producto.id === id); 
    
            if (indice !== -1) {
                productos.splice(indice, 1); 
                this.products = productos; 
                await this.guardarArchivos();
                
            } else {
                console.log("El producto que quiere eliminar no existe");
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    //////////////////////////
}
//////////////////////////////////////
const ruta = new ProductManager("./archivoProductos.json");


///////////////////////////////////
// Testing
ruta.addProduct("Campera", "Campera de invierno impermiable con capucha disponible en los colores rojo, verde y azul.", 5, "Sin imagen", "C001", 10);
ruta.addProduct("Camisa", "Camisa a cuadros unisex disponible en los colores rojo, verde y gris.", 2, "Sin imagen", "C002", 5);
ruta.addProduct("Zapatillas", "Zapatillas marca Jaguar unisex hasta el tobillo desde talle 30 hasta 37, consultar previamente por colores disponibles.", 2000, "Sin imagen", "C003", 20);
ruta.addProduct("Medias", "Medias de abejita amarillas con rayas negras disponible en los talles 20 hasta 37", 500, "Sin imagen", "C004", 40);

ruta.getProducts();
ruta.getProductById(1);
ruta.deleteProduct(4);
ruta.updateProduct(1, "price", 6);