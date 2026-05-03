"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  "https://fzsgilsvgmfvvhktghtq.supabase.co",
  "YOUR_PUBLISHABLE_KEY_HERE"
);

export default function ClientPage() {
  const router = useRouter();
  const [familyName, setFamilyName] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("client_profiles")
        .select("family_name")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setFamilyName(data.family_name);
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f7f4] p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10 shadow-sm border">
        <p className="text-sm tracking-widest text-orange-500 mb-3">
          WELCOME
        </p>

        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
          {familyName ? `${familyName} Family` : "Loading..."}
        </h1>

        <p className="text-gray-600">
          This is your private clarity space. Everything we build here will stay
          organized, structured, and fully tailored to your family.
        </p>
      </div>
    </div>
  );
}
