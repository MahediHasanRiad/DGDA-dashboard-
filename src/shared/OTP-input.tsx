"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { RefreshCwIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { getErrorMessage } from "./try-catch-error-message";
import { useResendOTPMutation, useVerifyEmployeeEmailMutation } from "../feature/company/employee/redux/employee.redux";

interface InputOTPDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  employeeEmail?: string;
  onVerify?: (otp: string) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
}

interface FormValues {
  otp: string;
}

export function InputOTPDialog({
  open,
  onOpenChange,
  employeeEmail = "m@example.com",
  onVerify,
}: InputOTPDialogProps) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      otp: "",
    },
  });

  const [verifyEmployeeEmail, { isLoading }] = useVerifyEmployeeEmailMutation();
  const [resendOTP] = useResendOTPMutation();

  // Clear form state when dialog opens or closes
  React.useEffect(() => {
    if (!open) {
      reset({ otp: "" });
    }
  }, [open, reset]);

  const otpValue = watch("otp");
  const isBusy = isSubmitting || isLoading;

  // verify email
  const onSubmit = async (data: FormValues) => {
    if (data.otp.length !== 6) return;
    try {
      await verifyEmployeeEmail({
        otp: data.otp,
        email: employeeEmail,
      }).unwrap();

      toast.success("Email verified successfully!");
      await onVerify?.(data.otp);
      onOpenChange?.(false); // Close dialog on success
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message || "Failed to verify OTP.");
    }
  };

  // resend OTP
  const resendOTPHandler = async () => {
    try {
        await resendOTP({ email: employeeEmail }).unwrap();
        toast.success('Send OTP !')
    } catch (error) {
        const message = getErrorMessage(error);
        toast.error(message || "Failed to resend OTP.");
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-bg-primary-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Verify your Email</DialogTitle>
          </DialogHeader>

          <Field className="space-y-3">
            <div className="flex items-center justify-between">
              <FieldLabel
                htmlFor="otp-verification"
                className="text-xs font-semibold text-text-primary-0"
              >
                Verification code
              </FieldLabel>
              <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={resendOTPHandler}
                disabled={isBusy}
              >
                <RefreshCwIcon className="size-3 mr-1" />
                Resend Code
              </Button>
            </div>

            <div className="flex justify-center flex-col my-10 items-center">
              <Controller
                name="otp"
                control={control}
                rules={{
                  required: "OTP is required",
                  minLength: {
                    value: 6,
                    message: "Please enter all 6 digits",
                  },
                }}
                render={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    id="otp-verification"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isBusy}
                  >
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator className="mx-2" />
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />

              {errors.otp && (
                <p className="text-xs text-red-400 mt-2">
                  {errors.otp.message}
                </p>
              )}
            </div>
          </Field>

          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full bg-primary-0 hover:bg-primary-0/90 text-white font-semibold rounded-lg transition-colors shadow-md"
              disabled={!otpValue || otpValue.length < 6 || isBusy}
            >
              {isBusy ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}