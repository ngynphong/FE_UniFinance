import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom"

// Layout
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"

// Utils
import scrollToSection from "./components/utils/ScrollToSection"
import ScrollToTop from "./components/utils/ScrollToTop"


// Auth
import { AuthProvider } from "./components/auth/useAuth"

// Pages - Auth
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import ForgotPassword from "./components/Login/ForgotPassword";
// Pages - Public
import HomePage from "./pages/home/HomePage"
import AboutPage from "./pages/generic/aboutUsPage/AboutPage"
import ContactUsPage from "./pages/generic/contactUs/ContactUsPage"
import PrivacyPolicyPage from "./pages/generic/privacyPolicyPage/PrivacyPolicyPage"
import TermConditionPage from "./pages/generic/termConsitionsPage/TermConditionPage"
import BudgetManagement from "./pages/BudgetManagement/BudgetManagement"
import TransactionsPage from "./pages/Transactions/TransactionsPage"
import ProtectedRoute from "./components/auth/ProtectedRoute"

// Optional: Private pages (if needed)
// import Dashboard from "./pages/dashboard/Dashboard"
// import ProfilePage from "./pages/profile/ProfilePage"

// ===== Layout Wrapper =====
const Layout = ({ onScrollToSection }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar scrollToSection={onScrollToSection} />
    <main className="flex-grow mt-16">
      <Outlet />
    </main>
    <Footer />
  </div>
)

function App() {
  const handleScrollToSection = scrollToSection

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Routes>
            <Route element={<Layout onScrollToSection={handleScrollToSection} />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/contact-with-us" element={<ContactUsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/term-conditions" element={<TermConditionPage />} />



              {/* 404 - Not Found */}
              <Route
                path="*"
                element={
                  <div className="text-center py-16 text-2xl">
                    404 - Page Not Found
                  </div>
                }
              />
            </Route>
            {/* Auth route */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            {/* User route */}
            <Route path="/budget-management"
              element={
                <ProtectedRoute roles={["user"]}>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<BudgetManagement />} />
            </Route>

            <Route path="/transactions"
              element={
                <ProtectedRoute roles={["user"]}>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<TransactionsPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
