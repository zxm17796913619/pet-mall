"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("请填写所有必填字段");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("两次密码输入不一致");
      return;
    }
    if (password.length < 6) {
      toast.error("密码至少6位");
      return;
    }
    setLoading(true);

    // Simulate registration
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ email, name }));
      toast.success("注册成功");
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
          <p className="text-[14px] text-[#999] mt-[10px]">创建你的账号</p>
        </div>

        <div className="bg-white p-[30px] sm:p-[40px] rounded-[20px]">
          <form onSubmit={handleRegister} className="flex flex-col gap-[16px]">
            <div>
              <label className="text-[14px] font-medium text-[#333] mb-[6px] block">
                姓名
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入你的姓名"
                className="w-full px-[14px] py-[10px] text-[14px] border border-[#E5E5E5] rounded-[6px] bg-[#F8F5F0] outline-none focus:border-[#B39B7E]"
              />
            </div>

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
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="至少6位密码"
                className="w-full px-[14px] py-[10px] text-[14px] border border-[#E5E5E5] rounded-[6px] bg-[#F8F5F0] outline-none focus:border-[#B39B7E]"
              />
            </div>

            <div>
              <label className="text-[14px] font-medium text-[#333] mb-[6px] block">
                确认密码
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="请再次输入密码"
                className="w-full px-[14px] py-[10px] text-[14px] border border-[#E5E5E5] rounded-[6px] bg-[#F8F5F0] outline-none focus:border-[#B39B7E]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-[12px] text-[16px] disabled:opacity-50"
            >
              {loading ? "注册中..." : "注册"}
            </button>
          </form>

          <div className="text-center mt-[16px]">
            <Link href="/login" className="text-[13px] text-[#B39B7E] hover:underline">
              已有账号？去登录
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
