export type INavigationSubmenuItem = INavigationBase;

export interface INavigationSubmenuColumn extends INavigationBase {
  items: INavigationSubmenuItem[];
  active: boolean;
}

export interface INavigationMenuElement extends INavigationBase {
  submenu?: INavigationSubmenuColumn[];
}

export interface INavigationLoggedInMenuElement extends INavigationMenuElement {
  icon: string;
}

export interface INavigationBase {
  text: string;
  slug: string;
  url?: string;
}
