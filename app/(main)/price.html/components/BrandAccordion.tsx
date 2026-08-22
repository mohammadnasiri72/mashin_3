"use client";

import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import { FaCar, FaMotorcycle } from "react-icons/fa";
import { PRIMARY_COLOR } from "./constants";
import DesktopPriceTable from "./DesktopPriceTable";
import MobilePriceCard from "./MobilePriceCard";
import { BrandHeader, StyledCard } from "./styled";
import { PriceBrands, Prices } from "./types";

interface BrandAccordionProps {
  brand: PriceBrands;
  items: Prices[];
  isExpanded: boolean;
  isLoading: boolean;
  onToggle: () => void;
  getBrandNameById: (brandId: number) => string;
  isMobile: boolean;
  vehicle: string;
}

export default function BrandAccordion({
  brand,
  items,
  isExpanded,
  isLoading,
  onToggle,
  getBrandNameById,
  isMobile,
  vehicle,
}: BrandAccordionProps) {
  const brandName = getBrandNameById(brand.id);
  const hasItems = items.length > 0;

  // وقتی باز شده، دقیقاً مثل ۶ برند اول نمایش داده میشه
  if (isExpanded) {
    return (
      <Box sx={{ mb: 3 }}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress sx={{ color: PRIMARY_COLOR }} />
          </Box>
        ) : hasItems ? (
          isMobile ? (
            // نمایش موبایل - مثل ۶ برند اول
            <Box>
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
                <MobilePriceCard key={item.id} item={item} vehicle={vehicle}/>
              ))}
            </Box>
          ) : (
            // نمایش دسکتاپ - مثل ۶ برند اول
            <DesktopPriceTable items={items} brandName={brandName} vehicle={vehicle}/>
          )
        ) : (
          <Box sx={{ textAlign: "center", py: 3 }}>
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
                  {vehicle === "car" ? (
                    <FaCar style={{ color: PRIMARY_COLOR, fontSize: 16 }} />
                  ) : (
                    <FaMotorcycle
                      style={{ color: PRIMARY_COLOR, fontSize: 16 }}
                    />
                  )}
                </Box>
                <Typography variant="body1" fontWeight="bold">
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
            <Typography variant="body2" color="text.secondary">
              هیچ مدلی برای این برند یافت نشد
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <StyledCard
      sx={{
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
      }}
      onClick={onToggle}
    >
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
            {vehicle === "car" ? (
              <FaCar style={{ color: PRIMARY_COLOR, fontSize: 16 }} />
            ) : (
              <FaMotorcycle style={{ color: PRIMARY_COLOR, fontSize: 16 }} />
            )}
          </Box>
          <Typography variant="body1" fontWeight="bold">
            {brandName}
          </Typography>
        </Box>
        <Box
          sx={{
            whiteSpace: "nowrap",
            backgroundColor: "#ce1a2a",
            color: "#ffffff",
            padding: { xs: "8px 16px", sm: "6px 16px" },
            borderRadius: "6px",
            fontSize: { xs: "0.8rem", sm: "0.875rem" },
            fontWeight: 500,
            width: { xs: "100%", sm: "auto" },
            textAlign: "center",
            "&:hover": {
              backgroundColor: "#b01520",
            },
          }}
        >
          نمایش مدل‌ها
        </Box>
      </BrandHeader>
    </StyledCard>
  );
}
