import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // <--- ADD CUSTOM_ELEMENTS_SCHEMA HERE
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SpinnerComponent } from '../spinner/spinner.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, SpinnerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // <--- ADD THIS ALSO
})
export class HomePageModule {}
