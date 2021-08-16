export interface Menu {
    days: Array<Day>;
}

export interface Day {
    name: string;
    id: number;
    dishes: Array<Dish>;
}

export interface Dish {
    id: number;
    name: string;
    description: string;
    extras: Array<number>;
}

export interface Extra {
    id: number;
    name: string;
}
