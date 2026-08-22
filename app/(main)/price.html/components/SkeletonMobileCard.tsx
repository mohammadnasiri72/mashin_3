"use client";

import { Box, CardContent, Skeleton, Stack } from "@mui/material";
import { PRIMARY_LIGHT } from "./constants";
import { StyledCard } from "./styled";

interface SkeletonMobileCardProps {
  count?: number;
}

export default function SkeletonMobileCard({ count = 3 }: SkeletonMobileCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <StyledCard key={index}>
          <CardContent sx={{ p: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 1.5,
                pb: 1,
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <Skeleton variant="circular" width={36} height={36} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Skeleton variant="text" width="70%" height={20} />
                <Skeleton variant="text" width="40%" height={16} sx={{ mt: 0.5 }} />
              </Box>
              <Skeleton variant="rounded" width={50} height={20} />
            </Box>

            <Stack spacing={1.5}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: PRIMARY_LIGHT,
                  padding: "6px 12px",
                  borderRadius: "6px",
                }}
              >
                <Skeleton variant="text" width={60} height={16} />
                <Skeleton variant="text" width={80} height={20} />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#f8fafc",
                  padding: "6px 12px",
                  borderRadius: "6px",
                }}
              >
                <Skeleton variant="text" width={60} height={16} />
                <Skeleton variant="text" width={80} height={20} />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 0.5,
                }}
              >
                <Skeleton variant="text" width={60} height={16} />
                <Skeleton variant="text" width={50} height={16} />
              </Box>
            </Stack>
          </CardContent>
        </StyledCard>
      ))}
    </>
  );
}