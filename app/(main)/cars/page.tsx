import { redirect } from "next/navigation";

function pageCars() {
  const encodedPath = encodeURIComponent("خودرو-های-بازار");
  redirect(`/fa/reviews/6058/${encodedPath}.html`);
}

export default pageCars;
