import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  loginForm:any = new  FormGroup({});

  constructor(public _fb: FormBuilder, private router: Router) { }


  ngOnInit() {
    this.createloginForm()
  }

  createloginForm() {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,')]]
    })
  }

  login() {
    console.log(this.loginForm)
    this.router.navigate(['/main'])
  }

}
