import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="max-w-lg mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Login
      </h1>

      <LoginForm />
    </div>
  );
}