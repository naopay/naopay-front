import { Item } from "./item";

export interface CartItem {
    itemId: string;
    count: number;
    extraIds: string[];
    optionIds: string[];
}