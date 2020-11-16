import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  constructor() {
  }
}

export class User {
  constructor(id: number, username: string, email: string, firstName: string, lastName: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public id: number;
  public username: string;
  public email: string;
  public firstName: string;
  public lastName: string;
}

export class ChangePassword {
  constructor(currentPassword: string, password: string) {
    this.currentPassword = currentPassword;
    this.password = password;
  }

  public currentPassword: string;
  public password: string;
}

export class UserFilmsList {
  constructor(filmId: number, name: string, description: string, imageUrl: string, seriesCount: number, score: Score, mediaType: string) {
    this.filmId = filmId;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.seriesCount = seriesCount;
    this.score = score;
    this.mediaType = mediaType;
  }

  public filmId: number;
  public name: string;
  public description: string;
  public imageUrl: string;
  public seriesCount: number;
  public score: Score;
  public mediaType: string;

  public rating: number;
  public currentState: number;
}

export class Score {
  constructor(rating: number, currentState: number, isRecommended: boolean) {
    this.rating = rating;
    this.currentState = currentState;
    this.isRecommended = isRecommended;
  }

  public rating: number;
  public currentState: number;
  public isRecommended: boolean;
}

export class Film {
  constructor(name: string, description: string, imageUrl: string, seriesCount: number) {
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.seriesCount = seriesCount;
  }

  public name: string;
  public description: string;
  public imageUrl: string;
  public seriesCount: number;
}
