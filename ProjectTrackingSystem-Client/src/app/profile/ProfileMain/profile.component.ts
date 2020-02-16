import { ChangePassModalComponent } from './../Modals/ChangePassModal/ChangePassModal.component';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RegisterUser } from 'src/app/_models/RegisterUser';
import { UserService } from 'src/app/_services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user: RegisterUser;
bsModalRef: BsModalRef;
  constructor(public userService: UserService,
              public authService: AuthService,
              public modalService: BsModalService) { }

  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this.userService.getUser(this.authService.currentUser.id).subscribe((_user: any) => {
      this.user = _user;
    }, error => {
      console.log(error);
    });
  }
  changePassword() {
    const user = this.user;
    const initialState = {
      user,
      title: 'Change Passwrod'
    };
    
    this.bsModalRef = this.modalService.show(ChangePassModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
