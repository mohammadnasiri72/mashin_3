import { NextRequest, NextResponse } from "next/server";
import { getItemByIds } from "./services/Item/ItemByIds";
import { getItemByUrl } from "./services/Item/ItemByUrl";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const { pathname, searchParams } = url;

  if (pathname.startsWith("/error")) {
    return NextResponse.next();
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
     // اگر ریدایرکتی نبود، آدرس رو ذخیره کن
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname + url.search);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname.startsWith("/dashboard")) {
    const userCookie = request.cookies.get("user")?.value;
    if (!userCookie) {
      return NextResponse.redirect(new URL("/register", request.url));
    }

    try {
      const userData = JSON.parse(userCookie);

      if (!userData.token) {
        const response = NextResponse.redirect(
          new URL("/register", request.url),
        );
        response.cookies.delete("user");
        return response;
      }

      if (userData.expiration && new Date(userData.expiration) < new Date()) {
        const response = NextResponse.redirect(
          new URL("/register?expired=true", request.url),
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
      const response = NextResponse.redirect(new URL("/register", request.url));
      response.cookies.delete("user");
      return response;
    }
  } else if (pathname === "/404") {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname + url.search);
    return NextResponse.next({
      status: 404,
      request: {
        headers: requestHeaders,
      },
    });
  } else if (pathname === "/410") {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname + url.search);
    return NextResponse.next({
      status: 410,
      request: {
        headers: requestHeaders,
      },
    });
  } else {
    try {
      const currentUrl = decodeURIComponent(pathname);
      const FullUrl = decodeURIComponent(pathname + url.search);

      if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
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

      const detailsItem: ItemsId | ItemsCategoryId | null =
        await getItemByUrl(FullUrl);

      // اگر داده وجود نداشت، با status 404 ادامه بده
      if (detailsItem?.url) {
        // decode کردن URL دریافتی از API
        const decodedDetailsUrl = decodeURIComponent(detailsItem.url);

        // مقایسه URLها بعد از decode
        if (decodedDetailsUrl !== currentUrl) {
          return NextResponse.redirect(
            new URL(decodedDetailsUrl, request.url),
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

      // ==============================================
      // 🎯 بخش اصلی: بازنویسی بر اساس itemTypeId
      // ==============================================
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-pathname", pathname + url.search);
      requestHeaders.set("x-item-type-id", String(detailsItem.itemTypeId));

      // تعیین مسیر مقصد بر اساس itemTypeId
      let destinationPath = "";

      switch (detailsItem.itemTypeId) {
        case 5: // صفحه جزئیات خبر
          destinationPath =
            detailsItem.typeUrl === "item"
              ? `/fa/news-view/${detailsItem.id}`
              : `/fa/news/${detailsItem.id}`;
          break;
        case 3: // صفحه نکات آموزشی
          destinationPath =
            detailsItem.typeUrl === "item"
              ? `/fa/tips-view/${detailsItem.id}`
              : `/fa/educationtips/${detailsItem.id}`;
          break;
        case 1028: // صفحه فیلم های تست و بررسی خودرو
          destinationPath =
            detailsItem.typeUrl === "item"
              ? `/video/${detailsItem.id}`
              : `/videos/${detailsItem.id}`;
          break;
        case 1042: // صفحه معرفی خودرو
          destinationPath =
            detailsItem.typeUrl === "item"
              ? `/car/${detailsItem.id}`
              : detailsItem.parentId
                ? `/cars/${detailsItem.id}`
                : `/fa/reviews/${detailsItem.id}`;
          break;
        case 1043: // صفحه بهترین انتخاب
          destinationPath =
            detailsItem.typeUrl === "item"
              ? `/best-choice/${detailsItem.id}`
              : `/best-choices.html`;
          break;

        case 1045: // صفحه مقایسه خودرو
          destinationPath =
            detailsItem.typeUrl === "item"
              ? `/whichcar/${detailsItem.id}`
              : `/whichcars.html`;
          break;
        case 1046: // صفحه واژگان فنی
          destinationPath =
            detailsItem.typeUrl === "item"
              ? `/technical-word/${detailsItem.id}`
              : `/fa/technical-words.html`;
          break;
        case 1050: // صفحه مراکز خدمات خودرو
          destinationPath =
            detailsItem.typeUrl === "item"
              ? `/autoservice/${detailsItem.id}`
              : `/autoservices/${detailsItem.id}`;
          break;
        case 1052: // صفحه معرفی موتور سیکلت
          destinationPath =
            detailsItem.typeUrl === "item"
              ? `/motorcycle/${detailsItem.id}`
              : detailsItem.parentId
                ? `/motorcycles/${detailsItem.id}`
                : `/fa/reviews/${detailsItem.id}`;
          break;

        default:
          // اگر نوع مشخص نبود، از slug استفاده کن
          destinationPath = ``;
          break;
      }

      // ساخت URL جدید برای بازنویسی

      if (destinationPath) {
        const rewriteUrl = new URL(destinationPath, request.url);

        // اگر پارامترهای query وجود دارند، به مسیر جدید اضافه کن
        if (url.search) {
          rewriteUrl.search = url.search;
        }
        // انجام بازنویسی
        return NextResponse.rewrite(rewriteUrl, {
          request: {
            headers: requestHeaders,
          },
        });
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;

      // فقط برای خطاهای 500 و 503 به error page ریدایرکت کن
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
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files, api, _next, favicon.ico
    "/((?!_next/static|_next/image|api|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|css|js|json|xml|txt|woff|woff2|ttf|eot|otf|mp4|webm|mp3|wav|pdf|zip)).*)",
  ],
};
