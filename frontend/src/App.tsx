import "./App.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DestinationsPage from "./pages/DestinationsPage";
import AddDestinationPage from "./pages/AddDestinationPage";
import NotFoundPage from "./pages/NotFoundPage";
import UpdateDestinationPage from "./pages/UpdateDestinationPage";
import Navbar from "./components/Navbar";
import { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useLoginStore } from "./store/LoginStore";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

function App() {
    const { isLogged } = useLoginStore();
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route
                        path="/destinations"
                        element={
                            isLogged ? (
                                <Layout>
                                    <DestinationsPage />
                                </Layout>
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/add"
                        element={
                            isLogged ? (
                                <Layout>
                                    <AddDestinationPage />
                                </Layout>
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/update/:id"
                        element={
                            isLogged ? (
                                <Layout>
                                    <UpdateDestinationPage />
                                </Layout>
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
