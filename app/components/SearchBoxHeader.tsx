"use client";

import { getItemFindByTerm } from "@/services/Item/ItemFindByTerm";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoCloseSharp, IoSearch } from "react-icons/io5";

function SearchBoxHeader() {
  const [term, setTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ItemsFindByTerm[]>([]);
  const [groupedResults, setGroupedResults] = useState<
    Record<string, ItemsFindByTerm[]>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Group results by type
  const groupResultsByType = useCallback((results: ItemsFindByTerm[]) => {
    const grouped: Record<string, ItemsFindByTerm[]> = {};

    results.forEach((item) => {
      if (!grouped[item.type]) {
        grouped[item.type] = [];
      }
      grouped[item.type].push(item);
    });

    return grouped;
  }, []);

  const handleSearch = useCallback(
    async (searchTerm: string) => {
      // فقط اگر حداقل 3 کاراکتر داشت جستجو کن
      if (searchTerm.trim().length < 3) {
        setSearchResults([]);
        setGroupedResults({});
        setIsLoading(false);
        return;
      }

      if (!searchTerm.trim()) {
        setSearchResults([]);
        setGroupedResults({});
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const params = {
          term: searchTerm,
          typeId: -2,
          langCode: "fa",
          pageSize: 25,
          pageIndex: 1,
        };

        const results = await getItemFindByTerm(params);
        setSearchResults(results);
        setGroupedResults(groupResultsByType(results));
      } catch (err) {
        setError("خطا در دریافت نتایج");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [groupResultsByType]
  );

  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // فقط اگر حداقل 3 کاراکتر داشت جستجو کن
    if (term.trim().length >= 3) {
      setIsLoading(true);
      searchTimeout.current = setTimeout(() => {
        handleSearch(term);
      }, 500);
    } else {
      // اگر کمتر از 3 کاراکتر است، نتایج را پاک کن
      setSearchResults([]);
      setGroupedResults({});
      setIsLoading(false);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [term, handleSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);

    // فقط اگر حداقل 3 کاراکتر داشت نتایج را نشان بده
    if (value.trim().length >= 3) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setTerm("");
  };

  const handleInputFocus = () => {
    // فقط اگر حداقل 3 کاراکتر داشت نتایج را نشان بده
    if (term.trim().length >= 3) {
      setShowResults(true);
    }
  };

  return (
    <div
      className="hidden lg:block flex-1 max-w-md relative"
      ref={searchBoxRef}
    >
      <div className="bg-[#f1f2f4] rounded-lg px-4 py-2 flex items-center border border-transparent hover:border-gray-300 transition-all duration-300">
        <IoSearch className="text-lg text-[#656565] ml-2" />
        <input
          value={term}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          type="text"
          className="bg-transparent text-[13px] w-full pr-2 outline-none placeholder-[#777] font-medium"
          placeholder="دنبال چی میگردی؟"
          required
        />

        {/* نشانگر کمتر از 3 کاراکتر */}
        {term.trim().length > 0 && (
          <button
            onClick={() => {
              setShowResults(false);
              setTerm("");
            }}
            className="text-[#333] text-lg font-bold mr-2"
          >
            <IoCloseSharp className="text-xl cursor-pointer" />
          </button>
        )}
      </div>

      {/* Results Dropdown - فقط اگر حداقل 3 کاراکتر داشت نشان بده */}
      {showResults && term.trim().length >= 3 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {error && (
            <div className="p-4 text-center text-red-500 text-sm">{error}</div>
          )}

          {!error && isLoading && (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">در حال جستجو...</p>
            </div>
          )}

          {!error &&
            !isLoading &&
            searchResults.length === 0 &&
            term.trim().length >= 3 && (
              <div className="p-4 text-center text-gray-500 text-sm">
                نتیجه‌ای یافت نشد
              </div>
            )}

          {!error && !isLoading && searchResults.length > 0 && (
            <div className="py-2">
              <div>
                {Object.entries(groupedResults).map(([type, items], index) => (
                  <div
                    key={type}
                    className={index > 0 ? "border-t border-gray-100" : ""}
                  >
                    {/* Type Header */}
                    <div
                      className={`px-4 py-3 bg-gray-50 border-[#ce1a2a] flex justify-between items-center ${
                        index > 0 ? "border-t-4" : ""
                      }`}
                    >
                      <h3 className="text-lg font-bold text-gray-700">
                        {type}
                      </h3>
                      <span className="text-xs">
                        {items.length} نتیجه یافت شد
                      </span>
                    </div>

                    {/* Items List */}
                    <div className="divide-y divide-gray-100">
                      {items.map((item) => (
                        <Link
                          key={item.id}
                          href={item.url}
                          onClick={handleResultClick}
                          className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors duration-150 group"
                        >
                          <div className="shrink-0 w-12 h-12 bg-white rounded-lg overflow-hidden border border-gray-200">
                            {item.image ? (
                              <div className="relative w-full h-full">
                                <img
                                  src={mainDomainOld + item.image}
                                  alt={item.title}
                                  className="object-contain w-full h-full"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = "none";
                                    target.parentElement!.innerHTML =
                                      '<div class="w-full h-full flex items-center justify-center bg-gray-100"><IoSearch class="text-gray-400" /></div>';
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <IoSearch className="text-gray-400" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBoxHeader;
