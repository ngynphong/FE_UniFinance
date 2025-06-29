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
import BudgetManagement from "./pages/user/BudgetManagement/BudgetManagement"
import TransactionsPage from "./pages/user/Transactions/TransactionsPage"
import ServicesPage from "./pages/generic/services/ServicesPage";
import BlogPage from "./pages/generic/BlogPage";

// Dashboard Pages
import Dashboard from "./pages/user/Dashboard/Dashboard";
import Profile from "./pages/user/profile/Profile";
import GoalTargetPage from "./pages/user/goalTarget/GoalTarget";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import UserManagement from "./pages/admin/UserManagement";
import { ToastContainer } from "react-toastify";
import ResetPassword from "./components/resetPassword/ResetPassword";
import DebtManagement from "./pages/user/debt/DebtManagement";
import DebtOverview from "./components/debt/DebtOverview";
import AddDebt from "./components/debt/AddDebt";
import RepaymentProgress from "./components/debt/RepaymentProgress";
import DebtCalculator from "./components/debt/DebtCalculator";
import StaffLayout from "./components/layout/staff/StaffLayout";
import BlogManagement from "./pages/staff/BlogManagement";
import ConsultationManagement from "./pages/staff/ConsultationManagement";
import SupportDashboard from "./pages/staff/SupportDashboard";
import ProfileStaff from "./pages/staff/ProfileStaff";
import StaffConsultationManager from "./pages/staff/StaffConsultationManager";
import ChatPage from "./pages/chat/chat";
import MessageManagement from "./pages/staff/MessageManagement";

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

    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Routes>
            {/* Public routes without layout */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />

            {/* Routes using main layout */}
            <Route element={<Layout onScrollToSection={handleScrollToSection} />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/contact-with-us" element={<ContactUsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/term-conditions" element={<TermConditionPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/services" element={<ServicesPage />} />
            </Route>

            {/* Admin routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/user-management"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminProfile />
                </ProtectedRoute>
              }
            />

            {/* User Dashboard routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={["Customer"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/profile/:id"
              element={
                <ProtectedRoute roles={["Customer"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/budget-management"
              element={
                <ProtectedRoute roles={["Customer"]}>
                  <BudgetManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/transactions"
              element={
                <ProtectedRoute roles={["Customer"]}>
                  <TransactionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/goals"
              element={
                <ProtectedRoute roles={["Customer"]}>
                  <GoalTargetPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/debt-management"
              element={
                <ProtectedRoute roles={["Customer"]}>
                  <DebtManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/debt-overview"
              element={
                <ProtectedRoute roles={["Customer"]}>
                  <DebtOverview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/add-debt"
              element={
                <ProtectedRoute roles={["Customer"]}>
                  <AddDebt />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/repayment-progress"
              element={
                <ProtectedRoute roles={["Customer"]}>
                  <RepaymentProgress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/debt-calculator"
              element={
                <ProtectedRoute roles={["Customer"]}>
                  <DebtCalculator />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/chat"
              element={
                <ProtectedRoute roles={["Customer"]}>
                  <ChatPage />
                </ProtectedRoute>
              }
            />

            {/* Staff routes */}

            <Route
              path="/staff/dashboard/overview"
              element={
                <ProtectedRoute roles={["Consultant"]}>
                  <StaffConsultationManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/dashboard/blogs"
              element={
                <ProtectedRoute roles={["Consultant"]}>
                  <BlogManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/dashboard/consultations"
              element={
                <ProtectedRoute roles={["Consultant"]}>
                  <ConsultationManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/dashboard/support"
              element={
                <ProtectedRoute roles={["Consultant"]}>
                  <SupportDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/dashboard/profile-staff/:id"
              element={
                <ProtectedRoute roles={["Consultant"]}>
                  <ProfileStaff />
                </ProtectedRoute>
              }
            />

            <Route
              path="/staff/dashboard/message"
              element={
                <ProtectedRoute roles={["Consultant"]}>
                  <MessageManagement />
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
          <ToastContainer />
        </div>
      </AuthProvider>
    </Router >

  );
}

export default App;
