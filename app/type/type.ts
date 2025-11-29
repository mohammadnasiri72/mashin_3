interface SettingType {
  entityTypeId: number;
  id: number;
  isActive: boolean;
  isPrimary: boolean;
  isTechnicalProperty: boolean;
  itemCategoryId: number;
  itemId: number;
  position: number;
  priority: number;
  propertyCategoryId: number | null;
  propertyCategoryPriority: number | null;
  propertyCategoryTitle: string;
  propertyId: number;
  propertyKey: string;
  propertyValue: string;
  title: string;
  value: string;
  valueTitle: string | null;
}

interface ItemParams {
  TypeId: number;
  langCode: string;
  CategoryIdArray?: string;
  IsActive?: boolean;
  IsHome?: boolean;
  Amount1?: number;
  Amount2?: number;
  FilterProps?: string;
  Term?: string;
  OrderBy?: number;
  PageSize?: number;
  PageIndex?: number;
  FullData?: boolean;
}

interface MenuParams {
  langCode?: string;
  menuKey?: string;
}

interface MenuItem {
  id: number;
  menuId: number;
  menuKey: string;
  menuTitle: string;
  langCode: string;
  parentId: number | null;
  itemId: number;
  title: string;
  image: string;
  imageTitle: string | null;
  type: string;
  typeName: string;
  href: string;
  pageUrl: string | null;
  priority: number;
  target: "_self" | "_blank";
  url: string;
}

interface LastMenuItem {
  title: string;
  url: string;
  children?: LastMenuItem[];
}

interface MenuGroup {
  id: number;
  menuKey: string;
  title: string;
  menuItems: MenuItem[]; // آرایه‌ای از MenuItem
}

interface Items {
  amount: number;
  authorId: string;
  body: string;
  breadcrumb: string | null;
  categoryId: number;
  categoryKey: string;
  categoryTitle: string;
  comment: number;
  created: string;
  deleted: string | null;
  endDate: string | null;
  flag: number;
  headTags: string | null;
  id: number;
  image: string;
  imageMobile: string | null;
  isActive: boolean;
  isHome: boolean;
  isPrivate: string | null;
  isSys: boolean;
  itemHtml: string;
  itemInMenu: boolean;
  itemKey: string;
  itemSlugFormat: string;
  itemTypeId: number;
  itemUrlFormat: string;
  keywords: string | null;
  langCode: string;
  modified: string;
  parentId: number | null;
  priority: number;
  properties: [];
  publishCode: string;
  score: number;
  seoDescription: string;
  seoInfo: string | null;
  seoKeywords: string | null;
  seoTitle: string;
  seoUrl: string;
  sourceLink: string;
  sourceName: string;
  startDate: string | null;
  summary: string | null;
  title: string;
  total: number;
  url: string;
  userId: string | null;
  visit: number;
}

interface ItemsAttachment {
  id: number;
  itemId: number;
  categoryId: number | null;
  itemKey: number | null;
  fileUrl: string;
  title: string | null;
  priority: number;
}

interface breadcrumb {
  href: string;
  title: string;
  format: string;
}

interface properties {
  id: number;
  propertyId: number;
  propertyKey: string;
  title: string;
  position: number;
  entityTypeId: number;
  itemId: number;
  itemCategoryId: number;
  value: string;
  valueTitle: string | null;
  propertyValue: string;
  isActive: boolean;
  isPrimary: boolean;
  priority: number;
  propertyCategoryId: number | null;
  propertyCategoryTitle: string;
  propertyCategoryPriority: number | null;
  isTechnicalProperty: boolean;
}

interface ItemsId {
  body: string | null;
  summary: string | null;
  breadcrumb: breadcrumb[];
  properties: properties[];
  seoInfo: string | null;
  id: number;
  title: string;
  categoryId: number;
  categoryTitle: string;
  categoryKey: string;
  authorId: string;
  userId: string | null;
  itemKey: string;
  amount: number;
  parentId: number | null;
  image: string;
  imageMobile: string | null;
  url: string;
  keywords: string | null;
  sourceName: string;
  sourceLink: string;
  startDate: string | null;
  endDate: string | null;
  publishCode: string;
  seoUrl: string;
  seoTitle: string;
  seoKeywords: string | null;
  seoDescription: string;
  headTags: string | null;
  isActive: boolean;
  isHome: boolean;
  isSys: boolean;
  isPrivate: boolean | null;
  deleted: boolean | null;
  priority: number;
  flag: number;
  created: string;
  modified: string;
  langCode: string;
  itemTypeId: number;
  itemUrlFormat: string;
  itemSlugFormat: string;
  itemHtml: string | null;
  itemInMenu: boolean;
  total: number;
  comment: number;
  visit: number;
  score: number;
}

interface ItemCategoryParams {
  TypeId: number;
  LangCode: string;
  ParentIdArray?: number;
  IsActive?: number;
  IsHome?: number;
  Term?: string;
  OrderBy?: number;
  PageSize?: number;
  PageIndex?: number;
}

interface ItemsCategory {
  rowId: number;
  id: number;
  authorId: string;
  categoryKey: string;
  itemTypeId: number;
  title: string;
  summary: string;
  url: string;
  parentId: number;
  parentTitle: string;
  image: string;
  priority: number;
  isActive: boolean;
  isHome: boolean;
  isSys: boolean;
  routeId: string;
  path: string;
  pathLevel: number;
  total: number;
}

interface ItemsCategoryId {
  breadcrumb: string | null;
  id: number;
  authorId: string;
  categoryKey: string;
  title: string;
  itemTypeId: number;
  url: string;
  langCode: string;
  parentId: number;
  parentTitle: string;
  isActive: boolean;
  isHome: boolean;
  image: string;
  summary: string;
  body: string;
  created: string;
  modified: string;
  flag: null;
  isSys: boolean;
  priority: number;
  sourceLink: string | null;
  seoUrl: string;
  seoTitle: string;
  seoKeywords: string | null;
  seoDescription: string | null;
  headTags: string | null;
  routeId: string;
  path: string;
  path2: string | null;
  categoryUrlFormat: string;
  categorySlugFormat: string;
  categoryHtml: string | null;
  categoryInMenu: boolean;
}

interface PriceBrands {
  id: number;
  categoryKey: string;
  title: string;
  summary: string | null;
  url: string | null;
  parentId: number;
  parentTitle: string;
  image: string | null;
  priority: number;
  isHome: boolean;
  routeId: string;
}

interface Price {
  id: number;
  title: string;
  price1: number;
  price2: number;
  brandId: number;
  brandTitle: string;
  modified: string;
}
