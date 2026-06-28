import Link from "next/link";
import { STORE } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="max-w-[760px] mx-auto px-[20px] sm:px-[40px] py-[60px] sm:py-[80px]">
      <h1
        className="text-[28px] sm:text-[36px] font-bold text-[#8C7355] text-center mb-[40px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        关于我们
      </h1>

      <div className="bg-white p-[30px] sm:p-[40px] rounded-[20px] space-y-[20px]">
        <div>
          <h3 className="text-[16px] font-bold text-[#333] mb-[8px]">公司简介</h3>
          <p className="text-[14px] text-[#666] leading-[26px]">
            Nonta 是一家专注于宠物用品设计、研发与销售的品牌。我们致力于为全球养宠家庭提供高品质、高性价比的宠物产品。
          </p>
        </div>

        <div>
          <h3 className="text-[16px] font-bold text-[#333] mb-[8px]">联系方式</h3>
          <div className="text-[14px] text-[#666] leading-[26px] space-y-[4px]">
            <p>📞 电话：{STORE.phone}</p>
            <p>📧 邮箱：{STORE.email}</p>
            <p>📍 地址：{STORE.address}</p>
            <p>🕐 客服时间：周一至周五 9:00 - 18:00</p>
          </div>
        </div>

        <div>
          <h3 className="text-[16px] font-bold text-[#333] mb-[8px]">常见问题</h3>
          <div className="text-[14px] text-[#666] leading-[26px] space-y-[12px]">
            <div>
              <p className="font-medium text-[#333]">Q: 如何下单？</p>
              <p>A: 浏览商品 → 加入购物车 → 填写收货地址 → 提交订单。付款后我们会尽快为您发货。</p>
            </div>
            <div>
              <p className="font-medium text-[#333]">Q: 配送方式？</p>
              <p>A: 满99元包邮，默认发中通快递。全国3-5个工作日送达。</p>
            </div>
            <div>
              <p className="font-medium text-[#333]">Q: 如何退换货？</p>
              <p>A: 签收后7天内支持无理由退换。请联系客服获取退换流程。</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-[40px]">
        <Link href="/products" className="btn-brand-outline">
          去选购
        </Link>
      </div>
    </div>
  );
}
