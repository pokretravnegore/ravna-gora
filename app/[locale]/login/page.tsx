import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { LoginForm } from "../../components/ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-offwhite-1 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
