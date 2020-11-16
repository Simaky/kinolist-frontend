import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError, timer} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {UserService} from './user.service';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public userService: UserService, public toastr: ToastrService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.userService.setUser(null);
            this.toastr.error('you are not authorized', 'Error');

            const source = timer(3000, 2000);
            source.subscribe(val => {
              window.location.href = '/';
            });
          }
          return throwError(error);
        })
      );
  }
}
