import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {DataService} from "../data/data.service";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Subscription, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class CanaccessloginGuardService implements CanActivate {

  constructor(private dataService: DataService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(document.cookie.includes('s_cookie')) {
     return this.router.navigate(['']);
    } else {
      return true;
    }
  }
}

// .pipe(
//   map(response => {
//     let canAccessLogin: boolean = false;
//     // console.log('in map',response);
//     if (response) {
//       canAccessLogin = true;
//     }
//     return canAccessLogin;
//   }))
