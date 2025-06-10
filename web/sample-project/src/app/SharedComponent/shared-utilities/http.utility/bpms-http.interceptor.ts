import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { VALUES } from '../../environment.values';
import { GeneralUtility } from '../general.utility';
import { UI } from '../ui/ui.utility';
import { USER, UserUtility } from '../user.utility';

export class BPMSHttpInterceptor implements HttpInterceptor {
  constructor() {}
  loaderNeeded:boolean = false;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.loaderNeeded = !GeneralUtility.IsNoLoaderUrl(request.url);
    if(this.loaderNeeded){
      // UI.ShowLoader();
    }
    var requestHandle = next.handle(request);
    if (
      UserUtility.isLogin() ||
      GeneralUtility.IsAnonymousAccessUrl(request.url)
    ) {
      if (UserUtility.isLogin()) {
        let selectedBranches = USER.getSelectedBranches();
        const clonedRequest = request.clone({
          setHeaders: {
            Authorization: USER.getAuthInfo().accessToken,
            'Ubranch': selectedBranches == null ? '' : selectedBranches
          },
        });
        requestHandle = next.handle(clonedRequest);
      }

      return requestHandle.pipe(
        retry(0),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }

          if (error.error == null) {
            errorMessage = GeneralUtility.getStatusCodeError(error.status);
          } else {
            errorMessage =
              error.error.error_description == null
                ? error.error.title
                : error.error.error_description;
            if (errorMessage == null) errorMessage = error.message;
          }
          
          if (error.status != 401) {

            if(error.status != 403){
              UI.errorToast("خطای ناشناخته",errorMessage);
            }
            else {
              UI.errorToast("خطای دسترسی", error.error?.messages[0]);
            }
          }
          

          if(this.loaderNeeded){
            UI.HideLoader();
          }
          return requestHandle;
        })
      );
    } else {
      UI.warningAlert('خطای دسترسی',
        `به سرویس فراخوانی شده (${request.url}) دسترسی لازم وجود ندارد`
      );
      this.signout();
      return requestHandle;
    }
  }


  
  signout(){
     GeneralUtility.hrefTo('/login');
  }
}
