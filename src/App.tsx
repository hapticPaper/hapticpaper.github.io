import { Route, Routes } from "react-router-dom";

import { SiteLayout } from "@/components/SiteLayout";
import { CvPage } from "@/pages/CvPage";
import { EngulfingFlowPage } from "@/pages/EngulfingFlowPage";
import { GeneratedPage } from "@/pages/GeneratedPage";
import { HomePage } from "@/pages/HomePage";
import { MeteorStrikesPage } from "@/pages/MeteorStrikesPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProjectPage } from "@/pages/ProjectPage";
import { ProjectsPage } from "@/pages/ProjectsPage";

export function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generated" element={<GeneratedPage />} />
        <Route path="/generated/engulfing-flow" element={<EngulfingFlowPage />} />
        <Route path="/generated/meteor-strikes" element={<MeteorStrikesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/cv" element={<CvPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  );
}
