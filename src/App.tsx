import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AuthGuard from "./guards/AuthGuard";
import Assets from "./pages/Assets";
import Trade from "./pages/Trade";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Assets />} />
        <Route element={<AuthGuard />}>
          <Route path="/trade" element={<Trade />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
