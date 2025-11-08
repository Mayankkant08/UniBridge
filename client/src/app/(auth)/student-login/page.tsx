import LoginForm from "../../../../components/auth/LoginForm";

export default function StudentLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center mb-10 absolute top-8 w-full">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to <span className="text-[#736bff]">UniBridge</span>
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          Sign in to access your student dashboard
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
