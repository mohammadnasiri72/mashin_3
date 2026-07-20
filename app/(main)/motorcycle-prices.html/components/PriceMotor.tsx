"use client";

import { SearchOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import { htmlToPlainText } from "@/utils/func";
import {
  FaCaretDown,
  FaCaretUp,
  FaDollarSign,
  FaMotorcycle,
} from "react-icons/fa";
import { MdPriceChange, MdSwapVert } from "react-icons/md";

// MUI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  InputAdornment,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Types
interface Category {
  id: number;
  title: string;
  url: string;
  total: number;
  type: string;
}

interface PriceBrands {
  id: number;
  priority: number;
  categoryKey: string;
  title: string;
  parentId: number;
  parentTitle: string;
}

interface Prices {
  id: number;
  brandId: number;
  brandTitle: string;
  title: string;
  price1: number;
  price2: number;
  change: number;
}

const PRIMARY_COLOR = "#ce1a2a";
const PRIMARY_LIGHT = "#fdf2f2";

// نوع مرتب‌سازی
type Order = "asc" | "desc" | undefined;

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  borderRadius: "12px",
  overflow: "hidden",
  border: "none",
  marginBottom: "24px",
  "&:hover": {
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
}));

const BrandHeader = styled(Box)(({ theme }) => ({
  padding: "12px 16px",
  backgroundColor: PRIMARY_LIGHT,
  borderBottom: `2px solid ${PRIMARY_COLOR}`,
  borderRadius: "8px 8px 0 0",
  marginBottom: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const BrandButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>(({ selected }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px 10px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.2s",
  minWidth: "60px",
  backgroundColor: selected ? PRIMARY_COLOR : "#ffffff",
  color: selected ? "#ffffff" : "#374151",
  border: `1px solid ${selected ? PRIMARY_COLOR : "#e5e7eb"}`,
  "&:hover": {
    backgroundColor: selected ? PRIMARY_COLOR : "#f9fafb",
    borderColor: selected ? PRIMARY_COLOR : PRIMARY_COLOR,
    color: selected ? "#ffffff" : PRIMARY_COLOR,
    transform: "scale(1.02)",
  },
  "&:active": {
    transform: "scale(0.98)",
  },
}));

// Custom TableSortLabel با آیکون‌های متفاوت
const CustomTableSortLabel = ({
  active,
  direction,
  onClick,
  children,
}: {
  active: boolean;
  direction: Order;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const [hover, setHover] = useState(false);

  // تعیین متن Tooltip بر اساس وضعیت فعلی
  const getTooltipText = () => {
    if (!active || direction === undefined) {
      return "مرتب‌سازی صعودی";
    }
    if (direction === "asc") {
      return "مرتب‌سازی نزولی";
    }
    return "حذف مرتب‌سازی";
  };

  // تعیین آیکون مناسب
  const getIcon = () => {
    if (!active || direction === undefined) {
      return <MdSwapVert style={{ fontSize: 18, opacity: 0.5 }} />;
    }
    if (direction === "asc") {
      return <FaCaretUp style={{ fontSize: 18, color: PRIMARY_COLOR }} />;
    }
    return <FaCaretDown style={{ fontSize: 18, color: PRIMARY_COLOR }} />;
  };

  return (
    <Tooltip title={getTooltipText()} placement="top" arrow>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          cursor: "pointer",
          fontWeight: 600,
          color: active && direction !== undefined ? PRIMARY_COLOR : "inherit",
          "&:hover": {
            color: PRIMARY_COLOR,
          },
          transition: "color 0.2s",
          userSelect: "none",
        }}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span>{children}</span>
        {getIcon()}
      </Box>
    </Tooltip>
  );
};

// تابع مرتب‌سازی
function getComparator<Key extends keyof Prices>(
  order: Order,
  orderBy: Key,
): (a: Prices, b: Prices) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const aValue = a[orderBy];
  const bValue = b[orderBy];

  if (typeof aValue === "string" && typeof bValue === "string") {
    return bValue.localeCompare(aValue, "fa");
  }

  if (typeof aValue === "number" && typeof bValue === "number") {
    if (bValue < aValue) {
      return -1;
    }
    if (bValue > aValue) {
      return 1;
    }
    return 0;
  }

  if (bValue === null || bValue === undefined) return -1;
  if (aValue === null || aValue === undefined) return 1;

  return 0;
}

