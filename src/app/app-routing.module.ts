import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegFormComponent } from './reg-form/reg-form.component';
import { HomeComponent } from './home/home.component';
import { DisplayListComponent } from './display-list/display-list.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'regForm',
    component: RegFormComponent,
  },
  {
    path: 'display',
    component: DisplayListComponent,
  },
  {
    path: 'update/:id',
    component: UpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
