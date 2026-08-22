"use client";

import { SearchOutlined } from "@ant-design/icons";
import {
  Box,
  InputAdornment,
  TextField,
  CircularProgress,
} from "@mui/material";
import { PRIMARY_COLOR } from "./constants";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  isLoading: boolean;
}

export default function SearchBox({
  value,
  onChange,
  isLoading,
}: SearchBoxProps) {
  return (
    <Box sx={{ mb: 3, maxWidth: "600px", mx: "auto" }}>
      <TextField
        fullWidth
        placeholder="جستجو در برند و مدل ..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
              {isLoading ? (
                <CircularProgress size={20} sx={{ color: PRIMARY_COLOR }} />
              ) : (
                <SearchOutlined style={{ color: "#9ca3af" }} />
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}