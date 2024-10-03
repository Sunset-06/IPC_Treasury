import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage"
import ArticlePage from "./pages/ArticlePage"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SearchPage />} />
        <Route path="/art/:no" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;