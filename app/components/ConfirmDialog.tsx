// app/components/ConfirmDialog.tsx
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Slide,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

// انیمیشن اسلاید به بالا
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// استایل کاغذ دیالوگ (کادر سفید)
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 24,
  padding: theme.spacing(1),
  maxWidth: 400,
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
  overflow: "hidden",
  position: "relative",
  backdropFilter: "blur(4px)",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  transition: "all 0.3s ease-in-out",
}));

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "تأیید حذف",
  message = "آیا از حذف این آیتم اطمینان دارید؟",
  confirmText = "حذف",
  cancelText = "انصراف",
  loading = false,
}) => {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      dir="rtl"
      PaperComponent={StyledPaper}
      // استایل backdrop (پس‌زمینه)
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s ease",
          },
        },
      }}
      // انیمیشن باز و بسته
      transitionDuration={300}
    >
      {/* دکمه بسته (اختیاری) */}
      {/* <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', left: 12, top: 12 }}
      >
        <HiOutlineX />
      </IconButton> */}

      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1.25rem",
          pb: 1,
          pt: 2,
          color: "#1e293b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <HiOutlineExclamationCircle className="text-red-500 w-6 h-6" />
        {title}
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 1 }}>
        <DialogContentText
          sx={{
            textAlign: "center",
            color: "#475569",
            fontSize: "0.95rem",
            lineHeight: 1.6,
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          gap: 2,
          pb: 3,
          pt: 1,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={loading}
          sx={{
            minWidth: 110,
            borderRadius: 28,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.9rem",
            borderColor: "#e2e8f0",
            color: "#475569",
            "&:hover": {
              borderColor: "#cbd5e1",
              backgroundColor: "#f8fafc",
            },
          }}
        >
          {cancelText}
        </Button>

        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={18} color="inherit" /> : undefined
          }
          sx={{
            minWidth: 110,
            borderRadius: 28,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.9rem",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 8px 16px rgba(239, 68, 68, 0.25)",
            },
          }}
        >
          {loading ? "در حال حذف..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
