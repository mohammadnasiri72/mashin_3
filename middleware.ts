import { NextResponse } from "next/server";
import { getCategoryByUrl } from "./services/Category/CategoryByUrl";
import { getCategoryId } from "./services/Category/CategoryId";
import { getItemId } from "./services/Item/ItemId";
import { getItemByUrl } from "./services/Item/ItemByUrl";

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
            }
          );
        }
      } catch (error: any) {
        const status = error.response?.status || error.status || 500;
        return NextResponse.redirect(
          new URL(`/error?status=${status}`, request.url),
          { status: 301 }
        );
      }
    } else {
      try {
        const data: ItemsCategoryId = await getCategoryByUrl(decodedPathname);
        return NextResponse.redirect(
          new URL((pathname + `?id=${data?.id}`).toLowerCase(), request.url),
          { status: 301 }
        );
      } catch (error: any) {
        const status = error.response?.status || error.status || 500;
        return NextResponse.redirect(
          new URL(`/error?status=${status}`, request.url),
          { status: 301 }
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
        { status: 301 }
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
            { status: 301 }
          );
        }
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 }
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
          }
        );
      }
    } else {
      try {
        const data: ItemsId = await getItemByUrl(decodedPathname);
        if (data.id > 0 && id !== data?.id) {
          return NextResponse.redirect(
            new URL((pathname + `?id=${data?.id}`).toLowerCase(), request.url),
            { status: 301 }
          );
        }
      } catch (error: any) {
        const status = error.response?.status || error.status || 500;
        return NextResponse.redirect(
          new URL(`/error?status=${status}`, request.url),
          { status: 301 }
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
            }
          );
        }
      } else {
        return NextResponse.redirect(
          new URL(`/error?status=${400}`, request.url),
          { status: 301 }
        );
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 }
      );
    }
  } else if (pathname.startsWith("/fa/news/")) {
    try {
      const pathParts = pathname.split("/");
      const decodedPathname = decodeURIComponent(pathname);
      const id = Number(pathParts[3]);
      if (!isNaN(id)) {
        const data: ItemsCategoryId = await getCategoryId(id);
        const decodedPathname = decodeURIComponent(pathname);

        if (data?.url && data.url !== decodedPathname) {
          return NextResponse.redirect(
            new URL(data.url.toLowerCase(), request.url),
            {
              status: 301,
            }
          );
        }
      } else if (decodedPathname !== "/fa/news/اخبار-خودرو.html") {
        return NextResponse.redirect(
          new URL("/fa/news/اخبار-خودرو.html", request.url),
          {
            status: 301,
          }
        );
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 }
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
            }
          );
        }
      } else {
        return NextResponse.redirect(
          new URL("/fa/educationtips/نکات-آموزشی.html", request.url),
          {
            status: 301,
          }
        );
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 }
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
            }
          );
        }
      } else {
        return NextResponse.redirect(
          new URL("/autoservices.html", request.url),
          {
            status: 301,
          }
        );
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 }
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
            }
          );
        }
      } else {
        return NextResponse.redirect(
          new URL("/autoservices.html", request.url),
          {
            status: 301,
          }
        );
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 }
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
            }
          );
        }
      } else if (decodedPathname !== "/fa/educationtips/نکات-آموزشی.html") {
        return NextResponse.redirect(
          new URL("/fa/educationtips/نکات-آموزشی.html", request.url),
          {
            status: 301,
          }
        );
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 }
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
            }
          );
        }
      } else {
        return NextResponse.redirect(
          new URL("/fa/news/اخبار-خودرو.html", request.url),
          {
            status: 301,
          }
        );
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 }
      );
    }
  } else {
    const decodedPathname = decodeURIComponent(pathname);
    if (decodedPathname !== decodedPathname.toLowerCase()) {
      return NextResponse.redirect(
        new URL(decodedPathname.toLowerCase(), request.url),
        { status: 301 }
      );
    }
  }

  return NextResponse.next();
}
