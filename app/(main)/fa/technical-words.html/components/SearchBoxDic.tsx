"use client";

import { Button, Input, Space } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBoxDic() {
  const [term, setTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const termSearchparams = searchParams.get("term");
  useEffect(() => {
    if (termSearchparams) {
      setTerm(termSearchparams);
    }
  }, [termSearchparams]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("term", term.toString());
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="w-full mb-5!">
      <Space.Compact style={{ width: "100%" }}>
        <Input
          placeholder="جستجو در واژگان فنی"
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

export default SearchBoxDic;
