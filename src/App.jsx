import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Utils
import scrollToSection from "./components/utils/ScrollToSection";
import ScrollToTop from "./components/utils/ScrollToTop";

// Auth
import { AuthProvider } from "./contexts/useAuth"

// Pages - Auth
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import ForgotPassword from "./components/Login/ForgotPassword";
import ProtectedRoute from "./components/auth/ProtectedRoute"

// Pages - Public
import HomePage from "./pages/home/HomePage"
import AboutPage from "./pages/generic/aboutUsPage/AboutPage"
import ContactUsPage from "./pages/generic/contactUs/ContactUsPage"
import PrivacyPolicyPage from "./pages/generic/privacyPolicyPage/PrivacyPolicyPage"
import TermConditionPage from "./pages/generic/termConsitionsPage/TermConditionPage"
import BudgetManagement from "./pages/BudgetManagement/BudgetManagement"
import TransactionsPage from "./pages/Transactions/TransactionsPage"
import ResourcePage from "./pages/generic/resource/ResourcePage";
import ServicesPage from "./pages/generic/services/ServicesPage";

// Dashboard Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Dashboard/Profile";
import GoalTargetPage from "./pages/Dashboard/GoalTarget";

// ===== Layout Wrapper =====
const Layout = ({ onScrollToSection }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar scrollToSection={onScrollToSection} />
    <main className="flex-grow mt-16">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  const handleScrollToSection = scrollToSection;

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Routes>
            {/* Public routes without layout */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />

            {/* Routes using main layout */}
            <Route element={<Layout onScrollToSection={handleScrollToSection} />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/contact-with-us" element={<ContactUsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/term-conditions" element={<TermConditionPage />} />
              <Route path="/resources" element={<ResourcePage />} />
              <Route path="/services" element={<ServicesPage />} />
            </Route>

            {/* Dashboard routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={["user"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/profile"
              element={
                <ProtectedRoute roles={["user"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/budget-management"
              element={
                <ProtectedRoute roles={["user"]}>
                  <BudgetManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/transactions"
              element={
                <ProtectedRoute roles={["user"]}>
                  <TransactionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/goals"
              element={
                <ProtectedRoute roles={["user"]}>
                  <GoalTargetPage />
                </ProtectedRoute>
              }
            />

            {/* 404 - Not Found */}
            <Route
              path="*"
              element={
                <div className="text-center py-16 text-2xl">
                  404 - Page Not Found
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
