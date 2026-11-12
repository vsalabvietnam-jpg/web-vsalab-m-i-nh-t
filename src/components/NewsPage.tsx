import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  BookOpen,
  Sparkles,
  ArrowRight,
  Share2,
  Phone,
  Search,
  X,
  FileText,
  BookmarkCheck,
  Leaf,
} from 'lucide-react';
import { Article } from '../types';
import { useContent } from '../context/ContentContext';
import { ARTICLES } from '../data/mockData';
import { FULL_ARTICLES } from '../data/articlesData';
import { getArticleRealtimeDate } from '../utils/dateHelper';
import { Footer } from './Footer';
import { FloatingContactButtons } from './FloatingContactButtons';

interface NewsPageProps {
  onBackToHome: () => void;
  onSelectArticle: (article: Article) => void;
  onShowToast?: (msg: string) => void;
}

const FEATURED_PRODUCT_ARTICLE_IDS = new Set([
  'tinh-dau-sa-vsa-lab-tinh-hoa-tay-giang',
  'tinh-dau-tram-vsa-lab-tinh-hoa-thao-moc-viet',
  'tinh-dau-khuynh-diep-vsa-lab-tinh-khiet-tu-la-xanh',
  'tinh-dau-bac-ha-vsa-lab-mat-lanh-tu-thien-nhien',
]);

type ArticleCategory = 'all' | 'san-pham-noi-bat' | 'vung-nguyen-lieu' | 'tri-thuc' | 'quy-trinh' | 'suc-khoe';

