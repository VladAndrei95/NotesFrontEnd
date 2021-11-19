import {Component, OnInit} from '@angular/core';
import {faUser, faUserAlt, faLock} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../data/data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  faUser = faUser;
  faUserAlt = faUserAlt;
  faLock = faLock;
  loginMode = true;
  signInForm!: FormGroup;
  createAccForm!: FormGroup;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      'username': new FormControl(null,Validators.required),
      'password': new FormControl(null,Validators.required)
    });
    this.createAccForm = new FormGroup({
      'username': new FormControl(null,Validators.required),
      'password': new FormControl(null,Validators.required),
      'confirmPassword': new FormControl('',Validators.required)
    });
  }
  onChangeLoginMode () {
    this.loginMode = !this.loginMode;
    this.createAccForm.reset();
    this.signInForm.reset();
  }
  onSubmit() {
    if(this.loginMode){
    this.dataService.signIn(this.signInForm.value.username,this.signInForm.value.password)
      .subscribe(response => {
        this.dataService.fetchCategories()
          .subscribe(response => {
            this.router.navigate(['/home']);
        })
    } )
    } else
    {
      this.dataService.createAccount(this.createAccForm.value.username,this.createAccForm.value.password)
        .subscribe(response => {
                                      this.loginMode=!this.loginMode;
                                      this.createAccForm.reset();}
                    , error => {
            console.log(error.status)});

    }
  }
}
