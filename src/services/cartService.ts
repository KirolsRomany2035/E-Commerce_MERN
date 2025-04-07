import { CartModel } from '../models/cartModel';


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
    
