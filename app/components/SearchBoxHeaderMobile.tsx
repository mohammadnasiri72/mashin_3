"use client";

import { getItemFindByTerm } from "@/services/Item/ItemFindByTerm";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoCloseSharp, IoSearch } from "react-icons/io5";

function SearchBoxHeaderMobile() {
  const [term, setTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ItemsFindByTerm[]>([]);
  const [groupedResults, setGroupedResults] = useState<
    Record<string, ItemsFindByTerm[]>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (value.trim().length >= 3 && isModalOpen) {
      setShowResults(true);
    } else if (isModalOpen) {
      setShowResults(false);
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setIsModalOpen(false);
    setTerm("");
  };

  const handleInputFocus = () => {
    setIsModalOpen(true);
    // فقط اگر حداقل 3 کاراکتر داشت نتایج را نشان بده
    if (term.trim().length >= 3) {
      setShowResults(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowResults(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <>
      <div className="grow relative" ref={searchBoxRef}>
        <div className="bg-[#d1182b] rounded-lg p-4 flex items-center mr-4">
          <IoSearch className="text-white! text-lg" />
          <input
            ref={inputRef}
            value={term}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            type="text"
            className="bg-transparent text-sm w-full pr-2 outline-none text-white! placeholder-white font-medium"
            placeholder="جستجو"
            required
          />
         
          
        </div>

        {/* Results Dropdown for Mobile */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-white">
            {/* Header */}
            <div className="bg-[#d1182b] p-4 flex items-center justify-between">
              <div className="flex items-center flex-1">
                <IoSearch className="text-white text-lg ml-2" />
                <input
                  ref={inputRef}
                  value={term}
                  onChange={handleInputChange}
                  type="text"
                  className="bg-transparent text-sm w-full pr-2 outline-none text-white! placeholder-white font-medium"
                  placeholder="جستجو"
                  autoFocus
                  required
                />
                
              </div>
              <button
                onClick={handleCloseModal}
                className="text-white! text-lg font-bold mr-2"
              >
                <IoCloseSharp className="text-xl cursor-pointer" />
              </button>
            </div>

            {/* Results Container */}
            <div className="h-[calc(100vh-64px)] overflow-y-auto">
              {error && (
                <div className="p-4 text-center text-red-500 text-sm">
                  {error}
                </div>
              )}

              {/* نمایش پیام وقتی کمتر از 3 کاراکتر است */}
              {term.trim().length > 0 && term.trim().length < 3 && !isLoading && (
                <div className="p-8 text-center text-gray-500 text-sm">
                  برای جستجو، حداقل 3 کاراکتر وارد کنید
                </div>
              )}

              {!error && isLoading && (
                <div className="p-4 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d1182b] mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-4">در حال جستجو...</p>
                </div>
              )}

              {!error &&
                !isLoading &&
                searchResults.length === 0 &&
                term.trim().length >= 3 && (
                  <div className="p-8 text-center text-gray-500 text-sm">
                    نتیجه‌ای یافت نشد
                  </div>
                )}

              {!error && !isLoading && searchResults.length > 0 && (
                <div className="pb-4">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-600">
                      {searchResults.length} نتیجه یافت شد
                    </p>
                  </div>

                  <div>
                    {Object.entries(groupedResults).map(
                      ([type, items], index) => (
                        <div
                          key={type}
                          className={
                            index > 0 ? "border-t border-gray-200" : ""
                          }
                        >
                          {/* Type Header */}
                          <div
                            className={`px-4 py-3 bg-gray-50 border-[#d1182b] ${
                              index > 0 ? "border-t-4" : ""
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-bold text-gray-800">
                                {type}
                              </h3>
                              <span className="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
                                {items.length}
                              </span>
                            </div>
                          </div>

                          {/* Items List */}
                          <div className="divide-y divide-gray-100">
                            {items.map((item) => (
                              <Link
                                key={item.id}
                                href={item.url}
                                onClick={handleResultClick}
                                className="flex items-center gap-3 p-4 active:bg-gray-50 transition-colors duration-150"
                              >
                                <div className="shrink-0 w-14 h-14 bg-white rounded-lg overflow-hidden border border-gray-200">
                                  {item.image ? (
                                    <div className="relative w-full h-full">
                                      <img
                                        src={mainDomainOld + item.image}
                                        alt={item.title}
                                        className="object-contain w-full h-full"
                                        onError={(e) => {
                                          const target =
                                            e.target as HTMLImageElement;
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
                                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                                    {item.title}
                                  </h3>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                 
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBoxHeaderMobile;