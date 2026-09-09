import { ContentPageLayout } from "./components/content-page-layout";
import { DEFAULT_CONTENT_DOCUMENTS } from "./content-management.data";

export default function TermsAndConditionPage() {
  return (
    <ContentPageLayout
      initialDocument={DEFAULT_CONTENT_DOCUMENTS["terms-and-condition"]}
    />
  );
}
