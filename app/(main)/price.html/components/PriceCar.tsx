"use client";

import { getPriceCar } from "@/services/Price/PriceCar";
import { getPriceCarBrands } from "@/services/Price/PriceCarBrands";
import { htmlToPlainText } from "@/utils/func";
import {
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PRIMARY_COLOR } from "./constants";
import PriceResults from "./PriceResults";
import SearchBox from "./SearchBox";
import { Category, PriceBrands, Prices } from "./types";

interface PriceCarProps {
  brandsWithPrice: PriceBrands[];
  brandsWithoutPrice: PriceBrands[];
  initialPrices: Prices[];
  title: string;
  summary: string;
  body: string;
  brandIdSearchParams: number;
  type: string;
}

function PriceCar({
  brandsWithPrice: initialBrandsWithPrice,
  brandsWithoutPrice: initialBrandsWithoutPrice,
  initialPrices,
  title,
  summary,
  body,
  brandIdSearchParams,
  type: initialType,
}: PriceCarProps) {
  const mainCategories: Category[] = [
    {
      id: 8955,
      title: "قیمت خودرو داخلی",
      url: "/price.html?type=internal",
      type: "internal",
    },
    {
      id: 8954,
      title: "قیمت خودرو وارداتی",
      url: "/price.html?type=import",
      type: "import",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<number | null>(initialType==='import'? 8954 : 8955);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(
    brandIdSearchParams || null,
  );
  const [prices, setPrices] = useState<Prices[]>(initialPrices);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBrand, setIsLoadingBrand] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDebounceTimer, setSearchDebounceTimer] =
    useState<NodeJS.Timeout | null>(null);
  const [expandedBrands, setExpandedBrands] = useState<Set<number>>(new Set());
  
  // State برای برندها - با داده‌های جدید به‌روز میشن
  const [brandsWithPrice, setBrandsWithPrice] = useState<PriceBrands[]>(initialBrandsWithPrice);
  const [brandsWithoutPrice, setBrandsWithoutPrice] = useState<PriceBrands[]>(initialBrandsWithoutPrice);
  const [currentType, setCurrentType] = useState<string>(initialType);

  const searchParams = useSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // انتخاب دسته‌بندی بر اساس type
  useEffect(() => {
    if (initialType === "internal") {
      setSelectedCategory(8955);
    } else if (initialType === "import") {
      setSelectedCategory(8954);
    } else {
      setSelectedCategory(8955);
    }
  }, [initialType]);

  // تابع دریافت برندها بر اساس نوع
  const fetchBrandsForType = useCallback(async (newType: string) => {
    try {
      const response = await getPriceCarBrands(newType);
      return response.brands || [];
    } catch (error) {
      console.error("Error fetching brands:", error);
      return [];
    }
  }, []);

  // تابع به‌روزرسانی برندها بر اساس داده‌های قیمت
  const updateBrandsFromPrices = useCallback((newPrices: Prices[], allBrands: PriceBrands[]) => {
    const brandIdsWithPrice = new Set(newPrices.map(p => p.brandId));
    const newBrandsWithPrice = allBrands.filter(b => brandIdsWithPrice.has(b.id));
    const newBrandsWithoutPrice = allBrands.filter(b => !brandIdsWithPrice.has(b.id));
    
    setBrandsWithPrice(newBrandsWithPrice);
    setBrandsWithoutPrice(newBrandsWithoutPrice);
  }, []);

  // تابع دریافت داده‌های اولیه برای تب جدید (با PageSize: 6)
  const fetchInitialDataForType = useCallback(async (newType: string) => {
    setIsLoading(true);
    try {
      // دریافت برندها برای نوع جدید
      const newBrands = await fetchBrandsForType(newType);
      
      // دریافت قیمت‌ها برای نوع جدید
      const response = await getPriceCar({
        Type: newType,
        BrandId: -1,
        PageSize: 6,
      });

      if (response.prices) {
        setPrices(response.prices);
        // به‌روزرسانی برندها بر اساس قیمت‌های جدید
        updateBrandsFromPrices(response.prices, newBrands);
        setCurrentType(newType);
      }
    } catch (error) {
      console.error("Error fetching initial data for type:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchBrandsForType, updateBrandsFromPrices]);

  // وقتی type تغییر میکنه، داده‌های اولیه رو دریافت کن
  useEffect(() => {
    if (initialType && initialType !== currentType) {
      // ریست کردن state‌ها
      setSelectedBrand(null);
      setSearchTerm("");
      setExpandedBrands(new Set());
      fetchInitialDataForType(initialType);
    }
  }, [initialType, currentType, fetchInitialDataForType]);

  // تابع دریافت داده‌ها از سرور (برای جستجو و برندهای خاص)
  const fetchPrices = useCallback(
    async (brandId: number | null, term: string = "") => {
      if (brandId) {
        setIsLoadingBrand(brandId);
      } else {
        setIsLoading(true);
      }

      try {
        const response = await getPriceCar({
          Type: currentType,
          BrandId: brandId || -1,
          Term: term || undefined,
          PageSize: brandId ? undefined : 6,
        });

        if (response.prices) {
          setPrices((prevPrices) => {
            if (brandId) {
              const filteredPrev = prevPrices.filter(
                (p) => p.brandId !== brandId,
              );
              return [...filteredPrev, ...response.prices];
            }
            return response.prices;
          });
          
          // اگر جستجو بود و brandId نداشت، برندها رو به‌روزرسانی کن
          if (!brandId && term) {
            // برای جستجو، برندها رو بر اساس نتایج جستجو به‌روزرسانی کن
            const allBrands = [...brandsWithPrice, ...brandsWithoutPrice];
            updateBrandsFromPrices(response.prices, allBrands);
          }
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        if (brandId) {
          setIsLoadingBrand(null);
        } else {
          setIsLoading(false);
        }
      }
    },
    [currentType, brandsWithPrice, brandsWithoutPrice, updateBrandsFromPrices],
  );

  // تغییر وضعیت باز/بسته شدن برند (برای برندهای ۷ به بعد)
  const handleToggleBrand = useCallback(
    (brandId: number) => {
      if (!expandedBrands.has(brandId)) {
        setExpandedBrands((prev) => {
          const newSet = new Set(prev);
          newSet.add(brandId);

          const hasData = prices.some((p) => p.brandId === brandId);
          if (!hasData) {
            fetchPrices(brandId);
          }

          return newSet;
        });
      }
    },
    [expandedBrands, prices, fetchPrices],
  );

  // تغییر برند انتخابی (برای برندهای ۶ تایی اول)
  const handleBrandSelect = useCallback(
    (brandId: number) => {
      const isSelected = selectedBrand === brandId;
      const newBrandId = isSelected ? null : brandId;

      setSelectedBrand(newBrandId);
      setSearchTerm("");

      if (newBrandId) {
        const isInFirstSix = brandsWithPrice.some((b) => b.id === brandId);
        if (isInFirstSix) {
          const filtered = prices.filter((p) => p.brandId === brandId);
          setPrices(filtered);
        }
      } else {
        // اگر برند deselect شد، به حالت اولیه برگرد
        fetchInitialDataForType(currentType);
      }
    },
    [selectedBrand, brandsWithPrice, prices, fetchInitialDataForType, currentType],
  );

  // جستجو با Debounce
  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);

      if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
      }

      const timer = setTimeout(() => {
        if (term.trim().length > 0) {
          fetchPrices(null, term);
          setSelectedBrand(null);
          setExpandedBrands(new Set());
        } else {
          fetchInitialDataForType(currentType);
          setSelectedBrand(null);
        }
      }, 500);

      setSearchDebounceTimer(timer);
    },
    [fetchPrices, fetchInitialDataForType, searchDebounceTimer, currentType],
  );

  // پاک کردن فیلترها
  const handleResetFilters = useCallback(() => {
    setSelectedBrand(null);
    setSearchTerm("");
    fetchInitialDataForType(currentType);
    setExpandedBrands(new Set());
    if (brandIdSearchParams) {
      const baseUrl = window.location.pathname;
      const params = new URLSearchParams(searchParams.toString());
      params.delete("brandId");
      router.push(`${baseUrl}?${params.toString()}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [brandIdSearchParams, fetchInitialDataForType, router, searchParams, currentType]);

  // تغییر تب - با رفرش کامل صفحه
  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, activeKey: string) => {
      const category = mainCategories.find((cat) => cat.type === activeKey);
      if (category) {
        // رفرش کامل صفحه با URL جدید
        window.location.href = category.url;
      }
    },
    [],
  );

  // گروه‌بندی قیمت‌ها بر اساس برند
  const groupedPrices = useMemo(() => {
    const grouped: Record<number, Prices[]> = {};
    prices.forEach((item) => {
      if (!grouped[item.brandId]) {
        grouped[item.brandId] = [];
      }
      grouped[item.brandId].push(item);
    });
    return grouped;
  }, [prices]);

  // تابع برای دریافت نام برند
  const getBrandNameById = useCallback(
    (brandId: number): string => {
      const allBrands = [...brandsWithPrice, ...brandsWithoutPrice];
      const brand = allBrands.find((b) => b.id === brandId);
      return brand?.title || `برند ${brandId}`;
    },
    [brandsWithPrice, brandsWithoutPrice],
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3, md: 4 },
        direction: "rtl",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 2 } }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: PRIMARY_COLOR,
              fontWeight: "bold",
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
              mb: 1,
            }}
          >
            {title || "قیمت خودرو"}
          </Typography>
          {summary && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: "800px", mx: "auto" }}
            >
              {summary}
            </Typography>
          )}
          {body && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                maxWidth: "800px",
                mx: "auto",
                mt: 1,
              }}
            >
              {htmlToPlainText(body)}
            </Typography>
          )}
        </Box>

        {/* Tabs */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
          <Tabs
            value={selectedCategory === 8955 ? "internal" : "import"}
            onChange={handleTabChange}
            centered
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: PRIMARY_COLOR,
                height: 3,
              },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                fontSize: { xs: 13, sm: 14 },
                borderRadius: "8px 8px 0 0",
                minHeight: 40,
                "&.Mui-selected": {
                  color: PRIMARY_COLOR,
                },
                "&:hover": {
                  backgroundColor: "#fdf2f2",
                },
              },
            }}
          >
            {mainCategories.map((category) => (
              <Tab
                key={category.type}
                label={category.title}
                value={category.type}
              />
            ))}
          </Tabs>
        </Box>

        {/* Search Box */}
        <SearchBox
          value={searchTerm}
          onChange={handleSearch}
          isLoading={isLoading}
        />

        {/* Results */}
        <PriceResults
          groupedPrices={groupedPrices}
          getBrandNameById={getBrandNameById}
          isLoading={isLoading}
          isMobile={isMobile}
          hasFilters={!!selectedBrand || !!searchTerm}
          onResetFilters={handleResetFilters}
          brandsWithoutPrice={brandsWithoutPrice}
          expandedBrands={expandedBrands}
          onToggleBrand={handleToggleBrand}
          brandsWithPrice={brandsWithPrice}
          isLoadingBrand={isLoadingBrand}
          vehicle="car"
        />
      </Container>
    </Box>
  );
}

export default PriceCar;