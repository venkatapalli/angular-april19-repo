export  class  User_details {
    id: number;
    firstname:  string;
    lastname:  string;
    address:  string;
    city:  string;
    state:  string;
    order_total:  number;
    length: number;
}
export interface Register {
    id: number;
    firstname:  string;
    lastname:  string;
    username: string;
    password: string;
    address:  string;
    city:  string;
    state:  string;
}
export interface Login {
    username: string;
    password: string;
}