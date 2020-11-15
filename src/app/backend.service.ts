import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChangePassword, Film, Score, User, UserFilmsList} from './user.service';
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private httpClient: HttpClient) {
  }

  public addFilm(userFilmsList: UserFilmsList, userId: number): Observable<object> {
    return this.httpClient.post<Score>('http://localhost:8080/users/' + userId + '/films/' + userFilmsList.filmId + '/scores', userFilmsList, {
      withCredentials: true,
      observe: 'response'
    });
  }

  public editUserFilmScore(userId: number, filmId: number, score: Score): Observable<object> {
    return this.httpClient.put('http://localhost:8080/users/' + userId + '/films/' + filmId + '/scores', score, {
      withCredentials: true,
      observe: 'response'
    });
  }

  public deleteUserFilmScore(userId: number, filmId: number): Observable<object> {
    return this.httpClient.delete('http://localhost:8080/users/' + userId + '/films/' + filmId + '/scores', {
      withCredentials: true,
      observe: 'response'
    });
  }

  public editUser(user: User): Observable<object> {
    return this.httpClient.put('http://localhost:8080/users/' + user.id, user, {
      withCredentials: true,
      observe: 'response'
    });
  }

  public changeUserPassword(userId: number, password: ChangePassword): Observable<object> {
    return this.httpClient.put('http://localhost:8080/users/' + userId + '/password', password, {
      withCredentials: true,
      observe: 'response'
    });
  }

  public getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>('http://localhost:8080/users/current', {withCredentials: true});
  }

  public getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>('http://localhost:8080/users/' + id, {withCredentials: true});
  }

  public getUserFilmsList(userId: number): Observable<UserFilmsList[]> {
    return this.httpClient.get<UserFilmsList[]>('http://localhost:8080/users/' + userId + '/films', {withCredentials: true});
  }

  public loginUser(username: string, password: string): Observable<User> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.httpClient.post<User>('http://localhost:8080/login', formData, {withCredentials: true});
  }

  public registrationUser(username: string, email: string, password: string): Observable<User> {
    return this.httpClient.post<User>('http://localhost:8080/registration', {username, email, password}, {withCredentials: true});
  }

  public logout(): void {
    this.httpClient.post<User>('http://localhost:8080/logout', null, {withCredentials: true});
  }
}
