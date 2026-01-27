"use client";

import { getCategory } from "@/services/Category/Category";
import { Box, Button, ThemeProvider } from "@mui/material";
import { Select } from "antd";
import "antd/dist/reset.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import theme from "../theme/theme";

const { Option } = Select;

const CarFinderSection = ({
  brands,
  segmentCars,
}: {
  brands: ItemsCategory[];
  segmentCars: Items[];
}) => {
  const [brand, setBrand] = useState<number | null>(null);
  const [models, setModels] = useState<ItemsCategory[]>([]);
  const [model, setModel] = useState<number | null>(null);
  const [type, setType] = useState<number | null>(0);

  const typeCar = segmentCars.find((e) => e.id === Number(type));

  const router = useRouter();

  const fetchModelCars = async (id: number | null) => {
    setModel(0);
    try {
      const modelsCarResponse: ItemsCategory[] = await getCategory({
        TypeId: 1042,
        LangCode: "fa",
        ParentIdArray: Number(id),
        PageIndex: 1,
        PageSize: 200,
      });
      setModels(modelsCarResponse);
    } catch (err) {}
  };

  useEffect(() => {
    if (brand) {
      fetchModelCars(brand);
    }
  }, [brand]);

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
        </div>

        {/* Search Form */}
        <div className="flex justify-between items-center w-full px-5">
          <div className="flex items-center flex-wrap sm:px-4 px-1 w-full">
            <div className="lg:w-1/5 sm:w-1/3 w-full px-1">
              <Select
                aria-label="select brand"
                placeholder="جستجوی برند..."
                value={brand}
                onChange={(value) => setBrand(value)}
                className="dropdown_main"
                style={{ width: "100%" }}
                size="large"
              >
                {brands.length > 0 &&
                  brands.map((e) => (
                    <Option key={e.id} value={e.id}>
                      {e.title}
                    </Option>
                  ))}
              </Select>
            </div>
            <div className="lg:w-1/5 sm:w-1/3 w-full px-1 mt-3 sm:mt-0">
              <Select
                aria-label="select model"
                disabled={!brand}
                placeholder="جستجوی مدل..."
                value={model}
                onChange={(value) => setModel(value)}
                className="dropdown_main"
                style={{ width: "100%" }}
                size="large"
              >
                <Option value={0}>همه مدل‌ها</Option>
                {models.length > 0 &&
                  models.map((e) => (
                    <Option key={e.id} value={e.id}>
                      {e.title}
                    </Option>
                  ))}
              </Select>
            </div>
            <div className="lg:w-1/5 sm:w-1/3 w-full px-1 mt-3 sm:mt-0">
              <Select
                aria-label="select type"
                placeholder="نوع خودرو..."
                value={type}
                onChange={(value) => setType(value)}
                className="dropdown_main"
                style={{ width: "100%" }}
                size="large"
              >
                <Option value={0}>همه نوع ها</Option>
                {segmentCars.length > 0 &&
                  segmentCars.map((e) => (
                    <Option key={e.id} value={e.id}>
                      {e.title}
                    </Option>
                  ))}
              </Select>
            </div>
          </div>

          <Button
            disabled={!brand}
            variant="contained"
            className="searchCar_bt button button-wave-1 sm:w-auto w-full"
            onClick={() => {
              router.push(
                typeCar
                  ? `searchcars?id=${model !== 0 ? model : brand}&type=${
                      typeCar.id
                    }`
                  : `searchcars?id=${model !== 0 ? model : brand}`
              );
            }}
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
            <span>
              <IoSearch />
            </span>
            <span className="pr-2 whitespace-nowrap">جستجو خودرو</span>
          </Button>
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
            color: #000 !important;
          }
        `}</style>
      </Box>
    </ThemeProvider>
  );
};

export default CarFinderSection;
