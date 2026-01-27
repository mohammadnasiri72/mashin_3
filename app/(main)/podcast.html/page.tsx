import React from "react";
import Podcast from "./components/Podcast";
import { getItem } from "@/services/Item/Item";
import { getCategory } from "@/services/Category/Category";

async function pagePodcast({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const page = Number(searchParam.page);
  const term = String(searchParam.term);

  const podcasts: Items[] = await getItem({
    TypeId: 1047,
    langCode: "fa",
    PageIndex: page || 1,
    ...(term && term !== "undefined" && { Term: term }),
    PageSize: 15,
  });
   const popularNews: Items[] = await getItem({
    TypeId: 5,
    langCode: "fa",
    OrderBy: 8,
    PageIndex: 1,
    PageSize: 5,
  });

  const podcastsCat: ItemsCategory[] = await getCategory({
    TypeId: 1047,
    LangCode: "fa",
    PageIndex: 1,
    PageSize: 200,
  });

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  return (
    <>
      <Podcast podcasts={podcasts} podcastsCat={podcastsCat} banner={banner} popularNews={popularNews}/>
    </>
  );
}

export default pagePodcast;
