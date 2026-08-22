"use client";

import { Box, CardContent, Skeleton, Stack } from "@mui/material";
import { StyledCard } from "./styled";

interface SkeletonBrandAccordionProps {
  count?: number;
}

export default function SkeletonBrandAccordion({ count = 3 }: SkeletonBrandAccordionProps) {
  return (
    <Stack spacing={2}>
      {Array.from({ length: count }).map((_, index) => (
        <StyledCard key={index}>
          <CardContent sx={{ py: 2, px: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" width={120} height={28} />
              </Box>
              <Skeleton variant="rounded" width={100} height={32} />
            </Box>
          </CardContent>
        </StyledCard>
      ))}
    </Stack>
  );
}