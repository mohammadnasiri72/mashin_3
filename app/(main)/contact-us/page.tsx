import React from "react";
import ContactUs from "./components/ContactUs";
import { getItem } from "@/services/Item/Item";

async function pageContactUs() {
   const banner: Items[] = await getItem({
      TypeId: 1051,
      langCode: "fa",
      CategoryIdArray: "6415",
    });
  return <ContactUs banner={banner}/>;
}

export default pageContactUs;
