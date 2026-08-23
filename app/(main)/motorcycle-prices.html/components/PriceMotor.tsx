"use client";

import { getPriceMotor } from "@/services/Price/PriceMotor";
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
import { PRIMARY_COLOR } from "../../price.html/components/constants";
import PriceResults from "../../price.html/components/PriceResults";
import SearchBox from "../../price.html/components/SearchBox";
import { Category } from "../../price.html/components/types";

interface PriceMotorProps {
  brandsWithPrice: PriceBrands[];
  brandsWithoutPrice: PriceBrands[];
  initialPrices: Prices[];
  title: string;
  summary: string;
  body: string;
  brandIdSearchParams: number;
  type: string;
}

function PriceMotor({
  brandsWithPrice,
  brandsWithoutPrice,
  initialPrices,
  title,
  summary,
  body,
  brandIdSearchParams,
  type,
}: PriceMotorProps) {
  const mainCategories: Category[] = [
    {
      id: 0,
      title: "همه موتورسیکلت‌ها",
      url: "/motorcycle-prices.html?type=all",
      type: "all",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
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

  const searchParams = useSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // انتخاب دسته‌بندی
  useEffect(() => {
    setSelectedCategory(0);
  }, [type]);

  // تابع دریافت داده‌ها از سرور
  const fetchPrices = useCallback(
    async (brandId: number | null, term: string = "") => {
      if (brandId) {
        setIsLoadingBrand(brandId);
      } else {
        setIsLoading(true);
      }

      try {
        const response = await getPriceMotor({
          Type: type,
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
    [type],
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
          const filtered = initialPrices.filter((p) => p.brandId === brandId);
          setPrices((prev) => {
            const filteredPrev = prev.filter((p) => p.brandId !== brandId);
            return [...filteredPrev, ...filtered];
          });
        }
      } else {
        setPrices(initialPrices);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [selectedBrand, brandsWithPrice, initialPrices],
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
          setPrices(initialPrices);
          setSelectedBrand(null);
        }
      }, 500);

      setSearchDebounceTimer(timer);
    },
    [fetchPrices, initialPrices, searchDebounceTimer],
  );

  // پاک کردن فیلترها
  const handleResetFilters = useCallback(() => {
    setSelectedBrand(null);
    setSearchTerm("");
    setPrices(initialPrices);
    setExpandedBrands(new Set());
    if (brandIdSearchParams) {
      const baseUrl = window.location.pathname;
      const params = new URLSearchParams(searchParams.toString());
      params.delete("brandId");
      router.push(`${baseUrl}?${params.toString()}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [brandIdSearchParams, initialPrices, router, searchParams]);

  // تغییر تب
  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, activeKey: string) => {
      const category = mainCategories.find((cat) => cat.type === activeKey);
      if (category) {
        setSelectedBrand(null);
        setSearchTerm("");
        setExpandedBrands(new Set());
        router.push(category.url);
      }
    },
    [router],
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
            {title || "قیمت موتورسیکلت"}
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
        {mainCategories.length > 1 && (
          <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
            <Tabs
              value={selectedCategory === 0 ? "all" : ""}
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
        )}

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
          vehicle="motor"
          isSearching={searchTerm.trim().length >= 1}
        />
      </Container>
    </Box>
  );
}

export default PriceMotor;
