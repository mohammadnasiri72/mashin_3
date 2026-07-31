"use client";

import { getItemFindByTerm } from "@/services/Item/ItemFindByTerm";
import { mainDomain } from "@/utils/mainDomain";
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
      if (searchTerm.trim().length < 2) {
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

    if (term.trim().length >= 2) {
      setIsLoading(true);
      searchTimeout.current = setTimeout(() => {
        handleSearch(term);
      }, 500);
    } else {
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

    if (value.trim().length >= 2 && isModalOpen) {
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
    if (term.trim().length >= 2) {
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
          <div className="fixed inset-0 z-50 bg-[#1a1a1a]">
            {/* Header */}
            <div className="bg-[#d1182b] p-4 flex items-center justify-between">
              <div className="flex items-center flex-1">
                <IoSearch className="text-white! text-lg ml-2" />
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
                aria-label="بستن"
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

              {/* نمایش پیام وقتی کمتر از 2 کاراکتر است */}
              {term.trim().length > 0 && term.trim().length < 2 && !isLoading && (
                <div className="p-8 text-center text-neutral-400! text-sm">
                  برای جستجو، حداقل 2 کاراکتر وارد کنید
                </div>
              )}

              {!error && isLoading && (
                <div className="p-4 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                  <p className="text-sm text-neutral-400! mt-4">در حال جستجو...</p>
                </div>
              )}

              {!error &&
                !isLoading &&
                searchResults.length === 0 &&
                term.trim().length >= 2 && (
                  <div className="p-8 text-center text-neutral-400! text-sm">
                    نتیجه‌ای یافت نشد
                  </div>
                )}

              {!error && !isLoading && searchResults.length > 0 && (
                <div className="pb-4">
                  <div className="px-4 py-3 border-b border-neutral-800/60">
                    <p className="text-sm font-medium text-neutral-300!">
                      {searchResults.length} نتیجه یافت شد
                    </p>
                  </div>

                  <div>
                    {Object.entries(groupedResults).map(
                      ([type, items], index) => (
                        <div
                          key={type}
                          className={
                            index > 0 ? "border-t border-neutral-800/60" : ""
                          }
                        >
                          {/* Type Header */}
                          <div
                            className={`px-4 py-3 bg-[#222] border-red-600 ${
                              index > 0 ? "border-t-4" : ""
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-bold text-white!">
                                {type}
                              </h3>
                              <span className="text-xs text-neutral-400! bg-[#2a2a2a] px-2 py-1 rounded-full">
                                {items.length}
                              </span>
                            </div>
                          </div>

                          {/* Items List */}
                          <div className="divide-y divide-neutral-800/60">
                            {items.map((item) => (
                              <Link
                                key={item.id}
                                href={item.url}
                                onClick={handleResultClick}
                                className="flex items-center gap-3 p-4 active:bg-[#2a2a2a] transition-colors duration-150"
                              >
                                <div className="shrink-0 w-14 h-14 bg-[#2a2a2a] rounded-lg overflow-hidden border border-neutral-700/60">
                                  {item.image ? (
                                    <div className="relative w-full h-full">
                                      <img
                                        src={mainDomain + item.image}
                                        alt={item.title}
                                        className="object-contain w-full h-full"
                                      />
                                    </div>
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[#2a2a2a]">
                                      <IoSearch className="text-neutral-500!" />
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h3 className="text-sm font-medium text-neutral-300! line-clamp-2 group-hover:text-red-500 transition-colors">
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