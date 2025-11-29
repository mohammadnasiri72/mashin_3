"use client";

import {
  Box,
  Button,
  InputAdornment,
  Slider,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Select } from "antd";
import "antd/dist/reset.css";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import theme from "../theme/theme";
import { toPersianNumbers } from "@/utils/func";



const { Option } = Select;

interface CarSearchData {
  carType: string;
  brand: string;
  model: string;
  minPrice: number;
  maxPrice: number;
}

const CarFinderSection: React.FC = () => {
  const [searchData, setSearchData] = useState<CarSearchData>({
    carType: "type_option-0",
    brand: "type_option-0",
    model: "type_option-0",
    minPrice: 300,
    maxPrice: 7500,
  });

  const [priceRange, setPriceRange] = useState<number[]>([2500, 7500]);

  const carTypes = [
    { value: "type_option-0", label: "همه انواع خودرو" },
    { value: "type_option-1", label: "تست یک" },
    { value: "type_option-2", label: "تست دو" },
  ];

  const brands = [
    { value: "type_option-0", label: "انتخاب برند" },
    { value: "type_option-1", label: "تست یک" },
    { value: "type_option-2", label: "تست دو" },
  ];

  const models = [
    { value: "type_option-0", label: "همه مدل ها" },
    { value: "type_option-1", label: "تست یک" },
    { value: "type_option-2", label: "تست دو" },
  ];

  const handleInputChange = (
    field: keyof CarSearchData,
    value: string | number
  ) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePriceRangeChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    const values = newValue as number[];
    setPriceRange(values);
    setSearchData((prev) => ({
      ...prev,
      minPrice: values[0],
      maxPrice: values[1],
    }));
  };

  const handleSearch = () => {
  
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString("fa-IR");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="section"
        className="findCar_wrap pb-4"
        sx={{
          backgroundColor: "background.paper",
          py: 2,
        }}
      >
        {/* Header Section */}
        <div className="mb-4 mt-3 sm:px-5 px-2 flex sm:flex-row flex-col justify-between items-center">
          <div className="sm:mb-0! mb-5! sm:w-auto w-full p-3 sm:bg-transparent bg-[#ffd6db33] rounded-xl flex sm:justify-start justify-center items-center">
            <div className=" pr-3 ">
              <h3 className="pb-0! mb-0! text-white! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ce1a2a]">
                خودرو یاب
              </h3>
            </div>
          </div>

          <Button
            variant="contained"
            className="searchCar_bt button button-wave-1 sm:w-auto w-full"
            onClick={handleSearch}
            sx={{
              backgroundColor: "#fff",
              color: "#ce1a2a",
              borderRadius: "4px",
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: 600,
              position: "relative",
              overflow: "hidden",
              "&::after": {
                content: '""',
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "5px",
                height: "5px",
                backgroundColor: "#ce1a2a",
                opacity: 0,
                borderRadius: "50%",
                transform: "scale(0, 0) translate(-50%)",
                transformOrigin: "50% 50%",
              },
              "&:hover::after": {
                animation: "wave-1 0.6s ease-out",
              },
              "@keyframes wave-1": {
                "0%": {
                  transform: "scale(0, 0)",
                  opacity: 0.5,
                },
                "100%": {
                  transform: "scale(20, 20)",
                  opacity: 0,
                },
              },
            }}
          >
            <IoSearch />
            <span className="pr-2">جستجو خودرو</span>
          </Button>
        </div>

        {/* Search Form */}
        <div className="flex items-center flex-wrap sm:px-4 px-1">
          <div className="lg:w-1/5 sm:w-1/3 w-full px-1">
            <Select
              value={searchData.carType}
              onChange={(value) => handleInputChange("carType", value)}
              className="dropdown_main"
              style={{ width: "100%" }}
              size="large"
            >
              {carTypes.map((type) => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className="lg:w-1/5 sm:w-1/3 w-full px-1 mt-3 sm:mt-0">
            <Select
              value={searchData.model}
              onChange={(value) => handleInputChange("model", value)}
              className="dropdown_main"
              style={{ width: "100%" }}
              size="large"
            >
              {models.map((model) => (
                <Option key={model.value} value={model.value}>
                  {model.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className="lg:w-1/5 sm:w-1/3 w-full px-1 mt-3 sm:mt-0">
            <Select
              value={searchData.model}
              onChange={(value) => handleInputChange("model", value)}
              className="dropdown_main"
              style={{ width: "100%" }}
              size="large"
            >
              {models.map((model) => (
                <Option key={model.value} value={model.value}>
                  {model.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className="lg:w-1/5 sm:w-1/2 w-full px-1 mt-3 lg:mt-0">
            <TextField
              disabled
              value={toPersianNumbers(searchData.minPrice)}
              className="price-input"
              fullWidth
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="body2" color="textSecondary">
                        قیمت از
                      </Typography>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="body2" color="textSecondary">
                        میلیون تومان
                      </Typography>
                    </InputAdornment>
                  ),
                  style: {
                    textAlign: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#f4f4f4",
                  borderRadius: "4px",
                  textAlign: "center",
                },
                "& .MuiInputBase-input": {
                  textAlign: "center",
                  justifyContent: "center",
                },
                "& .MuiOutlinedInput-input": {
                  textAlign: "center",
                },
                "& .Mui-disabled": {
                  "& .MuiInputBase-input": {
                    WebkitTextFillColor: "#ce1a2a !important",
                  },
                },
              }}
            />
          </div>
          <div className="lg:w-1/5 sm:w-1/2 w-full px-1 mt-3 lg:mt-0">
            <TextField
              disabled
              value={toPersianNumbers(searchData.maxPrice)}
              className="price-input"
              fullWidth
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="body2" color="textSecondary">
                        قیمت تا
                      </Typography>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="body2" color="textSecondary">
                        میلیون تومان
                      </Typography>
                    </InputAdornment>
                  ),
                  style: {
                    textAlign: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#f4f4f4",
                  borderRadius: "4px",
                  textAlign: "center",
                },
                "& .MuiInputBase-input": {
                  textAlign: "center",
                  justifyContent: "center",
                },
                "& .MuiOutlinedInput-input": {
                  textAlign: "center",
                },
                "& .Mui-disabled": {
                  "& .MuiInputBase-input": {
                    WebkitTextFillColor: "#ce1a2a !important",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between px-5 sm:mt-10 mt-5">
          <div className="lg:w-2/3 sm:w-1/2 w-full">
            <Typography
              variant="h4"
              component="h4"
              className="search_title"
              sx={{
                color: "white",
                fontSize: "17px",
                fontWeight: "bold",
              }}
            >
              Mercedes-Benz G-Class
            </Typography>
          </div>
          <div className="lg:w-1/3 sm:w-1/2 w-full sm:mt-0 mt-8">
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPrice}
              min={100}
              max={10000}
              step={10}
              sx={{
                color: "#ce1a2a",
                "& .MuiSlider-track": {
                  backgroundColor: "#ce1a2a",
                },
                "& .MuiSlider-thumb": {
                  backgroundColor: "#ce1a2a",
                  "&:hover": {
                    backgroundColor: "#a0151e",
                  },
                },
                "& .MuiSlider-valueLabel": {
                  backgroundColor: "#ce1a2a",
                },
              }}
            />
          </div>
        </div>

        <style jsx global>{`
          .findCar_wrap {
            background-image: url(../images/gallery/bg_1.png);
          }

          .ant-select {
            width: 100%;
          }

          .ant-select-selector {
            background-color: #f4f4f4 !important;
            border: none !important;
            border-radius: 4px !important;
            height: 40px !important;
            display: flex !important;
            align-items: center !important;
          }

          .ant-select-selection-item {
            font-weight: 600 !important;
            color: #747474 !important;
          }
        `}</style>
      </Box>
    </ThemeProvider>
  );
};

export default CarFinderSection;
