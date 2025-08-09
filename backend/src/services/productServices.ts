import productModel from '../models/productModel';


export const getAllProducts = async () => {
    return await productModel.find();
}

export const seedInitialProducts = async () => {
    try {
    
    const products = [
        { title: "dell Laptop",
         image:
          "https://egyptlaptop.com/images/detailed/72/Gaming-laptop-Dell.webp",
           price: 19000,
            stock: 10, 
        },
            
        { title: "Asus Laptop",
         image:
          "https://r2media.horizondm.com/catalog/product/cache/eb4305db09fb6492bb059b8131f647e3/a/s/asus-gx703hs-kf035t-0.jpg",
           price: 35000,
            stock: 15, 
        },

            
        { title: "Msi Laptop",
         image:
          "https://oskran.com/image/cache/catalog/AAA/280781634777960-800x600-800x600.jpg",
           price: 20000,
            stock: 20, 
        },

        { title: "hp Laptop",
         image:
          "https://m.media-amazon.com/images/I/51BhXhb%2B8gL._SL500_.jpg",
           price: 25000,
            stock: 20, 
        },







    ];
    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
     await  productModel.insertMany(products);
        };
    } catch (err) {
      console.error("cannot see database", err); 
    }
}

