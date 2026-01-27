"use client";

import { getCategory } from "@/services/Category/Category";
import { useState } from "react";
import { FaMotorcycle } from "react-icons/fa";
import { FaCarRear } from "react-icons/fa6";
import SelectCarCompare from "../[...slug]/components/SelectCarCompare";

function SelectType() {
  const [type, setType] = useState<string>("");
  const [brandsCar, setBrandsCar] = useState<ItemsCategory[]>([]);

  const fetchBrands = async (TypeId: number, ParentIdArray: number) => {
    try {
      const brandsCar: ItemsCategory[] = await getCategory({
        TypeId,
        LangCode: "fa",
        ParentIdArray,
        PageIndex: 1,
        PageSize: 200,
      });
      setBrandsCar(brandsCar);
    } catch (err) {}
  };

  if (type) {
    return (
      <>
        <SelectCarCompare dataCompare={[]} brandsCar={brandsCar} ids={""} />
      </>
    );
  } else {
    return (
      <>
        <div className="p-3 flex justify-center items-center sm:flex-nowrap flex-wrap gap-3 w-1/3">
          <div className=" flex justify-center items-center w-1/2">
            <div
              onClick={() => {
                fetchBrands(1042, 6058);
                setType("car");
              }}
              className="cursor-pointer border border-[#0002] shadow-lg duration-300 min-h-20 p-3 rounded-lg flex items-center justify-center flex-col w-full"
            >
              <FaCarRear className="text-3xl" />
              <span>خودرو</span>
            </div>
          </div>
          <div className=" flex justify-center items-center w-1/2">
            <div
              onClick={() => {
                fetchBrands(1052, 6059);
                setType("motor");
              }}
              className="cursor-pointer border border-[#0002] shadow-lg duration-300 min-h-20 p-3 rounded-lg flex items-center justify-center flex-col w-full"
            >
              <FaMotorcycle className="text-3xl" />
              <span> موتور سیکلت</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SelectType;