// Mobile Price Card Component
const MobilePriceCard = ({ item }: { item: Prices }) => {
  const theme = useTheme();

  return (
    <StyledCard>
      <CardContent sx={{ p: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 1.5,
            pb: 1,
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: PRIMARY_LIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FaMotorcycle style={{ color: PRIMARY_COLOR, fontSize: 16 }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              noWrap
              sx={{ fontSize: "0.875rem" }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              sx={{ fontSize: "0.7rem" }}
            >
              {item.brandTitle}
            </Typography>
          </Box>
          <Chip
            label={
              item.change > 0 ? "افزایش" : item.change < 0 ? "کاهش" : "ثابت"
            }
            size="small"
            sx={{
              backgroundColor:
                item.change > 0
                  ? "#dcfce7"
                  : item.change < 0
                    ? "#fee2e2"
                    : "#f3f4f6",
              color:
                item.change > 0
                  ? "#166534"
                  : item.change < 0
                    ? "#991b1b"
                    : "#6b7280",
              fontWeight: 600,
              fontSize: 9,
              height: 20,
              "& .MuiChip-label": {
                px: 1,
              },
            }}
          />
        </Box>

        <Stack spacing={1.5}>
          {/* قیمت */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: PRIMARY_LIGHT,
              padding: "8px 12px",
              borderRadius: "6px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <FaDollarSign style={{ color: PRIMARY_COLOR, fontSize: 14 }} />
              <Typography
                variant="body2"
                fontWeight="500"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                قیمت
              </Typography>
            </Box>
            <Typography
              component="span"
              fontWeight="bold"
              sx={{
                color: PRIMARY_COLOR,
                fontSize: "1rem",
              }}
            >
              {item.price2 ? item.price2.toLocaleString("fa-IR") : "---"}
              <Typography
                component="span"
                variant="caption"
                sx={{
                  mr: 0.5,
                  color: "#6b7280",
                  fontWeight: 400,
                  fontSize: "0.65rem",
                }}
              >
                تومان
              </Typography>
            </Typography>
          </Box>

          {/* تغییر قیمت */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 0.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <MdPriceChange style={{ color: "#6b7280", fontSize: 14 }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                تغییر قیمت
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color:
                  item.change > 0
                    ? "#16a34a"
                    : item.change < 0
                      ? "#dc2626"
                      : "#9ca3af",
                fontWeight: "bold",
              }}
            >
              {item.change > 0 ? (
                <FaCaretUp style={{ fontSize: 16 }} />
              ) : item.change < 0 ? (
                <FaCaretDown style={{ fontSize: 16 }} />
              ) : null}
              <Typography
                variant="body2"
                fontWeight="bold"
                component="span"
                sx={{ fontSize: "0.8rem" }}
              >
                {item.change !== 0
                  ? Math.abs(item.change).toLocaleString("fa-IR")
                  : "---"}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

// Desktop Table Component
const DesktopPriceTable = ({
  items,
  brandName,
}: {
  items: Prices[];
  brandName: string;
}) => {
  const theme = useTheme();
  const [order, setOrder] = useState<Order>(undefined);
  const [orderBy, setOrderBy] = useState<keyof Prices>("title");

  // تابع مدیریت مرتب‌سازی
  const handleSort = (property: keyof Prices) => {
    const isAsc = orderBy === property && order === "asc";
    const isDesc = orderBy === property && order === "desc";

    if (isAsc) {
      setOrder("desc");
    } else if (isDesc) {
      setOrder(undefined);
    } else {
      setOrder("asc");
    }
    setOrderBy(property);
  };

  // مرتب‌سازی داده‌ها
  const sortedItems = useMemo(() => {
    if (!order) return items;
    const comparator = getComparator(order, orderBy);
    return [...items].sort(comparator);
  }, [items, order, orderBy]);

  return (
    <StyledCard>
      <BrandHeader>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <FaMotorcycle style={{ color: PRIMARY_COLOR, fontSize: 16 }} />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            {brandName}
          </Typography>
        </Box>
        <Chip
          label={`${items.length} مدل`}
          size="small"
          sx={{
            backgroundColor: PRIMARY_COLOR,
            color: "#ffffff",
            fontWeight: 600,
            fontSize: 12,
          }}
        />
      </BrandHeader>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 0 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8fafc" }}>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 600,
                  fontSize: 14,
                  py: 1.5,
                }}
              >
                <CustomTableSortLabel
                  active={orderBy === "title"}
                  direction={orderBy === "title" ? order : undefined}
                  onClick={() => handleSort("title")}
                >
                  مدل موتورسیکلت
                </CustomTableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 600,
                  fontSize: 14,
                  py: 1.5,
                }}
              >
                <CustomTableSortLabel
                  active={orderBy === "price2"}
                  direction={orderBy === "price2" ? order : undefined}
                  onClick={() => handleSort("price2")}
                >
                  قیمت (تومان)
                </CustomTableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 600,
                  fontSize: 14,
                  py: 1.5,
                }}
              >
                <CustomTableSortLabel
                  active={orderBy === "change"}
                  direction={orderBy === "change" ? order : undefined}
                  onClick={() => handleSort("change")}
                >
                  تغییر قیمت
                </CustomTableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedItems.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  "&:hover": {
                    backgroundColor: PRIMARY_LIGHT,
                  },
                  "&:last-child td": {
                    borderBottom: "none",
                  },
                }}
              >
                <TableCell
                  align="center"
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#374151",
                  }}
                >
                  {item.price2 ? item.price2.toLocaleString("fa-IR") : "---"}
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      color:
                        item.change > 0
                          ? "#16a34a"
                          : item.change < 0
                            ? "#dc2626"
                            : "#9ca3af",
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                  >
                    {item.change > 0 ? (
                      <FaCaretUp style={{ fontSize: 20 }} />
                    ) : item.change < 0 ? (
                      <FaCaretDown style={{ fontSize: 20 }} />
                    ) : null}
                    {item.change !== 0
                      ? Math.abs(item.change).toLocaleString("fa-IR")
                      : "---"}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledCard>
  );
};

