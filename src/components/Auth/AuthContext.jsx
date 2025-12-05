import { useContext, createContext, useState, useEffect } from "react";
import supaBase from "../../services/supabaseClient";
import toast from "react-hot-toast";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  const showToast = (message, type = "success") => {
    if (type === "error") {
      toast.error(message, { position: "top-center" });
    } else {
      toast.success(message, { position: "top-center" });
    }
  };

  // Get current session and listen to auth state changes
  useEffect(() => {
    const getSession = async () => {
      const { data: sessionData } = await supaBase.auth.getSession();
      const sessionUser = sessionData?.session?.user || null;

      if (sessionUser) {
        const metaRole = sessionUser.user_metadata?.role;
        if (metaRole) setRole(metaRole);

        const { data: profileData } = await supaBase
          .from("profiles")
          .select("*")
          .eq("user_id", sessionUser.id)
          .single();

        const mergedUser = {
          ...sessionUser,
          avatar: `${profileData?.avatar}?r=${Date.now()}`,
        };

        setUser(mergedUser);
      }

      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supaBase.auth.onAuthStateChange(
      async (_event, session) => {
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
          emailRedirectTo: "https://career-spring.netlify.app/jobs",
        },
      });

      if (error) throw error;

      return data;

    } catch (err) {
      showToast(err.message, "error");
      throw err;
    }
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

    const { data: existingProfile } = await supaBase
      .from("profiles")
      .select("*")
      .eq("user_id", data.user.id)
      .single();

    if (!existingProfile) {
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
    }

    const { data: profileData } = await supaBase
      .from("profiles")
      .select("*")
      .eq("user_id", data.user.id)
      .single();

    const mergedUser = {
      ...data.user,
      avatar: profileData?.avatar ? `${profileData.avatar}?r=${Date.now()}` : null,
      fullName: profileData?.name || data.user.user_metadata.fullName || "U",
    };

    setUser(mergedUser);
    return data;
  };

  // Sign out user
  const signOutUser = async () => {
    const { error } = await supaBase.auth.signOut();
    if (error) {
      showToast("Logout failed. Please try again.", "error");
      throw error;
    }
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

      return true;

    } catch (err) {
      return false;
    }
  };

  return (
    <authContext.Provider value={{
      user,
      loading,
      resendEmailVerification,
      SignUpUser,
      signInUser,
      signOutUser,
      setUser
    }}>
      {children}
    </authContext.Provider>
  );
};

// Custom hook for consuming auth context
export const useAuth = () => useContext(authContext);