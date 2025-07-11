export interface INavigationSubmenuItem {
  text: string;
  url?: string;
}

export interface INavigationSubmenuColumn {
  title: string;
  items: INavigationSubmenuItem[];
}

export interface INavigationMenuElement {
  text: string;
  url?: string;
  submenu?: INavigationSubmenuColumn[];
}
