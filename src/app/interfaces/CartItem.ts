import { Menu } from "./Menu";

export interface CartItem {
    quantity:number;
    item:Menu;
    totalPrice?:any
}