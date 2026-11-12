import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Mountain,
  MapPin,
  Trees,
  Sprout,
  Compass,
  ArrowRight,
  ShieldCheck,
  Heart,
  Droplets,
  Share2,
  Phone,
  Sun,
  Wind,
  Layers,
  Sparkles,
  Users,
} from 'lucide-react';
import { Region } from '../types';
import { useContent } from '../context/ContentContext';
import { ParallaxImage } from './ParallaxImage';
import { Footer } from './Footer';
import { FloatingContactButtons } from './FloatingContactButtons';

interface OriginsPageProps {
  onBackToHome: () => void;
  onSelectRegion: (region: Region) => void;
  onExploreProducts: () => void;
  onShowToast?: (msg: string) => void;
}

export const OriginsPage: React.FC<OriginsPageProps> = ({
  onBackToHome,
  onSelectRegion,
  onExploreProducts,
  onShowToast,
}) => {
  const { siteData } = useContent();
  const [selectedAltitudeFilter, setSelectedAltitudeFilter] = useState<'all' | 'high' | 'mid' | 'coast'>('all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Vùng Nguyên Liệu Đặc Trưng • VSA LAB',
        text: 'Khám phá 3 vùng đất nguyên sinh lưu giữ nguồn dược liệu quý của VSA LAB.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) onShowToast('✓ Đã sao chép liên kết vùng nguyên liệu');
    }
  };

  const regions = siteData.regions || [];

  return (
    <article className="min-h-screen bg-[#FAF6F0] text-[#241D17] antialiased selection:bg-[#8C521E] selection:text-white flex flex-col">
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E5DAC4] shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            id="origins-back-home-btn"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8C521E] hover:text-[#5E320E] transition-colors py-2 px-3 rounded-lg hover:bg-[#EFE5D3] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Trở về trang chủ</span>
          </button>

          <div className="flex items-center gap-2 text-center">
            <span className="font-serif text-base sm:text-lg font-bold text-[#241D17] tracking-tight">
              Vùng Nguyên Liệu
            </span>
            <span className="text-[10px] sm:text-xs text-[#7A6B5A] hidden sm:inline">
              • VSA LAB Terroir & Ecosystem
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs text-[#5E5144] hover:text-[#241D17] p-2 rounded-lg hover:bg-[#EFE5D3] transition-colors cursor-pointer"
              title="Chia sẻ trang"
            >
              <Share2 className="w-4 h-4 text-[#8C521E]" />
              <span className="hidden sm:inline">Chia sẻ</span>
            </button>
            <a
              href="tel:0833153388"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8C521E] hover:bg-[#724116] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">0833 153 388</span>
            </a>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-[#F4ECDC] border-b border-[#E5DAC4] py-2.5 px-4 sm:px-6 text-xs text-[#6B5C4D]">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <button onClick={onBackToHome} className="hover:text-[#8C521E] font-medium">Trang chủ</button>
          <span>/</span>
          <span className="font-bold text-[#241D17]">Vùng nguyên liệu đặc trưng</span>
        </div>
      </div>

      {/* Hero Banner with Panoramic Mountain & Forest Photography */}
      <section className="relative bg-[#1A1512] text-[#FAF5EB] py-16 sm:py-24 overflow-hidden border-b border-[#3B3028]">
        <div className="absolute inset-0 z-0 opacity-35">
          <img
            src="/images/background/vung-nguyen-lieu-dai-ngan-tay-giang.jpg"
            alt="Đại ngàn rừng nguyên sinh Tây Giang"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1512] via-[#1A1512]/75 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#E6C285] text-xs font-semibold mb-6">
            <Mountain className="w-3.5 h-3.5" />
            <span>Thổ Nhưỡng & Khí Hậu Tinh Tuyển</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.2] mb-4">
            Vùng Nguyên Liệu Bản Địa VSA LAB
          </h1>

          <p className="font-serif text-lg sm:text-2xl text-[#E6C285] font-medium italic mb-5">
            Mỗi miền đất – Một thổ nhưỡng – Một câu chuyện hương thơm
          </p>

          <p className="text-sm sm:text-base text-[#DDD0BC] font-sans max-w-2xl mx-auto leading-relaxed">
            Chúng tôi không canh tác công nghiệp đại trà. Từng loại dược liệu của VSA LAB được gìn giữ ngay tại cái nôi tự nhiên nguyên bản nhất: từ đỉnh Trường Sơn mù sương, đồi đỏ bazan miền Trung đến vùng đệm rừng ngập nước Cố đô.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-10 pt-8 border-t border-white/15">
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#E6C285]">3</p>
              <p className="text-xs text-[#DDD0BC] mt-1 font-medium">Vùng thổ nhưỡng cốt lõi</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#E6C285]">1.200m</p>
              <p className="text-xs text-[#DDD0BC] mt-1 font-medium">Độ cao đỉnh Trường Sơn</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#E6C285]">100%</p>
              <p className="text-xs text-[#DDD0BC] mt-1 font-medium">Canh tác hữu cơ & tự nhiên</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#E6C285]">200+</p>
              <p className="text-xs text-[#DDD0BC] mt-1 font-medium">Hộ nông dân & HTX bản địa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16 flex-1">
        {/* Philosophy Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F4ECDC] border border-[#DDD0BC] shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[#8C521E] text-white flex items-center justify-center shrink-0 shadow-md">
            <Compass className="w-7 h-7" />
          </div>
          <div className="space-y-1 text-center md:text-left flex-1">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241D17]">
              Triết lý Terroir: Hương thơm sinh ra từ đất mẹ
            </h3>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Cũng như rượu vang cao cấp, chất lượng tinh dầu phụ thuộc sống còn vào vi khí hậu, thành phần khoáng trong đất và lượng mưa hàng năm. VSA LAB hợp tác chặt chẽ cùng các hợp tác xã nông dân và bà con đồng bào để thu hái đúng tiết trời, giữ trọn hàm lượng đơn chất tự nhiên quý giá.
            </p>
          </div>
          <button
            onClick={onExploreProducts}
            className="px-5 py-2.5 rounded-full bg-[#8C521E] hover:bg-[#724116] text-white text-xs font-semibold shrink-0 transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Khám phá sản phẩm</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Detailed Region Cards Grid */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest font-bold text-[#8C521E]">
              Bản Đồ Nguồn Nguyên Liệu
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] mt-1">
              3 Vùng Đất Nguyên Bản Của VSA LAB
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Bấm vào từng vùng đất để tìm hiểu sâu về điều kiện tự nhiên, bà con nông dân và dược liệu tiêu biểu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regions.map((region) => {
              return (
                <div
                  key={region.id}
                  id={`origins-page-card-${region.id}`}
                  className="bg-[#FCFAF6] rounded-2xl border border-[#DDD0BC] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE7D8]">
                    <img
                      src={region.image}
                      alt={region.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#241D17]/85 backdrop-blur-xs text-xs font-bold text-white shadow-xs">
                      {region.province}
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-semibold text-[#8C521E] shadow-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{region.province}</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-[#8C521E] uppercase tracking-wider">
                          Đặc trưng sinh thái
                        </span>
                        <span className="text-xs text-stone-500 font-mono">
                          {region.altitude || 'Vùng khí hậu đặc trưng'}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-[#241D17] group-hover:text-[#8C521E] transition-colors">
                        {region.name}
                      </h3>
                      <p className="text-xs font-medium text-[#7A6B5A] mt-1 italic">
                        "{region.tagline || region.description}"
                      </p>

                      <p className="text-stone-700 text-sm leading-relaxed mt-3 line-clamp-3">
                        {region.fullStory || region.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E8DEC9] space-y-3">
                      <div>
                        <span className="text-[11px] font-bold text-stone-600 block uppercase tracking-wider mb-1.5">
                          Dược liệu thu hái:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {region.herbs?.map((herb, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-full bg-[#EFE5D3] text-[#554230] text-xs font-medium"
                            >
                              {herb}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1.5 text-xs text-stone-600">
                          <Users className="w-4 h-4 text-[#8C521E]" />
                          <span className="line-clamp-1">{region.climate || 'Bà con bản địa'}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => onSelectRegion(region)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C521E] group-hover:text-[#5E320E] group-hover:translate-x-1 transition-all cursor-pointer py-1 px-3 rounded-lg bg-[#FAF3E5] hover:bg-[#EBDDC8]"
                        >
                          <span>Xem câu chuyện vùng</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commitment Charter */}
        <section className="rounded-3xl bg-[#201A16] text-[#FAF5EB] p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#E6C285] uppercase tracking-widest">
              Cam Kết Sinh Thái Bền Vững
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              3 Nguyên Tắc Vàng Khi Khai Thác Rừng & Vùng Trồng
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E6C285]/20 text-[#E6C285] flex items-center justify-center">
                <Trees className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-white">1. Không Khai Thác Tận Diệt</h4>
              <p className="text-xs sm:text-sm text-[#DDD0BC] leading-relaxed">
                Chỉ thu hái quả chín tự nhiên, cành tỉa sinh học và lá già đạt hàm lượng tinh dầu cao nhất. Tuyệt đối không chặt hạ thân gỗ hay phá vỡ thảm thực vật rừng cổ thụ.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E6C285]/20 text-[#E6C285] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-white">2. Sinh Kế Công Bằng Cho Bà Con</h4>
              <p className="text-xs sm:text-sm text-[#DDD0BC] leading-relaxed">
                Bao tiêu sản lượng với mức giá cao hơn thị trường 20-30%, cung cấp kỹ thuật chưng cất nồi đồng đạt chuẩn phòng thí nghiệm và hỗ trợ giống cây dược liệu thuần chủng.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E6C285]/20 text-[#E6C285] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-white">3. Kiểm Định Sắc Ký Từng Mẻ</h4>
              <p className="text-xs sm:text-sm text-[#DDD0BC] leading-relaxed">
                Mỗi mẻ tinh dầu từ các vùng đều được trung tâm kiểm nghiệm kiểm tra chỉ số GC-MS (Gas Chromatography) để loại bỏ hoàn toàn dư lượng thuốc bảo vệ thực vật hay tạp chất.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(id) => {
          if (id === 'hero' || id === 'home') onBackToHome();
        }}
        onShowToast={onShowToast || (() => {})}
        onOpenLegal={() => {}}
      />
      <FloatingContactButtons />
    </article>
  );
};
