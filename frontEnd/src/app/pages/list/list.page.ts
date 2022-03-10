import { Component, OnInit } from '@angular/core';
import { UserCrudService } from '../../services/user-crud.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  Users: any = [];

  constructor( private userCrudService: UserCrudService ,private authService: AuthService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.userCrudService.getUsers().subscribe((response) => {
      this.Users = response;
    })
  }

  removeUser(user, i) {
    if (window.confirm('Are you sure')) {
      this.userCrudService.deleteUser(user._id)
      .subscribe(() => {
          this.Users.splice(i, 1);
          console.log('User deleted!')
        }
      )
    }
  }

  logout() {
    this.authService.logout();
    window.location.reload() 
   }

}
