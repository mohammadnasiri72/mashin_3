"use client";

import { getItem } from "@/services/Item/Item";
import { createpublishCode } from "@/utils/func";
import { Button, Select } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const { Option } = Select;

function SelectCarCompare({
  dataCompare,
  brandsCar,
  ids,
}: {
  dataCompare: ItemsId[];
  brandsCar: ItemsCategory[];
  ids: string;
}) {
  const [firstCarBrand, setFirstCarBrand] = useState<number>(0);
  const [firstModelsCarList, setFirstModelsCarList] = useState<Items[]>([]);
  const [firstCarModel, setFirstCarModel] = useState<number>(0);

  const router = useRouter();

  const fetchModelCars = async () => {
    try {
      const modelsCarResponse: Items[] = await getItem({
        TypeId: brandsCar[0].itemTypeId,
        langCode: "fa",
        CategoryIdArray: String(firstCarBrand),
        PageIndex: 1,
        PageSize: 200,
      });
      setFirstModelsCarList(modelsCarResponse);
    } catch (err) {}
  };

  useEffect(() => {
    if (firstCarBrand > 0) {
      fetchModelCars();
    }
  }, [firstCarBrand]);

  const handleAddCarToCompare = () => {
    if (ids) {
      router.push(`/compare/${ids},${firstCarModel}`);
    } else {
      router.push(`/compare/${firstCarModel}`);
    }
  };

  return (
    <>
      <div
        className={`lg:w-1/3 w-1/2 flex-col gap-2 px-3 ${
          dataCompare.length === 2
            ? "lg:flex hidden"
            : dataCompare.length === 1 || dataCompare.length === 0
              ? "flex"
              : "hidden"
        }`}
      >
        <Select
          aria-label="جستجوی برند..."
          value={firstCarBrand ? firstCarBrand : null}
          onChange={(value) => {
            setFirstCarBrand(value);
            setFirstCarModel(0);
          }}
          className="w-full custom-ant-select"
          size="large"
          placeholder="جستجوی برند..."
          showSearch
          filterOption={(input, option) => {
            if (!option || !option.children) return false;
            return option.children
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase());
          }}
        >
          {brandsCar.length > 0 &&
            brandsCar.map((e) => (
              <Option key={e.id} value={e.id}>
                {e.title}
              </Option>
            ))}
        </Select>
        <Select
        aria-label="جستجوی مدل..."
          disabled={firstCarBrand === 0}
          value={firstCarModel ? firstCarModel : null}
          onChange={(value) => setFirstCarModel(value)}
          className="w-full custom-ant-select"
          size="large"
          placeholder="جستجوی مدل..."
          showSearch
          filterOption={(input, option) => {
            if (!option || !option.children) return false;
            return option.children
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase());
          }}
        >
          {firstModelsCarList.length > 0 &&
            firstModelsCarList.map((e) => (
              <Option key={e.id} value={e.id}>
                {e.title} {createpublishCode(e.publishCode)}
              </Option>
            ))}
        </Select>
        <Button
          disabled={firstCarModel === 0}
          onClick={handleAddCarToCompare}
          size="large"
          type="primary"
        >
          ثبت
        </Button>
      </div>
    </>
  );
}

export default SelectCarCompare;
