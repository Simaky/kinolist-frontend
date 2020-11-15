import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {
  constructor(private httpClient: HttpClient) {
  }

  public findMovieByName(movieName: string): Observable<MovieApi> {
    return this.httpClient.get<MovieApi>('https://api.themoviedb.org/3/search/multi?api_key=552f5d9f72c42ea4e0e5df5ded013654&page=1&query=' + movieName);
  }

  public findMovieById(movieId: number): Observable<Results> {
    return this.httpClient.get<Results>('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=552f5d9f72c42ea4e0e5df5ded013654');
  }

  public findTvById(tvId: number): Observable<Results> {
    return this.httpClient.get<Results>('https://api.themoviedb.org/3/tv/' + tvId + '?api_key=552f5d9f72c42ea4e0e5df5ded013654');
  }
}

export class MovieApi {
  constructor(results: Results[]) {
    this.results = results;
  }

  public results: Results[];
}

export class Results {
  constructor(id: number, title: string, name: string, overview: string, poster_path: string, seriesCount: number, media_type: string, number_of_episodes: string, release_date: string, first_air_date: string) {
    this.id = id;
    this.title = title;
    this.name = name;
    this.overview = overview;
    this.poster_path = poster_path;
    this.seriesCount = seriesCount;
    this.media_type = media_type;
    this.number_of_episodes = number_of_episodes;
    this.release_date = release_date;
    this.first_air_date = first_air_date;
  }

  public id: number;
  public title: string;
  public name: string;
  public overview: string;
  public poster_path: string;
  public seriesCount: number;
  public media_type: string;
  public number_of_episodes: string;
  public release_date: string;
  public first_air_date: string;
}
