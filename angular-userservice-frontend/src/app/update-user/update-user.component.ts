import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: number;
  user: User;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

    ngOnInit() {
      this.user = new User();
  
      this.id = this.route.snapshot.params['id'];
      
      this.userService.getUserById(this.id)
        .subscribe(data => {
          console.log(data)
          this.user = data;
        }, error => console.log(error));
    }
    
   onSubmit() {
     this.userService.updateUser(this.id, this.user).subscribe( data => {
      this.gotoUserList();
     },
     error => console.log(error));
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }
}
