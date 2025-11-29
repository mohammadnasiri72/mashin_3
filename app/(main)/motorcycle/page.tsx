import { redirect } from "next/navigation";

function pageMotorcycle() {
     const encodedPath = encodeURIComponent("موتور-سیکلت");
  redirect(`/fa/Reviews/6059/${encodedPath}.html`);
}

export default pageMotorcycle;
