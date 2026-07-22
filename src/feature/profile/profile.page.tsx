import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Camera } from "lucide-react";

interface ProfileFormValues {
  avatar: File | null;
  fullName: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export default function ProfilePage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      avatar: null,
      fullName: "Jane Cooper",
      email: "vuhaithuongnute@gmail.com",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = watch("newPassword");

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      console.log("Updated Profile Data:", data);
      // Note: If you need to send `data.avatar` (File object) to a backend server, 
      // you would use FormData: const formData = new FormData(); formData.append('avatar', data.avatar);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Changes saved successfully!");
    } catch (error) {
      toast.error("Failed to update profile settings.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#0c1614]">
      <div className="w-full max-w-xl bg-[#172522] border border-[#223632] rounded-2xl p-8 shadow-2xl text-white select-none">
        
        {/* Profile Avatar Header with Upload Trigger */}
        <Controller
          name="avatar"
          control={control}
          render={({ field: { onChange, value, ...fieldRef } }) => (
            <div className="flex flex-col items-center justify-center mb-8 gap-3">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={(e) => {
                  fileInputRef.current = e;
                  fieldRef.ref(e); // Connect React Hook Form internal tracking ref
                }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onChange(file); // Update standard state values inside form context
                    setPreviewUrl(URL.createObjectURL(file)); // Generate browser local canvas source link
                  }
                }}
              />

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative group cursor-pointer"
              >
                <Avatar className="h-24 w-24 border-4 border-[#223632] shadow-md transition-transform group-hover:scale-105 duration-200">
                  <AvatarImage 
                    src={previewUrl || "/avatars/admin-avatar.jpg"} 
                    alt="Admin Avatar" 
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-red-500 text-white text-2xl font-bold">
                    AD
                  </AvatarFallback>
                </Avatar>

                {/* Hover Mask HUD */}
                <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-4 border-transparent">
                  <Camera className="w-5 h-5 text-white" />
                  <span className="text-[10px] text-slate-300 font-semibold tracking-wide">Change</span>
                </div>
              </div>
              
              <h2 className="text-xl font-bold tracking-tight text-white">Admin</h2>
            </div>
          )}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Section 1: Personal & Account Details */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-200 border-b border-[#223632] pb-1.5">
              Personal & Account Details
            </h3>

            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-xs font-semibold text-slate-300">
                Full name
              </Label>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="fullName"
                    className={`h-11 bg-[#1c2e2a] border-[#2d4741] text-white focus-visible:ring-[#00e5bc] text-sm ${
                      errors.fullName ? "border-red-500 focus-visible:ring-red-500/20" : ""
                    }`}
                  />
                )}
              />
              {errors.fullName && (
                <p className="text-xs text-red-400">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-slate-300">
                E-mail
              </Label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email structure",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    className={`h-11 bg-[#1c2e2a] border-[#2d4741] text-white focus-visible:ring-[#00e5bc] text-sm ${
                      errors.email ? "border-red-500 focus-visible:ring-red-500/20" : ""
                    }`}
                  />
                )}
              />
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Section 2: Log in credential */}
          <div className="space-y-4 pt-2">
            <h3 className="text-base font-bold text-slate-200 border-b border-[#223632] pb-1.5">
              Log in cradential
            </h3>

            <div className="space-y-1.5">
              <Label htmlFor="oldPassword" className="text-xs font-semibold text-slate-300">
                Old Password
              </Label>
              <Controller
                name="oldPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="oldPassword"
                    type="password"
                    placeholder="••••••••"
                    className="h-11 bg-[#1c2e2a] border-[#2d4741] text-white focus-visible:ring-[#00e5bc] text-sm"
                  />
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="newPassword" className="text-xs font-semibold text-slate-300">
                New Password
              </Label>
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    className="h-11 bg-[#1c2e2a] border-[#2d4741] text-white focus-visible:ring-[#00e5bc] text-sm"
                  />
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-xs font-semibold text-slate-300">
                Confirm Password
              </Label>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  validate: (val) => {
                    if (newPasswordValue && val !== newPasswordValue) {
                      return "Passwords do not match";
                    }
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className={`h-11 bg-[#1c2e2a] border-[#2d4741] text-white focus-visible:ring-[#00e5bc] text-sm ${
                      errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500/20" : ""
                    }`}
                  />
                )}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Action Buttons Footer Area */}
          <div className="flex items-center gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="h-11 px-6 bg-white hover:bg-slate-100 text-slate-950 font-semibold rounded-lg transition-colors border-none"
              onClick={() => window.history.back()}
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 px-6 bg-[#00e5bc] hover:bg-[#00cba6] text-slate-950 font-semibold rounded-lg transition-colors shadow-md"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}