import { Toaster } from "react-hot-toast";
import PostJob from './components/jobs/postjob/PostJob'
import BlogsDetailedPage from "../src/pages/Blogs/BlogsDetailedPage"
import Blogs from "../src/pages/Blogs/Blogs"
import FindJobsPage from './components/jobs/Find Jobs/JobsFindPage'
import SignupForm from './components/Auth/SignupForm'
import Home from "../src/pages/Home/Home"
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "./components/Auth/Login"
import LogOut from "./components/Auth/LogOut"
import { useAuth } from "../src/components/Auth/AuthContext"
import About from "./pages/About/About";
import ContactUs from "./pages/Contact/ContactUs";
import ApplyForm from "../src/components/jobs/Find Jobs/ApplyForm";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" replace />;
};
const App = () => {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogsDetailedPage />} />
        <Route path="/jobs" element={<FindJobsPage />} />
        <Route path="/jobs/:id" element={<FindJobsPage />} />


        <Route
          path="/apply-form/:jobId"
          element={<PrivateRoute user={user}><ApplyForm /></PrivateRoute>}
        />
        <Route
          path="/profile"
          element={<PrivateRoute user={user}><ProfilePage /></PrivateRoute>}
        />
        <Route
          path="/post-job"
          element={<PrivateRoute user={user}><PostJob /></PrivateRoute>}
        />
        <Route path="/logout" element={<PrivateRoute user={user}><LogOut /></PrivateRoute>} />

        {/* 👤 Auth Pages */}
        <Route path="/login" element={user ? <Navigate to="/jobs" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/jobs" /> : <SignupForm />} />

      </Routes>
      {/* // <DashboardStats></DashboardStats> */}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
