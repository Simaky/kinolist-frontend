import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BackendService} from '../backend.service';
import {Film, Score, UserFilmsList, UserService} from '../user.service';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {MovieApi, MoviesApiService, Results} from '../movies-api.service';


@Component({
  selector: 'app-add-list-dialog',
  templateUrl: './add-list-dialog.component.html',
  styleUrls: ['./add-list-dialog.component.css']
})
export class AddListDialogComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Results[] = [];

  score: Score = new Score(0, 0);
  selectedItem: Results;
  posterPathPrefix = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

  constructor(
    private toastr: ToastrService,
    private moviesApiService: MoviesApiService,
    public backendService: BackendService,
    public userService: UserService,
    public dialogRef: MatDialogRef<AddListDialogComponent>) {
  }

  public addUserFilmScore(results: Results): void {
    if (this.score.rating > 10 || this.score.rating < 0) {
      this.toastr.warning('Rating should be between 0 and 10', 'Error');
      return;
    }
    if (this.score.currentState > results.seriesCount || this.score.currentState < 0) {
      this.toastr.warning('Progress should be between 0 and ' + results.seriesCount, 'Error');
      return;
    }

    let imageUrl: string;
    if (results.poster_path) {
      imageUrl = this.posterPathPrefix + results.poster_path;
    } else {
      imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/No_image_available_450_x_600.svg/450px-No_image_available_450_x_600.svg.png';
    }

    this.backendService.addFilm(new UserFilmsList(results.id, results.name || results.title, results.overview, imageUrl, results.seriesCount, new Score(this.score.rating, this.score.currentState), results.media_type), this.userService.getUser().id).subscribe(response => {
      if ((response as Response).status === 200) {
        window.location.reload();
      }
    }, error => {
      this.toastr.error('Internal server error: ' + error, 'Error');
    });

  }

  public setSelectedItem(item: Results): void {
    if (this.isTv(item)) {
      this.moviesApiService.findTvById(item.id).subscribe(response => {
        item.seriesCount = Number(response.number_of_episodes);
        console.log(response);
      }, error => {
        this.toastr.error('Internal server error: ' + error, 'Error');
      });
    } else {
      item.seriesCount = 1;
    }
    this.selectedItem = item;
  }

  public isTv(item: Results): boolean {
    return item && item.media_type !== '' && item.media_type === 'tv';
  }

  ngOnInit(): void {
    this.myControl.valueChanges.pipe(debounceTime(400)).subscribe(value => {
      this.moviesApiService.findMovieByName(value.toString()).subscribe(response => {
        this.filteredOptions = response.results;
      });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
