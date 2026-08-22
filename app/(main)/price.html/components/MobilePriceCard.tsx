"use client";

import {
  Box,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import {
  FaCar,
  FaCaretDown,
  FaCaretUp,
  FaDollarSign,
  FaMotorcycle,
  FaStore,
} from "react-icons/fa";
import { MdPriceChange } from "react-icons/md";
import { PRIMARY_COLOR, PRIMARY_LIGHT } from "./constants";
import { StyledCard } from "./styled";
import { Prices } from "./types";
import { formatTitleParts } from "@/utils/func";

interface MobilePriceCardProps {
  item: Prices;
  vehicle: string;
}

export default function MobilePriceCard({
  item,
  vehicle,
}: MobilePriceCardProps) {
  // کامپوننت نمایش عنوان فرمت شده با کلاس‌های مشخص
  const FormattedTitle = ({ title }: { title: string }) => {
    const parts = formatTitleParts(title);
    
    return (
      <Box 
        className="title-wrapper-price-mobile" 
        sx={{ 
          display: "flex", 
          flexWrap: "wrap", 
          alignItems: "center", 
          gap: "1px",
          fontSize: "0.875rem",
          fontWeight: "bold",
        }}
      >
        {parts.map((part, index) => (
          part.isSeparator ? (
            <span 
              key={index} 
              className="title-separator-price-mobile"
              style={{ 
                fontSize: "0.875rem", 
                fontWeight: "bold", 
                color: "#9ca3af", 
                margin: "0 1px",
                whiteSpace: "nowrap",
              }}
            >
              {part.text}
            </span>
          ) : (
            <span 
              key={index} 
              className="title-part-price-mobile"
              style={{ 
                fontSize: "0.875rem", 
                fontWeight: "bold",
                whiteSpace: "nowrap",
              }}
            >
              {part.text}
            </span>
          )
        ))}
      </Box>
    );
  };

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
            {vehicle === "car" ? (
              <FaCar style={{ color: PRIMARY_COLOR, fontSize: 16 }} />
            ) : (
              <FaMotorcycle style={{ color: PRIMARY_COLOR, fontSize: 16 }} />
            )}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <FormattedTitle title={item.title} />
            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              sx={{ fontSize: "0.7rem", display: "block", mt: 0.5 }}
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
              "& .MuiChip-label": { px: 1 },
            }}
          />
        </Box>

        <Stack spacing={1.5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: PRIMARY_LIGHT,
              padding: "6px 12px",
              borderRadius: "6px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <FaDollarSign style={{ color: "#374151", fontSize: 14 }} />
              <Typography
                variant="body2"
                fontWeight="500"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                قیمت بازار
              </Typography>
            </Box>
            <Typography
              component="span"
              fontWeight="bold"
              sx={{ color: "#374151", fontSize: "1rem" }}
            >
              {item.price1 ? item.price1.toLocaleString("fa-IR") : "---"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f8fafc",
              padding: "6px 12px",
              borderRadius: "6px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <FaStore style={{ color: "#6b7280", fontSize: 14 }} />
              <Typography
                variant="body2"
                fontWeight="500"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                قیمت نمایندگی
              </Typography>
            </Box>
            <Typography
              component="span"
              fontWeight="bold"
              sx={{ color: "#374151", fontSize: "1rem" }}
            >
              {item.price2 ? item.price2.toLocaleString("fa-IR") : "---"}
            </Typography>
          </Box>

          <Divider sx={{ my: 0.5 }} />

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
                    ? "rgb(5, 58, 0)"
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
}