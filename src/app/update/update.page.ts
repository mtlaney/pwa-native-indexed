import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/services/base-service.service';
export class Employee {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  confirmPass: string;
  state: string;
  country: string;
  address1: string
  address2: string
  area: string
  pincode: string
}

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
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

  public employee: Employee;
  public formOneValue: any;
  public employeeData: any[];
  public index: any;


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private base: BaseService) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.index = this.router.getCurrentNavigation().extras.state.index;
        this.employeeData = JSON.parse(localStorage.getItem("employee"));
        this.employee = this.employeeData[this.index];
      }
    })
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
        Validators.required,
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

    this.bindData();
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPass } = formGroup.get('confirmPass');
    return password === confirmPass ? null : { passwordNotMatch: true };
  }

  bindData() {
    this.form_one = this.formBuilder.group({
      firstName: [this.employee?.firstName],
      lastName: [this.employee?.lastName],
      gender: [this.employee?.gender],
      email: [this.employee?.email],
      password: [this.employee?.password],
      confirmPass: [this.employee?.confirmPass]
    });
    this.form_two = this.formBuilder.group({
      address1: [this.employee?.address1],
      address2: [this.employee?.address2],
      area: [this.employee?.area],
      pincode: [this.employee?.pincode],
      state: [this.employee?.state],
      country: [this.employee?.country]
    });
  }

  next(value: any) {
    this.base.load().then(() => {
      this.isFormOne = !this.isFormOne;
      this.formOneValue = value;
      this.base.dismiss();
    })
  }

  prev() {
    this.isFormOne = !this.isFormOne;
  }

  submitformTwo(value: any) {
    let employee = Object.assign(this.formOneValue, value);
    this.employeeData[this.index] = employee;
    localStorage.setItem("employee", JSON.stringify(this.employeeData));
    this.router.navigate(['./tabs/view-employees'], { replaceUrl: true });
  }
}
