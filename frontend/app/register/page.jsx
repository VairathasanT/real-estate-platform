import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="max-w-lg mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Register
      </h1>

      <RegisterForm />
    </div>
  );
}