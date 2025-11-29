import { redirect } from "next/navigation";

function pageTipsView() {
  const encodedPath = encodeURIComponent("نکات-آموزشی");
  redirect(`/fa/EducationTips/${encodedPath}.html`);
}

export default pageTipsView;
