import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegistrationComponent} from './registration/registration.component';
import {MainComponent} from './main/main.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {ListComponent} from './list/list.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {EditListDialogComponent} from './edit-list-dialog/edit-list-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AddListDialogComponent} from './add-list-dialog/add-list-dialog.component';
import {MatAutocomplete, MatAutocompleteModule} from '@angular/material/autocomplete';
import {HttpErrorInterceptor} from './http-error.interceptor';
import {Authentication} from './authentication';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {TvsPageComponent} from './tvs-page/tvs-page.component';
import {MoviesPageComponent} from './movies-page/movies-page.component';
import {UserProfileEditComponent} from './user-profile-edit/user-profile-edit.component';
import {UserProfileEditPasswordComponent} from './user-profile-edit-password/user-profile-edit-password.component';
import {ClipboardModule} from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainComponent,
    ListComponent,
    DeleteDialogComponent,
    EditListDialogComponent,
    AddListDialogComponent,
    UserProfileComponent,
    TvsPageComponent,
    MoviesPageComponent,
    UserProfileEditComponent,
    UserProfileEditPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    ClipboardModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    Authentication
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
