import {HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import {catchError, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import { throwError } from "rxjs/internal/observable/throwError";
@Injectable()
export class IsloggedinInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = '';
          if(error.status === 401){
          this.router.navigate(['auth'])}
         else {
          message = `Error Status: ${error.status}\nMessage: ${error.message}`;
         }
         return throwError(error);
         ;
        }
      )
    )}
}

