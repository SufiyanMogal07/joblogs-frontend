import { toast } from "sonner";

interface ToastMessages {
  loading?: string | React.ReactNode;
  success?: string | React.ReactNode;
  error?: string | React.ReactNode;
}

export const withToast = <T,>(
  promise: Promise<T> | (() => Promise<T>), 
  customMessages: ToastMessages = {}
) => {
  return toast.promise(promise, {
    loading: customMessages.loading || 'Processing request...',
    success: customMessages.success || 'Action completed successfully!',
    error: customMessages.error || 'Something went wrong. Please try again.',
  });
};