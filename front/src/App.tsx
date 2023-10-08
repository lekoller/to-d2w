import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, SpinProvider } from "./contexts";
import { Home, Entrance } from "./pages";

function App() {
  return (
    <AuthProvider>
      <SpinProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<Entrance />} />
          </Routes>
        </BrowserRouter>
      </SpinProvider>
    </AuthProvider>
  );
}

export default App;
