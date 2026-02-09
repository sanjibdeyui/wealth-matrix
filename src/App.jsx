import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Layout/Hero';
import ToolsGrid from './components/Calculators/ToolsGrid';
import FeaturesSection from './components/Layout/FeaturesSection';
import TestimonialsSection from './components/Layout/TestimonialsSection';
import Footer from './components/Layout/Footer';
import PricingSection from './components/Layout/PricingSection';
import CalculatorPage from './components/Pages/CalculatorPage';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import ForgotPasswordPage from './components/Auth/ForgotPasswordPage';
import UpdatePasswordPage from './components/Auth/UpdatePasswordPage';
import DashboardPage from './components/Pages/DashboardPage';
import ProfilePage from './components/Pages/ProfilePage';
import FeaturesPage from './components/Pages/FeaturesPage';
import PricingPage from './components/Pages/PricingPage';
import SecurityPage from './components/Pages/SecurityPage';
import AboutPage from './components/Pages/AboutPage';
import CareersPage from './components/Pages/CareersPage';
import ContactPage from './components/Pages/ContactPage';
import PrivacyPage from './components/Pages/PrivacyPage';
import TermsPage from './components/Pages/TermsPage';
import CheckoutPage from './components/Pages/CheckoutPage';
import BillingPage from './components/Pages/BillingPage';
import InvoicePage from './components/Pages/InvoicePage';

// Home Page Component
const Home = () => (
  <>
    <Hero />
    <ToolsGrid />
    <PricingSection />
    <FeaturesSection />
    <TestimonialsSection />
  </>
);

function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <Router>
          <div className="App flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tool/:id" element={<CalculatorPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/update-password" element={<UpdatePasswordPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/security" element={<SecurityPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/billing" element={<BillingPage />} />
                <Route path="/invoice/:id" element={<InvoicePage />} />
                <Route path="/terms" element={<TermsPage />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;
