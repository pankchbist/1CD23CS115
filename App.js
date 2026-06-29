import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notifications from "./pages/Notifications";
import PriorityNotifications from "./pages/PriorityNotifications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Notifications />} />
        <Route path="/priority" element={<PriorityNotifications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;