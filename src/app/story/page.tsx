import Link from "next/link";
import { Heart, Star, Sparkles, Smile } from "lucide-react";

export default function StoryPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-stone-100 section-padding">
        <div className="container-page max-w-[720px] text-center">
          <span className="badge bg-white text-stone-500 mb-4">Brand Story</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Nonta 的故事
          </h1>
          <p className="text-base sm:text-lg text-stone-500 leading-relaxed">
            一只水獭，一份热爱，一个关于陪伴的品牌
          </p>
        </div>
      </section>

      {/* Chapter 1 */}
      <section className="section-padding bg-white">
        <div className="container-page max-w-[720px]">
          <div className="flex items-center gap-3 mb-8">
            <Heart size={20} className="text-stone-400" />
            <span className="text-xs text-stone-400 uppercase tracking-widest">第一章</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-8" style={{ fontFamily: "var(--font-display)" }}>
            一切始于一只水獭
          </h2>
          <div className="prose-custom space-y-6 text-[15px] sm:text-base text-stone-600 leading-relaxed">
            <p>
              Nonta 的诞生，源于创始人对宠物的那种无法言说的深爱。
              品牌的名字来源于一只名叫 Nonta 的水獭——聪慧、灵动、充满好奇心，
              正如我们身边的每一只毛孩子。
            </p>
            <p>
              我们相信，宠物不仅仅是生活中的陪伴者，更是家庭中不可或缺的成员。
              它们用无声的守候，填满了我们生命中的每一个空隙。
              正是这份信念，驱使我们去创造更好的产品——不仅满足功能需求，
              更能承载那份人与宠物之间独特的情感。
            </p>
            <p>
              「宠物与人的温柔时光」——这是 Nonta 的品牌信条，也是我们每一天工作的动力。
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 2 */}
      <section className="section-padding bg-stone-50">
        <div className="container-page max-w-[720px]">
          <div className="flex items-center gap-3 mb-8">
            <Star size={20} className="text-stone-400" />
            <span className="text-xs text-stone-400 uppercase tracking-widest">第二章</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-8" style={{ fontFamily: "var(--font-display)" }}>
            功能与美的融合
          </h2>
          <div className="prose-custom space-y-6 text-[15px] sm:text-base text-stone-600 leading-relaxed">
            <p>
              在 Nonta，我们追求的不只是「能用」——而是每一件产品都兼具实用功能与优雅设计。
              从宠物窝垫到智能饮水机，从牵引绳到益智玩具，每一件产品都经过严格甄选，
              只为给爱宠带来最安心的守护。
            </p>
            <p>
              我们走访全球优质工厂，精选安全环保的材料。亲肤绒布、天然牛皮、食品级塑料——
              每一个材质的选择，都以宠物的安全与舒适为第一优先级。
            </p>
            <p>
              以水獭 Nonta 为灵感，我们不仅追求产品功能上的极致，
              更希望通过温柔的设计语言，让每一件 Nonta 产品都能融入你的家居生活，成为美好日常的一部分。
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 3 */}
      <section className="section-padding bg-white">
        <div className="container-page max-w-[720px]">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles size={20} className="text-stone-400" />
            <span className="text-xs text-stone-400 uppercase tracking-widest">第三章</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-8" style={{ fontFamily: "var(--font-display)" }}>
            宠物是家人
          </h2>
          <div className="prose-custom space-y-6 text-[15px] sm:text-base text-stone-600 leading-relaxed">
            <p>
              我们常说，宠物是我们选择的家人。它们用一生的时间陪伴我们，
              而我们要做的，就是让这段陪伴尽可能温暖而美好。
            </p>
            <p>
              Nonta 希望成为连接人与宠物之间的那座桥梁——
              用优质的产品，守护每一次依偎、每一场散步、每一个平凡而珍贵的日常。
            </p>
            <p>
              未来的路还很长，我们会继续坚持初心，为每一个养宠家庭带来更多温暖与惊喜。
              感谢你选择 Nonta，与我们一起守护这份珍贵的陪伴。
            </p>
          </div>

          <div className="mt-12 p-8 bg-stone-50 rounded-2xl text-center">
            <Smile size={28} className="text-stone-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-stone-700 mb-2" style={{ fontFamily: "var(--font-display)" }}>
              Nonta，让宠物生活更丰富
            </p>
            <p className="text-sm text-stone-500">Nonta、ペットとの暮らしをもっと豊かに。</p>
          </div>
        </div>
      </section>

      <div className="container-page pb-20 text-center">
        <Link href="/products" className="btn-primary px-8 py-3 text-[15px]">
          探索 Nonta 产品
        </Link>
      </div>
    </div>
  );
}
