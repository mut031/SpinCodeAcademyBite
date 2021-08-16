import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishCardComponent } from './mobile/dish-card/dish-card.component';



@NgModule({
  declarations: [
    DishCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DishCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ComponentsModule { }
