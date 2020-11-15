import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {RegistrationComponent} from './registration/registration.component';
import {ListComponent} from './list/list.component';
import {Authentication} from './authentication';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {TvsPageComponent} from './tvs-page/tvs-page.component';
import {MoviesPageComponent} from './movies-page/movies-page.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'list/:id', component: ListComponent},
  {path: 'profile', component: UserProfileComponent, canActivate: [Authentication]},
  {path: 'tvs/:id', component: TvsPageComponent},
  {path: 'movies/:id', component: MoviesPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
