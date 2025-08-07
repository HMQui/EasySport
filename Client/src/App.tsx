import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "@/components/LayOut";
import { Home } from "@/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Admin routes */}
        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
