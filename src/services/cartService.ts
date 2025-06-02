import { CartModel, ICart, ICartItem } from '../models/cartModel';
import productModel from '../models/productModel';
import { Types } from 'mongoose';

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
};

interface ClearCart {
    userId: string;
}
export const clearCart = async ({ userId }: ClearCart) => {
    const cart = await getActiveCartForUser({ userId });

    cart.items = [];
    cart.totalAmount = 0;

    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };
}

interface AddItemToCart {
    productId: any; 
    userId: string; 
    quantity: number; 
}
export const addItemToCart = async ({productId, quantity, userId}:AddItemToCart ) => {
    const cart = await getActiveCartForUser({ userId });

    const existingProduct = cart.items.find(
        (p) => p.product.toString() === productId
    );


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

interface updateItemInCart {
    productId: any; 
    userId: string; 
    quantity: number; 
}
export const updateItemInCart = async ({
  productId,
  quantity,
  userId,
 }: updateItemInCart) => {
 const cart = await getActiveCartForUser({ userId });

 
 const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
);
if (!existsInCart) {
    return { data: "Item does not exist in cart", statusCode: 400 };
}

const product = await productModel.findById(productId);
if (!product) {
    return { data: "Product not found", statusCode: 400 }

    };
   if(product.stock < quantity) {
       return { data: "Low stock for item", statusCode: 400 };
   }

 const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);

 let total = calculatecartalItems({ cartItems: otherCartItems,});

 existsInCart.quantity = quantity;
 total += existsInCart.quantity * existsInCart.unitPrice;

 cart.totalAmount = total;

 const updatedCart = await cart.save();

 return { data: updatedCart, statusCode: 200 };
 }
  
interface DeleteItemInCart {
    productId: any; 
    userId: string; 
    

}

 export const deleteItemIncart = async ({ userId ,productId}: DeleteItemInCart) => {
    const cart = await getActiveCartForUser({ userId });
     
 const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
);
if (!existsInCart) {
    return { data: "Item does not exist in cart", statusCode: 400 };
}
 
const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);
  
 const total = calculatecartalItems({ cartItems: otherCartItems,});


    cart.items = otherCartItems;
    cart.totalAmount = total;

    
 const updatedCart = await cart.save();

 return { data: updatedCart, statusCode: 200 };
 }

 const calculatecartalItems =  ({
  cartItems,
 }: {
 cartItems: ICartItem [];
}) => {
 
 const total = cartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
      return sum;
  }, 0);
   return total;
}
