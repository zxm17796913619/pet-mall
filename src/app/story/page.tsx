import Link from "next/link";

export default function StoryPage() {
  return (
    <div className="max-w-[760px] mx-auto px-[20px] sm:px-[40px] py-[60px] sm:py-[80px]">
      <h1
        className="text-[28px] sm:text-[36px] font-bold text-[#8C7355] text-center mb-[40px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        品牌故事
      </h1>

      <div className="text-[14px] sm:text-[16px] text-[#666] leading-[32px] sm:leading-[38px] space-y-[24px]">
        <p>
          Nonta 的诞生，源自对宠物那份无可替代的爱。我们相信，每一只宠物都是家庭中独特而珍贵的成员。它们用无声的陪伴，填满了我们生活中的每一个空隙。
        </p>
        <p>
          品牌以一只可爱的水獭 Nonta 为灵感。水獭聪慧、活泼、充满好奇心——正如我们身边那些可爱的毛孩子们。Nonta 不仅是一个品牌符号，更是我们对宠物世界的理解：真诚、温暖、始终如一。
        </p>
        <p>
          我们走访全球优质工厂，精选安全环保的材料，将功能性与设计美学融合进每一件产品中。从宠物窝垫到智能饮水机，从牵引绳到益智玩具——每一件 Nonta 出品，都承载着我们对品质的执着追求。
        </p>
        <p>
          宠物是我们的家人，是生活中最温暖的陪伴。Nonta 愿与你一起，为这份珍贵的陪伴创造更美好的每一天。
        </p>
      </div>

      <div className="text-center mt-[60px]">
        <Link href="/products" className="btn-primary">
          探索 Nonta 产品
        </Link>
      </div>
    </div>
  );
}
