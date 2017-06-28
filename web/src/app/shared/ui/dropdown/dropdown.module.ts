import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { DropdownHeaderComponent } from './dropdown-header/dropdown-header.component';
import { DropdownBodyComponent } from './dropdown-body/dropdown-body.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DropdownComponent, DropdownHeaderComponent, DropdownBodyComponent],
  exports: [DropdownComponent, DropdownHeaderComponent, DropdownBodyComponent]
})
export class DropdownModule { }
