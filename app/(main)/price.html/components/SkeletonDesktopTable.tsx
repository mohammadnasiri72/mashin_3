"use client";

import { Box, Chip, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { PRIMARY_COLOR } from "./constants";
import { BrandHeader, StyledCard } from "./styled";

interface SkeletonDesktopTableProps {
  rows?: number;
}

export default function SkeletonDesktopTable({ rows = 5 }: SkeletonDesktopTableProps) {
  return (
    <StyledCard>
      <BrandHeader>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="text" width={120} height={24} />
        </Box>
        <Skeleton variant="rounded" width={60} height={24} />
      </BrandHeader>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 0, overflowX: "auto" }}>
        <Table size="small" sx={{ tableLayout: "fixed", width: "100%", minWidth: "700px" }}>
          <colgroup>
            <col style={{ width: "35%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "21%" }} />
          </colgroup>

          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8fafc" }}>
              <TableCell align="center" sx={{ fontWeight: 600, fontSize: 14, py: 1.5, px: 1 }}>
                <Skeleton variant="text" width={60} height={20} sx={{ mx: "auto" }} />
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, fontSize: 14, py: 1.5, px: 1 }}>
                <Skeleton variant="text" width={100} height={20} sx={{ mx: "auto" }} />
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, fontSize: 14, py: 1.5, px: 1 }}>
                <Skeleton variant="text" width={100} height={20} sx={{ mx: "auto" }} />
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, fontSize: 14, py: 1.5, px: 1 }}>
                <Skeleton variant="text" width={80} height={20} sx={{ mx: "auto" }} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: rows }).map((_, index) => (
              <TableRow key={index}>
                <TableCell align="center" sx={{ px: 1 }}>
                  <Skeleton variant="text" width={100} height={20} sx={{ mx: "auto" }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 1 }}>
                  <Skeleton variant="text" width={80} height={24} sx={{ mx: "auto" }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 1 }}>
                  <Skeleton variant="text" width={80} height={24} sx={{ mx: "auto" }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 1 }}>
                  <Skeleton variant="text" width={60} height={20} sx={{ mx: "auto" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledCard>
  );
}