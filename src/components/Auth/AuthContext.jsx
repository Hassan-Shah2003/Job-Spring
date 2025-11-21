import { useContext, createContext, useState, useEffect } from "react";
import supaBase from "../../services/supabaseClient";
import toast from "react-hot-toast";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null); // ✅ Add role
  let emailQueue = [];
  let isProcessingQueue = false;

  // const [session, setSession] = useState(null);
  const savedData = localStorage.getItem("signup_formData");
  const parsedData = JSON.parse(savedData); // Convert string back to object
  console.log(parsedData);

  // const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || null);
  const showToast = (message, type = "success") => {
    if (type === "error") {
      toast.error(message, { position: "top-center" });
    } else {
      toast.success(message, { position: "top-center" });
    }
  };

      const processEmailQueue = async () => {
  if (emailQueue.length === 0) {
    isProcessingQueue = false;
    return;
  }

  isProcessingQueue = true;

  const emailData = emailQueue.shift(); // first email
  try {
    // Example: Supabase email verification
    await supaBase.auth.api.sendVerificationEmail(emailData.userEmail);

    console.log("Email sent to", emailData.userEmail);
  } catch (err) {
    console.error("Failed to send email:", err);
    // Optional: re-add to queue for retry
    emailQueue.push(emailData);
  }

  // Delay before next email (1-2 seconds)
  setTimeout(processEmailQueue, 1000);
};

  // const updateAvatar = (url) => {
  //   setAvatar(url);
  //   localStorage.setItem("avatar", url);
  // }
  // Get current session and listen to auth state changes
  useEffect(() => {
    const getSession = async () => {
      const { data: sessionData } = await supaBase.auth.getSession();
      const sessionUser = sessionData?.session?.user || null;
      // console.log(sessionUser);

      // setUser(sessionUser);

      if (sessionUser) {
        // 1️⃣ Try getting role from metadata first
        const metaRole = sessionUser.user_metadata?.role;
        if (metaRole) setRole(metaRole);

        // 2️⃣ Get complete profile data from 'profiles' table
        const { data: profileData, error: profileError } = await supaBase
          .from("profiles")
          .select("*") //  fetch all columns, not just role
          .eq("user_id", sessionUser.id)
          .single();

        // console.log(profileData, "----------------data----------");
        // 👇 Merge both Auth user & Profile data into one object
        const mergedUser = {
          ...sessionUser,
          avatar: `${profileData?.avatar}?r=${Date.now()}`,
        };
        // console.log(mergedUser, "✅ Merged user + profile");

        // Store it in state for global access
        setUser(mergedUser);

        // if (profileData?.avatar) {
        //   updateAvatar(profileData.avatar);   // ⭐ STORE IN LOCAL
        // }
        // if (profileData?.role) setRole(profileData.role);
        // setUser((prev) => ({ ...prev, ...profileData })) 
        // setUserData(prev => ({ ...prev, avatar: avatarUrl }));
        // updateAvatar(avatarUrl);
      }

      setLoading(false);
    };

    getSession();


    // ✅ Listen to auth state changes
    const { data: { subscription } } = supaBase.auth.onAuthStateChange(
      async (_event, session) => {
        // setUser(session?.user || null);
        if (session?.user) {
          setRole(session.user.user_metadata?.role || null);
        } else {
          setRole(null);
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  // Sign up new user
  const SignUpUser = async (formData) => {
    const { email, password } = formData;

    try {
       const { data: userExists } = await supaBase
      .from("profiles")
      .select("user_id")
      .eq("email", email)
      .maybeSingle();

    if (userExists) {
      // Duplicate exists → stop signup
      throw new Error("This email is already registered. Please log in.");
    }
    const { data, error } = await supaBase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName: formData.fullName,
          role: formData.role,
          companyName: formData.companyName,
          phone: formData.phone,
          location: formData.location,
          about: formData.about,
        },
        emailRedirectTo: "https://career-spring.netlify.app/jobs",//prod
      },
    });
    console.log(data);
    if (error) throw error;
    emailQueue.push({ userEmail: email });
      if (!isProcessingQueue) processEmailQueue();

      showToast("Signup successful! Please verify your email.");
      return data;

      // return data;
    } catch (err) {
      showToast(err.message, "error");
      throw err;
      
    }
   
   
   
   
   
   
    
    // if (data?.user) {
    //   await supaBase.from("profiles").insert([
    //     {
    //       user_id: data.user.id,
    //       name: formData.fullName,
    //       email: formData.email,
    //       about: formData.about,
    //       // role: formData.role,
    //       skills: [],
    //       experience: [],
    //       education: [],
    //       title: "",
    //       tagline: "",
    //       location: formData.location,
    //       phone: formData.phone,
    //       avatar: "",
    //       age: null,
    //     },
    //   ]);
    // }

  };

  // Sign in existing user
  const signInUser = async ({ email, password }) => {
    const { error, data } = await supaBase.auth.signInWithPassword({ email, password });

    if (error) {
      showToast(error.message, "error");
      return null;
    }

    if (!data?.user) {
      showToast("Incorrect email or password. Please try again.", "error");
      return null;
    }

    if (!data.user?.email_confirmed_at) {
      await supaBase.auth.signOut();
      throw new Error("Please verify your email before logging in.");
    }

    setUser(data.user);
    const { data: existingProfile } = await supaBase
      .from("profiles")
      .select("*")
      .eq("user_id", data.user.id)
      .single();

    if (!existingProfile) {
      // ✅ Create default profile
      await supaBase.from("profiles").insert([
        {
          user_id: data.user.id,
          name: data.user.user_metadata.fullName || "",
          email: data.user.email,
          about: data.user.user_metadata.about || "",
          role: data.user.user_metadata.role || "",
          skills: [],
          experience: [],
          education: [],
          title: "",
          tagline: "",
          location: data.user.user_metadata.location || "",
          phone: data.user.user_metadata.phone || "",
          avatar: "",
          age: null,
        },
      ]);
    } const { data: profileData } = await supaBase
      .from("profiles")
      .select("*")
      .eq("user_id", data.user.id)
      .single();

       const mergedUser = {
    ...data.user,
    avatar: profileData?.avatar ? `${profileData.avatar}?r=${Date.now()}` : null,
    fullName: profileData?.name || data.user.user_metadata.fullName || "U",
  };

  // Update state → avatar and name show turant
  setUser(mergedUser);

  return data;

    // if (profileData?.avatar) {
    //   updateAvatar(profileData.avatar);
    // }

    // console.log(data);

    return data;
  };

  // Sign out user
  const signOutUser = async () => {
    const { error } = await supaBase.auth.signOut();
    if (error) {
      showToast("Logout failed. Please try again.", "error");
      throw error;
    }
    localStorage.removeItem("signup_formData");
    // localStorage.removeItem("avatar");
    setUser(null);
    showToast("Logout successful!");
  };
  const resendEmailVerification = async (email) => {
    try {
      const { data, error } = await supaBase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: "https://career-spring.netlify.app/jobs",
        },
      });

      if (error) {
        showToast(error.message, "error");
        return false;
      }

      // showToast("Verification email resent!");
      return true;

    } catch (err) {
      // showToast("Something went wrong!", "error");
      return false;
    }
  };



  return (
    <authContext.Provider value={{ user, loading, resendEmailVerification, SignUpUser, signInUser, signOutUser, setUser }}>
      {children}
    </authContext.Provider>
  );
};

// Custom hook for consuming auth context
export const useAuth = () => useContext(authContext);
