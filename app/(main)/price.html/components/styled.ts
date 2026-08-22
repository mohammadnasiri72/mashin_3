import { Card, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PRIMARY_COLOR, PRIMARY_LIGHT } from "./constants";

export const StyledCard = styled(Card)(() => ({
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  borderRadius: "12px",
  overflow: "hidden",
  border: "none",
  marginBottom: "24px",
  "&:hover": {
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
}));

export const BrandHeader = styled(Box)(() => ({
  padding: "12px 16px",
  backgroundColor: PRIMARY_LIGHT,
  borderBottom: `2px solid ${PRIMARY_COLOR}`,
  borderRadius: "8px 8px 0 0",
  marginBottom: "0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const BrandButton = styled(Box, {
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