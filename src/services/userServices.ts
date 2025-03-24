import UserModel from "../models/userModels";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface Registerparams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const register = async ({firstName, lastName, email, password}: Registerparams) => {
    const findUser = await UserModel.findOne({ email}); 
    if (findUser) {
        return { data:"User already exists!", statusCode:400};
    };
     const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({firstName, lastName, email, password:hashedPassword});
    await newUser.save();
    return { data:generatejwt ({firstName, lastName, email}), statusCode: 200};
   
}
 

interface LoginParams {
    email: string;
    password: string;
}
export const login = async ({email, password}: LoginParams) => {

  const findUser = await UserModel.findOne({ email });
    if (!findUser) {
        return { data:"Incorrect email or  password!", statusCode:400};

    }
     
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
    return { 
        data: generatejwt({
            email, 
            firstName: findUser.firstName, 
            lastName: findUser. lastName, 
        }), 
        statusCode: 200};
    }
    return { data:"Incorrect email or  password!", statusCode:400};
}

const generatejwt = (data: any) => {
    return jwt.sign( data,'KmbhZkhXj2mUxyVXM3hLqJPLtzBcjh2O');
} 
 // Register user function 