function PriceMotor({
  brands,
  price,
  title,
  summary,
  body,
  brandIdSearchParams,
}: {
  brands: PriceBrands[];
  price: Prices[];
  title: string;
  summary: string;
  body: string;
  brandIdSearchParams: number;
}) {
  const mainCategories: Category[] = [
    {
      id: 0,
      title: "همه موتورسیکلت‌ها",
      url: "/motorcycle-prices.html?type=all",
      total: price.length,
      type: "all",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(
    brandIdSearchParams || null,
  );
  const [searchText, setSearchText] = useState("");
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();
  const swiperRef = useRef<any>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setSelectedCategory(0);
  }, [type]);

  // const sortedBrands = useMemo(() => {
  //   return [...brands].sort((a, b) => a.title.localeCompare(b.title, "fa"));
  // }, [brands]);
  const sortedBrands = useMemo(() => {
    return [...brands].sort((a, b) => {
      // اولویت اول: priority (اگر وجود نداشت 0 در نظر گرفته می‌شود)
      const priorityA = a.priority ?? 0;
      const priorityB = b.priority ?? 0;

      if (priorityA !== priorityB) {
        return priorityA - priorityB; // مرتب‌سازی صعودی بر اساس priority
      }

      // اگر priority مساوی بود، بر اساس حروف الفبا
      return a.title.localeCompare(b.title, "fa");
    });
  }, [brands]);

  const filteredBrands = useMemo(() => {
    if (!selectedCategory) return sortedBrands;
    return sortedBrands.filter((brand) => brand.parentId === selectedCategory);
  }, [sortedBrands, selectedCategory]);

  const filteredData = useMemo(() => {
    let filtered = price;

    if (selectedBrand) {
      filtered = filtered.filter((item) => item.brandId === selectedBrand);
    }

    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.brandTitle?.toLowerCase().includes(searchLower) ||
          item.title?.toLowerCase().includes(searchLower),
      );
    }

    return filtered;
  }, [price, selectedBrand, searchText]);

  const groupedData = useMemo(() => {
    const grouped: Record<number, Prices[]> = {};

    filteredData.forEach((item) => {
      if (!grouped[item.brandId]) {
        grouped[item.brandId] = [];
      }
      grouped[item.brandId].push(item);
    });

    return grouped;
  }, [filteredData]);

  const getBrandNameById = useMemo(() => {
    const brandMap = new Map<number, string>();
    brands.forEach((brand) => {
      brandMap.set(brand.id, brand.title);
    });

    return (brandId: number): string => {
      return brandMap.get(brandId) || `برند ${brandId}`;
    };
  }, [brands]);

  const handleResetFilters = () => {
    setSelectedBrand(null);
    setSearchText("");
    if (brandIdSearchParams) {
      const baseUrl = window.location.pathname;
      const params = new URLSearchParams(searchParams.toString());
      params.delete("brandId");
      router.push(`${baseUrl}?${params.toString()}`);
    }
  };

  const handleBrandSelect = (brandId: number) => {
    setSelectedBrand(selectedBrand === brandId ? null : brandId);
  };

  const handleTabChange = (_event: React.SyntheticEvent, activeKey: string) => {
    const category = mainCategories.find((cat) => cat.type === activeKey);
    if (category) {
      setSelectedBrand(null);
      router.push(category.url);
    }
  };

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
                    backgroundColor: PRIMARY_LIGHT,
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

        {/* Search */}
        <Box sx={{ mb: 3, maxWidth: "600px", mx: "auto" }}>
          <TextField
            fullWidth
            placeholder="جستجو در برند و مدل موتورسیکلت..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            size="medium"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: PRIMARY_COLOR,
                  },
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: PRIMARY_COLOR,
                    borderWidth: 2,
                  },
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined style={{ color: "#9ca3af" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Brands Swiper */}
        {selectedCategory !== null && filteredBrands.length > 0 && (
          <Box sx={{ mb: 4, px: 0.5 }}>
            <Swiper
              spaceBetween={6}
              slidesPerView={3.5}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              dir="rtl"
              loop={false}
              className="carType_slider"
              breakpoints={{
                320: { slidesPerView: 3.5, spaceBetween: 6 },
                480: { slidesPerView: 6.5, spaceBetween: 6 },
                640: { slidesPerView: 8.5, spaceBetween: 8 },
                768: { slidesPerView: 12.5, spaceBetween: 8 },
                1024: { slidesPerView: 14.5, spaceBetween: 10 },
              }}
            >
              {filteredBrands.map((brand) => (
                <SwiperSlide key={brand.id}>
                  <BrandButton
                    selected={selectedBrand === brand.id}
                    onClick={() => handleBrandSelect(brand.id)}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: { xs: 10, sm: 12 },
                        fontWeight: 500,
                        textAlign: "center",
                        lineHeight: 1.2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "100%",
                      }}
                    >
                      {brand.title}
                    </Typography>
                  </BrandButton>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        )}

        {/* Results */}
        <Box sx={{ mt: 2 }}>
          {Object.keys(groupedData).length > 0 ? (
            Object.entries(groupedData)
              .sort(([brandIdA], [brandIdB]) => {
                const brandA = brands.find((b) => b.id === parseInt(brandIdA));
                const brandB = brands.find((b) => b.id === parseInt(brandIdB));

                const priorityA = brandA?.priority ?? 0;
                const priorityB = brandB?.priority ?? 0;

                if (priorityA !== priorityB) {
                  return priorityB - priorityA; // نزولی (اعداد بزرگتر اولویت بالاتر)
                }

                const nameA = brandA?.title ?? "";
                const nameB = brandB?.title ?? "";
                return nameA.localeCompare(nameB, "fa");
              })
              .map(([brandId, items]) => {
                const brandName = getBrandNameById(parseInt(brandId));
                return isMobile ? (
                  <Box key={brandId} sx={{ mb: 3 }}>
                    {/* هدر برند با ارتفاع کمتر */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1.5,
                        px: 0.5,
                        backgroundColor: PRIMARY_LIGHT,
                        borderRadius: "8px",
                        padding: "6px 12px",
                        borderRight: `3px solid ${PRIMARY_COLOR}`,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <FaMotorcycle
                          style={{ color: PRIMARY_COLOR, fontSize: 14 }}
                        />
                        <Typography
                          variant="subtitle2"
                          fontWeight="bold"
                          color="text.primary"
                          sx={{ fontSize: "0.85rem" }}
                        >
                          {brandName}
                        </Typography>
                      </Box>
                      <Chip
                        label={`${items.length} مدل`}
                        size="small"
                        sx={{
                          backgroundColor: PRIMARY_COLOR,
                          color: "#ffffff",
                          fontWeight: 600,
                          fontSize: 10,
                          height: 20,
                          "& .MuiChip-label": {
                            px: 1,
                          },
                        }}
                      />
                    </Box>
                    {items.map((item) => (
                      <MobilePriceCard key={item.id} item={item} />
                    ))}
                  </Box>
                ) : (
                  <DesktopPriceTable
                    key={brandId}
                    items={items}
                    brandName={brandName}
                  />
                );
              })
          ) : (
            <StyledCard>
              <CardContent sx={{ textAlign: "center", py: 6 }}>
                <Typography variant="h3" sx={{ mb: 2, fontSize: 48 }}>
                  🏍️
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1.5 }}
                >
                  موتورسیکلتی یافت نشد
                </Typography>
                {(selectedBrand || searchText) && (
                  <Button
                    onClick={handleResetFilters}
                    sx={{
                      color: PRIMARY_COLOR,
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: PRIMARY_LIGHT,
                      },
                    }}
                  >
                    پاک کردن فیلترها
                  </Button>
                )}
              </CardContent>
            </StyledCard>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default PriceMotor;
