"use client";

import { CheckFeature } from "@repo/ui/checkFeature";
import { Input } from "@repo/ui/input";
import Appbar from "../../components/Appbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PrimaryButton } from "@repo/ui/primaryButton";

export default function () {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            ></Input>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              label={"Email"}
              type="text"
              placeholder="Your Email"
            ></Input>
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label={"Password"}
              type="password"
              placeholder="Password"
            ></Input>

            <div className="pt-4">
              <PrimaryButton onClick={() => {}} size="big">
                Get Started Free
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