export const NewsPage: React.FC<NewsPageProps> = ({
  onBackToHome,
  onSelectArticle,
  onShowToast,
}) => {
  const { siteData } = useContent();
  const [activeTab, setActiveTab] = useState<ArticleCategory>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Tin Tức & Kiến Thức Thảo Dược • VSA LAB',
        text: 'Khám phá các bài viết chuyên sâu về dược liệu bản địa, công nghệ chiết xuất và liệu pháp mùi hương.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) onShowToast('✓ Đã sao chép liên kết trang tin tức');
    }
  };

  const rawArticles = siteData.articles?.length ? siteData.articles : FULL_ARTICLES;
  const articles = useMemo(() => {
    return rawArticles.filter((a) => a.id !== 'moi-mien-dat-mot-su-menh');
  }, [rawArticles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Category filter
      if (activeTab === 'san-pham-noi-bat') {
        if (!FEATURED_PRODUCT_ARTICLE_IDS.has(article.id)) return false;
      }
      if (activeTab === 'vung-nguyen-lieu') {
        const isMatch =
          article.category.toLowerCase().includes('vùng nguyên liệu') ||
          article.id.includes('tay-giang') ||
          article.id.includes('quang-ngai') ||
          article.id.includes('ninh-binh');
        if (!isMatch) return false;
      }
      if (activeTab === 'tri-thuc') {
        const isMatch =
          article.category.toLowerCase().includes('tri thức') ||
          article.category.toLowerCase().includes('văn hóa') ||
          article.id.includes('tri-thuc');
        if (!isMatch) return false;
      }
      if (activeTab === 'quy-trinh') {
        const isMatch =
          article.category.toLowerCase().includes('quy trình') ||
          article.category.toLowerCase().includes('công nghệ') ||
          article.category.toLowerCase().includes('nghiên cứu') ||
          article.id.includes('chiet-xuat');
        if (!isMatch) return false;
      }
      if (activeTab === 'suc-khoe') {
        const isMatch =
          article.category.toLowerCase().includes('kiến thức') ||
          article.category.toLowerCase().includes('thư giãn') ||
          article.category.toLowerCase().includes('ngủ') ||
          article.id.includes('loi-ich') ||
          article.id.includes('giac-ngu');
        if (!isMatch) return false;
      }

      // Search filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(term);
        const matchesDesc = (article.excerpt || '').toLowerCase().includes(term);
        const matchesCat = article.category.toLowerCase().includes(term);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }

      return true;
    });
  }, [articles, activeTab, searchTerm]);

  const featuredArticle = articles[0];

  return (
    <article className="min-h-screen bg-[#FAF6F0] text-[#241D17] antialiased selection:bg-[#8C521E] selection:text-white flex flex-col">
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E5DAC4] shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            id="news-back-home-btn"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8C521E] hover:text-[#5E320E] transition-colors py-2 px-3 rounded-lg hover:bg-[#EFE5D3] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Trở về trang chủ</span>
          </button>

          <div className="flex items-center gap-2 text-center">
            <span className="font-serif text-base sm:text-lg font-bold text-[#241D17] tracking-tight">
              Tin Tức & Kiến Thức
            </span>
            <span className="text-[10px] sm:text-xs text-[#7A6B5A] hidden sm:inline">
              • VSA LAB Botanical Journal
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
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <button onClick={onBackToHome} className="hover:text-[#8C521E] font-medium">Trang chủ</button>
          <span>/</span>
          <span className="font-bold text-[#241D17]">Tin tức & Kiến thức thảo dược</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-[#241D17] text-[#FAF5EB] py-14 sm:py-20 px-4 sm:px-6 relative overflow-hidden border-b border-[#3B3028]">
        <div className="absolute inset-0 opacity-25">
          <img
            src="/images/blog/bai-viet-nghe-thuat-chieu-chua-mui-huong.jpg"
            alt="Kiến thức tinh dầu VSA LAB"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/background/quy-trinh-buoc-3-chiet-xuat-hien-dai.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#241D17] via-[#241D17]/80 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#E6C285] text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Tạp Chí Thảo Mộc & Khoa Học VSA LAB</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Kho Tàng Tri Thức & Câu Chuyện Thảo Dược
          </h1>

          <p className="text-xs sm:text-sm text-[#DDD0BC] max-w-2xl mx-auto leading-relaxed">
            Nơi lưu giữ những thước phim về đời sống đồng bào bản địa, phân tích thành phần đơn chất GC-MS và những cẩm nang trị liệu tự nhiên cho sức khỏe tinh thần.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12 flex-1">
        {/* Search & Category Filter Bar */}
        <div className="bg-[#FAF3E5] p-5 rounded-2xl border border-[#DDD0BC] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A6B5A]" />
              <input
                type="text"
                placeholder="Tìm bài viết theo tiêu đề, chủ đề, vùng miền..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#DDD0BC] text-xs sm:text-sm text-[#241D17] placeholder:text-stone-400 focus:outline-none focus:border-[#8C521E]"
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

            <div className="text-xs text-stone-600 font-medium">
              Hiển thị <strong>{filteredArticles.length}</strong> bài viết
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-[#E8DEC9]">
            {(
              [
                { id: 'all', label: `Tất cả (${articles.length})` },
                { id: 'san-pham-noi-bat', label: 'Bài Viết Nổi Bật (4)' },
                { id: 'vung-nguyen-lieu', label: 'Vùng Nguyên Liệu' },
                { id: 'tri-thuc', label: 'Tri Thức Bản Địa' },
                { id: 'quy-trinh', label: 'Công Nghệ Chiết Xuất' },
                { id: 'suc-khoe', label: 'Liệu Pháp Sức Khỏe & Giấc Ngủ' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#8C521E] text-white shadow-xs font-semibold'
                    : 'bg-white text-[#554637] border border-[#DDD0BC] hover:bg-[#EFE5D3]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Spotlight Article */}
        {!searchTerm && activeTab === 'all' && featuredArticle && (
          <div
            onClick={() => onSelectArticle(featuredArticle)}
            className="group bg-white rounded-3xl border border-[#DDD0BC] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer grid grid-cols-1 md:grid-cols-12 gap-0"
          >
            <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto overflow-hidden bg-[#FAF6F0]">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#8C521E] text-white text-xs font-bold shadow-xs">
                Bài viết nổi bật
              </div>
            </div>

            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <span className="text-[#8C521E] font-semibold uppercase tracking-wider">
                    {featuredArticle.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {getArticleRealtimeDate(featuredArticle.id, featuredArticle.date)}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] group-hover:text-[#8C521E] transition-colors leading-snug">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8DEC9] flex items-center justify-between">
                <span className="text-xs text-stone-500 font-medium">
                  Thời gian đọc: ~6 phút
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C521E] group-hover:translate-x-1 transition-transform">
                  <span>Đọc bài viết</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => {
            const isFeaturedProductArticle = FEATURED_PRODUCT_ARTICLE_IDS.has(article.id);
            return (
              <div
                key={article.id}
                id={`news-card-${article.id}`}
                onClick={() => onSelectArticle(article)}
                className="bg-white rounded-2xl border border-[#DDD0BC] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF6F0]">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1.5">
                      {isFeaturedProductArticle && (
                        <span className="px-2.5 py-1 rounded-full bg-[#8C521E] text-[10px] font-bold text-white shadow-xs inline-flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#FAF5EB]" />
                          <span>Bài viết nổi bật</span>
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-semibold text-white">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] text-stone-500">
                      <Calendar className="w-3.5 h-3.5 text-[#8C521E]" />
                      <span>{getArticleRealtimeDate(article.id, article.date)}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#241D17] group-hover:text-[#8C521E] transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-[#EFE7D8] flex items-center justify-between text-xs font-semibold text-[#8C521E]">
                    <span>Đọc toàn bộ</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
