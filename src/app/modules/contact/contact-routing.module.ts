import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './page/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: ContactComponent
  }
];

export const CONTACT_ROUTE = RouterModule.forChild(routes);
