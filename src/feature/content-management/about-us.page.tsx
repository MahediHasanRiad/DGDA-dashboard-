import { ContentPageLayout } from "./components/content-page-layout";
import { DEFAULT_CONTENT_DOCUMENTS } from "./content-management.data";

export default function AboutUsPage() {
  return (
    <ContentPageLayout
      initialDocument={DEFAULT_CONTENT_DOCUMENTS["about-us"]}
    />
  );
}
