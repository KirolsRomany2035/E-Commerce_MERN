import express from "express";
import { getActiveCartForUser } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";


const router = express.Router();
router.get(
  "/", 
  validateJWT, 
  async (req: express.Request, res: express.Response) => {
    const userId = (req as any).user._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
});




export default router;
