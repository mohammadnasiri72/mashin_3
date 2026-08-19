import { cache } from "react";
import { getCategory } from "@/services/Category/Category";
import { getItem } from "@/services/Item/Item";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { getPriceCar } from "@/services/Price/PriceCar";
import { getPriceCarBrands } from "@/services/Price/PriceCarBrands";
import { getPropertyIds } from "@/services/Property/propertyIds";

export const getHomeSlider = cache(() =>
  getItem({ TypeId: 6, langCode: "fa" }),
);

export const getHomeNews = cache(() =>
  getItem({
    TypeId: 5,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 6,
    FullData: false,
  }),
);

export const getHomeNewsCar = cache(() =>
  getItem({
    TypeId: 5,
    langCode: "fa",
    CategoryIdArray: "6323",
    PageIndex: 1,
    PageSize: 1,
  }),
);
export const getHomeNewsCarOut = cache(() =>
  getItem({
    TypeId: 5,
    langCode: "fa",
    CategoryIdArray: "8997",
    PageIndex: 1,
    PageSize: 1,
  }),
);

export const getHomeSaleNews = cache(() =>
  getItem({
    TypeId: 5,
    langCode: "fa",
    CategoryIdArray: "6593",
    PageIndex: 1,
    PageSize: 10,
  }),
);

export const getHomeWhichCars = cache(() =>
  getItem({ TypeId: 1045, langCode: "fa", PageIndex: 1, PageSize: 10 }),
);

export const getHomeSegmentCars = cache(() =>
  getItem({ TypeId: 1048, langCode: "fa" }),
);

export const getHomeVideos = cache(() =>
  getItem({ TypeId: 1028, langCode: "fa", PageIndex: 1, PageSize: 10 }),
);

export const getHomeCarSpecs = cache(() =>
  getItem({
    TypeId: 1042,
    langCode: "fa",
    IsHome: 1,
    PageIndex: 1,
    PageSize: 12,
  }),
);

export const getHomeEducation = cache(() =>
  getItem({ TypeId: 3, langCode: "fa", PageIndex: 1, PageSize: 4 }),
);

export const getHomeBrandMotor = cache(() =>
  getCategory({
    TypeId: 1052,
    LangCode: "fa",
    ParentIdArray: 6059,
    PageIndex: 1,
    PageSize: 200,
  }),
);

export const getHomeBrandsCar = cache(() =>
  getCategory({
    TypeId: 1042,
    LangCode: "fa",
    ParentIdArray: 6058,
    PageIndex: 1,
    PageSize: 200,
  }),
);

export const getHomeBrandsAuto = cache(() =>
  getCategory({ TypeId: 1050, LangCode: "fa", PageIndex: 1, PageSize: 12 }),
);

export const getHomeAutoServiceData = cache(() =>
  getItem({
    TypeId: 1050,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 15,
    OrderBy: 13,
  }),
);

export const getHomeCarSpecProperties = cache(async () => {
  const carSpecs = await getHomeCarSpecs();  
  if (carSpecs.length === 0) return { carSpecs, Properties: [] as properties[] };
  const Properties = await getPropertyIds(
    carSpecs.map((item) => item.id).join(","),
  );
  
  
  return { carSpecs, Properties };
});

export const getHomePrices = cache(async () => {
  const brands: BrandsPrice = await getPriceCarBrands("internal");
  const prices: Price = await getPriceCar({
    Type: "internal",
    BrandId: brands.brands[0].id,
  });
  return { brands, prices };
});

export const getHomeAutoServices = cache(async () => {
  const AutoServiceData = await getHomeAutoServiceData();
  const ids = AutoServiceData.map((item) => item.id).join(",");
  const propertyItems: ItemsId[] = ids ? await getItemByIds(ids) : [];
  const brandsAuto = await getHomeBrandsAuto();
  return { AutoServiceData, propertyItems, brandsAuto };
});
