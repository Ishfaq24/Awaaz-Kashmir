import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F4EC]">
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/register"
        forceRedirectUrl="/home"
      />
    </div>
  );
}