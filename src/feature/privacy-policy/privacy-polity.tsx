import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import ContentEditor from "./components/content-editor";
import { Button } from "@/components/ui/button";
import { type PrivacyType } from "./components/drop-down";
import { useEffect, useState } from "react";
import {
  useAllSiteContentQuery,
  useUpdateSiteContentMutation,
} from "./redux/privacy-policy.redux";
import { toast } from "sonner";
import FilterBtn from "./components/filter-button";

export interface SiteContentSchema {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const siteContent = [{title: 'Privacy Policy', content: ''}, {title: 'Side Content', content: ''},{title: 'Map', content: ''}]

function PrivacyPolicyPage() {

  const [selectContentValue, setSelectContentValue] = useState('Privacy Policy');

  const { control, handleSubmit, setValue } = useForm();

  const submitHandler: SubmitHandler<any> = async (d) => {
    try {
      toast.success("Successfully update");
    } catch (error) {
      console.log(error);
    }
  };

  // select drop down item ---------------- fileterd

  // const selectContent = (d: PrivacyType) => {
  //   const matchedContent = siteContent.find(
  //     (content: any) => content.title === d,
  //   );

  //   if (matchedContent) {
  //     setSelectContentValue(matchedContent);
  //     setValue("description", matchedContent.content);
  //   }

  //   setFilterValue(d);
  // };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center my-2">
        <h1 className="text-2xl md:text-4xl mb-4">
          {/* {selectContentValue?.title}  */}
          new
        </h1>
        <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-wrap items-center gap-3 sm:gap-4">
          <FilterBtn
            text="Privacy Policy"
            value="Privacy Policy"
            statusHandler={() => {}}
            filter={""}
          />
          <FilterBtn
            text="Cookie Policy"
            value="Cookie Policy"
            statusHandler={() => {}}
            filter={""}
          />
          <FilterBtn
            text="Terms & Conditions"
            value="Terms & Conditions"
            statusHandler={() => {}}
            filter={""}
          />
        </div>
      </div>
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
            className="bg-primary-0 lg:text-xl md:text-lg text-md text-white mt-4 p-6 rounded float-right"
            type="submit"
          >
            {/* {updating ? "Updating..." : "Update"} */}
            update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PrivacyPolicyPage;
