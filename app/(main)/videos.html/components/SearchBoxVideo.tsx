"use client";

import { Button, Input, Space } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBoxVideo() {
  const [term, setTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("term", term.toString());
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="w-full">
      <Space.Compact style={{ width: "100%" }}>
        <Input
          placeholder="جستجو در فیلم های ماشین 3"
          size="large"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          onPressEnter={handleSearch} // اضافه کردن این خط
        />
        <Button 
          aria-label="جستجو"
          type="primary"
          size="large"
          onClick={handleSearch}
          style={{ backgroundColor: "#ce1a2a", borderColor: "#ce1a2a" }}
        >
          <FaSearch />
        </Button>
      </Space.Compact>
    </div>
  );
}

export default SearchBoxVideo;
