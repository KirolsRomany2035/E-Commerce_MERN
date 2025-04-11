import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModels";
import { ExtendRequest } from "../types/extendedRequest";

const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {

  const authorizationHeader = req.get('authorization'); 

  if(!authorizationHeader) {
    res.status(403).send("Authorization header is missing");
   return; 
  } 
   const token = authorizationHeader.split(" ")[1];

   if(!token) {
   res.status(403).send("Bearer token not found");
   return;
 }
  jwt.verify(token,"KmbhZkhXj2mUxyVXM3hLqJPLtzBcjh2O",async (err, payload) => {
    if (err) {
      res.status(403).send("Invalid token");
     return;
    }
     
    if (!payload) {
      res.status(403).send("Invalid token payload");
      return;
    }
    const userPayload = payload as { 

      email: string;
       firstName: string;
       lastName: string ;
        };
  
    const user = await userModel.findOne({ email: userPayload.email });
    req.user = user; 
    next(); 
 });
    
}
export default validateJWT;

     