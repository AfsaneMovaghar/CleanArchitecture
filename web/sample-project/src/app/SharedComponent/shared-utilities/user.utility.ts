import { LocalStorageUtility } from "src/app/shared-core/shared-utilities/localstorage.utility";
import * as _ from "underscore";
import { ENVIRONMENT } from "../environment.values";
import { ThemeColorSet } from "../shared-models-clientside/selected-colorset";
import { SelectedPortalMenu } from "../shared-models-clientside/selected-portalmenu";
import { AuthenticateResponse } from "../shared-models/AuthenticateResponse";
import { AuthInfoDTO } from "../shared-models/AuthInfoDTO";
import { PortalMenuView } from "../shared-models/PortalMenuView";
import { TitleValue } from "../shared-models/TitleValue";
import { UserInfoView } from "../shared-models/UserInfoView";


export abstract class UserUtility {

  public static userInfo: UserInfoView;
  public static authRequestResultInfo: AuthInfoDTO;
  public static selectedColor: ThemeColorSet;
  public static currentPage:PortalMenuView;
  private static selectedBranches: string = null;
  public static allBranchesSelected: boolean = false;
  private static allBranches: TitleValue<string>[] = [];


  constructor() {
  }

  /**
   * کاربر لاگین هست؟
   */
  public static isLogin(): boolean {
    return this.authInfo != null;
  }

  //#region browse history
  private static browseHistory: string[] = [];
  public static pushToBrowseHistory(url: string) {
    this.browseHistory.push(url);
  }

  public static getBrowseHistory(): string[] {
    return this.browseHistory;
  }

  public static getPreviousBrowseUrl(): string {
    return this.browseHistory.length > 1 ? null : this.browseHistory[this.browseHistory.length - 1];
  }
  //#endregion browse history

  //#region token methods

  private static authInfo: AuthenticateResponse;


  /**
   * پاکسازی توکن
   */
  public static clearToken() {
    this.authInfo = null;
  }

  /**
   * دریافت توکن ها
   */
  public static getAuthInfo(): AuthenticateResponse {
    return this.authInfo;
  }


  /**
  * درج توکن در متغیر گلوبال
  */
  public static setAuthInfo(authResponse: AuthenticateResponse): AuthenticateResponse {
    authResponse.accessToken = 'Bearer ' + authResponse.accessToken;
    this.authInfo = authResponse;

    return authResponse;
  }


  /**
   * درج توکن ها بصورت مجزا با مقادیر آن
   * @param access_token
   * @param refresh_token
   * @param expire_in
   */
  public static setAuthInfoByKeys(authInfo: AuthenticateResponse = null): AuthenticateResponse {
    this.authInfo = authInfo == null ? LocalStorageUtility.get<AuthenticateResponse>(ENVIRONMENT.LS_KEYS.AUTH_TOKENS) : authInfo;
    return this.authInfo;
  }


  /**
   * دریافت منوی انتخاب شده با توجه به مسیر آدرس در بروزر
   * @returns 
   */
  public static getSelectedRoutePortalMenu(url: string = null, userInfo: UserInfoView = null): SelectedPortalMenu {
    this.userInfo ??= userInfo;
    if (this.userInfo == null)
      return null;

    let result = <SelectedPortalMenu>{};
    let portals = this.userInfo.portals;
    url ??= window.location.pathname;
    let urlSections = _.filter(url.split('/'), u => u.length > 0);

    if (urlSections.length < 1) {
      return null;
    }

    let selectedPortal = _.find(portals, p => p.key.toLowerCase() == urlSections[0].toLowerCase());
    if (selectedPortal == null) {
      if (urlSections[0].toLowerCase() === 'general') {
        selectedPortal = portals.filter(p => p.key.toLowerCase() !== 'default')[0];
      }
      else {
        return null;
      }
    }

    result.portal = selectedPortal;
    if (urlSections.length < 2) {
      result.menu = selectedPortal.menus[0];
    }

    let sub2PortalRoute = null;
    if (urlSections.length === 3) {
      sub2PortalRoute = `${urlSections[1]}/${urlSections[2]}`
    }
    result.menu = _.find(selectedPortal.menus,
      m => m.routeUrl?.toLowerCase() == urlSections[1].toLowerCase()
        ||
        (sub2PortalRoute != null && m.routeUrl?.toLowerCase() == sub2PortalRoute.toLowerCase()));
  
    return result;
  }

  //#endregion end token methods


  //#region branches methods

  public static getSelectedBranches(): string {
    return _.map(_.filter(this.allBranches, b => b.isSelected === true), br => br.value).join(',');
  }

  public static storeAllBranchesInLocalStorage(branches: TitleValue<string>[]) {
    LocalStorageUtility.set(ENVIRONMENT.LS_KEYS.SELECTED_BRANCHES, branches);
  }

  public static setAndStoreBranchVariablesAndLocalStorage(branches: TitleValue<string>[]) {
    this.storeAllBranchesInLocalStorage(branches);
    this.allBranches = branches;
    this.selectedBranches = this.getSelectedBranches();
    this.allBranchesSelected = this.allBranches?.length > 1 && this.allBranches.every(a => a.isSelected === true);
  }

  public static setBranchVariablesFromLocalStorage() {
    this.allBranches = this.getAllBranchesFromLocalStorage();
    this.selectedBranches = this.getSelectedBranches();
  }

  public static getAllBranchesFromLocalStorage(): TitleValue<string>[] {
    return LocalStorageUtility.get<TitleValue<string>[]>(ENVIRONMENT.LS_KEYS.SELECTED_BRANCHES);
  }

  public static getAllBranches(): TitleValue<string>[] {
    return this.allBranches;
  }

  public static setColorSet(colorSetToChange: ThemeColorSet = null) {
    if (colorSetToChange == null) {
      this.selectedColor = LocalStorageUtility.get<ThemeColorSet>(ENVIRONMENT.LS_KEYS.SELECTED_COLOR);
      if (this.selectedColor == null) {
        this.selectedColor = ENVIRONMENT.UI.THEME_DARKPANEL_COLORSETS[0];
        LocalStorageUtility.set<ThemeColorSet>(ENVIRONMENT.LS_KEYS.SELECTED_COLOR, this.selectedColor);
      }
    }
    else {
      this.selectedColor = colorSetToChange;
      LocalStorageUtility.set<ThemeColorSet>(ENVIRONMENT.LS_KEYS.SELECTED_COLOR, colorSetToChange)
    }

    document.documentElement.style.setProperty('--main-color', this.selectedColor.mainColor);
    document.documentElement.style.setProperty('--dim-color', this.selectedColor.dimColor);
    document.documentElement.style.setProperty('--color-1', this.selectedColor.color1);
    document.documentElement.style.setProperty('--lines-color', this.selectedColor.linesColor);
    document.documentElement.style.setProperty('--text-color-1', this.selectedColor.textColor1);
  }

  //#endregion branches methods
}


export const USER = {
  getAuthInfo: () => UserUtility.getAuthInfo(),
  getInfo: () => UserUtility.userInfo,
  getSelectedBranches: () => UserUtility.getSelectedBranches(),
  getAllBranches: () => UserUtility.getAllBranches(),
  getSystemInfo: () => UserUtility.userInfo.systemInfo,
  getSelectedColor: () => UserUtility.selectedColor,
  getCurrentPage:() => UserUtility.currentPage
}
