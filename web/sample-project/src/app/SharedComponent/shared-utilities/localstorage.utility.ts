export abstract class LocalStorageUtility {
    
  public static set<T>(key:string, value:T){
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static get<T>(key:string) : T {
    var stringItem = localStorage.getItem(key);
    return JSON.parse(stringItem) as T;
  }

  public static remove(key:string) : void {
    localStorage.removeItem(key);
  }
}