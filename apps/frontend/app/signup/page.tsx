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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOnClick = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const payload = {
        name,
        username: email,
        password,
      };

      console.log(API_BASE_URL);

      const res = await axios.post(
        `${API_BASE_URL}/api/v1/user/signup`,
        payload,
      );
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (error: any) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Signup failed. Please try again.",
        );
      } else if (error.request) {
        toast.error("No response received from server.");
      } else {
        toast.error("An error occurred during signup.");
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
              label={"Name"}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Your name"
            />
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
            <Input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              label={"Confirm Password"}
              type="password"
              placeholder="Confirm Password"
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
