"use client";

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <SignUp
          afterSignUpUrl="/home"
          appearance={{
            elements: {
              card:
                "bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl",
              headerTitle:
                "text-2xl font-bold text-white",
              headerSubtitle:
                "text-gray-400",
              formFieldLabel:
                "text-gray-300",
              formFieldInput:
                "bg-gray-800 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500",
              formButtonPrimary:
                "bg-blue-600 hover:bg-blue-700 text-white transition",
              footerActionLink:
                "text-blue-500 hover:text-blue-400",
            },
          }}
        />

      </div>
    </div>
  );
}