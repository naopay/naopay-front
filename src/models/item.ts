import { Choice } from "./choice";

export interface Item {
    _id: string;
    image: string; // base64
    name: string;
    price: number;
    available: boolean;
    category: string; // category id
    extra: Choice[];
    options: Choice[][];
}