import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MoviesApiService, Results} from '../movies-api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-film-page',
  templateUrl: './tvs-page.component.html',
  styleUrls: ['./tvs-page.component.css']
})
export class TvsPageComponent implements OnInit {
  id: number;
  film: Results;

  constructor(private activateRoute: ActivatedRoute, public moviesApiService: MoviesApiService, private toastr: ToastrService) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.moviesApiService.findTvById(this.id).subscribe(response => {
      this.film = response;
    }, error => {
      this.toastr.error('Internal server error: ' + error, 'Error');
    });
  }

}
