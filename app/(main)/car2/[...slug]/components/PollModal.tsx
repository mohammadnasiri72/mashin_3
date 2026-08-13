// components/PollModal.tsx
"use client";

import ModalLogin from "@/app/components/ModalLogin";
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
  LinearProgress,
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
    padding: "24px",
    maxWidth: "700px",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: "16px",
      margin: "16px",
    },
  },
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

const ScoreButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected?: boolean }>(({ isSelected }) => ({
  minWidth: "32px",
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  fontSize: "0.875rem",
  fontWeight: 700,
  padding: 0,
  backgroundColor: isSelected ? "#ce1a2a" : "#f1f5f9",
  color: isSelected ? "#ffffff" : "#9ca3af",
  "&:hover": {
    backgroundColor: isSelected ? "#b01625" : "#e2e8f0",
  },
}));

const ProgressBar = styled(Box)({
  display: "flex",
  gap: "4px",
  marginTop: "4px",
});

const ProgressSegment = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFilled",
})<{ isFilled?: boolean }>(({ isFilled }) => ({
  flex: 1,
  height: "8px",
  borderRadius: "4px",
  backgroundColor: isFilled ? "#ce1a2a" : "#e2e8f0",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  "&:hover": {
    opacity: 0.8,
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
      >
        <StyledDialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
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
              {pollData.pollDetails.map((question) => (
                <Box key={question.questionId}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Typography variant="body2" fontWeight={500} color="#374151">
                      {question.questionTitle}
                    </Typography>
                    <Typography variant="body2" fontWeight={700} color="#ce1a2a">
                      {userRatings[question.questionId] > 0
                        ? toPersianNumbers(userRatings[question.questionId])
                        : "۰"}
                      /۱۰
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    flexDirection={isMobile ? "column" : "row"}
                    alignItems={isMobile ? "flex-start" : "center"}
                    gap={1}
                  >
                    <Box display="flex" gap={0.5} flexWrap="wrap">
                      {[...Array(10)].map((_, index) => {
                        const score = index + 1;
                        return (
                          <ScoreButton
                            key={score}
                            isSelected={score <= userRatings[question.questionId]}
                            onClick={() =>
                              handleRatingClick(question.questionId, score)
                            }
                            size="small"
                          >
                            {toPersianNumbers(score)}
                          </ScoreButton>
                        );
                      })}
                    </Box>
                  </Box>

                  <ProgressBar>
                    {[...Array(10)].map((_, i) => {
                      const score = i + 1;
                      return (
                        <ProgressSegment
                          key={i}
                          isFilled={i < userRatings[question.questionId]}
                          onClick={() =>
                            handleRatingClick(question.questionId, score)
                          }
                        />
                      );
                    })}
                  </ProgressBar>
                </Box>
              ))}

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