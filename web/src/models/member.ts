import { Stock } from ".";

export class Member {
    id: number;
    name: string;
    phoneNumber: string;
    idCardNumber: string;
    address: string;
    stock: Stock[] = [];
}
