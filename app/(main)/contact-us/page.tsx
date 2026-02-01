import React from "react";
import ContactUs from "./components/ContactUs";
import { getItem } from "@/services/Item/Item";
import { getSetting } from "@/services/Property/setting";

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
     const setting: SettingType[] = await getSetting();
  return <ContactUs banner={banner} setting={setting}/>;
}

export default pageContactUs;
