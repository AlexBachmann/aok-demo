import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { NotificationModule } from '../../shared/ui/notification/notification.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
