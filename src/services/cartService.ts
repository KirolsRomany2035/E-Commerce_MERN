import { CartModel } from '../models/cartModel';
import productModel from '../models/productModel';
import router from '../routes/userRoute';


interface CreateCartForUser { 
    userId: string; 
}


 const createCartForUser = async ({ userId }: CreateCartForUser) => {

   const cart = await CartModel.create({ userId, totalAmount: 0  });
   await cart.save(); 
    return cart;
}

interface GetActiveCartForUser {
    userId: string; 
}

export const getActiveCartForUser = async ({ userId }:GetActiveCartForUser) => {
    let cart = await CartModel.findOne({ userId, status: "active" });
    if (!cart) {
      cart = await createCartForUser({ userId });
    }
    return cart;
}

interface AddItemToCart {
    productId: any; 
    userId: string; 
    quantity: number; 
}
export const addItemToCart = async ({productId, quantity, userId}:AddItemToCart ) => {
    const cart = await getActiveCartForUser({ userId });

    const existingProduct = cart.items.find((p) => p.product.toString() === productId);


    if (existingProduct) {
        return { data:"Item already exists in cart", statusCode: 400 };
    }

    const product = await productModel.findById(productId);
    if (!product) {
     return { data: "Product not found", statusCode: 400 }

     };
    if(product.stock < quantity) {
        return { data: "Low stock for item", statusCode: 400 };
    }
    cart.items.push({
     product: productId, 
     unitPrice:product.price, 
     quantity
    });
    cart.totalAmount += product.price * quantity;
  
    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };
}





    
