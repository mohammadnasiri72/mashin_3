// components/PollModal.tsx
"use client";

import { RootState } from "@/redux/store";
import { PostPollSave } from "@/services/Poll/PollSave";
import { getPollId } from "@/services/Poll/pollId";
import { Toast, toPersianNumbers } from "@/utils/func";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

interface PollModalProps {
  open: boolean;
  onClose: () => void;
  detailsCar: ItemsId;
  onPollUpdate: (newPollData: PollData) => void;
  pollData: PollData;
}

// استایل‌های سفارشی
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    padding: "20px 16px",
    maxWidth: "700px",
    width: "95%",
    margin: "0px",
    [theme.breakpoints.down("sm")]: {
      padding: "16px 12px",
      margin: "4px",
      borderRadius: "12px",
    },
  },
  "& .MuiDialog-container": {
    alignItems: "center",
    justifyContent: "center",
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  zIndex: 9999,
}));

const StyledDialogTitle = styled(DialogTitle)({
  padding: 0,
  marginBottom: "16px",
  "& .MuiTypography-root": {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#1e293b",
  },
});

const StyledDialogContent = styled(DialogContent)({
  padding: 0,
});

// دکمه ترکیبی (عدد + نوار)
const ScoreButtonWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>(({ isActive }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  position: "relative",
  minWidth: 0,
  "&:active": {
    transform: "scale(0.95)",
  },
}));

// عدد گرد با حاشیه - سایز واکنش‌گرا
const NumberCircle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>(({ isActive, theme }) => ({
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.75rem",
  fontWeight: 700,
  border: isActive ? "2px solid #ce1a2a" : "2px solid #d1d5db",
  backgroundColor: isActive ? "#ce1a2a" : "transparent",
  color: isActive ? "#ffffff" : "#9ca3af",
  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: isActive ? "0 4px 12px rgba(206, 26, 42, 0.3)" : "none",
  position: "relative",
  zIndex: 1,
  flexShrink: 0,
  // هاور فقط روی عدد
  "&:hover": {
    borderColor: isActive ? "#ce1a2a" : "#ce1a2a",
    color: isActive ? "#ffffff" : "#ce1a2a",
    backgroundColor: isActive ? "#ce1a2a" : "#fef2f2",
    transform: "scale(1.1)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "20px",
    height: "20px",
    fontSize: "0.6rem",
    borderWidth: "1.5px",
  },
  [theme.breakpoints.down("xs")]: {
    width: "16px",
    height: "16px",
    fontSize: "0.5rem",
    borderWidth: "1px",
  },
}));

const ProgressSegment = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>(({ isActive, theme }) => ({
  width: "100%",
  height: "6px",
  borderRadius: "3px",
  backgroundColor: isActive ? "#ce1a2a" : "#e2e8f0",
  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: isActive ? "0 2px 8px rgba(206, 26, 42, 0.2)" : "none",
  "&:hover": {
    backgroundColor: isActive ? "#ce1a2a" : "#cbd5e1",
    transform: "scaleY(1.3)",
  },
  [theme.breakpoints.down("sm")]: {
    height: "4px",
    borderRadius: "2px",
  },
}));

const ProgressBarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "3px",
  width: "100%",
  padding: "0 1px",
  [theme.breakpoints.down("sm")]: {
    gap: "2px",
  },
}));

// کانتینر اعداد و نوار با هم
const ScoreGroup = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  width: "100%",
});

// ردیف اعداد با فاصله کم‌تر
const NumbersRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "3px",
  justifyContent: "space-between",
  padding: "0 1px",
  [theme.breakpoints.down("sm")]: {
    gap: "1px",
  },
}));

