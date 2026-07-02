import { RootState } from "@/redux/store";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { getLike } from "@/services/UserActivity/getLike";
import { createpublishCode } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { FaCar, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

const FavoritesSkeleton = () => {
  return (
    <div className="divide-y divide-gray-100">
      {[1, 2, 3, 4].map((i) => (
        <div key={`skeleton-car-${i}`} className="flex items-center gap-3 p-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse shrink-0" />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

function Favorites() {
  const token = useSelector((state: RootState) => state.token.token);
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
      if (ids) {
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

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaHeart className="w-5 h-5 text-rose-600" />
            <h2 className="font-semibold text-gray-900">علاقه‌مندی‌ها</h2>
          </div>
          <Link
            href="/dashboard/favorites"
            className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
          >
            نمایش همه
            <BiChevronLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loadingFavorites ? (
          FavoritesSkeleton()
        ) : (
          <div className="divide-y divide-gray-100">
            {favorites.length > 0 ? (
              favorites.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                    <img
                      className="object-contain w-full h-full"
                      src={mainDomainOld + item.image}
                      alt={item.title}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.sourceName} {item.title}{" "}
                      {createpublishCode(item.publishCode)}
                    </p>
                    {item.amount >= 0 && (
                      <p className="text-xs font-medium text-green-600 mt-1">
                        {item.amount.toLocaleString()} تومان
                      </p>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500 text-sm">
                <FaHeart className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>علاقه‌مندی‌ای ندارید</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Favorites;
