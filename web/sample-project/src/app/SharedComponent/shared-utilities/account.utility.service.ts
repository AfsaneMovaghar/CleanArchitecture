import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageUtility } from 'src/app/shared-core/shared-utilities/localstorage.utility';
import { result } from 'underscore';
import { ENVIRONMENT } from '../environment.values';
import { AuthenticateResponse } from '../shared-models/AuthenticateResponse';
import { AuthInfoDTO } from '../shared-models/AuthInfoDTO';
import { ServerResult } from '../shared-models/ServerResult';
import { AuthenticationService } from '../shared-services/authentication.service';
import { GeneralUtility } from './general.utility';
import { USER, UserUtility } from './user.utility';


@Injectable({
  providedIn: 'root'
})
export class AccountUtilityService {

  constructor(private authService: AuthenticationService) {

  }


  refreshTokenAsync(refreshToken): Observable<ServerResult<AuthenticateResponse>> {
    return this.authService.refreshTokenAsync(refreshToken);
  }

  getAuthInfo(): Observable<ServerResult<AuthInfoDTO>> {
    return this.authService.getAuthInfo();
  }

  /**
* فرایند خروج از حساب
*/
  logout() {
    this.authService.logoutAsync().
      subscribe(result => {
        if (result.success)
          this.clearLoginTokenAndStorages();
      });
  }

  /**
   * فرایند خروج و انتقال به لاگین
   */
  signout(returnUrl: string = null) {
    this.logout();
    GeneralUtility.hrefTo(returnUrl == null ? '/login' : `/login?returnUrl=${returnUrl}`);
  }


  /**
 * پاک کردن کوکی های لاگین
 */
  clearLoginTokenAndStorages() {
    this.clearLoginStorages();
    UserUtility.clearToken();
  }


  /**
* پاکسازی کوکی های لاگین
*/
  clearLoginStorages() {
    LocalStorageUtility.remove(ENVIRONMENT.LS_KEYS.AUTH_TOKENS);
    LocalStorageUtility.remove(ENVIRONMENT.LS_KEYS.SELECTED_BRANCHES);
  }


  /**
  * دریج اطلاعات احزار هویت در کوکی ها
  */
  setAuthStorages() {
    this.clearLoginStorages();
    var authInfo = USER.getAuthInfo();

    LocalStorageUtility.set<AuthenticateResponse>(ENVIRONMENT.LS_KEYS.AUTH_TOKENS, authInfo);
    UserUtility.storeAllBranchesInLocalStorage(authInfo.userBranchs);
  }



  /**
   * درج در کوکی و متغیر گلوبال توکن
   */
  setAuthStorageAndToken(authResponse: AuthenticateResponse) {
    UserUtility.setAuthInfo(authResponse);
    this.setAuthStorages();
  }
}
