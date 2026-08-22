"use client";

import {
  Box,
  Button,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { FaCar, FaMotorcycle } from "react-icons/fa";
import BrandAccordion from "./BrandAccordion";
import DesktopPriceTable from "./DesktopPriceTable";
import MobilePriceCard from "./MobilePriceCard";
import { StyledCard } from "./styled";
import { PriceBrands, Prices } from "./types";

interface PriceResultsProps {
  groupedPrices: Record<number, Prices[]>;
  getBrandNameById: (brandId: number) => string;
  isLoading: boolean;
  isMobile: boolean;
  hasFilters: boolean;
  onResetFilters: () => void;
  brandsWithoutPrice: PriceBrands[];
  expandedBrands: Set<number>;
  onToggleBrand: (brandId: number) => void;
  brandsWithPrice: PriceBrands[];
  isLoadingBrand: number | null;
  vehicle: string;
}

export default function PriceResults({
  groupedPrices,
  getBrandNameById,
  isLoading,
  isMobile,
  hasFilters,
  onResetFilters,
  brandsWithoutPrice,
  expandedBrands,
  onToggleBrand,
  brandsWithPrice,
  isLoadingBrand,
  vehicle,
}: PriceResultsProps) {
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress sx={{ color: "#ce1a2a" }} />
      </Box>
    );
  }

  const hasResults = Object.keys(groupedPrices).length > 0;

  if (!hasResults && !isLoading) {
    return (
      <StyledCard>
        <CardContent sx={{ textAlign: "center", py: 6 }}>
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              fontSize: 48,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {vehicle === "car" ? (
              <FaCar style={{ color: "#ce1a2a", fontSize: 36 }} />
            ) : (
              <FaMotorcycle style={{ color: "#ce1a2a", fontSize: 36 }} />
            )}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
            مدلی یافت نشد
          </Typography>
          {hasFilters && (
            <Button
              onClick={onResetFilters}
              sx={{
                color: "#ce1a2a",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#fdf2f2",
                },
              }}
            >
              پاک کردن فیلترها
            </Button>
          )}
        </CardContent>
      </StyledCard>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      {/* نمایش برندهای ۶ تایی اول */}
      {brandsWithPrice.map((brand) => {
        const items = groupedPrices[brand.id] || [];
        const brandName = getBrandNameById(brand.id);

        if (items.length === 0) return null;

        return isMobile ? (
          <Box key={brand.id} sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1.5,
                px: 0.5,
                backgroundColor: "#fdf2f2",
                borderRadius: "8px",
                padding: "6px 12px",
                borderRight: "3px solid #ce1a2a",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {vehicle === "car" ? (
                  <FaCar style={{ color: "#ce1a2a", fontSize: 14 }} />
                ) : (
                  <FaMotorcycle style={{ color: "#ce1a2a", fontSize: 14 }} />
                )}

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
                  backgroundColor: "#ce1a2a",
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
              <MobilePriceCard key={item.id} item={item} vehicle={vehicle} />
            ))}
          </Box>
        ) : (
          <DesktopPriceTable
            key={brand.id}
            items={items}
            brandName={brandName}
            vehicle={vehicle}
          />
        );
      })}

      {/* نمایش برندهای باقی‌مانده (۷ به بعد) */}
      {brandsWithoutPrice.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Stack spacing={2}>
            {brandsWithoutPrice.map((brand) => {
              const items = groupedPrices[brand.id] || [];
              const isExpanded = expandedBrands.has(brand.id);
              const isLoadingThisBrand = isLoadingBrand === brand.id;

              return (
                <BrandAccordion
                  key={brand.id}
                  brand={brand}
                  items={items}
                  isExpanded={isExpanded}
                  isLoading={isLoadingThisBrand}
                  onToggle={() => onToggleBrand(brand.id)}
                  getBrandNameById={getBrandNameById}
                  isMobile={isMobile}
                  vehicle={vehicle}
                />
              );
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
