import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Sparkles,
  Droplets,
  MapPin,
  CheckCircle2,
  Share2,
  Phone,
  ShieldCheck,
  ArrowRight,
  Filter,
  Layers,
  X,
  Package,
} from 'lucide-react';
import { Product } from '../types';
import { useContent } from '../context/ContentContext';
import { CATALOG_PRODUCTS } from '../data/catalogData';
import { Footer } from './Footer';
import { FloatingContactButtons } from './FloatingContactButtons';

interface ProductsPageProps {
  onBackToHome: () => void;
  onSelectProduct: (product: Product) => void;
  onShowToast?: (msg: string) => void;
}

type CategoryTab = 'all' | 'ban-dia' | 'che-pham' | 'hoa' | 'thao-moc';
type SizeFilter = 'all' | '2l' | '300ml' | '10ml' | '30ml';

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onBackToHome,
  onSelectProduct,
  onShowToast,
}) => {
  const { siteData } = useContent();
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Danh Mục Sản Phẩm & Chế Phẩm Thảo Mộc • VSA LAB',
        text: 'Khám phá bộ sưu tập tinh dầu nguyên chất 10ml, 30ml và chế phẩm sinh học 2L, 300ml của VSA LAB.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) onShowToast('✓ Đã sao chép liên kết danh mục sản phẩm');
    }
  };

  const allProducts = siteData.products?.length ? siteData.products : CATALOG_PRODUCTS;

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      if (activeTab === 'ban-dia' && product.category !== 'tinh-dau-ban-dia') return false;
      if (activeTab === 'che-pham' && product.category !== 'che-pham-thao-moc') return false;
      if (activeTab === 'hoa' && product.category !== 'tinh-dau-hoa') return false;
      if (
        activeTab === 'thao-moc' &&
        product.category !== 'tinh-dau-thao-moc' &&
        ['che-pham-thao-moc', 'tinh-dau-ban-dia', 'tinh-dau-hoa'].includes(product.category || '')
      ) {
        return false;
      }

      // Size filter
      if (sizeFilter === '2l') {
        const vol = (product.volume || '').toLowerCase();
        if (!vol.includes('2l') && !vol.includes('2 lít') && !vol.includes('2 lit')) return false;
      }
      if (sizeFilter === '300ml') {
        const vol = (product.volume || '').toLowerCase();
        if (!vol.includes('300ml')) return false;
      }
      if (sizeFilter === '10ml') {
        const vol = (product.volume || '').toLowerCase();
        if (!vol.includes('10ml')) return false;
      }
      if (sizeFilter === '30ml') {
        const vol = (product.volume || '').toLowerCase();
        if (!vol.includes('30ml')) return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(term);
        const matchesOrigin = product.origin.toLowerCase().includes(term);
        const matchesDesc = (product.description || '').toLowerCase().includes(term);
        const matchesNotes = typeof product.scentNotes === 'string' && product.scentNotes.toLowerCase().includes(term);
        if (!matchesName && !matchesOrigin && !matchesDesc && !matchesNotes) {
          return false;
        }
      }

      return true;
    });
  }, [allProducts, activeTab, sizeFilter, searchTerm]);

  return (
    <article className="min-h-screen bg-[#FAF6F0] text-[#241D17] antialiased selection:bg-[#8C521E] selection:text-white flex flex-col">
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E5DAC4] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            id="products-back-home-btn"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8C521E] hover:text-[#5E320E] transition-colors py-2 px-3 rounded-lg hover:bg-[#EFE5D3] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Trở về trang chủ</span>
          </button>

          <div className="flex items-center gap-2 text-center">
            <span className="font-serif text-base sm:text-lg font-bold text-[#241D17] tracking-tight">
              Showroom Sản Phẩm
            </span>
            <span className="text-[10px] sm:text-xs text-[#7A6B5A] hidden sm:inline">
              • VSA LAB Essential Oils & Eco Clean
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

      {/* Breadcrumb */}
      <div className="bg-[#F4ECDC] border-b border-[#E5DAC4] py-2.5 px-4 sm:px-6 text-xs text-[#6B5C4D]">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button onClick={onBackToHome} className="hover:text-[#8C521E] font-medium">Trang chủ</button>
          <span>/</span>
          <span className="font-bold text-[#241D17]">Danh mục sản phẩm & Chế phẩm thảo mộc</span>
        </div>
      </div>

      {/* Hero Banner Intro */}
      <section className="bg-[#241D17] text-[#FAF5EB] py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden border-b border-[#3B3028]">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="/images/background/quy-trinh-buoc-3-chiet-xuat-hien-dai.jpg"
            alt="Showroom VSA LAB"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#E6C285] text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tinh Hoa Thiên Nhiên • 100% Nguyên Bản</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Bộ Sưu Tập Tinh Dầu & Chế Phẩm Thảo Mộc
          </h1>

          <p className="text-xs sm:text-sm text-[#DDD0BC] max-w-2xl mx-auto leading-relaxed">
            Mỗi giọt tinh dầu là một câu chuyện riêng của đất và người bản địa. Định lượng tiêu chuẩn 10ml & 30ml cho tinh dầu trị liệu; can 2 Lít tiết kiệm cho nước lau sàn & tẩy rửa; chai 300ml kháng khuẩn dịu lành cho gel rửa tay.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-[#E6C285]">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> 100% Kiểm nghiệm sắc ký khí GC-MS
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Droplets className="w-4 h-4" /> Không cồn – Không hương liệu hóa học
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Package className="w-4 h-4" /> Đóng gói tiêu chuẩn dược phẩm
            </span>
          </div>
        </div>
      </section>

      {/* Main Filter & Products Grid Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 flex-1">
        {/* Controls: Search, Category Tabs, Capacity Filter */}
        <div className="bg-[#FAF3E5] p-5 rounded-2xl border border-[#DDD0BC] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A6B5A]" />
              <input
                type="text"
                placeholder="Tìm tên tinh dầu, công dụng, xuất xứ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#DDD0BC] text-xs sm:text-sm text-[#241D17] placeholder:text-stone-400 focus:outline-none focus:border-[#8C521E] shadow-2xs"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Capacity / Size Quick Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              <span className="text-xs font-bold text-[#8C521E] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Dung tích:
              </span>
              {(
                [
                  { id: 'all', label: 'Tất cả dung tích' },
                  { id: '2l', label: 'Can 2 Lít (Sinh học)' },
                  { id: '300ml', label: 'Chai 300ml' },
                  { id: '10ml', label: 'Lọ 10ml' },
                  { id: '30ml', label: 'Lọ 30ml' },
                ] as const
              ).map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSizeFilter(size.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    sizeFilter === size.id
                      ? 'bg-[#8C521E] text-white shadow-xs font-semibold'
                      : 'bg-white text-[#5E5144] border border-[#DDD0BC] hover:bg-[#EFE5D3]'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-[#E8DEC9]">
            {(
              [
                { id: 'all', label: `Tất cả (${allProducts.length})` },
                { id: 'ban-dia', label: 'Tinh Dầu Bản Địa' },
                { id: 'che-pham', label: 'Chế Phẩm Thảo Mộc (2L & 300ml)' },
                { id: 'hoa', label: 'Tinh Dầu Hoa & Trầm' },
                { id: 'thao-moc', label: 'Thảo Mộc Thư Giãn' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#241D17] text-white shadow-sm font-semibold'
                    : 'bg-white/80 text-[#554637] border border-[#DDD0BC] hover:bg-white hover:text-[#241D17]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Count & Active Filters Indicator */}
        <div className="flex items-center justify-between text-xs text-[#7A6B5A]">
          <p>
            Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm phù hợp
          </p>
          {(searchTerm || sizeFilter !== 'all' || activeTab !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSizeFilter('all');
                setActiveTab('all');
              }}
              className="text-[#8C521E] hover:underline font-semibold"
            >
              Đặt lại tất cả bộ lọc
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#DDD0BC] p-8 space-y-3">
            <Package className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#241D17]">
              Không tìm thấy sản phẩm nào
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Vui lòng thử tìm với từ khóa khác hoặc điều chỉnh lại bộ lọc danh mục và dung tích.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSizeFilter('all');
                setActiveTab('all');
              }}
              className="px-4 py-2 rounded-lg bg-[#8C521E] text-white text-xs font-semibold mt-2"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="bg-white rounded-2xl border border-[#DDD0BC] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Image & Badges */}
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF6F0] border-b border-[#EFE7D8]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/products/tinh-dau-cam-rung-chai-30ml.jpg';
                        }}
                      />

                      {/* Origin pill */}
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-medium text-white flex items-center gap-1 shadow-xs">
                        <MapPin className="w-3 h-3 text-[#E6C285]" />
                        <span className="line-clamp-1">{product.origin.split(',')[0]}</span>
                      </div>

                      {/* Capacity badge */}
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#8C521E] text-white text-[10px] font-bold shadow-xs">
                        {product.volume || '10ml & 30ml'}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 space-y-2.5">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#241D17] group-hover:text-[#8C521E] transition-colors line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Scent notes or uses */}
                      {product.scentNotes && (
                        <div className="flex flex-wrap gap-1">
                          {product.scentNotes.split(',').slice(0, 3).map((note: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-[#F4ECDC] text-[#6B5A4B] text-[10px] font-medium"
                            >
                              {note.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {product.story || product.description}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#8C521E]">
                          {product.price && product.price > 0 ? `${product.price.toLocaleString('vi-VN')} đ` : 'Liên hệ báo giá'}
                        </span>
                        <span className="text-[11px] text-stone-500 font-mono">
                          {product.volume}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-4 sm:p-5 pt-0 space-y-2">
                    <button
                      id={`btn-product-info-${product.id}`}
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#8C521E] hover:bg-[#724116] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer group-hover:shadow-md"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Xem chi tiết & Câu chuyện</span>
                    </button>

                    <a
                      href="https://zalo.me/0833153388"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-[#F4ECDC] hover:bg-[#EBDDC8] text-[#554230] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3 h-3 text-[#8C521E]" />
                      <span>Tư vấn đặt hàng qua Zalo</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
