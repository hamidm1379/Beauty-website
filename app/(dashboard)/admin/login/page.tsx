import { Crown, Lock, User } from "lucide-react";
import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#f8f8fb] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <div className="grid lg:grid-cols-2">
          
          {/* Right Side Form */}
          <div className="p-10 lg:p-16 flex flex-col justify-center">
            <div className="mb-10">
              <h1 className="text-5xl font-black text-slate-800 mb-3">
                ورود مدیر
              </h1>

              <p className="text-slate-500 text-lg">
                لطفا نام کاربری و رمز عبور خود را وارد کنید
              </p>
            </div>

            <LoginForm/>

            <div className="mt-8 text-center text-sm text-slate-400">
              تمامی حقوق محفوظ است
            </div>
          </div>

          {/* Left Side */}
          <div className="relative hidden lg:flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 to-white p-12">
            
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-pink-100 blur-3xl" />
            <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-pink-200/50 blur-3xl" />

            <div className="relative z-10 mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-xl shadow-pink-200">
              <Crown size={40} />
            </div>

            <h2 className="mb-4 text-center text-4xl font-black text-slate-800">
              به پنل مدیریت خوش آمدید
            </h2>

            <p className="mb-10 max-w-md text-center text-lg leading-8 text-slate-500">
              مدیریت محصولات، سفارشات، کاربران و گزارش‌های فروش
              از یک داشبورد حرفه‌ای
            </p>

            {/* Fake Dashboard Preview */}
            <div className="w-full max-w-md rounded-[32px] border border-white bg-white/80 p-6 backdrop-blur">
              <div className="mb-6 flex gap-3">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="h-28 rounded-3xl bg-orange-100" />
                <div className="h-28 rounded-3xl bg-sky-100" />
                <div className="h-28 rounded-3xl bg-pink-100" />
                <div className="h-28 rounded-3xl bg-green-100" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}