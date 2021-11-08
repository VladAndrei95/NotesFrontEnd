import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faUser, faUserAlt, faLock} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../data/data.service";
import {Router} from "@angular/router";

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
  @Output() logged = new EventEmitter<void>();
  constructor(private dataService: DataService,
              private router: Router) {
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
  }
  onSubmit() {
    if(this.loginMode){
    this.dataService.signIn(this.signInForm.value.username,this.signInForm.value.password)
      .subscribe(response => {
        this.dataService.fetchCategories()
          .subscribe(response => {
            console.log(response);
            this.router.navigate(['login']);
        })
    } )
      this.logged.emit();
    } else
    {
      this.dataService.createAccount(this.createAccForm.value.username,this.createAccForm.value.password);
      this.createAccForm.reset();
      this.loginMode=!this.loginMode;
    }
  }
}
