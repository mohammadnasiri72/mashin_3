import { redirect } from "next/navigation";

function pageNews() {
   const encodedPath = encodeURIComponent("اخبار-خودرو");
  redirect(`/fa/news/${encodedPath}.html`);
}

export default pageNews;
