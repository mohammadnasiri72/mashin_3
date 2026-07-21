import { NextRequest, NextResponse } from "next/server";
import { getItemByIds } from "./services/Item/ItemByIds";
import { getItemByUrl } from "./services/Item/ItemByUrl";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const { pathname, searchParams } = url;

  const isItemPatch =
    pathname.startsWith("/cars/") ||
    pathname.startsWith("/motorcycles/") ||
    pathname.startsWith("/car/") ||
    pathname.startsWith("/motorcycle/") ||
    pathname.startsWith("/fa/tips-view/") ||
    pathname.startsWith("/autoservice/") ||
    pathname.startsWith("/fa/news-view/") ||
    pathname.startsWith("/whichcar/") ||
    pathname.startsWith("/video/") ||
    pathname.startsWith("/best-choice/") ||
    pathname.startsWith("/technical-word/") ||
    pathname.startsWith("/autoservices.html") ||
    pathname.startsWith("/fa/news/") ||
    pathname.startsWith("/fa/reviews/") ||
    pathname.startsWith("/autoservices/") ||
    pathname.startsWith("/fa/educationtips/") ||
    pathname.startsWith("/videos/") ||
    pathname.startsWith("/podcast/") ||
    pathname.startsWith("/podcast.html") ||
    pathname.startsWith("/videos.html") ||
    pathname.startsWith("/whichcars.html") ||
    pathname.startsWith("/best-choices.html") ||
    pathname.startsWith("/fa/technical-words.html") ||
    pathname.startsWith("/technical-words/") ||
    pathname.startsWith("/price.html") ||
    pathname.startsWith("/motorcycle-prices.html") ||
    pathname.startsWith("/search-cars");

  if (pathname.startsWith("/error")) {
    return NextResponse.next();
  } else if (isItemPatch) {
    try {
      const FullUrl = decodeURIComponent(pathname + url.search);
      const currentUrl = decodeURIComponent(pathname);
      const detailsItem: ItemsId | ItemsCategoryId | null =
        await getItemByUrl(FullUrl);

      if (detailsItem?.url) {
        // decode کردن URL دریافتی از API
        const decodedDetailsUrl = decodeURIComponent(detailsItem.url);

        // مقایسه URLها بعد از decode
        if (decodedDetailsUrl !== currentUrl) {
          return NextResponse.redirect(
            new URL(decodedDetailsUrl.toLowerCase(), request.url),
            { status: 301 },
          );
        }
      }
      if (!detailsItem) {
        const errorUrl = new URL("/error", request.url);
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-error-status", "404");

        return NextResponse.rewrite(errorUrl, {
          request: {
            headers: requestHeaders,
          },
          status: 404,
        });
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      const errorUrl = new URL("/error", request.url);
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-error-status", String(status));
      return NextResponse.rewrite(errorUrl, {
        request: {
          headers: requestHeaders,
        },
        status: status,
      });
    }

    // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname + url.search);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
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
    try {
      const currentFullUrl = decodeURIComponent(pathname);
      const FullUrl = decodeURIComponent(pathname + url.search);

      if (currentFullUrl !== currentFullUrl.toLowerCase()) {
        return NextResponse.redirect(
          new URL(currentFullUrl.toLowerCase(), request.url),
          { status: 301 },
        );
      }

      // 🔥 مهم: فقط برای مسیرهایی که باید پردازش شوند
      // اگر مسیر برای فایل‌های استاتیک یا API است، ادامه بده
      if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".") ||
        pathname.startsWith("/favicon.ico")
      ) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-pathname", pathname + url.search);
        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }

      const detailsCar: ItemsId | null = await getItemByUrl(FullUrl);

      // اگر داده وجود نداشت، با status 404 ادامه بده
      if (!detailsCar) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-pathname", pathname + url.search);
        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
          status: 404,
        });
      }

      if (detailsCar?.url) {
        const decodedDetailsUrl = decodeURIComponent(detailsCar.url);
        if (decodedDetailsUrl !== currentFullUrl) {
          return NextResponse.redirect(
            new URL(decodedDetailsUrl.toLowerCase(), request.url),
            { status: 301 },
          );
        }
      }

      if (currentFullUrl !== currentFullUrl.toLowerCase()) {
        return NextResponse.redirect(
          new URL(currentFullUrl.toLowerCase(), request.url),
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
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;

      // فقط برای خطاهای 500 و 503 به error page ریدایرکت کن
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 },
      );
    }
  }

  return NextResponse.next();
}
