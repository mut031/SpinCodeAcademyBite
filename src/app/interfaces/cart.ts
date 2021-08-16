export interface Cart {
    id: number;
    customerId: number;
    orders: Array<Order>;
    total: number;
    finished: boolean;
}

export interface Order {
    id: number;
    date: Date;
    dayId: number;
    dishId: number;
}
