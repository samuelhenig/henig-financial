"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  "https://fzsgilsvgmfvvhktghtq.supabase.co",
  "sb_publishable_YATmYcY-DNGjDXnbwmC0dA_NSx1J-rd"
);

export default function ClientPage() {
  const router = useRouter();
  const [familyName, setFamilyName] = useState("");
  const [loading, setLoading] = useState(true);

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

      setLoading(false);
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4] px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Henig Financial
            </h2>
            <p className="text-xs tracking-widest text-gray-500">
              CLIENT DASHBOARD
            </p>
          </div>

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
            className="text-sm px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Log out
          </button>
        </div>

        {/* Welcome Card */}
        <div className="bg-white border rounded-2xl p-10 shadow-sm">
          <p className="text-sm tracking-widest text-orange-500 mb-3">
            WELCOME
          </p>

          <h1 className="text-4xl font-semibold text-gray-800 mb-6">
            {familyName ? `${familyName} Family` : "Welcome"}
          </h1>

          <p className="text-gray-600 leading-relaxed">
            This is your private clarity space. Everything we build here will stay
            organized, structured, and fully tailored to your family’s financial life.
            <br /><br />
            Over time, this will become your single source of truth — where clarity replaces
            stress, and every decision has a clear direction behind it.
          </p>
        </div>

      </div>
    </div>
  );
}
