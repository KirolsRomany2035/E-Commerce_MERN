import productModel from '../models/productModel';


export const getAllProducts = async () => {
    return await productModel.find();
}

export const seedInitialProducts = async () => {
    const products = [
        { title: "dell Laptop", image: "https://egyptlaptop.com/images/detailed/72/Gaming-laptop-Dell.webp", price: 17000, stock: 10 },



    ];
    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
     await  productModel.insertMany(products);
        };
    }


