import { SignUp } from "@clerk/nextjs";
import React from "react";

function SignUpPage() {
  return (
    <main className="h-screen w-full flex-center">
      <SignUp />
    </main>
  );
}

export default SignUpPage;
