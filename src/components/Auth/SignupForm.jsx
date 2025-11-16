import React, { useState } from "react";
import images from "../../assets/images/images.png"
import SignupSchema from "../../services/utils/schemas/SignUpSchema";
import supaBase from "../../services/supabaseClient";
import { useAuth } from "./AuthContext";
import AnimatedToast from "../common/loader/AnimatedToast";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const SignupForm = () => {
    const { SignUpUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({

        fullName: "",
        email: "",
        password: "",
        role: "",
        companyName: "",
        phone: "",
        location: "",
        about: "",
    });
    const navigate = useNavigate();
    // const showToast = (message, type = "success", duration = 5000) => {
    //     const id = Date.now().toString();
    //     const newToast = {
    //         id,
    //         message,
    //         type,
    //         duration,
    //         isVisible: true
    //     };

    //     setToasts(prev => [...prev, newToast]);

    //     // Auto remove after duration
    //     setTimeout(() => {
    //         removeToast(id);
    //     }, duration);
    // };

    // const removeToast = (id) => {
    //     setToasts(prev => prev.filter(toast => toast.id !== id));
    // };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
        validateField(name, value);

    }
    const validateField = async (name, value) => {
        try {
            // Validate only this field with current formData
            const currentFormData = { ...formData, [name]: value };

            await SignupSchema.validateAt(name, currentFormData);

            // Remove error if valid
            setErrors(prev => ({ ...prev, [name]: undefined }));
        } catch (err) {
            // Set error if invalid
            setErrors(prev => ({ ...prev, [name]: err.message }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // setLoading(true);

        try {
            setErrors({});
            await SignupSchema.validate(formData, { abortEarly: false });
            const { error } = await SignUpUser(formData)
            if (!error) {
                toast.success("Signup successful! Please verify your email.", "success");
                setFormData({
                    fullName: "",
                    email: "",
                    password: "",
                    role: "",
                    companyName: "",
                    phone: "",
                    location: "",
                    about: "",
                })
                setTimeout(() => {
                    navigate("/Login"); // ya koi bhi page jahan redirect karna hai
                }, 1500);
            }

            else {
                toast.error(`${error.message}`, "error");
            }
        }
        catch (validationError) {
            if (validationError.inner) {
                // Map Yup errors into a key-value object
                const formErrors = {};
                validationError.inner.forEach(err => {
                    formErrors[err.path] = err.message;
                });
                setErrors(formErrors);
                toast.error("Please fix the form errors", "warning")
            } else {
                toast.error(`${validationError.message}`, "error");
            }
        } finally {
            setLoading(false);
        }
    }






    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#244034] via-[#2f5c4b] to-[#1b2d26] px-4">
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map((toast) => (
                    <AnimatedToast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        isVisible={toast.isVisible}
                        duration={toast.duration}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md text-white relative border border-white/20">
                {/* ✅ Animated Logo */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-25 h-25 bg-gradient-to-br from-mint-300 to-white rounded-full flex items-center justify-center animate-pulse shadow-lg">
                            <span className="text-2xl font-bold text-[#244034]"><img src={images} ></img></span>
                        </div>
                    </div>
                </div>

                {/* ✅ Form */}
                <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <input
                            name="fullName"
                            placeholder="Full Name"
                            onChange={handleChange}
                            className="p-3 rounded-md bg-white/20 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 w-full focus:ring-mint-300"
                        />

                        {errors.fullName && <p className="text-red-500 text-sm mt-2">{errors.fullName}</p>}
                    </div>
                    <div className="mb-2">
                        <input
                            name="email"
                            type="email"
                            onChange={handleChange}
                            placeholder="Email"
                            className="p-3 rounded-md bg-white/20 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 w-full focus:ring-mint-300"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                    </div>
                    <div className="mb-2">
                        <input
                            name="password"
                            type="password"
                            onChange={handleChange}
                            placeholder="Password"
                            className="p-3 rounded-md bg-white/20 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 w-full focus:ring-mint-300"
                        />
                        {errors.password && <p className="text-red-500 mt-2 text-sm">{errors.password}</p>}
                    </div>
                    <div className="mb-2">
                        <select
                            name="role"
                            onChange={handleChange}
                            className="p-3 rounded-md bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-mint-300 w-full"
                        ><option value="" className="text-gray-900">
                                Select A Role
                            </option>
                            <option value="seeker" className="text-gray-900">
                                Job Seeker
                            </option>
                            <option value="company" className="text-gray-900">
                                Company / Recruiter
                            </option>
                        </select>
                        {errors.role && <p className="text-red-500 text-sm mt-2">{errors.role}</p>}
                    </div>
                    <div className="mb-2">
                        {formData.role === "company" && <input
                            name="companyName"
                            onChange={handleChange}
                            placeholder="Company Name"
                            className="p-3 rounded-md bg-white/20 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 w-full focus:ring-mint-300"
                        />}

                        {errors.companyName && <p className="text-red-500 mt-2 text-sm">{errors.companyName}</p>}
                    </div>
                    <div className="mb-2">
                        <input
                            name="phone"
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="p-3 rounded-md bg-white/20 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 w-full focus:ring-mint-300"
                        />

                        {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                    </div>
                    <div className="mb-2">
                        <input
                            name="location"
                            onChange={handleChange}
                            placeholder="City / Location"
                            className="p-3 rounded-md bg-white/20 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 w-full focus:ring-mint-300"
                        />
                        {errors.location && <p className="text-red-500 text-sm mt-2">{errors.location}</p>}
                    </div>
                    <div className="mb-2">
                        <textarea
                            name="about"
                            onChange={handleChange}
                            placeholder="About yourself / company"
                            className="p-3 w-full rounded-md bg-white/20 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-mint-300"
                        />
                        {errors.about && <p className="text-red-500 text-sm mt-2">{errors.about}
                        </p>}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 bg-gradient-to-r from-mint-300 to-white text-[#244034] font-semibold rounded-md p-3 hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2"
                    >
                        {loading && (
                            <div className="w-4 h-4 border-2 border-[#244034] border-t-transparent rounded-full animate-spin"></div>
                        )}
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                    <div className="text-center pt-2">
                        <Link to={"/login"} className="text-[#98ffcc] font-semibold hover:underline">Alerady Account</Link>
                    </div>
                </form>
            </div>
            {/* <AnimatedToast
          key={toasts.message}                  
          message={toasts.message}
          type={toasts.type}
          isVisible={toasts.isVisible}
          duration={toasts.duration}
          onClose={() => setToasts(prev => ({ ...prev, isVisible: false }))}
        /> */}
        </div>
    );
};

export default SignupForm;

