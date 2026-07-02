// app/dashboard/favorites/page.tsx
"use client";

import { RootState } from "@/redux/store";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { getLike } from "@/services/UserActivity/getLike";
import { postLike } from "@/services/UserActivity/postLike";
import { postLiked } from "@/services/UserActivity/postLiked";
import { createpublishCode, Toast } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { message } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineHeart, HiOutlineTrash } from "react-icons/hi";
import { useSelector } from "react-redux";

export default function FavoritesPage() {
  const token = useSelector((state: RootState) => state.token.token);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingFavorites, setLoadingFavorites] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<ItemsId[]>([]);

  useEffect(() => {
    if (token) {
      fetchLike();
    }
  }, [token]);

  const fetchLike = async () => {
    setLoadingFavorites(true);
    try {
      const ids = await getLike(5, token);      
      if (ids.length>0) {
        const fav: ItemsId[] = await getItemByIds(ids.join(","));
        setFavorites(fav);
      } else {
        setFavorites([]);
      }
    } catch (err) {
    } finally {
      setLoadingFavorites(false);
    }
  };

  const handleLike = async (id: number) => {
    if (token) {
      setIsLoading(true);
      try {
        const response = await postLike(id, token);

        Toast.fire({
          icon: "success",
          title: "از علاقه‌مندی‌ها حذف شد",
        });
        fetchLike();
      } catch (error: any) {
        Toast.fire({
          icon: "error",
          title: error.response?.data || "خطای شبکه",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-5!">علاقه‌مندی‌ها</h1>

      {loadingFavorites ? (
        <div className="flex items-center justify-center py-10">
          <div className="w-6 h-6 lg:w-7 lg:h-7 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {favorites.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <HiOutlineHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">لیست علاقه‌مندی‌ها خالی است</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm p-4"
                >
                  <Link href={item.url}>
                    <div className="aspect-video bg-gray-100 rounded-xl mb-3">
                      <img
                        className="object-cover w-full h-full"
                        src={mainDomainOld + item.image}
                        alt={item.title}
                      />
                    </div>
                  </Link>
                  <Link href={item.url}>
                    <h3 className="font-semibold text-gray-800">
                      {item.sourceName} {item.title}{" "}
                      {createpublishCode(item.publishCode)}
                    </h3>
                  </Link>
                  {item.amount >= 0 && (
                    <p className="text-xs text-gray-500 mb-3">
                      {item.amount.toLocaleString()} تومان
                    </p>
                  )}
                  <button
                    onClick={() => {
                      handleLike(item.id);
                    }}
                    className="flex items-center gap-2 bg-red-500 duration-300 hover:bg-red-600 text-sm text-white! w-full rounded-lg cursor-pointer py-2 justify-center mt-3"
                  >
                    <span>حذف از علاقه‌مندی‌ها</span>
                    <HiOutlineTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
