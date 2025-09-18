export interface INavigationSubmenuItem {
  text: string;
  slug: string;
  url?: string;
}

export interface INavigationSubmenuColumn {
  title: string;
  slug: string;
  items: INavigationSubmenuItem[];
  url?: string;
  active: boolean;
}

export interface INavigationMenuElement {
  text: string;
  slug: string;
  url?: string;
  submenu?: INavigationSubmenuColumn[];
}

export interface INavigationLoggedInMenuElement extends INavigationMenuElement {
  icon: string;
}
