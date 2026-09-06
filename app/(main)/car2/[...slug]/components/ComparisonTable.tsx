// components/ComparisonTable.tsx
"use client";

import { getItemByIds } from "@/services/Item/ItemByIds";
import { mainDomain } from "@/utils/mainDomain";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { FaCar } from "react-icons/fa";

interface ComparisonTableProps {
  competitorIds: string | undefined;
}

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-root": {
    borderBottom: `2px solid ${theme.palette.divider}`,
    fontWeight: 700,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.grey[50],
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const CarCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  border: `2px solid ${theme.palette.divider}`,
  transition: "all 0.3s ease",
  cursor: "pointer",
  width: "100%",
  "&.active": {
    borderColor: theme.palette.error.main,
    backgroundColor: theme.palette.error.light + "20",
  },
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
  },
}));

export default function ComparisonTable({
  competitorIds,
}: ComparisonTableProps) {
  const [competitors, setCompetitors] = useState<ItemsId[]>([]);
  const isFetched = useRef(false);
  useEffect(() => {
    if (isFetched.current || !competitorIds) return;
    isFetched.current = true;

    const fetchData = async () => {
      try {
        const response = await getItemByIds(competitorIds);
        setCompetitors(response.slice(0, 4));
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [selectedCarIndex, setSelectedCarIndex] = useState<number>(0);

  // تشخیص موبایل در کلاینت
  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia(
      theme.breakpoints.down("md").replace("@media ", ""),
    );
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme.breakpoints]);

  // اگر کامپوننت در سمت سرور هست یا هنوز هیدریت نشده، یک placeholder نمایش بده
  if (!isClient) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm h-full min-h-100">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          minHeight="300px"
        >
          <Typography color="text.secondary">در حال بارگذاری...</Typography>
        </Box>
      </div>
    );
  }

  if (competitors.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm h-full">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          minHeight="300px"
          gap={2}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: theme.palette.grey[100],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaCar size={40} color={theme.palette.grey[400]} />
          </Box>
          <Typography variant="h6" fontWeight="bold" color="text.secondary">
            خودروی رقیبی یافت نشد
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            maxWidth="300px"
          >
            برای این خودرو هنوز رقبایی تعریف نشده است. به زودی این بخش تکمیل
            خواهد شد.
          </Typography>
        </Box>
      </div>
    );
  }

  const idsString = competitors.map((item) => item.id).join(",");

  // گرفتن مشخصات فنی از هر خودرو
  const getTechnicalProperties = (car: ItemsId) => {
    return car.properties.filter((e) => e.isTechnicalProperty).slice(0, 4);
  };

  // گرفتن نام‌های مشخصات (برای هدر ردیف‌ها)
  const getPropertyLabels = () => {
    const firstCar = competitors[0];
    if (!firstCar) return [];
    return getTechnicalProperties(firstCar).map((prop) => prop.title);
  };

  // گرفتن مقادیر مشخصات برای هر خودرو
  const getPropertyValues = (car: ItemsId) => {
    return getTechnicalProperties(car).map((prop) => prop.propertyValue || "-");
  };

  const propertyLabels = getPropertyLabels();

  const handleCarSelect = (index: number) => {
    setSelectedCarIndex(index);
  };

  // ====== رندر دسکتاپ ======
  const DesktopTable = () => (
    <Table>
      <StyledTableHead>
        <TableRow>
          <TableCell width={120} />
          {competitors.map((car) => (
            <TableCell key={car.id} align="center">
              <Link href={car.url || "#"} className="group">
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={1}
                >
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    sx={{ fontSize: "18px" }}
                    className="group-hover:text-[#ce1a2a] duration-300"
                  >
                    {car.sourceName} {car.title}
                  </Typography>
                  <Avatar
                    variant="rounded"
                    src={mainDomain + car.image}
                    alt={`${car.sourceName} ${car.title}`}
                    sx={{
                      width: 80,
                      height: 60,
                      borderRadius: "8px",
                      objectFit: "contain",
                    }}
                    imgProps={{ style: { objectFit: "contain" } }}
                    className="group-hover:scale-105 duration-300"
                  />
                </Box>
              </Link>
            </TableCell>
          ))}
        </TableRow>
      </StyledTableHead>
      <TableBody>
        <StyledTableRow>
          <TableCell>
            <Box display="flex" alignItems="start" gap={1}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight="medium"
                sx={{ whiteSpace: "nowrap" }}
              >
                قیمت بازار(میلیون تومان)
              </Typography>
            </Box>
          </TableCell>

          {competitors.map((car) => {
            return (
              <TableCell key={car.id} align="center">
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ fontSize: "14px" }}
                >
                  {car.amount.toLocaleString()}
                </Typography>
              </TableCell>
            );
          })}
        </StyledTableRow>
        <StyledTableRow>
          <TableCell>
            <Box display="flex" alignItems="start" gap={1}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight="medium"
                sx={{ whiteSpace: "nowrap" }}
              >
                سال تولید
              </Typography>
            </Box>
          </TableCell>

          {competitors.map((car) => {
            return (
              <TableCell key={car.id} align="center">
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ fontSize: "14px" }}
                >
                  {car.publishCode}
                </Typography>
              </TableCell>
            );
          })}
        </StyledTableRow>
        {propertyLabels.map((label, rowIndex) => (
          <StyledTableRow key={label}>
            <TableCell>
              <Box display="flex" alignItems="start" gap={1}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight="medium"
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {label}
                </Typography>
              </Box>
            </TableCell>
            {competitors.map((car, colIndex) => {
              const values = getPropertyValues(car);
              return (
                <TableCell key={car.id} align="center">
                  <Typography
                    variant="body2"
                    fontWeight="semibold"
                    sx={{ fontSize: "11px" }}
                  >
                    {values[rowIndex] || "-"}
                  </Typography>
                </TableCell>
              );
            })}
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );

  // ====== رندر موبایل ======
  const MobileView = () => {
    const currentCar = competitors[selectedCarIndex];
    const properties = getTechnicalProperties(currentCar);

    return (
      <Box>
        {/* انتخابگر خودرو - نمایش در دو ردیف */}
        <Grid container spacing={1.5} sx={{ mb: 2 }}>
          {competitors.map((car, index) => (
            <Grid item xs={6} key={car.id}>
              <CarCard
                className={selectedCarIndex === index ? "active" : ""}
                onClick={() => handleCarSelect(index)}
              >
                <CardContent sx={{ p: 1.5, textAlign: "center" }}>
                  <Avatar
                    variant="rounded"
                    src={mainDomain + car.image}
                    alt={car.title}
                    sx={{
                      width: 60,
                      height: 45,
                      mx: "auto",
                      mb: 0.5,
                      borderRadius: "8px",
                    }}
                    imgProps={{ style: { objectFit: "contain" } }}
                  />
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    fontSize="11px"
                    color={
                      selectedCarIndex === index ? "error" : "text.primary"
                    }
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      lineHeight: 1.2,
                    }}
                  >
                    {car.sourceName} {car.title}
                  </Typography>
                </CardContent>
              </CarCard>
            </Grid>
          ))}
        </Grid>

        {/* نمایش مشخصات خودرو انتخاب شده */}
        <Card variant="outlined" sx={{ borderRadius: "16px" }}>
          <CardContent>
            <Box display="flex" flexDirection="column" gap={0.5}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1.5}
                px={1}
                sx={{
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.grey[50],
                  borderRadius: "8px",
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight="medium"
                  >
                    قیمت بازار(میلیون تومان)
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight="bold">
                  {competitors[selectedCarIndex].amount.toLocaleString()}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1.5}
                px={1}
                sx={{
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  borderRadius: "8px",
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight="medium"
                  >
                    سال تولید
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight="bold">
                  {competitors[selectedCarIndex].publishCode}
                </Typography>
              </Box>

              {properties.map((prop, idx) => (
                <Box
                  key={prop.title}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  py={1.5}
                  px={1}
                  sx={{
                    borderBottom:
                      idx < properties.length - 1
                        ? `1px solid ${theme.palette.divider}`
                        : "none",
                    backgroundColor:
                      idx % 2 === 0 ? theme.palette.grey[50] : "transparent",
                    borderRadius: "8px",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight="medium"
                    >
                      {prop.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="bold">
                    {prop.propertyValue || "-"}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* دکمه مشاهده مقایسه کامل */}
        <Button
          component={Link}
          href={competitors[selectedCarIndex].url}
          fullWidth
          variant="contained"
          color="error"
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: "12px",
            fontWeight: 600,
          }}
        >
          مشاهده جزئیات کامل
        </Button>
      </Box>
    );
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm h-full">
      {/* هدر */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={0}
        mb={0}
      >
        <h2 className="text-xl font-bold text-gray-900">
          <span className="pl-1">مقایسه با </span>
          <strong className="text-red-700">رقبا</strong>
        </h2>
        <Button
          component={Link}
          href={`/compare/${idsString}`}
          size="small"
          sx={{
            color: "#ce1a2a",
            fontWeight: 600,
            "&:hover": { color: "#a40000", bgcolor: "transparent" },
          }}
        >
          مشاهده مقایسه کامل <BiChevronLeft size={20} />
        </Button>
      </Box>

      {/* نمایش جدول یا موبایل */}
      {isMobile ? <MobileView /> : <DesktopTable />}
    </div>
  );
}
