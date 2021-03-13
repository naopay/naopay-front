import { Item } from "./item";

export interface Category {
    _id: string;
    name: string;
    color: number;
    items: Item[];
}