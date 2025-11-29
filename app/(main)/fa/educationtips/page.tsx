import { redirect } from "next/navigation";

function pageEducationTips() {
   const encodedPath = encodeURIComponent("نکات-آموزشی");
  redirect(`/fa/EducationTips/${encodedPath}.html`);
}

export default pageEducationTips;
