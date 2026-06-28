"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("请填写邮箱和密码");
      return;
    }
    setLoading(true);

    // Simulate login — in production, use Supabase Auth
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ email, name: email.split("@")[0] }));
      toast.success("登录成功");
      setLoading(false);
      router.push("/");
    }, 1000);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-[20px] py-[40px]">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-[30px]">
          <Link
            href="/"
            className="text-[#B39B7E] text-[32px] font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Nonta
          </Link>
          <p className="text-[14px] text-[#999] mt-[10px]">欢迎回来</p>
        </div>

        <div className="bg-white p-[30px] sm:p-[40px] rounded-[20px]">
          <form onSubmit={handleLogin} className="flex flex-col gap-[16px]">
            <div>
              <label className="text-[14px] font-medium text-[#333] mb-[6px] block">
                邮箱地址
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入邮箱"
                className="w-full px-[14px] py-[10px] text-[14px] border border-[#E5E5E5] rounded-[6px] bg-[#F8F5F0] outline-none focus:border-[#B39B7E]"
              />
            </div>

            <div>
              <label className="text-[14px] font-medium text-[#333] mb-[6px] block">
                密码
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full px-[14px] py-[10px] pr-[40px] text-[14px] border border-[#E5E5E5] rounded-[6px] bg-[#F8F5F0] outline-none focus:border-[#B39B7E]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#999]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-brand w-full py-[12px] text-[16px] disabled:opacity-50"
            >
              {loading ? "登录中..." : "登录"}
            </button>
          </form>

          <div className="flex justify-between mt-[16px]">
            <Link href="/register" className="text-[13px] text-[#B39B7E] hover:underline">
              没有账号？去注册
            </Link>
            <Link href="/forgot-password" className="text-[13px] text-[#999] hover:underline">
              忘记密码？
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
