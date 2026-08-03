
import { redirect } from "next/navigation";

function pageCar() {
  const encodedPath = encodeURIComponent("خودرو-های-بازار");
  redirect(`/fa/reviews/6058/${encodedPath}.html`);
}

export default pageCar;
