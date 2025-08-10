import type { Key } from "react";

export interface Product {
    id: Key | null | undefined;
    _id: string;
    title: string;
    image: string;
    price: string;
    
    }