import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { GeneralUtility } from './general.utility';
import { ENVIRONMENT } from '../environment.values';
import { AuthInfoDTO } from '../shared-models/AuthInfoDTO';
import { AccountUtilityService } from './account.utility.service';
import { AuthenticateResponse } from '../shared-models/AuthenticateResponse';
import { ServerResult } from '../shared-models/ServerResult';


//Pages Utility Service
//This service must inject in almost every page components!
//این سرویس تقریبا در تمامی صفحات لازمه که اینجکت بشه
// صفحاتی که مستقیما از 
//BaseComponent
//ارث بری می کنن می تونن بدون این سرویس کار کنند ولی ممکنه بعضی از متدهای پایه ای کار نکنه
//
// تمامی متدهایی که بصورت روتین و پرتکرار در صفحات و یا کامپوننت ها استفاده میشن میتونه به این سرویس اضافه بشن
@Injectable({
  providedIn: 'root'
})
export class PagesUtilityService {

  constructor(
    public titleService: Title,
    public router: Router,
    public route: ActivatedRoute,
    public accountUtilityService: AccountUtilityService
  ) { }


  /**
   * تغییر عنوان صفحه
   * Required Injections: Title
   * @param pageTitle
   */
  setPageTitle(pageTitle: string) {
    if (pageTitle != null && this.titleService != null) {
      this.titleService.setTitle(`${ENVIRONMENT.PAGES.PAGE_TAB_HEADERS_PREFIX} - ${pageTitle}`);
    }
  }


  //#region account, login tokens and cookie handlers

  refreshTokenAsync(refreshToken): Observable<ServerResult<AuthenticateResponse>> {
    return this.accountUtilityService.refreshTokenAsync(refreshToken);
  }

  /**
   * درج در کوکی و متغیر گلوبال توکن
   */
  setAuthStorageAndToken(authResponse: AuthenticateResponse) {
    this.accountUtilityService.setAuthStorageAndToken(authResponse);
  }


  getAuthInfo(): Observable<ServerResult<AuthInfoDTO>> {
    return this.accountUtilityService.getAuthInfo();
  }

  //#endregion account handlers

  //#region navigation handlers


  get queryParams(): Observable<Params> {
    return this.route.queryParams;
  }

  get params(): Observable<Params> {
    return this.route.params;
  }

  /**
   * تابع تغییر آدرس صفحه
   * Required Injections: Router
   * @param url
   */
  redirectTo(url: string, queryParams:Params = null) {
    this.router.navigate([url], {queryParams: queryParams });
  }


  /**
   *
   * @param url
   */
  hrefTo(url: string, newTab: boolean = false) {
    GeneralUtility.hrefTo(url, newTab);
  }



  //#endregion navigation handlers

  //#region signout/logout handlers

  /**
* فرایند خروج از حساب
*/
  logout() {
    this.accountUtilityService.clearLoginTokenAndStorages();
  }

  /**
   * فرایند خروج و انتقال به لاگین
   */
  signout(returnUrl:string) {
    this.accountUtilityService.signout(returnUrl);
  }

  //#endregion signout/logout handlers

  reduce<TElement, TResult>(
    array: TElement[],
    reducer: (result: TResult, el: TElement) => TResult,
    initialResult: TResult
  ): TResult {
    let result = initialResult;
    for (const element of array) {
      result = reducer(result, element);
    }
    return result;
  }
}
