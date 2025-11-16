import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/Auth/AuthContext';
import supaBase from '../../services/supabaseClient';
import toast from 'react-hot-toast';
import { CircleX, MoveLeftIcon, PersonStanding } from 'lucide-react';
import { Link } from 'react-router-dom';
import BigJobLoader from '../../components/common/loader/BigJobLoader';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  // console.log(user);

  const [userData, setUserData] = useState({
    name: "",
    title: "",
    tagline: "",
    location: "",
    email: "",
    phone: "",
    avatar: "",
    age: "",
    stats: [                           // 👈 ADD THIS
      { number: "", label: "Years Experience" },
      { number: "", label: "Projects Completed" },
      { number: "", label: "Happy Clients" },
    ],
    about: "",
    skills: [],
    experience: [],
    education: []
  });
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const { data, error } = await supaBase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();
        if (error && error.code !== "PGRST116") throw error;
        if (!data) {
          // If profile doesn't exist, create one
          await supaBase.from("profiles").insert([
            {
              user_id: user.id,
              name: user.user_metadata?.fullName || "",
              email: user.email,
              about: user.user_metadata?.about || "",
              location: user.user_metadata?.location || "",
              phone: user.user_metadata?.phone || "",
              skills: [],
              experience: [],
              education: [],
              title: "",
              tagline: "",
              avatar: "",
              age: ""
            },
          ]);
          // toast.success("Profile created successfully!");
        } else {
          setUserData({
            ...data,
            skills: Array.isArray(data.skills) ? data.skills : [],
            experience: Array.isArray(data.experience) ? data.experience : [],
            education: Array.isArray(data.education) ? data.education : [],
            stats: Array.isArray(data.stats)
              ? data.stats
              : [
                { number: "", label: "Years Experience" },
                { number: "", label: "Projects Completed" },
                { number: "", label: "Happy Clients" },
              ],
          });
        }
      } catch (err) {
        // console.error(err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (isEditing && user) {
      setUserData((prev) => ({
        ...prev, // keep existing data (so you don't lose anything)
        name: user.user_metadata?.fullName || prev.name || "",
        location: user.user_metadata?.location || prev.location || "",
        email: user.email || prev.email || "",
        phone: user.user_metadata?.phone || prev.phone || "",
      }));
    }
  }, [isEditing, user]);
  const handleArrayChange = (e, arrayName, index, field) => {
    const newArray = [...userData[arrayName]];
    newArray[index][field] = e.target.value;
    setUserData({ ...userData, [arrayName]: newArray });
  };

  const addArrayItem = (arrayName) => {
    const lastItem = userData[arrayName][userData[arrayName].length - 1]
    if (lastItem && Object.values(lastItem).some(val => val === "")) {
      toast.error("Please fill the current field first!");
      return;
    }
    let newItem = {};

    if (arrayName === 'skills') newItem = { name: '', level: 0, color: 'bg-blue-500' };
    if (arrayName === 'experience') newItem = { position: '', company: '', period: '', description: '', logo: '' };
    if (arrayName === 'education') newItem = { degree: '', institution: '', period: '', grade: '' };
    if (arrayName === 'stats') newItem = { number: "", label: "" };
    setUserData({ ...userData, [arrayName]: [...userData[arrayName], newItem] });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      const updates = {
        name: userData.name,
        title: userData.title,
        tagline: userData.tagline,
        location: userData.location,
        email: userData.email,
        phone: userData.phone,
        about: userData.about,
        avatar: userData.avatar,
        skills: userData.skills,
        experience: userData.experience,
        education: userData.education,
        age: userData.age,
        stats: userData.stats, // ✅ store stats array as JS
        // updated_at: new Date(),
      };

      const { data, error } = await supaBase
        .from("profiles")
        .update(updates)
        .eq("user_id", user.id)
        .select() // 👈 ye line add karo (taake updated data turant mile)
        .single();
      // console.log(data);

      if (error) throw error;

      setUserData(data); // 👈 yahan updated data state me set karo
      toast.success("Profile updated successfully!");
      setIsEditing(false); // form close karo

    } catch (err) {
      // console.error(err);
      toast.error("Failed to update profile");
    }
  };

  const handleAvatarUpload = async (event) => {
    // console.log("🧠 Debug Info:");
    // console.log("User ID (from app):", user?.id);

    // const { data: authData, error: authError } = await supaBase.auth.getUser();
    // console.log("Auth UID (from Supabase):", authData?.user?.id);

    // if (authError) console.error("Auth error:", authError);

    const file = event.target.files[0];
    if (!file) return;

    try {

      // 1️⃣ Check size (limit 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }

      // 2️⃣ Upload to Supabase Storage (your bucket)
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`; // folder name inside the bucket (optional)

      const { error: uploadError } = await supaBase.storage
        .from("user-images") // ✅ your bucket name
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
          //  metadata: { user_id: user.id }, // 👈 must be here

        });

      if (uploadError) throw uploadError;

      // 3️⃣ Get public URL
      const { data } = supaBase.storage.from("user-images").getPublicUrl(filePath);
      const avatarUrl = data.publicUrl;

      // 4️⃣ Update database
      const { error: updateError } = await supaBase
        .from("profiles")
        .update({ avatar: avatarUrl })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      // 5️⃣ Update local state (instant reflect)
      setUserData((prev) => ({ ...prev, avatar: avatarUrl }));
      toast.success("Profile picture updated!");
      // console.log(avatarUrl, "avatarUrl----------");

    } catch (err) {
      console.error(err);
      toast.error("Failed to upload avatar");
    }
  };
  const handleRemoveAvatar = async () => {
    try {
      if (!user) return;

      if (userData.avatar) {
        const path = userData.avatar.split("/").pop();
        await supaBase.storage.from("user-images").remove(["path"]);
      }

      const { error } = await supaBase.from("profiles").update({ avatar: null }).eq
        ("user_id", user.id);

      if (error) throw error;
      setUserData((prev) => ({ ...prev, avatar: null }));
      toast.success("Profile photo removed!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove photo");
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        {/* <p className="text-gray-500">Loading profile...</p> */}
        <BigJobLoader></BigJobLoader>
      </div>
    );
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Edit Form Toggle */}
        <div className="mb-6 flex items-center justify-between">
          {!isEditing && (
            <Link to={"/jobs"} className="flex items-center gap-2 hover:text-[#244034] cursor-pointer ml-7">
              <MoveLeftIcon />
              <span>Back</span>
            </Link>
          )}
          {isEditing && (
            <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 hover:text-[#244034] cursor-pointer ml-7">
              <MoveLeftIcon />
              <span>Back</span>
            </button>
          )}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl bg-[#244034] text-white hover:bg-green-700 transition mr-7"
          >
            {isEditing ? "Close Form" : "Edit Profile"}
          </button>
        </div>

        {/* Edit Form */}
        {isEditing ? (
          <div className="bg-white p-6 rounded-2xl shadow-xl mb-8 border border-gray-100">

            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">

              {/* Simple Fields */}
              {['name', 'age', 'title', 'tagline', 'location', 'email', 'phone', 'about', 'avatar'].map((key) => (
                <div key={key}>
                  <label className="block text-gray-700 font-medium mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  {key === 'about' ? (
                    <textarea
                      name={key}
                      value={userData[key]}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      rows={4}
                    />
                  ) : (
                    <input
                      type={key === 'email' ? 'email' : 'text'}
                      name={key}
                      value={userData[key]}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  )}
                </div>
              ))}

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                {userData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Skill Name"
                      value={skill.name}
                      onChange={(e) => handleArrayChange(e, 'skills', index, 'name')}
                      className="w-1/2 border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                      type="number"
                      placeholder="1 to 100 %"
                      value={skill.level}
                      onChange={(e) => handleArrayChange(e, 'skills', index, 'level')}
                      className="w-1/2 border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('skills')} className="text-[14px] text-[#244034] cursor-pointer">+ Add Skill</button>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Experience</h3>
                {userData.experience.map((exp, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Position eg;manager,webdeveloper"
                      value={exp.position}
                      onChange={(e) => handleArrayChange(e, 'experience', index, 'position')}
                      className="border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Company name"
                      value={exp.company}
                      onChange={(e) => handleArrayChange(e, 'experience', index, 'company')}
                      className="border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="eg;Jan 2022 - Present or Jun 2020 - Dec 2021"
                      value={exp.period}
                      onChange={(e) => handleArrayChange(e, 'experience', index, 'period')}
                      className="border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) => handleArrayChange(e, 'experience', index, 'description')}
                      className="border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('experience')} className="text-[14px] text-[#244034] cursor-pointer">+ Add Experience</button>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                {userData.education.map((edu, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="eg;bachelore,master"
                      value={edu.degree}
                      onChange={(e) => handleArrayChange(e, 'education', index, 'degree')}
                      className="border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Institution name"
                      value={edu.institution}
                      onChange={(e) => handleArrayChange(e, 'education', index, 'institution')}
                      className="border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Jan 2020 - May 2020"
                      value={edu.period}
                      onChange={(e) => handleArrayChange(e, 'education', index, 'period')}
                      className="border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                      type="number"
                      placeholder="1 to 100 %"
                      value={edu.grade}
                      onChange={(e) => handleArrayChange(e, 'education', index, 'grade')}
                      className="border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('education')} className="text-[14px] text-[#244034] cursor-pointer">+ Add Education</button>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Stats</h3>
                {userData.stats.map((stat, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      disabled
                      placeholder="Label"
                      value={stat.label}
                      onChange={(e) => handleArrayChange(e, 'stats', index, 'label')}
                      className="w-1/2 border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                      type="number"
                      placeholder="Number"
                      value={stat.number}
                      onChange={(e) => handleArrayChange(e, 'stats', index, 'number')}
                      className="w-1/2 border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                ))}
                {/* <button
    type="button"
    onClick={() => addArrayItem('stats')}
    className="text-[14px] text-[#244034] cursor-pointer"
  >
    + Add Stat
  </button> */}
              </div>
              <div className="flex justify-end mt-4">
                <button type="submit" onSubmit={handleSubmit} className="px-6 py-3 rounded-xl bg-green-500 text-white hover:bg-green-600 transition">
                  Save Changes
                </button>
              </div>
            </form>
          </div>

        ) : (
          // <div className='bg-gradient-to-br from-slate-50 to-blue-50'>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Hero Section */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100">
                <div className="md:flex">
                  {/* Profile Avatar Section */}
                  <div className="md:w-1/3 bg-[#244034] p-8 text-white flex flex-col items-center justify-center relative">
                    {/* Profile Image Section */}
                    <div className="relative">
                      {userData?.avatar && (
                        <button className="absolute top-0 right-0 bg-red-50/50 hover:bg-red-600 text-white p-1.5 rounded-full shadow-md transition-all cursor-pointer duration-300 hover:scale-110"
                          title="Remove Photo"
                          onClick={handleRemoveAvatar}
                        >
                          <CircleX />
                        </button>
                      )}
                      {userData?.avatar ? (
                        // If user has uploaded an image
                        <img
                          src={`${userData?.avatar}?t=${new Date().getTime()}`} // force refresh
                          alt="Avatar"
                          className="w-32 h-32 rounded-full object-cover border-4 border-white/30 shadow-lg"
                        />

                      ) : (
                        // If no image, show initials
                        <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-4xl font-bold border-4 border-white/30">
                          {user?.user_metadata?.fullName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase() || "?"}
                        </div>
                      )}

                      {/* Image Picker Button */}
                      <label
                        htmlFor="avatarUpload"
                        className="absolute bottom-1 right-1 bg-white/30 hover:bg-white/50 rounded-full p-2 cursor-pointer backdrop-blur-md"
                        title="Change Profile Photo"
                      >
                        📸
                        <input
                          id="avatarUpload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarUpload}
                        />
                      </label>
                    </div>

                    {/* Name + Title */}
                    <h1 className="text-2xl font-bold text-center mt-4 mb-1">
                      {user?.user_metadata?.fullName || "Your Name"}
                    </h1>
                    <p className="text-blue-100 text-center mb-1">{userData.title || "Your Title"}</p>
                    <p className="text-sm text-blue-200 text-center italic">
                      {userData.tagline || "Your Tagline"}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-8 w-full">
                      {(userData.stats || []).map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="text-xl font-bold">{stat.number || 0}</div>
                          <div className="text-xs text-blue-200">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Profile Info Section */}
                  <div className="md:w-2/3 p-8">
                    <div className="flex flex-col h-full">
                      {/* Contact Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center p-3 bg-green-100 rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-[#244034]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{user?.user_metadata?.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center p-3 bg-green-100 rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-[#244034]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{user?.user_metadata?.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center p-3 bg-green-100 rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-[#244034]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{user?.user_metadata?.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-center p-3 bg-green-100 rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-[#244034]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Experience</p>
                            <p className="font-medium">{userData.stats.find(stat => stat.label === "Years Experience")?.number || "0"} years</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-green-100 rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <PersonStanding />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Age</p>
                            <p className="font-medium">{userData.age || "N/A"}</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4 mt-auto">
                        <button className="flex-1 bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                          Contact Me
                        </button>
                        {/* <button className="flex-1 border-2 border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-700 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1">
                          Download Resume
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100">
                <div className="border-b border-gray-200">
                  <nav className="flex overflow-x-auto">
                    {[
                      { id: "about", label: "About Me", icon: "👤" },
                      { id: "skills", label: "Skills", icon: "💡" },
                      { id: "experience", label: "Experience", icon: "💼" },
                      { id: "education", label: "Education", icon: "🎓" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        className={`flex items-center whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all duration-300 ${activeTab === tab.id
                          ? "border-blue-500 text-white bg-[#244034]"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                          }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <span className="mr-2 text-lg">{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-8">
                  {/* About Me */}
                  {activeTab === "about" && (
                    <div className="animate-fade-in">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-3">👤</span> About Me
                      </h2>
                      {userData.about ? (
                        <>
                          <p className="text-gray-600 leading-relaxed text-lg">
                            {userData.about}
                          </p>

                          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                              <h3 className="font-semibold text-blue-800 mb-2">
                                Frontend Development
                              </h3>
                              <p className="text-blue-600 text-sm">
                                Creating responsive and interactive user interfaces with modern frameworks
                              </p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                              <h3 className="font-semibold text-green-800 mb-2">
                                Backend Systems
                              </h3>
                              <p className="text-green-600 text-sm">
                                Building scalable server-side applications and APIs
                              </p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-100">
                              <h3 className="font-semibold text-purple-800 mb-2">
                                Cloud Architecture
                              </h3>
                              <p className="text-purple-600 text-sm">
                                Designing and deploying cloud-native solutions
                              </p>
                            </div>
                          </div> */}
                        </>
                      ) : (
                        <p className="text-gray-500 italic">
                          No about information added yet.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Skills */}
                  {activeTab === "skills" && (
                    <div className="animate-fade-in">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-3">💡</span> Skills & Expertise
                      </h2>
                      {userData.skills.length === 0 ? (
                        <p className="text-gray-500 italic">No skills added yet.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {(userData.skills || []).map((skill, index) => (
                            <div
                              key={index}
                              className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300"
                            >
                              <div className="flex justify-between mb-2">
                                <span className="font-medium text-gray-700">
                                  {skill.name}
                                </span>
                                <span className="font-medium text-gray-700">
                                  {skill.level}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                  className={`h-3 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                                  style={{ width: `${skill.level}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Experience */}
                  {activeTab === "experience" && (
                    <div className="animate-fade-in">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-3">💼</span> Work Experience
                      </h2>
                      {userData.experience.length === 0 ? (
                        <p className="text-gray-500 italic">No experience added yet.</p>
                      ) : (
                        <div className="space-y-6">
                          {(userData.experience || []).map((exp, index) => (
                            <div
                              key={index}
                              className="flex group hover:bg-gray-50 p-4 rounded-xl transition-all duration-300"
                            >
                              <div className="flex-shrink-0 mr-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                  {exp.logo || (exp.company ? exp.company.split(" ").map(w => w[0]).join("").toUpperCase() : "💼")}
                                </div>
                              </div>
                              <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                  {exp.position}
                                </h3>
                                <div className="flex flex-col sm:flex-row sm:justify-between text-gray-600 mb-1">
                                  <span className="font-medium">{exp.company}</span>
                                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    {exp.period}
                                  </span>
                                </div>
                                <p className="text-gray-600 mt-2">{exp.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Education */}
                  {activeTab === "education" && (
                    <div className="animate-fade-in">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="mr-3">🎓</span> Education
                      </h2>
                      {userData.education.length === 0 ? (
                        <p className="text-gray-500 italic">No education record added yet.</p>
                      ) : (
                        <div className="space-y-6">
                          {(userData.education || []).map((edu, index) => (
                            <div
                              key={index}
                              className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300"
                            >
                              <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {edu.degree}
                              </h3>
                              <div className="flex justify-between items-center mb-3">
                                <span className="font-medium text-blue-600">
                                  {edu.institution}
                                </span>
                                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                  {edu.period}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Grade: {edu.grade}</span>
                                <span className="text-blue-600 font-medium">Completed</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>

            <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}
            </style>
          </div>
          // </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
