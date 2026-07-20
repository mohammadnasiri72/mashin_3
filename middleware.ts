import { NextRequest, NextResponse } from "next/server";
import { getCategoryByUrl } from "./services/Category/CategoryByUrl";
import { getCategoryId } from "./services/Category/CategoryId";
import { getItemByIds } from "./services/Item/ItemByIds";
import { getItemByUrl } from "./services/Item/ItemByUrl";
import { getPriceCarBrands } from "./services/Price/PriceCarBrands";
import { getPriceMotorBrands } from "./services/Price/PriceMotorBrands";

export async function middleware(request: NextRequest) {
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
    try {
      const currentFullUrl = decodeURIComponent(pathname);
      const detailsCar: ItemsId | null = await getItemByUrl(currentFullUrl);

      if (detailsCar?.url) {
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

    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname + url.search);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname.startsWith("/motorcycle/")) {
    try {
      const currentFullUrl = decodeURIComponent(pathname);
      const detailsMotor: ItemsId | null = await getItemByUrl(currentFullUrl);
      if (detailsMotor?.url) {
        // decode کردن URL دریافتی از API
        const decodedDetailsUrl = decodeURIComponent(detailsMotor.url);

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

    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname + url.search);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
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
      requestHeaders.set("x-pathname", pathname);
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
      const currentFullUrl = decodeURIComponent(pathname + url.search);
      const detailsNews: ItemsId | null = await getItemByUrl(currentFullUrl);

      if (detailsNews?.url) {
        // decode کردن URL دریافتی از API
        const decodedDetailsUrl = decodeURIComponent(detailsNews.url);

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
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname + url.search);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname.startsWith("/autoservice/")) {
    try {
      const currentFullUrl = decodeURIComponent(pathname + url.search);
      const detailsAuto: ItemsId | null = await getItemByUrl(currentFullUrl);

      if (detailsAuto?.url) {
        // decode کردن URL دریافتی از API
        const decodedDetailsUrl = decodeURIComponent(detailsAuto.url);

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
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname + url.search);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
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
      requestHeaders.set("x-pathname", pathname);
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
    try {
      const currentFullUrl = decodeURIComponent(pathname);
      const detailsNews: ItemsId | null = await getItemByUrl(currentFullUrl);

      if (detailsNews?.url) {
        // decode کردن URL دریافتی از API
        const decodedDetailsUrl = decodeURIComponent(detailsNews.url);

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
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname + url.search);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname.startsWith("/price.html")) {
    const type = searchParams.get("type");
    try {
      await getPriceCarBrands(type ? type : "internal");
      // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-pathname", pathname + url.search);
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
  }  else if (pathname.startsWith("/motorcycle-prices.html")) {
    const type = searchParams.get("type");
    try {
      await getPriceMotorBrands(type ? type : "all");
      // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-pathname", pathname + url.search);
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
  } else if (pathname.startsWith("/whichcar/")) {
   
    try {
     const currentFullUrl = decodeURIComponent(pathname + url.search);
      const detailsWhichcar: ItemsId | null = await getItemByUrl(currentFullUrl);

      if (detailsWhichcar?.url) {
        // decode کردن URL دریافتی از API
        const decodedDetailsUrl = decodeURIComponent(detailsWhichcar.url);

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
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname + url.search);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
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
  
    try {
      const currentFullUrl = decodeURIComponent(pathname + url.search);
      const detailsVideo: ItemsId | null = await getItemByUrl(currentFullUrl);

      if (detailsVideo?.url) {
        // decode کردن URL دریافتی از API
        const decodedDetailsUrl = decodeURIComponent(detailsVideo.url);

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
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname + url.search);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname.startsWith("/podcast/")) {
    try {
      const pathParts = pathname.split("/");
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
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname.startsWith("/podcast.html")) {
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname.startsWith("/videos.html")) {
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname.startsWith("/whichcars.html")) {
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname.startsWith("/best-choice/")) {
   
    try {
    const currentFullUrl = decodeURIComponent(pathname + url.search);
      const detailsBest: ItemsId | null = await getItemByUrl(currentFullUrl);

      if (detailsBest?.url) {
        // decode کردن URL دریافتی از API
        const decodedDetailsUrl = decodeURIComponent(detailsBest.url);

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
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname + url.search);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname === "/best-choices") {
    return NextResponse.redirect(new URL("/best-choices.html", request.url), {
      status: 301,
    });
  } else if (pathname.startsWith("/best-choices.html")) {
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname.startsWith("/searchcars")) {
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname.startsWith("/fa/technical-words.html")) {
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname.startsWith("/technical-words/")) {
    try {
      const pathParts = pathname.split("/");
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
        return NextResponse.redirect(
          new URL("/fa/technical-words.html", request.url),
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
  } else if (pathname.startsWith("/technical-word/")) {
    try {
      const currentFullUrl = decodeURIComponent(pathname + url.search);
      const detailsTechnical: ItemsId | null = await getItemByUrl(currentFullUrl);

      if (detailsTechnical?.url) {
        // decode کردن URL دریافتی از API
        const decodedDetailsUrl = decodeURIComponent(detailsTechnical.url);

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
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname + url.search);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname.startsWith("/technical-words.html")) {
    return NextResponse.redirect(
      new URL("/fa/technical-words.html", request.url),
      {
        status: 301,
      },
    );
  } else if (pathname.startsWith("/dashboard")) {
    const userCookie = request.cookies.get("user")?.value;
    if (!userCookie) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    try {
      const userData = JSON.parse(userCookie);

      if (!userData.token) {
        const response = NextResponse.redirect(new URL("/auth", request.url));
        response.cookies.delete("user");
        return response;
      }

      if (userData.expiration && new Date(userData.expiration) < new Date()) {
        const response = NextResponse.redirect(
          new URL("/auth?expired=true", request.url),
        );
        response.cookies.delete("user");
        return response;
      }

      const requestHeaders = new Headers(request.headers);

      // ✅ Encode کردن اطلاعات قبل از قرار دادن در هدر
      const encodedUserData = encodeURIComponent(JSON.stringify(userData));
      requestHeaders.set("x-user-data", encodedUserData);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("Error parsing user cookie:", error);
      const response = NextResponse.redirect(new URL("/auth", request.url));
      response.cookies.delete("user");
      return response;
    }
  } else {

try{
const currentFullUrl = decodeURIComponent(pathname + url.search);
      const detailsCar: ItemsId | null = await getItemByUrl(currentFullUrl);

      if (detailsCar?.url) {
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
}catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }






    const decodedPathname = decodeURIComponent(pathname);

    if (decodedPathname !== decodedPathname.toLowerCase()) {
      return NextResponse.redirect(
        new URL(decodedPathname.toLowerCase(), request.url),
        { status: 301 },
      );
    }
    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname + url.search);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}
