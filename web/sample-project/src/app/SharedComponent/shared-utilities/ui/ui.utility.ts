// import { NgForm } from "@angular/forms";
// import Swal from "sweetalert2";
// import * as _ from "underscore";
// import { IDatePickerConfig, IDatePickerDirectiveConfig } from "ng2-jalali-date-picker";

// export abstract class UI {

//   private static swalPopup: typeof Swal;
//   constructor() { }

//   public static init() {
//     this.popUpInit();
//   }


//   private static popUpInit() {
//     this.swalPopup = Swal.mixin({
//       confirmButtonText: 'باشه',
//       cancelButtonText: 'بستن',
//       denyButtonText: 'انصراف',
//       allowOutsideClick: false
//     })
//   }


//   /**
//    * 
//    * @param title sweeralert warning
//    * @param content 
//    */
//   public static warningAlert(title: string, content: string) {
//     this.swalPopup.fire(title, content, "error");
//   }

//   /**
//  * 
//  * @param title sweeralert success
//  * @param content 
//  */
//   public static successAlert(title: string, content: string) {
//     this.swalPopup.fire(title, content, "success");
//   }

//   /**
//       * 
//       * @param title sweeralert confirm
//       * @param content 
//       */
//   public static confirmAlert(title: string, content: string, onConfirm: Function, onCancel: Function = null, confirmButtonText: string = null) {
//     confirmButtonText = confirmButtonText == null ? 'بله' : confirmButtonText;

//     this.swalPopup.fire({
//       title: title,
//       text: content,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: confirmButtonText
//     }).then((result) => {
//       if (result.isConfirmed) {
//         onConfirm();
//       }
//       else if (result.isDismissed && onCancel != null) {
//         onCancel();
//       }
//     })
//   }


//   /**
//    * نمایش مدال
//    * @param modalSelector 
//    */
//   public static modalShow(modalSelector: string = null) {
//     var fakeModalBtn = $(
//       `<button type="button" data-toggle="modal" data-target="${modalSelector}"></button>`
//     );


//     $('body').append(fakeModalBtn);

//     fakeModalBtn.trigger('click');
//     fakeModalBtn.remove();
//   }


//   /**
//    * نمایش مدال با شناسه آن
//    * توجه: نیازی به علامت # برای آیدی در این متد نیست
//    * @param modalId 
//    */
//   public static modalShowById(modalId: string) {
//     this.modalShow('#' + modalId);
//   }


//   /**
//    * بستن مدال
//    * @param modalSelector 
//    */
//   public static modalHide(modalSelector: string) {

//     var fakeCloseBtn = $(
//       `<button type="button" style="display:none;" data-dismiss="modal"></button>`
//     );
//     $(modalSelector).append(fakeCloseBtn);
//     fakeCloseBtn.trigger('click');
//     fakeCloseBtn.remove();
//   }


//   /**
//    * بستن مدال با شناسه آن
//    * توجه: نیازی به علامت # برای آیدی در این متد نیست
//    * @param modalId 
//    */
//   public static modalHideById(modalId: string) {
//     this.modalHide('#' + modalId);
//   }



//   /**
//    * 
//    * @param heading Info Toast
//    * @param text 
//    * @param hideAfter 
//    */
//   public static infoToast(heading: string, text: string, hideAfter: number = ENVIRONMENT.UI.UI_TOAST_ACTIVE_TIME) {
//     ($ as any).toast({
//       heading: heading,
//       text: text,
//       position: 'top-left',
//       loaderBg: '#ff6849',
//       icon: 'info',
//       hideAfter: hideAfter,
//       stack: 6
//     });
//   }


//   /**
//    * 
//    * @param heading Warning Toast
//    * @param text 
//    * @param hideAfter 
//    */
//   public static warningToast(heading: string, text: string, hideAfter: number = ENVIRONMENT.UI.UI_TOAST_ACTIVE_TIME) {
//     ($ as any).toast({
//       heading: heading,
//       text: text,
//       position: 'top-left',
//       loaderBg: '#ff6849',
//       icon: 'warning',
//       hideAfter: hideAfter,
//       stack: 6
//     });
//   }


//   /**
//    * 
//    * @param heading Success Toast
//    * @param text 
//    * @param hideAfter 
//    */
//   public static successToast(heading: string, text: string, hideAfter: number = ENVIRONMENT.UI.UI_TOAST_ACTIVE_TIME) {
//     ($ as any).toast({
//       heading: heading,
//       text: text,
//       position: 'top-left',
//       loaderBg: '#ff6849',
//       icon: 'success',
//       hideAfter: hideAfter,
//       stack: 6
//     });
//   }


//   /**
//    * 
//    * @param heading Error Toast
//    * @param text 
//    * @param hideAfter 
//    */
//   public static errorToast(heading: string, text: string, hideAfter: number = ENVIRONMENT.UI.UI_TOAST_ACTIVE_TIME) {
//     ($ as any).toast({
//       heading: heading,
//       text: text,
//       position: 'top-left',
//       loaderBg: '#ff6849',
//       icon: 'error',
//       hideAfter: hideAfter,
//       stack: 6
//     });
//   }



