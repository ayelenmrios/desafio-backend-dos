const fs = require("fs");
const rutaSin = "./ejemplo-sin.txt";
fs.writeFileSync(rutaSin, "Desafio 2");
let contenido = fs.readFileSync(rutaSin, "utf-8");

class ProductManager {
    static lastId = 0;
    constructor() {
        this.products = [];
    };

    // Método addProduct
    addProduct(title, description, price, thumbnail, code, stock) {
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Todos los campos son obligatorios. Porfavor revise los valores.");
            return;
        }
        if(this.products.some(item => item.code === code)){
            console.log("Se repite el codigo de los productos. Porfavor revise los valores.");
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
        
    }

    // Método getProducts
    getProducts(){
        return this.products;
    };

    // Método getProductById:
    getProductById(id){
        const product = this.products.find(item => item.id === id);

        if(!product){
            console.log("Not found");
        } else {
            console.log("Found", product);
        }
    }
}

const inventario = new ProductManager();

inventario.addProduct("Campera", "Campera de invierno impermiable con capucha disponible en los colores rojo, verde y azul.", 500, "Sin imagen", "C001", 10);
inventario.addProduct("Camisa", "Camisa a cuadros unisex disponible en los colores rojo, verde y gris.", 1500, "Sin imagen", "C002", 5);
inventario.addProduct("Zapatillas", "Zapatillas marca Jaguar unisex hasta el tobillo desde talle 30 hasta 37, consultar previamente por colores disponibles.", 2000, "Sin imagen", "C003", 20);

console.log(inventario.getProducts());


