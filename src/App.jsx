import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import { PublicRoutes } from "./routes/PublicRoutes";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
// import { useLocation } from 'react-router-dom';
import SignupPage from "./pages/SignupPage";
import "./App.css";
import NewJob from "./pages/NewJob";
import JobListing from "./pages/JobListing";
import Header from "./components/Header";
import DashboardNavigation from "./components/DashboardNavigation";
import { useAuth } from "./context/AuthContext";
import SingleJob from "./pages/SingleJob";
import JobSearch from "./pages/JobSearch";

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Job Listing", href: "/jobs", current: false },
  { name: "Applications", href: "/applications", current: false },
];
import SlideOver from "./components/SlideOver";
import ApplicationsPage from "./pages/ApplicationsPage";
import SingleApplication from "./pages/SingleApplication";
import JobDetails from "./pages/JobDetails";
import BrowseCompanies from "./pages/BrowseCompanies";
import Footer from "./components/Footer";
import ApplyForJob from "./pages/ApplyForJob";
function App() {
  const { isLoggedIn } = useAuth();
  const history = useLocation();

  console.log(history.pathname, "here");
  const [slideOpen, setSlideOpen] = useState(false);
  return (
    <div className='App'>
      {history.pathname === "/login" || history.pathname === "/signup" ? (
        ""
      ) : isLoggedIn === true ? (
        <DashboardNavigation
          navigation={navigation}
          setSlideOpen={setSlideOpen}
        />
      ) : (
        <Header />
      )}
      {isLoggedIn && <SlideOver open={slideOpen} setOpen={setSlideOpen} />}
      <Routes>
        <Route path='/' element={<PublicRoutes />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
          <Route path='search-jobs' element={<JobSearch />} />
          <Route path='search-jobs/:id' element={<JobDetails />} />
          <Route path='search-jobs/:id/apply' element={<ApplyForJob />} />
          <Route path='browse-companies' element={<BrowseCompanies />} />
          <Route path='/' element={<LandingPage />} exact />
        </Route>
        {/* ProtectedRoutes ---we use protected routes instead of public routes after signup or login*/}
        <Route path='/' element={<PublicRoutes />}>  
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='new' element={<NewJob />} />
          <Route path='jobs' element={<JobListing />} />
          <Route path='jobs/:id' element={<SingleJob />} />
          <Route path='applications' element={<ApplicationsPage />} />
          <Route path='applications/:id' element={<SingleApplication />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
