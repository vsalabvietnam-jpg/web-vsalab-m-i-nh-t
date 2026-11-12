import React, { useEffect, useState, useMemo } from 'react';
import {
  ArrowLeft,
  Share2,
  Phone,
  MessageCircle,
  Star,
  CheckCircle2,
  ShieldCheck,
  Droplets,
  MapPin,
  Sparkles,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  Flame,
  Clock,
  Heart,
  Truck,
  RotateCcw,
  BadgeCheck,
  Leaf,
  Info,
  Maximize2,
  X,
  ExternalLink,
  Edit3,
  BookOpen,
  Compass,
  Quote
} from 'lucide-react';
import { Product } from '../types';
import { useContent } from '../context/ContentContext';
import { CATALOG_PRODUCTS } from '../data/catalogData';
import { PRODUCT_STORIES } from '../data/productStories';

interface ProductDetailPageProps {
  product: Product;
  onBackToHome: () => void;
  onBackToProducts: () => void;
  onSelectProduct: (product: Product) => void;
  onShowToast?: (msg: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product: propProduct,
  onBackToHome,
  onBackToProducts,
  onSelectProduct,
  onShowToast,
}) => {
  const { siteData, isAdmin, openCms } = useContent();
  // Sync with dynamic siteData if product was updated in CMS
  const product = useMemo(() => {
    return siteData.products?.find((p) => p.id === propProduct.id) || propProduct;
  }, [siteData.products, propProduct]);

  const isEcoCleaner = useMemo(() => {
    return (
      product.category === 'che-pham-thao-moc' ||
      product.id.includes('lau-san') ||
      product.id.includes('tay-rua') ||
      product.id.includes('gel-rua-tay') ||
      product.id.includes('xit-vai')
    );
  }, [product.category, product.id]);

  const isEssentialOil = useMemo(() => {
    return (
      !isEcoCleaner &&
      (Boolean(product.category?.startsWith('tinh-dau')) ||
        product.id.startsWith('tinh-dau') ||
        Boolean(product.volumes && product.volumes.length > 0))
    );
  }, [isEcoCleaner, product.category, product.id, product.volumes]);

  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'usage' | 'quality'>('details');
  const [selectedVolume, setSelectedVolume] = useState<string>(() => {
    if (!isEcoCleaner && (product.category?.startsWith('tinh-dau') || product.id.startsWith('tinh-dau'))) {
      return '10ml';
    }
    return product.volume || 'Tiêu chuẩn';
  });
  const [isImageLightboxOpen, setIsImageLightboxOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (isEssentialOil) {
      setSelectedVolume('10ml');
    } else {
      setSelectedVolume(product.volume || 'Tiêu chuẩn');
    }
  }, [product.id, isEssentialOil, product.volume]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${product.name} | VSALAB - Tinh Hoa Thiên Nhiên`,
          text: product.description,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      if (onShowToast) onShowToast('✓ Đã sao chép liên kết sản phẩm vào bộ nhớ tạm');
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  // Related products from same or different categories
  const relatedProducts = useMemo(() => {
    const list = siteData.products?.length ? siteData.products : CATALOG_PRODUCTS;
    const sameCategory = list.filter((p) => p.id !== product.id && p.category === product.category);
    if (sameCategory.length >= 3) {
      return sameCategory.slice(0, 4);
    }
    const others = list.filter((p) => p.id !== product.id && p.category !== product.category);
    return [...sameCategory, ...others].slice(0, 4);
  }, [siteData.products, product]);

  // Dedicated Product Story
  const productStory = useMemo(() => {
    const fallback = PRODUCT_STORIES[product.id];
    return {
      chapterTitle: product.storyChapterTitle || fallback?.storyChapterTitle || `Hành Trình Tinh Túy Từ ${product.name}`,
      quote: product.storyQuote || fallback?.storyQuote || 'Mỗi giọt tinh dầu là một câu chuyện về sự giao hòa giữa đất trời và bàn tay người làm khoa học.',
      story: product.story || fallback?.story || product.description,
      terroirNote: fallback?.terroirNote || `Vùng nguyên liệu ${product.origin} với điều kiện thổ nhưỡng và khí hậu đặc trưng tạo nên chất lượng vượt trội.`,
      harvestRitual: fallback?.harvestRitual || 'Thu hái đúng thời điểm hoàng kim khi hàm lượng hoạt chất thơm đạt đỉnh cao nhất trong ngày.',
    };
  }, [product]);

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#241D17]">
      {/* 1. Top Breadcrumb & Navigation Bar */}
      <div className="bg-[#F3ECE1] border-b border-[#E2D5C1] sticky top-0 z-30 shadow-2xs backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#6C5B4C] overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={onBackToHome}
              className="hover:text-[#8C521E] transition-colors whitespace-nowrap cursor-pointer font-medium"
            >
              Trang chủ
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <button
              onClick={onBackToProducts}
              className="hover:text-[#8C521E] transition-colors whitespace-nowrap cursor-pointer font-medium"
            >
              Sản phẩm
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="text-[#8C521E] font-semibold truncate max-w-[200px] sm:max-w-xs">
              {product.name}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isAdmin && (
              <button
                onClick={() => openCms('products')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8C521E]/10 border border-[#8C521E]/30 text-[#8C521E] text-xs font-semibold hover:bg-[#8C521E]/20 transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Sửa sản phẩm</span>
              </button>
            )}

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#DDD0BC] text-[#55493D] hover:text-[#8C521E] hover:border-[#8C521E] text-xs font-medium shadow-2xs transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#8C521E]" />
              <span className="hidden sm:inline">{isCopied ? 'Đã sao chép' : 'Chia sẻ'}</span>
            </button>

            <button
              onClick={onBackToProducts}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#8C521E] text-white hover:bg-[#724116] text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Product Showcase Section */}
      <section className="py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Product Imagery & Certifications (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-white border border-[#DDD0BC] shadow-sm group">
              <div
                className="relative aspect-square cursor-zoom-in overflow-hidden bg-[#F7F2E8] flex items-center justify-center"
                onClick={() => setIsImageLightboxOpen(true)}
              >
                <img
                  src={product.image || '/images/products/tinh-dau-cam-rung-chai-30ml.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/products/tinh-dau-cam-rung-chai-30ml.jpg';
                  }}
                />

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#8C521E] text-white text-[11px] font-bold shadow-md tracking-wider uppercase">
                    <Sparkles className="w-3 h-3 text-[#F5EDE1]" />
                    <span>{product.badge || 'Chính hãng VSA LAB'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#241D17] text-[11px] font-semibold shadow-2xs border border-[#DDD0BC]">
                    <MapPin className="w-3 h-3 text-[#B2641E]" />
                    <span>{product.origin}</span>
                  </span>
                </div>

                {/* Zoom Hint */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsImageLightboxOpen(true);
                  }}
                  className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors backdrop-blur-xs cursor-pointer shadow-md"
                  title="Xem ảnh kích thước lớn"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quality & Traceability Feature Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#F4EDE2] border border-[#DDD0BC] flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#8C521E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#241D17]">Kiểm nghiệm GC-MS</h4>
                  <p className="text-[11px] text-[#6C5B4C] leading-snug mt-0.5">
                    100% tinh khiết, không pha tạp dung môi công nghiệp
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F4EDE2] border border-[#DDD0BC] flex items-start gap-2.5">
                <Leaf className="w-5 h-5 text-[#376945] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#241D17]">Dược liệu bản địa</h4>
                  <p className="text-[11px] text-[#6C5B4C] leading-snug mt-0.5">
                    Hợp tác xã vùng cao thu hái bền vững, giữ rừng
                  </p>
                </div>
              </div>
            </div>

            {/* Batch & Manufacturing Information Note */}
            <div className="p-4 rounded-xl bg-white border border-[#DDD0BC] text-xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-[#6C5B4C]">Mã lô kiểm định:</span>
                <span className="font-mono font-bold text-[#8C521E]">{product.batchNo || 'VSA-2026/LOT.08'}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-[#6C5B4C]">Quy cách chuẩn:</span>
                <span className="font-semibold text-[#241D17]">
                  {product.id === 'gel-rua-tay-thao-moc' || product.name.toLowerCase().includes('gel rửa tay')
                    ? '300ml'
                    : isEssentialOil
                    ? `Chai 10ml & 30ml (Đang chọn: ${selectedVolume})`
                    : product.volume || 'Tiêu chuẩn'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6C5B4C]">Hạn bảo quản:</span>
                <span className="font-semibold text-emerald-800">{product.expDate || '24-36 tháng từ NSX'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: In-depth Product Details, Aromatherapy & Ordering (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                <span className="text-xs font-bold text-[#8C521E] uppercase tracking-wider bg-[#EBDDC8] px-2.5 py-1 rounded-md">
                  {isEcoCleaner ? 'Chế Phẩm Thảo Mộc Sinh Học' : 'Tinh Dầu Thiên Nhiên Nguyên Chất'}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[#B2641E]">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#B2641E] text-[#B2641E]" />
                    ))}
                  </div>
                  <span className="font-bold text-[#241D17]">{product.rating || '5.0'}</span>
                  <span className="text-[#6D5E50] text-[11px]">({product.reviewsCount} đánh giá kiểm nghiệm)</span>
                </div>
              </div>

              {/* Title & Nomenclature */}
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#241D17] leading-tight">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs sm:text-sm text-[#7A6B5A]">
                <span className="font-serif italic font-medium">{product.botanicalName}</span>
                {product.englishName && (
                  <>
                    <span className="text-stone-300">•</span>
                    <span>{product.englishName}</span>
                  </>
                )}
              </div>

              {product.tagline && (
                <p className="mt-3 text-xs sm:text-sm text-[#8C521E] font-medium italic border-l-2 border-[#8C521E] pl-3">
                  "{product.tagline}"
                </p>
              )}
            </div>

            {/* Olfactory / Scent Notes Profile Box */}
            <div className="p-4 rounded-xl bg-[#F6EFE3] border border-[#E3D6C1]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8C521E] uppercase tracking-wider mb-1.5">
                <Droplets className="w-4 h-4 text-[#B2641E]" />
                <span>Nốt hương &amp; Cảm thụ giác quan</span>
              </div>
              <p className="text-xs sm:text-sm text-[#4E4236] leading-relaxed">
                {product.scentNotes}
              </p>
            </div>

            {/* Description Summary */}
            <div className="text-sm text-[#55493D] leading-relaxed space-y-2">
              <p>{product.description}</p>
            </div>

            {/* Key Benefits Checklist */}
            {product.benefits && product.benefits.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-[#241D17] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C521E]" />
                  <span>Công dụng nổi bật đã kiểm chứng:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2.5 rounded-lg bg-white border border-[#DDD0BC]/80 shadow-2xs text-xs text-[#3D3228]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Volume Selection: 2 standard sizes (10ml & 30ml) for essential oils, or product volume for bio-cleaners */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDD0BC] shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 pb-2.5 border-b border-stone-100">
                <div>
                  <span className="text-xs font-bold text-[#241D17] uppercase tracking-wider block">
                    {isEssentialOil ? 'Dung tích chuẩn VSA LAB (2 loại: 10ml & 30ml)' : 'Dung tích / Quy cách đóng gói'}
                  </span>
                  <span className="text-[11px] text-[#7A6B5A]">
                    {isEssentialOil
                      ? 'Tất cả sản phẩm tinh dầu VSA LAB được đóng gói 2 loại chai chuẩn: 10ml và 30ml'
                      : 'Quy chuẩn đóng gói đạt chứng nhận kiểm nghiệm an toàn VSA LAB'}
                  </span>
                </div>
                <span className="text-xs text-[#8C521E] font-semibold flex items-center gap-1 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isEssentialOil ? 'Thủy tinh hổ phách nắp giọt' : 'Bao bì chuẩn sinh học'}</span>
                </span>
              </div>

              {isEssentialOil ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Option 1: 10ml */}
                    <button
                      type="button"
                      id="btn-select-volume-10ml"
                      onClick={() => setSelectedVolume('10ml')}
                      className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                        selectedVolume === '10ml'
                          ? 'border-[#8C521E] bg-[#FAF3E8] shadow-xs ring-1 ring-[#8C521E]/30'
                          : 'border-[#DDD0BC] bg-[#FCFAF6] hover:border-[#B2641E]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <Droplets className={`w-4 h-4 ${selectedVolume === '10ml' ? 'text-[#8C521E]' : 'text-stone-400'}`} />
                          <span className="font-serif font-bold text-base text-[#241D17]">Chai 10ml</span>
                        </div>
                        {selectedVolume === '10ml' ? (
                          <span className="text-[10px] font-bold text-white bg-[#8C521E] px-2 py-0.5 rounded-full">
                            Đang chọn
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-[#7A6B5A] bg-[#EFE7D8] px-2 py-0.5 rounded-full">
                            Bấm chọn
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#6C5B4C] leading-snug">
                        Dạng nắp nhỏ giọt tiện lợi • Bỏ túi mang theo, dùng thử nghiệm nốt hương
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-[#8C521E] font-medium">
                        <span>Nhỏ giọt định lượng</span>
                        <span>~200-250 giọt nguyên chất</span>
                      </div>
                    </button>

                    {/* Option 2: 30ml */}
                    <button
                      type="button"
                      id="btn-select-volume-30ml"
                      onClick={() => setSelectedVolume('30ml')}
                      className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                        selectedVolume === '30ml'
                          ? 'border-[#8C521E] bg-[#FAF3E8] shadow-xs ring-1 ring-[#8C521E]/30'
                          : 'border-[#DDD0BC] bg-[#FCFAF6] hover:border-[#B2641E]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <Droplets className={`w-4 h-4 ${selectedVolume === '30ml' ? 'text-[#8C521E]' : 'text-stone-400'}`} />
                          <span className="font-serif font-bold text-base text-[#241D17]">Chai 30ml</span>
                        </div>
                        {selectedVolume === '30ml' ? (
                          <span className="text-[10px] font-bold text-white bg-[#8C521E] px-2 py-0.5 rounded-full">
                            Đang chọn
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-[#8C521E] bg-[#EFE4D2] px-2 py-0.5 rounded-full">
                            Tiết kiệm hơn
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#6C5B4C] leading-snug">
                        Dung tích chuẩn kinh tế • Tiết kiệm 25% chi phí • Thích hợp dùng máy xông &amp; gia đình
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-[#8C521E] font-medium">
                        <span>Tiết kiệm lâu dài</span>
                        <span>~600-750 giọt nguyên chất</span>
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#F5ECE0] text-xs text-[#55493D] border border-[#E5DAC4]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-[#8C521E] shrink-0" />
                      <span>Đang chọn: <strong>Chai {selectedVolume}</strong> ({selectedVolume === '10ml' ? '10ml nhỏ giọt tiện lợi' : '30ml dung tích chuẩn tiết kiệm'})</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C521E] bg-white px-2 py-0.5 rounded">
                      Chính hãng VSA
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  <div className="px-4 py-2.5 rounded-xl bg-[#FAF1E3] border-2 border-[#8C521E] text-[#8C521E] text-xs font-bold flex items-center gap-2">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>
                      {product.id === 'gel-rua-tay-thao-moc' || product.name.toLowerCase().includes('gel rửa tay')
                        ? '300ml'
                        : product.volume}
                    </span>
                    <span className="text-[10px] bg-[#8C521E] text-white px-2 py-0.5 rounded">Quy chuẩn chuẩn hóa</span>
                  </div>
                </div>
              )}
            </div>

            {/* Pricing & Order Action Bar */}
            <div className="p-5 rounded-2xl bg-[#28211B] text-[#FAF5EB] shadow-lg border border-[#483B32] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-white/15">
                <div>
                  <span className="text-xs text-[#DDD0BC] block">Chính sách phân phối &amp; Báo giá</span>
                  <span className="text-lg sm:text-xl font-bold font-serif text-[#E6C285]">
                    {isEssentialOil
                      ? `Báo giá chi tiết loại chai ${selectedVolume}`
                      : 'Liên hệ báo giá chi tiết theo số lượng'}
                  </span>
                </div>
                <div className="text-right sm:text-right">
                  <span className="inline-block px-2.5 py-1 rounded bg-white/10 text-white text-[11px] font-medium">
                    Hỗ trợ giao hàng toàn quốc
                  </span>
                </div>
              </div>

              {/* Action Buttons: Call & Zalo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:0833153388"
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#8C521E] hover:bg-[#724116] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4 text-[#F5EDE1] animate-pulse" />
                  <span>Gọi hotline: 0833-15-3388</span>
                </a>

                <a
                  href="https://zalo.me/0833153388"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#0068FF] hover:bg-[#0056D6] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Tư vấn nhanh qua Zalo</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-[#DDD0BC]">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#E6C285]" />
                  <span>Đóng gói cẩn thận 3 lớp chống vỡ</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#E6C285]" />
                  <span>Đổi mới trong 7 ngày nếu lỗi bể vỡ</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-[#E6C285]" />
                  <span>Cung cấp COA &amp; GC-MS mẻ mẫu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. In-Depth Technical Information & Usage Tabs */}
      <section className="py-12 bg-white border-t border-[#E5DAC4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#E5DAC4] overflow-x-auto no-scrollbar gap-2 sm:gap-4 mb-8">
            {[
              { id: 'details', label: 'Câu chuyện & Xuất xứ', icon: Leaf },
              { id: 'specs', label: 'Chỉ số & Kiểm nghiệm', icon: Award },
              { id: 'usage', label: 'Hướng dẫn sử dụng', icon: Droplets },
              { id: 'quality', label: 'Cam kết chất lượng VSA', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 pb-3 px-3 sm:px-5 font-serif text-sm sm:text-base font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'border-[#8C521E] text-[#8C521E]'
                      : 'border-transparent text-[#6C5B4C] hover:text-[#241D17]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Story & Terroir */}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4 text-sm text-[#4E4236] leading-relaxed">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#EBDDC8] text-[#8C521E] text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Câu chuyện nguyên bản</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241D17]">
                  {productStory.chapterTitle}
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-[#8C521E] border-l-2 border-[#8C521E] pl-3 py-0.5">
                  "{productStory.quote}"
                </p>
                <p>
                  {productStory.story}
                </p>
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#DDD0BC] text-xs space-y-2 mt-4">
                  <div className="flex items-center gap-2 font-bold text-[#8C521E]">
                    <Sparkles className="w-4 h-4" />
                    <span>Quy chuẩn thu hái có trách nhiệm</span>
                  </div>
                  <p className="text-[#55493D]">
                    {productStory.harvestRitual}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#DDD0BC] space-y-3">
                  <h4 className="font-serif font-bold text-[#241D17] text-sm sm:text-base">
                    Đặc tính nhận diện của sản phẩm
                  </h4>
                  <div className="space-y-2.5 text-xs text-[#55493D]">
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-[#8C521E] w-28 shrink-0">Tên khoa học:</span>
                      <span className="font-serif italic">{product.botanicalName}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-[#8C521E] w-28 shrink-0">Nguồn gốc:</span>
                      <span>{product.origin}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-[#8C521E] w-28 shrink-0">Phương pháp:</span>
                      <span>Chưng cất lôi cuốn hơi nước áp suất thấp / Lên men sinh học</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-[#8C521E] w-28 shrink-0">Màu sắc:</span>
                      <span>Trong suốt hoặc ánh vàng nhạt tự nhiên, không cặn</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-[#8C521E] w-28 shrink-0">Độ tinh khiết:</span>
                      <span className="text-emerald-800 font-bold">100% Nguyên chất tự nhiên</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-[#8C521E] w-28 shrink-0">Thổ nhưỡng:</span>
                      <span>{productStory.terroirNote}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Specs & GC-MS Testing */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#DDD0BC]">
                  <span className="text-xs text-[#7A6B5A] block">Kiểm định sắc ký khí</span>
                  <h4 className="font-serif font-bold text-base text-[#241D17] mt-1">Sắc ký khí GC-MS</h4>
                  <p className="text-xs text-[#55493D] mt-2">
                    Xác định chính xác từng thành phần este, monoterpene và aldehyde tự nhiên; đảm bảo không tồn dư hóa chất bảo vệ thực vật hay dung môi hữu cơ.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#DDD0BC]">
                  <span className="text-xs text-[#7A6B5A] block">Tiêu chuẩn vật lý</span>
                  <h4 className="font-serif font-bold text-base text-[#241D17] mt-1">Tỷ trọng &amp; Chỉ số khúc xạ</h4>
                  <p className="text-xs text-[#55493D] mt-2">
                    Đáp ứng nghiêm ngặt Dược điển Việt Nam và Tiêu chuẩn quốc tế ISO cho từng nhóm tinh dầu tự nhiên.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#DDD0BC]">
                  <span className="text-xs text-[#7A6B5A] block">Chứng nhận an toàn</span>
                  <h4 className="font-serif font-bold text-base text-[#241D17] mt-1">An toàn vi sinh</h4>
                  <p className="text-xs text-[#55493D] mt-2">
                    Kiểm nghiệm không có nấm mốc, vi khuẩn hiếu khí hay vi sinh vật gây hại trong suốt quá trình chưng cất và đóng chai.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FCFAF6] border border-[#DDD0BC]">
                <h4 className="font-serif font-bold text-[#241D17] text-base mb-3">
                  Bảng tổng hợp thông số kỹ thuật ({product.name})
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-stone-200">
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-[#8C521E] w-1/3 bg-[#F7F2E8]">Tên thương mại</td>
                        <td className="py-2.5 px-3 font-medium text-[#241D17]">{product.name} ({product.englishName || 'Essential Oil'})</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-[#8C521E] bg-[#F7F2E8]">Tên danh pháp khoa học</td>
                        <td className="py-2.5 px-3 font-serif italic text-[#241D17]">{product.botanicalName}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-[#8C521E] bg-[#F7F2E8]">Vùng trồng &amp; chưng cất</td>
                        <td className="py-2.5 px-3 text-[#241D17]">{product.origin}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-[#8C521E] bg-[#F7F2E8]">Thành phần công bố</td>
                        <td className="py-2.5 px-3 text-[#241D17]">
                          {product.ingredients || '100% tinh chất chiết xuất tự nhiên không pha cồn công nghiệp'}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-[#8C521E] bg-[#F7F2E8]">Quy chuẩn đóng gói</td>
                        <td className="py-2.5 px-3 text-[#241D17]">
                          {isEssentialOil
                            ? 'Có 2 loại quy chuẩn: Chai 10ml & Chai 30ml (Thủy tinh hổ phách tối màu chống quang hóa, nắp nhỏ giọt tinh tế)'
                            : `${product.volume} - Bao bì chuyên dụng kiểm định an toàn VSA LAB`}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-[#8C521E] bg-[#F7F2E8]">Hạn sử dụng</td>
                        <td className="py-2.5 px-3 text-[#241D17]">{product.expDate || '36 tháng kể từ ngày sản xuất'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Usage Guidelines */}
          {activeTab === 'usage' && (
            <div className="space-y-6">
              {isEcoCleaner ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#DDD0BC] space-y-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#8C521E]/15 text-[#8C521E] flex items-center justify-center font-bold">
                      1
                    </div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#241D17]">Pha loãng hoặc xịt trực tiếp</h4>
                    <p className="text-xs text-[#55493D] leading-relaxed">
                      {product.usage || 'Hòa theo tỷ lệ khuyến nghị vào nước sạch để lau sàn nhà, hoặc xịt trực tiếp vào bề mặt dầu mỡ, bồn rửa cần làm sạch.'}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#DDD0BC] space-y-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#8C521E]/15 text-[#8C521E] flex items-center justify-center font-bold">
                      2
                    </div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#241D17]">Lau và làm sạch</h4>
                    <p className="text-xs text-[#55493D] leading-relaxed">
                      Dùng khăn mềm hoặc cây lau nhà lau nhẹ nhàng. Các enzyme hữu cơ tự nhiên sẽ tự động phân giải vết bẩn mà không để lại cặn hóa học.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#DDD0BC] space-y-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#8C521E]/15 text-[#8C521E] flex items-center justify-center font-bold">
                      3
                    </div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#241D17]">Bảo quản an toàn</h4>
                    <p className="text-xs text-[#55493D] leading-relaxed">
                      {product.storage || 'Đậy kín nắp sau khi dùng, bảo quản nơi thoáng mát tránh ánh nắng mặt trời trực tiếp.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#DDD0BC] space-y-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#8C521E]/15 text-[#8C521E] flex items-center justify-center font-bold">
                      1
                    </div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#241D17]">Khuếch tán xông hương</h4>
                    <p className="text-xs text-[#55493D] leading-relaxed">
                      Nhỏ 3-5 giọt vào máy khuếch tán hoặc đèn xông tinh dầu có chứa nước ấm. Sử dụng 30-45 phút trước khi ngủ hoặc khi làm việc để thanh lọc không gian và thư thái tinh thần.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#DDD0BC] space-y-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#8C521E]/15 text-[#8C521E] flex items-center justify-center font-bold">
                      2
                    </div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#241D17]">Massage dưỡng da</h4>
                    <p className="text-xs text-[#55493D] leading-relaxed">
                      Pha loãng 1-2 giọt tinh dầu nguyên chất cùng 10ml dầu dẫn thực vật (dầu dừa, jojoba, hạnh nhân) rồi massage nhẹ nhàng lên các vùng cơ thể. Không bôi trực tiếp tinh dầu đậm đặc lên da nhạy cảm.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#DDD0BC] space-y-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#8C521E]/15 text-[#8C521E] flex items-center justify-center font-bold">
                      3
                    </div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#241D17]">Ngâm chân &amp; Tắm thư giãn</h4>
                    <p className="text-xs text-[#55493D] leading-relaxed">
                      Nhỏ 2-3 giọt vào chậu nước ấm để ngâm chân kích thích tuần hoàn kinh lạc, hoặc hòa cùng muối Epsom ngâm bồn tắm giải tỏa mỏi mệt sau một ngày dài.
                    </p>
                  </div>
                </div>
              )}

              {/* Safety Precautions Box */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold">Lưu ý an toàn khi sử dụng:</span>
                  <p className="leading-relaxed">
                    Tránh tiếp xúc trực tiếp với mắt và vết thương hở. Để xa tầm tay trẻ nhỏ. Phụ nữ mang thai trong 3 tháng đầu nên tham khảo ý kiến chuyên gia trước khi dùng. Đóng chặt nắp chai ngay sau khi sử dụng để tránh bay hơi.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Quality & Guarantees */}
          {activeTab === 'quality' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#DDD0BC] flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#241D17]">100% Nguyên Chất Tự Nhiên</h4>
                  <p className="text-xs text-[#55493D] mt-1 leading-relaxed">
                    VSA LAB cam kết đền bù 200% nếu phát hiện bất kỳ tạp chất, dầu khoáng, cồn hóa học hay chất tạo mùi tổng hợp nào trong sản phẩm.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#DDD0BC] flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#8C521E] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#241D17]">Chuẩn Hóa Kỹ Thuật Độc Lập</h4>
                  <p className="text-xs text-[#55493D] mt-1 leading-relaxed">
                    Từng mẻ chưng cất đều lưu trữ mẫu đối chứng và có phiếu phân tích sắc ký (GC-MS) rõ ràng từ các phòng thí nghiệm uy tín.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#DDD0BC] flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#241D17]">Đổi Trả &amp; Vận Chuyển An Toàn</h4>
                  <p className="text-xs text-[#55493D] mt-1 leading-relaxed">
                    Hỗ trợ đổi mới sản phẩm miễn phí trong vòng 7 ngày nếu có bất kỳ hiện tượng hư hỏng, rò rỉ trong quá trình vận chuyển.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#DDD0BC] flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#241D17]">Phát Triển Sinh Kế Bản Địa</h4>
                  <p className="text-xs text-[#55493D] mt-1 leading-relaxed">
                    Mỗi giọt tinh dầu là sự đồng hành lâu dài cùng bà con đồng bào dân tộc thiểu số tại vùng sâu vùng xa, tạo sinh kế bền vững và bảo tồn rừng già.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Related / Other Products Carousel */}
      <section className="py-12 sm:py-16 bg-[#FAF6F0] border-t border-[#E5DAC4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBDDC8] text-[#8C521E] text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Khám phá thêm</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
                Các Sản Phẩm Cùng Bộ Sưu Tập
              </h3>
            </div>
            <button
              onClick={onBackToProducts}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8C521E] hover:text-[#724116] transition-colors cursor-pointer group"
            >
              <span>Xem toàn bộ 22 sản phẩm</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectProduct(rel)}
                className="bg-white rounded-2xl overflow-hidden border border-[#DDD0BC] hover:border-[#8C521E] shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/products/tinh-dau-cam-rung-chai-30ml.jpg';
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs text-white text-[10px] font-medium">
                      {rel.volume}
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="text-[10px] font-bold text-[#8C521E] uppercase tracking-wider block mb-1">
                      {rel.origin}
                    </span>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#241D17] group-hover:text-[#8C521E] transition-colors line-clamp-1">
                      {rel.name}
                    </h4>
                    <p className="text-[11px] text-[#7A6B5A] italic font-serif mt-0.5 line-clamp-1">
                      {rel.botanicalName}
                    </p>
                    <p className="text-xs text-[#55493D] mt-2 line-clamp-2 leading-relaxed">
                      {rel.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-[#8C521E] font-bold">Xem thông tin</span>
                    <span className="w-7 h-7 rounded-full bg-[#FAF1E3] text-[#8C521E] flex items-center justify-center group-hover:bg-[#8C521E] group-hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Image Lightbox Modal */}
      {isImageLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsImageLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsImageLightboxOpen(false)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="max-w-3xl max-h-[90vh] bg-transparent rounded-2xl overflow-hidden p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="text-center text-white/90 text-sm mt-3 font-serif">
              {product.name} — {product.botanicalName} ({product.volume})
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
