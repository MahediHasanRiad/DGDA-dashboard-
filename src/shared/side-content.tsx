import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import ContentEditor from "@/feature/privacy-policy/components/content-editor";

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
  content?: any;
}

function SideContentPage({ title, content }: SideContentType) {
  // Store the active title string
  const [selectContentValue, _setSelectContentValue] =
    useState("Privacy Policy");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      description: "", // Seed initial content
    },
  });

  const submitHandler: SubmitHandler<any> = async (d) => {
    try {
      console.log("Submitting updated description:", d.description);
      toast.success("Successfully updated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center my-2">
        <h1 className="text-2xl md:text-4xl mb-4 text-text-primary-0 font-bold">
          {title}
        </h1>
        <Button
          className="bg-primary-0 lg:text-xl md:text-lg text-md text-black mt-4 p-6 rounded float-right"
          type="submit"
        >
          Update
        </Button>
      </div>

      <div className="mt-10">
        <form onSubmit={handleSubmit(submitHandler)}>
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
            <Button
              className="bg-bg-primary-0 lg:text-xl md:text-lg text-md text-black mt-4 p-6 rounded float-right"
              type="submit"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SideContentPage;