export default function PollModal({
  open,
  onClose,
  detailsCar,
  onPollUpdate,
  pollData,
}: PollModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userRatings, setUserRatings] = useState<{ [key: number]: number }>({});
  const [pollSaveData, setPollSaveData] = useState<PollSaveParam>({
    caseId: detailsCar.id,
    pollScoreDto: [],
  });

  const user = useSelector((state: RootState) => state.user.user);

  // Initialize user ratings when modal opens
  const handleModalOpen = () => {
    const initialRatings: { [key: number]: number } = {};
    pollData.pollDetails.forEach((question) => {
      initialRatings[question.questionId] = 0;
    });
    setUserRatings(initialRatings);
    setPollSaveData({
      caseId: detailsCar.id,
      pollScoreDto: [],
    });
  };

  const handleRatingClick = (questionId: number, score: number) => {
    setPollSaveData((prev) => {
      const existingQuestionIndex = prev.pollScoreDto.findIndex(
        (item) => item.questionId === questionId,
      );

      let newPollScoreDto;

      if (existingQuestionIndex >= 0) {
        newPollScoreDto = [...prev.pollScoreDto];
        newPollScoreDto[existingQuestionIndex] = {
          questionId,
          score,
        };
      } else {
        newPollScoreDto = [...prev.pollScoreDto, { questionId, score }];
      }

      setUserRatings((userPrev) => ({
        ...userPrev,
        [questionId]: score,
      }));

      return {
        caseId: detailsCar.id,
        pollScoreDto: newPollScoreDto,
      };
    });
  };

  const handleSubmitRating = async () => {
    setIsSubmitting(true);
    try {
      await PostPollSave(pollSaveData, user.token);

      // Fetch updated poll data
      const res = await getPollId(Number(detailsCar.id));
      onPollUpdate(res);

      Toast.fire({
        icon: "success",
        title: "نظر شما با موفقیت ثبت شد",
      });

      onClose();
    } catch (error: any) {
      Toast.fire({
        icon: "error",
        title: error?.response?.data || "خطا در ثبت نظرسنجی",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setUserRatings({});
    setPollSaveData({
      caseId: detailsCar.id,
      pollScoreDto: [],
    });
    onClose();
  };

  const isAllRated = pollData.pollDetails.every(
    (question) => userRatings[question.questionId] > 0,
  );

  return (
    <>
      <StyledDialog
        open={open}
        onClose={handleCancel}
        maxWidth="md"
        fullWidth
        scroll="body"
        TransitionProps={{
          onEnter: () => handleModalOpen(),
        }}
        style={{ zIndex: 999999999 }}
      >
        <StyledDialogTitle>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <FaStar style={{ color: "#ce1a2a", fontSize: "20px" }} />
              <Typography variant="h6" fontWeight={700} color="#1e293b">
                ثبت نظر و امتیاز شما
              </Typography>
            </Box>
            <IconButton onClick={handleCancel} size="small">
              <FaTimes />
            </IconButton>
          </Box>
        </StyledDialogTitle>

        <StyledDialogContent>
          <Box py={1}>
            <Box display="flex" flexDirection="column" gap={4}>
              {pollData.pollDetails.map((question) => {
                const currentRating = userRatings[question.questionId] || 0;

                return (
                  <Box key={question.questionId}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        color="#374151"
                      >
                        {question.questionTitle}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        color="#ce1a2a"
                      >
                        {toPersianNumbers(currentRating)}/۱۰
                      </Typography>
                    </Box>

                    {/* دکمه‌های ترکیبی (عدد + نوار) */}
                    <ScoreGroup>
                      {/* ردیف اعداد گرد */}
                      <NumbersRow>
                        {[...Array(10)].map((_, index) => {
                          const score = index + 1;
                          const isActive = score <= currentRating;
                          return (
                            <ScoreButtonWrapper
                              key={score}
                              isActive={isActive}
                              onClick={() =>
                                handleRatingClick(question.questionId, score)
                              }
                              className="score-button"
                            >
                              <NumberCircle
                                isActive={isActive}
                                className="number-label"
                              >
                                {toPersianNumbers(score)}
                              </NumberCircle>
                            </ScoreButtonWrapper>
                          );
                        })}
                      </NumbersRow>

                      {/* نوار پیشرفت */}
                      <ProgressBarContainer>
                        {[...Array(10)].map((_, index) => {
                          const score = index + 1;
                          const isActive = index < currentRating;
                          return (
                            <Box
                              key={index}
                              flex={1}
                              onClick={() =>
                                handleRatingClick(question.questionId, score)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <ProgressSegment
                                isActive={isActive}
                                className="progress-segment"
                              />
                            </Box>
                          );
                        })}
                      </ProgressBarContainer>
                    </ScoreGroup>
                  </Box>
                );
              })}

              <Box pt={2} borderTop="1px solid #e5e7eb">
                <Box display="flex" gap={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmitRating}
                    disabled={isSubmitting || !isAllRated}
                    sx={{
                      backgroundColor: "#ce1a2a",
                      color: "#ffffff",
                      fontWeight: 700,
                      padding: "12px 24px",
                      borderRadius: "12px",
                      "&:hover": {
                        backgroundColor: "#b01625",
                      },
                      "&:disabled": {
                        backgroundColor: "#f1f5f9",
                        color: "#9ca3af",
                      },
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Box
                          component="span"
                          sx={{
                            display: "inline-block",
                            animation: "spin 1s linear infinite",
                            marginRight: "8px",
                          }}
                        >
                          <FaStar />
                        </Box>
                        در حال ثبت...
                      </>
                    ) : (
                      <>
                        <FaStar style={{ marginRight: "8px" }} />
                        ثبت امتیاز
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    sx={{
                      color: "#6b7280",
                      borderColor: "#d1d5db",
                      fontWeight: 700,
                      padding: "12px 24px",
                      borderRadius: "12px",
                      "&:hover": {
                        backgroundColor: "#f3f4f6",
                        borderColor: "#9ca3af",
                      },
                    }}
                  >
                    انصراف
                  </Button>
                </Box>

                {!isAllRated && (
                  <Typography
                    variant="body2"
                    color="#d97706"
                    textAlign="center"
                    mt={1.5}
                  >
                    لطفاً به همه موارد امتیاز دهید
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </StyledDialogContent>
      </StyledDialog>

      {/* افزودن انیمیشن spin به استایل‌های گلوبال */}
      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
