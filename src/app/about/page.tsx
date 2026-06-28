import Link from "next/link";
import { STORE } from "@/lib/constants";
import { Phone, Mail, MapPin, Clock, Package, HelpCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-stone-100 section-padding">
        <div className="container-page max-w-[720px] text-center">
          <span className="badge bg-white text-stone-500 mb-4">About</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            关于 Nonta
          </h1>
          <p className="text-stone-500">宠物与人的温柔时光</p>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding bg-white">
        <div className="container-page max-w-[720px] space-y-12">
          {/* 公司简介 */}
          <div>
            <h2 className="text-xl font-bold text-stone-800 mb-4">公司简介</h2>
            <p className="text-[15px] text-stone-600 leading-relaxed">
              Nonta 是一家专注于宠物用品设计、研发与销售的品牌。
              我们以水獭 Nonta 为灵感，致力于为全球养宠家庭提供兼具功能性与优雅设计的高品质宠物产品。
              从宠物窝垫到智能饮水机，从牵引绳到美容护理用品——每一件 Nonta 出品，都承载着我们对品质的坚持与对宠物的热爱。
            </p>
          </div>

          {/* 联系方式 */}
          <div>
            <h2 className="text-xl font-bold text-stone-800 mb-5">联系方式</h2>
            <div className="card p-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <Phone size={16} className="text-stone-400 shrink-0" />
                <span>电话：{STORE.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <Mail size={16} className="text-stone-400 shrink-0" />
                <span>邮箱：{STORE.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <MapPin size={16} className="text-stone-400 shrink-0" />
                <span>地址：{STORE.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <Clock size={16} className="text-stone-400 shrink-0" />
                <span>客服时间：周一至周五 9:00 – 18:00</span>
              </div>
            </div>
          </div>

          {/* 常见问题 */}
          <div>
            <h2 className="text-xl font-bold text-stone-800 mb-5">常见问题</h2>
            <div className="space-y-4">
              {[
                {
                  q: "如何下单？",
                  a: "浏览商品 → 加入购物车 → 填写收货地址 → 提交订单。完成付款后，我们将尽快为您安排发货。",
                },
                {
                  q: "配送方式和时效？",
                  a: "满 99 元包邮，默认发中通快递。全国大部分地区 3–5 个工作日送达。特殊地区可能略有延迟。",
                },
                {
                  q: "如何退换货？",
                  a: "签收后 7 天内支持无理由退换。请联系客服获取退换地址及流程。退回商品需保持原包装完整。",
                },
                {
                  q: "如何查询订单？",
                  a: "登录账号后进入「个人中心 → 我的订单」，即可查看所有订单的实时状态。",
                },
              ].map((faq, i) => (
                <details key={i} className="card p-5 group cursor-pointer">
                  <summary className="flex items-center justify-between text-[15px] font-medium text-stone-700 list-none">
                    {faq.q}
                    <HelpCircle size={16} className="text-stone-300 group-open:text-stone-500 transition-colors" />
                  </summary>
                  <p className="mt-3 text-sm text-stone-500 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* 产品指南 */}
          <div>
            <h2 className="text-xl font-bold text-stone-800 mb-5">产品指南</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Package, title: "狗狗专区", desc: "窝垫、咬胶、牵引绳、益智玩具" },
                { icon: Package, title: "猫咪专区", desc: "猫砂、饮水机、外出包、美容梳" },
                { icon: Package, title: "小宠专区", desc: "仓鼠、兔子、鸟类用品" },
                { icon: Package, title: "食品营养", desc: "天然宠粮、零食、营养补充" },
                { icon: Package, title: "出行装备", desc: "航空箱、背包、车载安全" },
                { icon: Package, title: "美容护理", desc: "沐浴露、毛巾、指甲剪、毛刷" },
              ].map((item) => (
                <div key={item.title} className="card p-5 flex items-start gap-4">
                  <item.icon size={20} className="text-stone-400 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-stone-700 mb-1">{item.title}</h3>
                    <p className="text-xs text-stone-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container-page pb-20 text-center">
        <Link href="/products" className="btn-outline">
          去选购
        </Link>
      </div>
    </div>
  );
}
