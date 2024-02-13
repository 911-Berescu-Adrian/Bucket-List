import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DestinationsPage from "./pages/DestinationsPage";
import AddDestinationPage from "./pages/AddDestinationPage";
import NotFoundPage from "./pages/NotFoundPage";
import UpdateDestinationPage from "./pages/UpdateDestinationPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/add" element={<AddDestinationPage />} />
                <Route path="/update/:id" element={<UpdateDestinationPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default App;
