"use client";

import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { FaCar, FaCaretDown, FaCaretUp, FaMotorcycle } from "react-icons/fa";
import { MdSwapVert } from "react-icons/md";
import { PRIMARY_COLOR, PRIMARY_LIGHT } from "./constants";
import { BrandHeader, StyledCard } from "./styled";
import { Prices } from "./types";
import { formatTitleParts } from "@/utils/func";

type Order = "asc" | "desc" | undefined;

// Custom TableSortLabel
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
  const getTooltipText = () => {
    if (!active || direction === undefined) return "مرتب‌سازی صعودی";
    if (direction === "asc") return "مرتب‌سازی نزولی";
    return "حذف مرتب‌سازی";
  };

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
          "&:hover": { color: PRIMARY_COLOR },
          transition: "color 0.2s",
          userSelect: "none",
        }}
        onClick={onClick}
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
    if (bValue < aValue) return -1;
    if (bValue > aValue) return 1;
    return 0;
  }

  if (bValue === null || bValue === undefined) return -1;
  if (aValue === null || aValue === undefined) return 1;
  return 0;
}

interface DesktopPriceTableProps {
  items: Prices[];
  brandName: string;
  vehicle: string;
}

export default function DesktopPriceTable({
  items,
  brandName,
  vehicle,
}: DesktopPriceTableProps) {
  const [order, setOrder] = useState<Order>(undefined);
  const [orderBy, setOrderBy] = useState<keyof Prices>("title");

  const handleSort = (property: keyof Prices) => {
    const isAsc = orderBy === property && order === "asc";
    const isDesc = orderBy === property && order === "desc";

    if (isAsc) setOrder("desc");
    else if (isDesc) setOrder(undefined);
    else setOrder("asc");
    setOrderBy(property);
  };

  const sortedItems = useMemo(() => {
    if (!order) return items;
    const comparator = getComparator(order, orderBy);
    return [...items].sort(comparator);
  }, [items, order, orderBy]);

  // کامپوننت نمایش عنوان فرمت شده با کلاس‌های مشخص
  const FormattedTitle = ({ title }: { title: string }) => {
    const parts = formatTitleParts(title);
    
    return (
      <Box className="title-wrapper-price" sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "2px" }}>
        {parts.map((part, index) => (
          part.isSeparator ? (
            <span key={index} className="title-separator-price" style={{ fontSize: 14, fontWeight: 500, color: "#9ca3af", margin: "0 2px", whiteSpace: "nowrap" }}>
              {part.text}
            </span>
          ) : (
            <span key={index} className="title-part-price" style={{ fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" }}>
              {part.text}
            </span>
          )
        ))}
      </Box>
    );
  };

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

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ borderRadius: 0, overflowX: "auto" }}
      >
        <Table
          size="small"
          sx={{
            tableLayout: "fixed",
            width: "100%",
            minWidth: "700px",
          }}
        >
          <colgroup>
            <col style={{ width: "35%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "21%" }} />
          </colgroup>

          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8fafc" }}>
              <TableCell
                align="center"
                sx={{ fontWeight: 600, fontSize: 14, py: 1.5, px: 1 }}
              >
                <CustomTableSortLabel
                  active={orderBy === "title"}
                  direction={orderBy === "title" ? order : undefined}
                  onClick={() => handleSort("title")}
                >
                  مدل
                </CustomTableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 600, fontSize: 14, py: 1.5, px: 1 }}
              >
                <CustomTableSortLabel
                  active={orderBy === "price1"}
                  direction={orderBy === "price1" ? order : undefined}
                  onClick={() => handleSort("price1")}
                >
                  قیمت بازار (تومان)
                </CustomTableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 600, fontSize: 14, py: 1.5, px: 1 }}
              >
                <CustomTableSortLabel
                  active={orderBy === "price2"}
                  direction={orderBy === "price2" ? order : undefined}
                  onClick={() => handleSort("price2")}
                >
                  قیمت نمایندگی (تومان)
                </CustomTableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 600, fontSize: 14, py: 1.5, px: 1 }}
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
                  "&:hover": { backgroundColor: PRIMARY_LIGHT },
                  "&:last-child td": { borderBottom: "none" },
                }}
              >
                <TableCell
                  align="center"
                  sx={{ fontSize: 14, fontWeight: 500, px: 1 }}
                >
                  <FormattedTitle title={item.title} />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#374151",
                    px: 1,
                  }}
                >
                  {item.price1 ? item.price1.toLocaleString("fa-IR") : "---"}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#374151",
                    px: 1,
                  }}
                >
                  {item.price2 ? item.price2.toLocaleString("fa-IR") : "---"}
                </TableCell>
                <TableCell align="center" sx={{ px: 1 }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      color:
                        item.change > 0
                          ? "rgb(5, 58, 0)"
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
}