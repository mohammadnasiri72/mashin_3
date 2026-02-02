import { NextResponse } from "next/server";
import { getCategoryByUrl } from "./services/Category/CategoryByUrl";
import { getCategoryId } from "./services/Category/CategoryId";
import { getItemId } from "./services/Item/ItemId";
import { getItemByUrl } from "./services/Item/ItemByUrl";
import { getPriceCarBrands } from "./services/Price/PriceCarBrands";
import { getItemByIds } from "./services/Item/ItemByIds";
import { getPriceMotorBrands } from "./services/Price/PriceMotorBrands";

export async function middleware(request: Request) {
  const url = new URL(request.url);
  const { pathname, searchParams } = url;

  if (pathname.startsWith("/cars/") || pathname.startsWith("/motorcycles/")) {
    const id = Number(searchParams.get("id"));
    const decodedPathname = decodeURIComponent(pathname);
    if (id) {
      try {
        const data: ItemsCategoryId = await getCategoryId(Number(id));

        if (data?.url && data.url !== decodedPathname) {
          return NextResponse.redirect(
            new URL((data.url + `?id=${data?.id}`).toLowerCase(), request.url),
            {
              status: 301,
            },
          );
        }
      } catch (error: any) {
        const status = error.response?.status || error.status || 500;
        return NextResponse.redirect(
          new URL(`/error?status=${status}`, request.url),
          { status: 301 },
        );
      }
    } else {
      try {
        const data: ItemsCategoryId = await getCategoryByUrl(decodedPathname);
        return NextResponse.redirect(
          new URL((pathname + `?id=${data?.id}`).toLowerCase(), request.url),
          { status: 301 },
        );
      } catch (error: any) {
        const status = error.response?.status || error.status || 500;
        return NextResponse.redirect(
          new URL(`/error?status=${status}`, request.url),
          { status: 301 },
        );
      }
    }
  } else if (pathname.startsWith("/car/")) {
    const id = Number(searchParams.get("id"));
    // const decodedPathname = decodeURIComponent(pathname);
    // if (id) {
    //   try {
    //     const data: ItemsId = await getItemId(id);
    //     if (data?.url && data.url !== decodedPathname) {
    //       return NextResponse.redirect(
    //         new URL((data.url + `?id=${data?.id}`).toLowerCase(), request.url),
    //         {
    //           status: 301,
    //         }
    //       );
    //     }
    //   } catch (error: any) {
    //     const status = error.response?.status || error.status || 500;
    //     return NextResponse.redirect(
    //       new URL(`/error?status=${status}`, request.url),
    //       { status: 301 }
    //     );
    //   }
    // } else {
    //   try {
    //     const data: ItemsId = await getItemByUrl(decodedPathname);
    //     return NextResponse.redirect(
    //       new URL((pathname + `?id=${data?.id}`).toLowerCase(), request.url),
    //       { status: 301 }
    //     );
    //   } catch (error: any) {
    //     const status = error.response?.status || error.status || 500;
    //     return NextResponse.redirect(
    //       new URL(`/error?status=${status}`, request.url),
    //       { status: 301 }
    //     );
    //   }
    // }

    if (!id) {
      return NextResponse.redirect(
        new URL(`/error?status=${404}`, request.url),
        { status: 301 },
      );
    }

    try {
      const detailsCar: ItemsId = await getItemId(Number(id));

      if (detailsCar?.url) {
        // ساخت URL کامل فعلی
        const currentFullUrl = decodeURIComponent(pathname + url.search);

        // decode کردن URL دریافتی از API
        const decodedDetailsUrl = decodeURIComponent(detailsCar.url);

        // مقایسه URLها بعد از decode
        if (decodedDetailsUrl !== currentFullUrl) {
          return NextResponse.redirect(
            new URL(decodedDetailsUrl.toLowerCase(), request.url),
            { status: 301 },
          );
        }
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }
  } else if (pathname.startsWith("/motorcycle/")) {
    const decodedPathname = decodeURIComponent(pathname);
    const id = Number(searchParams.get("id"));
    if (id) {
      const data: ItemsId = await getItemId(Number(id));

      if (data?.url && data.url !== decodedPathname + `?id=${id}`) {
        return NextResponse.redirect(
          new URL(data.url.toLowerCase(), request.url),
          {
            status: 301,
          },
        );
      }
    } else {
      try {
        const data: ItemsId = await getItemByUrl(decodedPathname);
        if (data.id > 0 && id !== data?.id) {
          return NextResponse.redirect(
            new URL((pathname + `?id=${data?.id}`).toLowerCase(), request.url),
            { status: 301 },
          );
        }
      } catch (error: any) {
        const status = error.response?.status || error.status || 500;
        return NextResponse.redirect(
          new URL(`/error?status=${status}`, request.url),
          { status: 301 },
        );
      }
    }
  } else if (pathname.startsWith("/fa/reviews/")) {
    try {
      const pathParts = pathname.split("/");
      const id = Number(pathParts[3]);
      if (!isNaN(id)) {
        const data: ItemsCategoryId = await getCategoryId(id);
        const decodedPathname = decodeURIComponent(pathname);

        if (data?.url && data.url !== decodedPathname) {
          return NextResponse.redirect(
            new URL(data.url.toLowerCase(), request.url),
            {
              status: 301,
            },
          );
        }
      } else {
        return NextResponse.redirect(
          new URL(`/error?status=${400}`, request.url),
          { status: 301 },
        );
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }
  } else if (pathname.startsWith("/fa/news/")) {
    try {
      const pathParts = pathname.split("/");
      const decodedPathname = decodeURIComponent(pathname);
      const id = Number(pathParts[3]);

      if (!isNaN(id)) {
        const data: ItemsCategoryId = await getCategoryId(id);
        if (data?.url && data.url !== decodedPathname) {
          return NextResponse.redirect(
            new URL(data.url.toLowerCase(), request.url),
            {
              status: 301,
            },
          );
        }
      } else if (decodedPathname !== "/fa/news/اخبار-خودرو.html") {
        return NextResponse.redirect(
          new URL("/fa/news/اخبار-خودرو.html", request.url),
          {
            status: 301,
          },
        );
      }

      // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-pathname", pathname); // فقط مسیر
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }
  } else if (pathname.startsWith("/fa/tips-view/")) {
    try {
      const pathParts = pathname.split("/");
      const decodedPathname = decodeURIComponent(pathname);
      const id = Number(pathParts[3]);
      if (!isNaN(id)) {
        const data: ItemsId = await getItemId(id);

        if (data?.url && data.url !== decodedPathname) {
          return NextResponse.redirect(
            new URL(data.url.toLowerCase(), request.url),
            {
              status: 301,
            },
          );
        }
      } else {
        return NextResponse.redirect(
          new URL("/fa/educationtips/نکات-آموزشی.html", request.url),
          {
            status: 301,
          },
        );
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }
  } else if (pathname.startsWith("/autoservice/")) {
    const pathParts = pathname.split("/");
    const id = Number(pathParts[2]);
    try {
      if (!isNaN(id)) {
        const data: ItemsId = await getItemId(id);
        const decodedPathname = decodeURIComponent(pathname);
        const searchParams = new URL(request.url).searchParams;
        const currentIdFromQuery = searchParams.get("id");

        if (
          data?.url &&
          data.url !== decodedPathname + `?id=${currentIdFromQuery}`
        ) {
          return NextResponse.redirect(
            new URL(data.url.toLowerCase(), request.url),
            {
              status: 301,
            },
          );
        }
      } else {
        return NextResponse.redirect(
          new URL("/autoservices.html", request.url),
          {
            status: 301,
          },
        );
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }
  } else if (pathname.startsWith("/autoservices/")) {
    const pathParts = pathname.split("/");
    const id = Number(pathParts[2]);
    try {
      if (!isNaN(id)) {
        const data: ItemsCategoryId = await getCategoryId(id);
        const decodedPathname = decodeURIComponent(pathname);

        if (data?.url && data.url !== decodedPathname) {
          return NextResponse.redirect(
            new URL(data.url.toLowerCase(), request.url),
            {
              status: 301,
            },
          );
        }
      } else {
        return NextResponse.redirect(
          new URL("/autoservices.html", request.url),
          {
            status: 301,
          },
        );
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }
  } else if (pathname.startsWith("/fa/educationtips/")) {
    try {
      const decodedPathname = decodeURIComponent(pathname);
      const pathParts = pathname.split("/");
      const id = Number(pathParts[3]);
      if (!isNaN(id)) {
        const data: ItemsCategoryId = await getCategoryId(id);
        const decodedPathname = decodeURIComponent(pathname);
        if (data?.url && data.url !== decodedPathname) {
          return NextResponse.redirect(
            new URL(data.url.toLowerCase(), request.url),
            {
              status: 301,
            },
          );
        }
      } else if (decodedPathname !== "/fa/educationtips/نکات-آموزشی.html") {
        return NextResponse.redirect(
          new URL("/fa/educationtips/نکات-آموزشی.html", request.url),
          {
            status: 301,
          },
        );
      }
      // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-pathname", pathname); // فقط مسیر
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }
  } else if (pathname.startsWith("/fa/news-view/")) {
    const decodedPathname = decodeURIComponent(pathname);
    const pathParts = pathname.split("/");
    const id = Number(pathParts[3]);
    try {
      if (!isNaN(id)) {
        const data: ItemsId = await getItemId(id);
        if (data?.url && data.url !== decodedPathname) {
          return NextResponse.redirect(
            new URL(data.url.toLowerCase(), request.url),
            {
              status: 301,
            },
          );
        }
      } else {
        return NextResponse.redirect(
          new URL("/fa/news/اخبار-خودرو.html", request.url),
          {
            status: 301,
          },
        );
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }
  } else if (pathname.startsWith("/price.html")) {
    const type = searchParams.get("type");
    try {
      await getPriceCarBrands(type ? type : "internal");
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }
  } else if (pathname.startsWith("/motorcycle-prices.html")) {
    const type = searchParams.get("type");
    try {
      await getPriceMotorBrands(type ? type : "all");
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }
  } else if (pathname.startsWith("/whichcar/")) {
    const decodedPathname = decodeURIComponent(pathname);
    const pathParts = pathname.split("/");
    const id = Number(pathParts[2]);
    try {
      if (!isNaN(id)) {
        const data: ItemsId = await getItemId(id);
        if (data?.url && data.url !== decodedPathname) {
          return NextResponse.redirect(
            new URL(data.url.toLowerCase(), request.url),
            {
              status: 301,
            },
          );
        }
      } else {
        return NextResponse.redirect(new URL("/whichcars.html", request.url), {
          status: 301,
        });
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }
  } else if (pathname.startsWith("/videos/")) {
    try {
      const pathParts = pathname.split("/");
      const decodedPathname = decodeURIComponent(pathname);
      const id = Number(pathParts[2]);
      if (!isNaN(id)) {
        const data: ItemsCategoryId = await getCategoryId(id);
        const decodedPathname = decodeURIComponent(pathname);

        if (data?.url && data.url !== decodedPathname) {
          return NextResponse.redirect(
            new URL(data.url.toLowerCase(), request.url),
            {
              status: 301,
            },
          );
        }
      } else {
        return NextResponse.redirect(new URL("/videos.html", request.url), {
          status: 301,
        });
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }
  } else if (pathname.startsWith("/video/")) {
    const decodedPathname = decodeURIComponent(pathname);
    const pathParts = pathname.split("/");
    const id = Number(pathParts[2]);
    const id2 = Number(searchParams.get("id"));
    try {
      if (!isNaN(id)) {
        const data: ItemsId = await getItemId(id);
        if (data?.url && data.url !== decodedPathname + `?id=${data?.id}`) {
          return NextResponse.redirect(
            new URL(data.url.toLowerCase(), request.url),
            {
              status: 301,
            },
          );
        }
      } else if (!isNaN(id2)) {
        const data: ItemsId = await getItemId(id2);
        if (data?.url && data.url !== decodedPathname + `?id=${data?.id}`) {
          return NextResponse.redirect(
            new URL(data.url.toLowerCase(), request.url),
            {
              status: 301,
            },
          );
        }
      } else {
        return NextResponse.redirect(new URL("/videos.html", request.url), {
          status: 301,
        });
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }
  } else if (pathname.startsWith("/podcast/")) {
    try {
      const pathParts = pathname.split("/");
      const decodedPathname = decodeURIComponent(pathname);
      const id = Number(pathParts[2]);
      if (!isNaN(id)) {
        const data: ItemsCategoryId = await getCategoryId(id);
        const decodedPathname = decodeURIComponent(pathname);

        if (data?.url && data.url !== decodedPathname) {
          return NextResponse.redirect(
            new URL(data.url.toLowerCase(), request.url),
            {
              status: 301,
            },
          );
        }
      } else {
        return NextResponse.redirect(new URL("/podcast.html", request.url), {
          status: 301,
        });
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }
  } else if (pathname.startsWith("/compare/")) {
    try {
      const type = searchParams.get("type");
      const pathParts = pathname.split("/");
      const decodedPathname = decodeURIComponent(pathname);
      const ids = String(pathParts[2]);
      const dataCompare: ItemsId[] = await getItemByIds(ids);
      const idsRes = dataCompare.map((item) => item.id).join(",");

      if (ids.split(",").length > 3) {
        ids.split(",").slice(0, 3).join(",");
        if (dataCompare[0].itemTypeId === 1042) {
          return NextResponse.redirect(
            new URL(
              `/compare/${ids.split(",").slice(0, 3).join(",")}` + "?type=car",
              request.url,
            ),
            {
              status: 301,
            },
          );
        } else {
          return NextResponse.redirect(
            new URL(
              `/compare/${ids.split(",").slice(0, 3).join(",")}` +
                "?type=motor",
              request.url,
            ),
            {
              status: 301,
            },
          );
        }
      }
      if (idsRes !== ids) {
        if (dataCompare[0].itemTypeId === 1042) {
          return NextResponse.redirect(
            new URL(`/compare/${idsRes}` + "?type=car", request.url),
            {
              status: 301,
            },
          );
        } else {
          return NextResponse.redirect(
            new URL(`/compare/${idsRes}` + "?type=motor", request.url),
            {
              status: 301,
            },
          );
        }
      }

      if (dataCompare[0].itemTypeId === 1052 && type !== "motor") {
        return NextResponse.redirect(
          new URL(
            `/compare/${ids.split(",").slice(0, 3).join(",")}` + `?type=motor`,
            request.url,
          ),
          {
            status: 301,
          },
        );
      }
      if (dataCompare[0].itemTypeId === 1042 && type !== "car") {
        return NextResponse.redirect(
          new URL(
            `/compare/${ids.split(",").slice(0, 3).join(",")}` + `?type=car`,
            request.url,
          ),
          {
            status: 301,
          },
        );
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }
  } else if (pathname.startsWith("/autoservices.html")) {
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname); // فقط مسیر
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname.startsWith("/podcast.html")) {
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname); // فقط مسیر
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname.startsWith("/videos.html")) {
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname); // فقط مسیر
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname.startsWith("/whichcars.html")) {
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname); // فقط مسیر
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else {
    const decodedPathname = decodeURIComponent(pathname);
    if (decodedPathname !== decodedPathname.toLowerCase()) {
      return NextResponse.redirect(
        new URL(decodedPathname.toLowerCase(), request.url),
        { status: 301 },
      );
    }
    // else {
    //   const isLikelyDynamicPage =
    //     pathname !== "/" &&
    //     !pathname.includes(".") && // فایل‌ها (html, css, js, png, etc)
    //     !pathname.includes("/error") &&
    //     pathname.split("/").length > 1; // حداقل یک بخش در مسیر
    //   if (isLikelyDynamicPage) {
    //     try {
    //       const data: ItemsId = await getItemByUrl(pathname);
    //       if (data?.url && data.url !== decodedPathname) {
    //         return NextResponse.redirect(
    //           new URL(data.url.toLowerCase(), request.url),
    //           { status: 301 },
    //         );
    //       }
    //       const requestHeaders = new Headers(request.headers);
    //       requestHeaders.set("x-pathname", pathname);
    //       requestHeaders.set("x-item-id", data?.id?.toString() || "");

    //       return NextResponse.next({
    //         request: {
    //           headers: requestHeaders,
    //         },
    //       });
    //     } catch (error: any) {
    //       const status = error.response?.status || error.status || 500;
    //       return NextResponse.redirect(
    //         new URL(`/error?status=${status}`, request.url),
    //         { status: 301 },
    //       );
    //     }
    //   }
    // }
  }

  return NextResponse.next();
}
