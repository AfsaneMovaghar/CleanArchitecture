
import * as _ from "underscore";
import { ENVIRONMENT } from "../environment.values";

export abstract class GeneralUtility {
  constructor() { }

  /**
   * بررسی اینکه آیا مسیر داده شده نیاز به دسترسی دارد یا خیر؟
   * @param url
   */
  public static IsAnonymousAccessUrl(url: string): boolean {
    return (
      _.filter(ENVIRONMENT.URLS.ANONYMOUS_SERVICE_URLS, (f) => {
        return f === url || url.indexOf(f) >= 0
      }).length > 0
    );
  }





  /**
 * بررسی اینکه آیا مسیر داده شده نیاز لودر دارد یا نه؟؟
 * @param url
 */
  public static IsNoLoaderUrl(url: string): boolean {
    return (
      _.filter(ENVIRONMENT.URLS.NO_LOADER_SERVICE_URLS, (f) => {
        return f === url || url.indexOf(f) >= 0
      }).length > 0
    );
  }



  /**
 * بررسی اینکه آیا مسیر داده شده نیاز لودر دارد یا نه؟؟
 * @param url
 */
  public static IsIgnoreResetRefreshTokenUrl(url: string): boolean {
    return (
      _.filter(['/api/authentication/refreshToken/', '/api/authentication/getAuthInfo/'], (f) => {
        var indexOfUrl = url.indexOf(f);
        return f === url || url.indexOf(f) >= 0
      }).length > 0
    );
  }


  /**
   * دریافت عنوان خطا با توجه به
   * @param statusCode
   */
  public static getStatusCodeError(statusCode: number): string {
    switch (statusCode) {
      case 401:
        return 'خطای عدم دسترسی';
      case 404:
        return 'سرویس با آدرس مورد نظر یافت نشد';
      default:
        return 'خطای ناشناخته';
    }
  }



  public static hrefTo(url: string, newTab: boolean = false) {
    if (!newTab) {
      window.location.href = url;
    }
    else {
      window.open(url, '_blank')?.focus();
    }
  }


  /**
   * تبدیل تاریخ به میلی ثانیه
   * @param date 
   * @returns 
   */
  public static dateToMiliseconds(date: Date): number {
    let dateStr = date.toString();
    return Date.parse(dateStr);
  }


  public static generateUUID() : string { 
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

}
