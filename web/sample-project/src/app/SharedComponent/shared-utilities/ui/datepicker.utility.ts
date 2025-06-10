import { DatePickerComponent, IDatePickerConfig } from "ng2-jalali-date-picker";
import * as jmoment from 'jalali-moment'
import { ENVIRONMENT } from "../../environment.values";

export abstract class BpmsDatePickerHelper {

    
    /**
   * انتقال تاریخ نمایشی یک دیت پیکر به یک تاریخ خاص
   * @param datePickerElement 
   * @param date 
   */
  public static selectDate(datePickerElement:DatePickerComponent, date:Date){
    datePickerElement.selected = [this.getModelJMoment(date)];
  }


  /**
   * دریافت تاریخ شمسی از تاریخ میلادی بصورت رشته
   * @param date 
   * @returns 
   */
  public static getDatePersianString(date:Date): string {
    if (date == null)
      return "";

    let MomentDate = this.getModelJMoment(date);
    return MomentDate.locale('fa').format(ENVIRONMENT.DATE_PICKER.GLOBAL_DATEPICKER_CONFIG.format);
  }


  /**
   * دریافت
   * jMoment
   * از یک تاریخ
   * @param date 
   * @returns 
   */
  public static getModelJMoment(date:Date) : jmoment.Moment {
    return jmoment(date, ENVIRONMENT.DATE_PICKER.GLOBAL_DATEPICKER_CONFIG.format);
  }
}
