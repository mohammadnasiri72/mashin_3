"use client";

import { getItemFindByTerm } from "@/services/Item/ItemFindByTerm";
import { mainDomain } from "@/utils/mainDomain";
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

    if (value.trim().length >= 2) {
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
    if (term.trim().length >= 2) {
      setShowResults(true);
    }
  };

  return (
    <div
      className="hidden lg:block! flex-1 relative w-full"
      ref={searchBoxRef}
    >
      <div className="bg-[#2a2a2a] rounded-lg px-4 py-2 flex items-center border border-neutral-700/60 hover:border-neutral-500 transition-all duration-300">
        <IoSearch className="text-lg text-neutral-400! ml-2" />
        <input
          value={term}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          type="text"
          className="bg-transparent text-[13px] w-full pr-2 outline-none placeholder-neutral-500 font-medium text-white!"
          placeholder="دنبال چی میگردی؟"
          required
        />

        {term.trim().length > 0 && (
          <button
            aria-label="بستن"
            onClick={() => {
              setShowResults(false);
              setTerm("");
            }}
            className="text-neutral-400! text-lg font-bold mr-2 hover:text-white! transition-colors"
          >
            <IoCloseSharp className="text-xl cursor-pointer" />
          </button>
        )}
      </div>

      {showResults && term.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] rounded-lg shadow-lg border border-neutral-800/60 z-50 max-h-96 overflow-y-auto min-w-72">
          {error && (
            <div className="p-4 text-center text-red-500 text-sm">{error}</div>
          )}

          {!error && isLoading && (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mx-auto"></div>
              <p className="text-sm text-neutral-400! mt-2">در حال جستجو...</p>
            </div>
          )}

          {!error &&
            !isLoading &&
            searchResults.length === 0 &&
            term.trim().length >= 2 && (
              <div className="p-4 text-center text-neutral-400! text-sm">
                نتیجه‌ای یافت نشد
              </div>
            )}

          {!error && !isLoading && searchResults.length > 0 && (
            <div>
              {Object.entries(groupedResults).map(([type, items], index) => (
                <div
                  key={type}
                  className={index > 0 ? "border-t border-neutral-800/60" : ""}
                >
                  <div
                    className={`px-4 py-3 bg-[#222] border-[#ce1a2a] flex justify-between items-center ${
                      index > 0 ? "border-t-4" : ""
                    }`}
                  >
                    <h3 className="text-lg font-bold text-white!">{type}</h3>
                    <span className="text-xs text-neutral-400!">
                      {items.length} نتیجه یافت شد
                    </span>
                  </div>

                  <div className="divide-y divide-neutral-800/60">
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.url}
                        onClick={handleResultClick}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#2a2a2a] transition-colors duration-150 group"
                      >
                        <div className="shrink-0 w-12 h-12 bg-[#2a2a2a] rounded-lg overflow-hidden border border-neutral-700/60">
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
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBoxHeader;