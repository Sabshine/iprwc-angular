import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './toast-service/toast/toast.component';
import { SharedService } from './shared.service';



@NgModule({
  declarations: [
    NavigationBarComponent,
    ToastComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    NavigationBarComponent,
    ToastComponent,
  ],
  providers: [
    SharedService
  ]
})
export class SharedModule { }
