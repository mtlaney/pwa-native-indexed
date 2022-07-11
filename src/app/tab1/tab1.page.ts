import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  public isFormOne: boolean = true;
  public form_one: FormGroup;
  public form_two: FormGroup;

  form_one_validation_messages = {
    'firstName': [
      { type: 'required', message: 'First name is required.' },
      { type: 'pattern', message: 'Enter a valid name.' },
      { type: 'maxLength', message: 'You can add only 30 latter.' }
    ],
    'lastName': [
      { type: 'required', message: 'Lasr name is required.' },
      { type: 'pattern', message: 'Enter a valid name.' },
      { type: 'maxLength', message: 'You can add only 30 latter.' }
    ],
    'gender': [
      { type: 'required', message: 'Gender is required.' },
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'confirmPass': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  form_two_validation_messages = {
    'address1': [
      { type: 'required', message: 'Address 1 is required.' },
      { type: 'maxLength', message: 'You can add only 30 latter.' }
    ],
    'address2': [
      { type: 'required', message: 'Address 2 is required.' },
      { type: 'maxLength', message: 'You can add only 30 latter.' }
    ],
    'area': [
      { type: 'required', message: 'Area is required.' },
    ],
    'pincode': [
      { type: 'required', message: 'Pincode is required.' },
      { type: 'maxLength', message: 'Pincode must be at least 6 characters long.' }
    ],
    'state': [
      { type: 'required', message: 'Password is required.' },
    ],
    'country': [
      { type: 'required', message: 'Password is required.' },
    ]
  };

  public storeData: any[] = [];
  public formOneValue: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private base: BaseService) {
    this.storeData = JSON.parse(localStorage.getItem("employee"));
    if (!this.storeData) {
      this.storeData = [];
    }
  }

  ngOnInit() {
    this.form_one = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.maxLength(30),
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.maxLength(30),
      ])),
      gender: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      confirmPass: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    }, {
      validators: this.password.bind(this)
    });

    this.form_two = this.formBuilder.group({
      address1: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
      ])),
      address2: new FormControl('', Validators.compose([
        Validators.maxLength(30),
      ])),
      area: new FormControl('', Validators.compose([
        Validators.required
      ])),
      pincode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      state: new FormControl('', Validators.compose([
        Validators.required
      ])),
      country: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPass } = formGroup.get('confirmPass');
    return password === confirmPass ? null : { passwordNotMatch: true };
  }

  next(value: any) {
    this.base.load().then(() => {
      console.log("1: ", value);
      this.isFormOne = !this.isFormOne;
      this.formOneValue = value;
      this.base.dismiss();
    })
  }

  prev() {
    this.isFormOne = !this.isFormOne;
  }

  submitformTwo(value: any) {
    console.log("2: ", value);
    let employee = Object.assign(this.formOneValue, value);
    console.log(employee);
    this.storeData.push(employee);
    localStorage.setItem("employee", JSON.stringify(this.storeData));
    this.router.navigate(['./tabs/view-employees'], { replaceUrl: true });
  }
}
