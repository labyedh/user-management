import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  constructor(private api: ApiserviceService, private router: ActivatedRoute) { }
  errMsg: any;
  SuccessMsg: any;
  getparamid: any;
  ngOnInit(): void {
    if (this.getparamid) {
      this.getparamid = this.router.snapshot.paramMap.get('id');
      this.api.getSingledata(this.getparamid).subscribe((res) => {
        console.log(res, 'selected update data');
        this.userForm.patchValue({
          login: res.data[0].login,
          password: res.data[0].password
        })

      })
    }

  }
  userForm = new FormGroup({
    'login': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  })
  userSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.api.createdata(this.userForm.value).subscribe(res => {
        console.log(res, "Data added successufully");
        this.userForm.reset();
        this.SuccessMsg = res.message;
      })
    } else {
      this.errMsg = "All Fields Are Required";
    }
  }
  updateUser() {
    if (this.userForm.valid) {
      this.api.updatedata(this.userForm.value, this.getparamid).subscribe((res) => {
        console.log(res, 'data Updated Successfully');
        this.SuccessMsg = res.message;
      })
    }
    else {
      this.errMsg = "All fields are requiered"
    };

  }

}

