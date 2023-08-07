import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  constructor(private api: ApiserviceService) { }
  readUsers: any;
  succesMsg: any;
  ngOnInit(): void {
    this.api.getAllUsers().subscribe((res) => {
      console.log("Get All Users", res);
      this.readUsers = res.data;
    })
  }

  deleteId(id: any) {
    this.api.deletedata(id).subscribe(res => {
      console.log(res, 'deleted Id no');
      this.succesMsg = res.message;

      this.api.getAllUsers().subscribe((res) => {
        console.log("Get All Users", res);
        this.readUsers = res.data;
      })
    })
  }

}
