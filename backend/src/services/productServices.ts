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
          "https://cairosales.com/80221-large_default/asus-laptop-gaming-rog-flow-z13-134-wquxga-touch-intel-core-i9-12900h-16gb-ssd-1tb-rtx-3050-4gb-win-11-gz301ze-lc180w.jpg",
           price: 17000,
            stock: 20, 
        },

            
        { title: "MsiLaptop",
         image:
          "https://oskran.com/image/cache/catalog/AAA/280781634777960-800x600-800x600.jpg",
           price: 20000,
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

