import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {BackendService} from '../backend.service';
import {Score, UserFilmsList, UserService} from '../user.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import {EditListDialogComponent} from '../edit-list-dialog/edit-list-dialog.component';
import {AddListDialogComponent} from '../add-list-dialog/add-list-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['#', 'imageUrl', 'name', 'rating', 'currentState', 'mediaType', 'isRecommended', 'button'];
  dataSource = new MatTableDataSource([]);
  id: number;
  userName: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private activateRoute: ActivatedRoute,
              public backendService: BackendService,
              public userService: UserService,
              public dialog: MatDialog,
              private toastr: ToastrService) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getUserFilmList();
    if (!this.userService.getUser() || (this.userService.getUser() && this.id !== this.userService.getUser().id)) {
      this.getUserName();
    }
  }

  public onShareClick(): void {
    this.toastr.success('Link to your list was copied to clipboard', 'Success');
  }

  public isListOwner(): boolean {
    return this.userService.getUser() && this.id == this.userService.getUser().id;
  }

  public openAddDialog(): void {
    const dialogRef = this.dialog.open(AddListDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public openDeleteDialog(filmId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: filmId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public openEditDialog(userFilmsList: UserFilmsList): void {
    const dialogRef = this.dialog.open(EditListDialogComponent, {
      width: '250px',
      data: userFilmsList
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public getUserName(): void {
    this.backendService.getUserById(this.id).subscribe(response => {
      this.userName = response.username;
    }, error => {
      if (error.error.status !== 410) {
        window.location.replace('/notfound');
      }
    });
  }

  public getUserFilmList(): void {
    this.backendService.getUserFilmsList(this.id).subscribe(response => {
      this.dataSource.data = this.scoreToVariables(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.log(error);
    });
  }

  private scoreToVariables(userFilmsList: UserFilmsList[]): UserFilmsList[] {
    userFilmsList.forEach(element => {
      element.currentState = element.score.currentState;
      element.rating = element.score.rating;
      element.isRecommended = element.score.isRecommended;
    });
    return userFilmsList;
  }

  ngAfterViewInit(): void {
  }
}
