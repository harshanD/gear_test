import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from "../../services/users.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {

  users: any = [];

  constructor(
    private route: ActivatedRoute,
    private _userService: UsersService,
    private message: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.users = this.route.snapshot.data.items;
  }

  userStatusChange(status, id) {
    this._userService.userStatusChange({status: status.checked, id: id}).subscribe(value => {
      console.log('xxxxxxxxxxxxxxxxxxxxx')
      console.log(value)
      this.message.create('success', `Successfully updated`);
    })
  }

}
