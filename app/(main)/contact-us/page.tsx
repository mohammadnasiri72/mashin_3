import React from "react";
import ContactUs from "./components/ContactUs";
import { getItem } from "@/services/Item/Item";

export async function generateMetadata() {
  return {
    title: "ماشین3 - تماس با ما",
    description: "تماس با ما",
  };
}

async function pageContactUs() {
   const banner: Items[] = await getItem({
      TypeId: 1051,
      langCode: "fa",
      CategoryIdArray: "6415",
    });
  return <ContactUs banner={banner}/>;
}

export default pageContactUs;
