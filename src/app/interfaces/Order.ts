import { User } from "./User";

export interface Order{
    
    masterID: number,
    userID: User,
    usercode: User,
    restaurantID:number,
    grandtotal:number

}