import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ContentEditor from "@/feature/privacy-policy/components/content-editor";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import {
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
} from "../feature/privacy-policy/redux/privacy-policy.redux";

export interface SiteContentSchema {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SideContentType {
  title: string;
  content?: string;
}

interface FormValues {
  description: string;
}

function AboutUsContent({ title }: SideContentType) {
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.user?.role === "ADMIN";

  const [selectContentValue] = useState("Privacy Policy");

  // Fetch Privacy Policy Data
  const { data: aboutUs, isLoading: isFetching } = useGetAboutUsQuery({});
  
  // RTK Query Mutation Hook
  const [updateaboutUs, { isLoading: isUpdating }] = useUpdateAboutUsMutation();

  // Safely extract HTML content string depending on API wrapper response shape
  const fetchedContent = aboutUs?.data?.content || aboutUs?.content || "";

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      description: fetchedContent,
    },
  });

  // Sync form value whenever query data finishes loading
  useEffect(() => {
    if (fetchedContent) {
      reset({ description: fetchedContent });
    }
  }, [fetchedContent, reset]);

  const submitHandler: SubmitHandler<FormValues> = async (formData) => {
    try {
      await updateaboutUs({
        title: title || selectContentValue,
        content: formData.description,
      }).unwrap();

      toast.success("Successfully updated!");
    } catch (error: any) {
      console.error("Update error:", error);
      const errorMessage =
        error?.data?.message || error?.message || "Failed to update.";
      toast.error(errorMessage);
    }
  };

  if (isFetching) {
    return <div className="p-6 text-slate-500">Loading privacy policy...</div>;
  }

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center my-2">
          <h1 className="text-2xl md:text-4xl mb-4 text-text-primary-0 font-bold">
            {title}
          </h1>

          {isAdmin && (
            <Button
              className="bg-primary-0 lg:text-xl md:text-lg text-md text-white mt-4 p-6 rounded"
              type="submit"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          )}
        </div>

        <div className="mt-10">
          {isAdmin ? (
            <div>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <ContentEditor
                    key={selectContentValue}
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg">
              <div
                className="prose max-w-none text-text-primary-0 ql-editor"
                dangerouslySetInnerHTML={{ __html: fetchedContent }}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default AboutUsContent;