//   private static loaderShown: boolean = false;
//   private static loaderTimeout: any;
//   private static loaderTextTimeout: any;
//   private static loaderTextTooLongTimeout: any;
//   /**
//    * نمایش/عدم نمایش آیکن بارگزاری
//    */
//   public static HandleLoader() {
//     if (!this.loaderShown) {
//       this.ShowLoader();
//     }
//     else {
//       this.HideLoader();
//     }
//   }



//   /**
//    * نمایش آیکن بارگزاری
//    */
//   public static ShowLoader() {
//     clearTimeout(this.loaderTimeout);
//     clearTimeout(this.loaderTextTimeout);
//     clearTimeout(this.loaderTextTooLongTimeout);

//     this.loaderTimeout = setTimeout(() => {
//       $("#onscreen-loader").show();
//       this.loaderShown = true;
//       this.loaderTextTimeout = setTimeout(() => {
//         $("#onscreenloader-text-cnt").fadeIn();
//       }, 6000);
//       this.loaderTextTooLongTimeout = setTimeout(() => {
//         $("#onscreenloader-text-cnt2").fadeIn();
//       }, 25000);
//     }, ENVIRONMENT.UI.UI_LOADER_TIMEOUT);
//   }

//   /**
//    * عدم نمایش آیکن بارگزاری
//    */
//   public static HideLoader() {
//     clearTimeout(this.loaderTimeout);
//     clearTimeout(this.loaderTextTimeout);
//     clearTimeout(this.loaderTextTooLongTimeout);

//     $("#onscreen-loader").hide();
//     $("#onscreenloader-text-cnt").hide();
//     $("#onscreenloader-text-cnt2").hide();
//     this.loaderShown = false;
//   }



//   public static HandleFormButtonLoader(form: NgForm, forceHide:boolean = false) {
//     var elementsArray = (form as any).__ngContext__ as any[];
//     _.each(elementsArray, e => {
//       if (typeof (e) === 'object') {
//         var el = $(e);
//         try {
//           if (el.is('form')) {
//             var submitButton = el.find('.bpms-submit-button');
//             if (submitButton.length > 0) {
//               if (submitButton.hasClass('loading') || forceHide) {
//                 submitButton.removeClass('loading');
//                 submitButton.removeAttr('disabled');
//               }
//               else {
//                 submitButton.addClass('loading');
//                 submitButton.attr('disabled');
//               }
//             }
//           }
//         }
//         catch {

//         }

//       }
//     })
//   }



//   private static logoutCountDownInterval: any;
//   public static LogoutCountDown(seconds: number, afterDone: () => void) {
//     var cdEl = $("#logout-countdown-wrapper");
//     var circle = cdEl.find("#logout-counter-circle");
//     circle.html("--");
//     cdEl.addClass("show");
//     clearInterval(this.logoutCountDownInterval);
//     this.logoutCountDownInterval = setInterval(() => {
//       seconds--;

//       circle.html(seconds.toString());
//       if (seconds == 21 && !circle.hasClass("siren")) {
//         circle.addClass("siren")
//       }
//       else if (seconds > 21 && circle.hasClass("siren")) {
//         circle.removeClass("siren");
//       }
//       if (seconds === 0) {
//         clearInterval(this.logoutCountDownInterval);
//         afterDone();
//       }
//     }, 1000)
//   }

//   public static logoutCountDownHide() {
//     var cdEl = $("#logout-countdown-wrapper");
//     if (cdEl.hasClass("show")) {
//       clearInterval(this.logoutCountDownInterval);
//       cdEl.removeClass("show");
//     }
//   }




//   /**
//    * دریافت مقدار متغیر استایل های :root با اسم آن
//    * @param variable 
//    */
//   public static getRootStyleVariable(variable: string): string {
//     return getComputedStyle(document.documentElement).getPropertyValue(variable)
//   }


//   /**
//    * آیا المان کلیک شده در داخل و یا خود المانی که کلاسش رو وارد کردیم هست یا خیر؟
//    * @param className 
//    * @param $event 
//    * @returns 
//    */
//   public static isClassClicked(className:string, $event:any):boolean{
//     const classList = this.getClassesToRoot($event.target);
//     return classList.some(c=> c === className);
//   }

//   public static getClassesToRoot(target: any) : string[]{
//     if(target == null){
//       return <string[]>[];
//     }
//     const classListItems = target.classList as any;
//     const classNames = (classListItems.value as string).split(' ') as string[];
//     return [...classNames, ...this.getClassesToRoot(target?.parentElement)];
//   }

//   /**
//    * 
//    * @param id 
//    * @param $event 
//    * @returns 
//    */
//   public static isIdClicked(id:string, $event:any):boolean{
//     const ids = this.getIdsToRoot($event.target);
//     return ids.some(c=> c === id);
//   }


//   public static getIdsToRoot(target: any) : string[]{
//     if(target == null){
//       return <string[]>[];
//     }
//     const id = target.id as any;
//     return [id, ...this.getIdsToRoot(target?.parentElement)]
//   }


// }
