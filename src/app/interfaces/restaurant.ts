export interface Restaurant {
    companyId: number;
    name: string;
    menus?: MenuDish[][];
    image?: string;
}

export interface MenuDish {
  day: number;
  companyId: number;
  name: string;
  dishId: number;
  inCart?: boolean;
}
