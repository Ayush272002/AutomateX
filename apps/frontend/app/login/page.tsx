"use client";

import { CheckFeature } from "@repo/ui/checkFeature";
import { Input } from "@repo/ui/input";
import Appbar from "../../components/Appbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PrimaryButton } from "@repo/ui/primaryButton";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function () {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnClick = async () => {
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    try {
      const payload = {
        username: email,
        password,
      };

      const res = await axios.post(
        `${API_BASE_URL}/api/v1/user/signin`,
        payload,
      );

      toast.success("Login successful! Redirecting to your dashboard...");

      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (error: any) {
      if (error.response) {
        toast.error(
          error.response.data.message ||
            "Login failed. Please check your credentials and try again.",
        );
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.");
      } else {
        toast.error(
          "An unexpected error occurred during login. Please try again.",
        );
      }
    }
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="flex pt-8 max-w-4xl">
          <div className="flex-1 pt-20 px-4">
            <div className="font-semibold text-3xl pb-4">
              Join millions worldwide who automate their work using Zapier.
            </div>
            <div className="pb-6 pt-4">
              <CheckFeature label={"Easy setup, no coding required"} />
            </div>
            <div className="pb-6">
              <CheckFeature label={"Free forever for core features"} />
            </div>
            <CheckFeature label={"14-day trial of premium features & apps"} />
          </div>
          <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              label={"Email"}
              type="text"
              placeholder="Your Email"
            />
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label={"Password"}
              type="password"
              placeholder="Password"
            />

            <div className="pt-4">
              <PrimaryButton onClick={handleOnClick} size="big">
                Get Started Free
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
