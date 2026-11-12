import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Facebook,
  Mail,
  MapPin,
  Clock,
  Building2,
  ShieldCheck,
  Send,
  CheckCircle2,
  Copy,
  ExternalLink,
  ChevronRight,
  Share2,
  Sparkles,
  Headphones,
  Check
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface ContactPageProps {
  onBackToHome: () => void;
  onExploreProducts: () => void;
  onShowToast?: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onBackToHome,
  onExploreProducts,
  onShowToast,
}) => {
  const { siteData } = useContent();
  const { contact } = siteData.texts;
  const rawHotline = contact.hotline || '0833-15-3388';
  const cleanPhone = rawHotline.replace(/[^0-9]/g, '');
  const facebookUrl = 'https://www.facebook.com/share/192hEhEYeV/?mibextid=wwXIfr';
  const zaloUrl = `https://zalo.me/${cleanPhone}`;

  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    topic: 'Tư vấn sản phẩm tinh dầu',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    if (onShowToast) {
      onShowToast(`✓ Đã sao chép ${type}: ${text}`);
    }
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Thông tin liên hệ VSA LAB - Tinh Hoa Thiên Nhiên',
          text: `Liên hệ Hotline/Zalo ${rawHotline} hoặc Facebook Vườn Tinh Dầu`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) onShowToast('✓ Đã sao chép liên kết trang liên hệ');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      if (onShowToast) onShowToast('Vui lòng điền họ tên và số điện thoại liên hệ');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onShowToast) {
        onShowToast('✓ Đã gửi thông tin! Chuyên viên VSA LAB sẽ liên hệ bạn qua SĐT/Zalo sớm nhất.');
      }
      setFormData({
        name: '',
        phone: '',
        topic: 'Tư vấn sản phẩm tinh dầu',
        message: '',
      });
    }, 700);
  };

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
            <span className="text-[#8C521E] font-semibold whitespace-nowrap">
              Thông tin liên hệ
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#DDD0BC] text-[#55493D] hover:text-[#8C521E] hover:border-[#8C521E] text-xs font-medium shadow-2xs transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#8C521E]" />
              <span className="hidden sm:inline">Chia sẻ</span>
            </button>

            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#8C521E] text-white hover:bg-[#724116] text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại trang chủ</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Hero Header */}
      <section className="pt-10 pb-8 sm:pt-14 sm:pb-12 text-center relative overflow-hidden bg-gradient-to-b from-[#F5ECE0] to-[#FAF6F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBDDC8] border border-[#D9C8AC] text-[#8C521E] text-xs font-semibold tracking-wider uppercase mb-3.5 shadow-2xs">
            <Headphones className="w-3.5 h-3.5 text-[#B2641E]" />
            <span>Kênh Hỗ Trợ Khách Hàng Trực Tuyến</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#241D17] tracking-tight leading-tight">
            Thông Tin Liên Hệ <span className="text-[#8C521E] italic">VSA LAB</span>
          </h1>

          <p className="mt-4 text-[#55493D] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe, tư vấn thông số kỹ thuật (COA, GC-MS) và hỗ trợ giải đáp mọi thắc mắc của bạn qua Số điện thoại Hotline, Zalo và Facebook chính thức.
          </p>
        </div>
      </section>

      {/* 3. Primary Contact Channels: Phone, Zalo, Facebook */}
      <section className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {/* Card 1: Số điện thoại / Hotline */}
          <div className="rounded-2xl p-6 sm:p-7 bg-[#FCFAF6] border-2 border-[#D9C8AC] hover:border-[#8C521E] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#EA580C] to-[#DC2626] text-white flex items-center justify-center shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6 animate-pulse" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Đang trực tuyến 24/7
                </span>
              </div>

              <span className="text-xs font-bold text-[#8C521E] uppercase tracking-wider block">
                Tổng Đài Hotline Trực Tiếp
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#241D17] mt-1 tracking-tight">
                {rawHotline}
              </h3>

              <p className="text-xs text-[#6C5B4C] mt-2.5 leading-relaxed">
                Gọi điện trực tiếp để nhận tư vấn liệu pháp mùi hương, báo giá sỉ & lẻ và kiểm tra tình trạng giao hàng toàn quốc.
              </p>

              <div className="mt-4 pt-4 border-t border-[#E5DAC4] space-y-2 text-xs text-[#55493D]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Cước gọi tiêu chuẩn theo nhà mạng</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Dược sĩ & chuyên viên tiếp nhận ngay</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E5DAC4] flex flex-col sm:flex-row gap-2.5">
              <a
                href={`tel:${cleanPhone}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#EA580C] to-[#DC2626] hover:from-[#C2410C] hover:to-[#B91C1C] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Bấm để gọi ngay</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopy(rawHotline, 'Số điện thoại')}
                className="px-3.5 py-3 rounded-xl bg-[#FAF1E3] hover:bg-[#EBDDC8] border border-[#D9C8AC] text-[#8C521E] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Sao chép số điện thoại"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedType === 'Số điện thoại' ? 'Đã chép' : 'Chép số'}</span>
              </button>
            </div>
          </div>

          {/* Card 2: Zalo Chat Trực Tuyến */}
          <div className="rounded-2xl p-6 sm:p-7 bg-[#FCFAF6] border-2 border-[#B9D5FF] hover:border-[#0068FF] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-[#0068FF] text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform p-2.5">
                  <svg viewBox="0 0 500 500" className="w-full h-full fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="m649.69 129.68v-23.37h70.02v328.67h-40.06c-16.49 0-29.87-13.32-29.96-29.78-0.01 0.01-0.02 0.01-0.03 0.02-28.2 20.62-63.06 32.87-100.71 32.87-94.3 0-170.76-76.41-170.76-170.65s76.46-170.64 170.76-170.64c37.65 0 72.51 12.24 100.71 32.86 0.01 0.01 0.02 0.01 0.03 0.02zm-289.64-129.06v10.65c0 19.88-2.66 36.1-15.57 55.14l-1.56 1.78c-2.82 3.2-9.44 10.71-12.59 14.78l-224.76 282.11h254.48v39.94c0 16.55-13.43 29.96-29.98 29.96h-329.73v-18.83c0-23.07 5.73-33.35 12.97-44.07l239.61-296.57h-242.59v-74.89h349.72zm444.58 434.36c-13.77 0-24.97-11.19-24.97-24.94v-409.42h74.94v434.36h-49.97zm271.56-340.24c94.95 0 171.91 76.98 171.91 171.79 0 94.9-76.96 171.88-171.91 171.88-94.96 0-171.91-76.98-171.91-171.88 0-94.81 76.95-171.79 171.91-171.79zm-527.24 273.1c55.49 0 100.46-44.94 100.46-100.4 0-55.37-44.97-100.32-100.46-100.32s-100.47 44.95-100.47 100.32c0 55.46 44.98 100.4 100.47 100.4zm527.24-0.17c55.82 0 101.12-45.27 101.12-101.14 0-55.78-45.3-101.05-101.12-101.05-55.91 0-101.13 45.27-101.13 101.05 0 55.87 45.22 101.14 101.13 101.14z" transform="translate(68.3, 186.1) scale(0.291)"/>
                  </svg>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 text-[11px] font-bold border border-blue-200">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  Phản hồi sau 1-3 phút
                </span>
              </div>

              <span className="text-xs font-bold text-[#0068FF] uppercase tracking-wider block">
                Zalo Tư Vấn Trực Tuyến
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#241D17] mt-1 tracking-tight">
                {rawHotline}
              </h3>

              <p className="text-xs text-[#6C5B4C] mt-2.5 leading-relaxed">
                Nhận hình ảnh chai tinh dầu thực tế, phiếu kiểm định chất lượng GC-MS, bảng giá đại lý và trao đổi nhanh với kỹ thuật viên.
              </p>

              <div className="mt-4 pt-4 border-t border-[#E5DAC4] space-y-2 text-xs text-[#55493D]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Gửi nhận tài liệu kiểm định COA tức thì</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Lưu trữ tin nhắn và hỗ trợ đổi trả thuận tiện</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E5DAC4] flex flex-col sm:flex-row gap-2.5">
              <a
                href={zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0068FF] hover:bg-[#0055D4] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Nhắn tin qua Zalo</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy(rawHotline, 'Số Zalo')}
                className="px-3.5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#0068FF] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Sao chép số Zalo"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedType === 'Số Zalo' ? 'Đã chép' : 'Chép số'}</span>
              </button>
            </div>
          </div>

          {/* Card 3: Facebook Fanpage */}
          <div className="rounded-2xl p-6 sm:p-7 bg-[#FCFAF6] border-2 border-[#C6DCFF] hover:border-[#1877F2] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
                  <Facebook className="w-6 h-6 fill-current" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#1877F2] text-[11px] font-bold border border-blue-200">
                  Trang chính thức
                </span>
              </div>

              <span className="text-xs font-bold text-[#1877F2] uppercase tracking-wider block">
                Facebook Fanpage
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#241D17] mt-1 tracking-tight">
                Vườn Tinh Dầu
              </h3>

              <p className="text-xs text-[#6C5B4C] mt-2.5 leading-relaxed">
                Theo dõi nhật ký thu hái mùa vụ Cam Rừng Tây Giang, video trực tiếp từ nồi chưng cất inox và các chương trình tri ân khách hàng.
              </p>

              <div className="mt-4 pt-4 border-t border-[#E5DAC4] space-y-2 text-xs text-[#55493D]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1877F2] shrink-0" />
                  <span>Hơn 10.000+ người yêu hương thảo mộc</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1877F2] shrink-0" />
                  <span>Messenger hỗ trợ gửi thắc mắc 24/7</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E5DAC4] flex flex-col sm:flex-row gap-2.5">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <Facebook className="w-4 h-4 fill-current" />
                <span>Mở trang Facebook</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy(facebookUrl, 'Link Facebook')}
                className="px-3.5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#1877F2] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Sao chép link Facebook"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedType === 'Link Facebook' ? 'Đã chép' : 'Chép link'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Consultation Form & Facility Info Section */}
      <section className="py-12 sm:py-16 bg-[#F4EDE2] border-t border-[#E2D5C1] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Interactive Message Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#DDD0BC] shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8C521E] uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-[#B2641E]" />
                <span>Gửi Tin Nhắn Trực Tuyến</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
                Yêu Cầu Tư Vấn &amp; Báo Giá Dược Liệu
              </h3>
              <p className="text-xs sm:text-sm text-[#55493D] mt-2 mb-6 leading-relaxed">
                Quý khách vui lòng để lại thông tin nhu cầu, chuyên viên kỹ thuật của VSA LAB sẽ phản hồi qua Zalo hoặc Số điện thoại trong vòng 15 phút.
              </p>

              {isSuccess ? (
                <div className="p-6 rounded-xl bg-[#E8EFE9] border border-[#BBD3C0] text-[#243328] space-y-3 animate-in fade-in">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-7 h-7 text-emerald-700 shrink-0" />
                    <div>
                      <h4 className="font-bold text-base text-emerald-900">
                        Gửi Yêu Cầu Thành Công!
                      </h4>
                      <p className="text-xs text-[#2D4537] mt-0.5">
                        Cảm ơn bạn đã tin tưởng VSA LAB. Chúng tôi sẽ liên hệ lại với bạn qua Số điện thoại/Zalo trong thời gian sớm nhất.
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-emerald-200/60 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="px-4 py-2 rounded-lg bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-900 transition-colors"
                    >
                      Gửi thêm yêu cầu khác
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#241D17] uppercase tracking-wider mb-1.5">
                        Họ và tên của bạn <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ví dụ: Nguyễn Văn An"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-[#FAF6F0] text-stone-900 outline-none focus:border-[#8C521E] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#241D17] uppercase tracking-wider mb-1.5">
                        Số điện thoại / Zalo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Ví dụ: 0912 345 678"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-[#FAF6F0] text-stone-900 outline-none focus:border-[#8C521E] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#241D17] uppercase tracking-wider mb-1.5">
                      Chủ đề cần tư vấn
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-[#FAF6F0] text-stone-900 outline-none focus:border-[#8C521E] focus:bg-white transition-all"
                    >
                      <option value="Tư vấn sản phẩm tinh dầu">Tư vấn chọn mua tinh dầu nguyên chất</option>
                      <option value="Đặt hàng Tinh Dầu Cam Rừng Tây Giang">Đặt hàng Tinh Dầu Cam Rừng Tây Giang (Đặc sản)</option>
                      <option value="Báo giá số lượng lớn / Phân phối">Báo giá sỉ &amp; chính sách nhà phân phối</option>
                      <option value="Yêu cầu kiểm nghiệm GC-MS">Yêu cầu thông số kỹ thuật &amp; phiếu GC-MS mẫu</option>
                      <option value="Hợp tác dược liệu bản địa">Hợp tác vùng trồng &amp; chế biến tinh dầu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#241D17] uppercase tracking-wider mb-1.5">
                      Nội dung tin nhắn / Ghi chú thêm
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Nhập yêu cầu chi tiết về sản phẩm, số lượng hoặc câu hỏi của bạn..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-[#FAF6F0] text-stone-900 outline-none focus:border-[#8C521E] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#8C521E] hover:bg-[#724116] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Đang gửi thông tin...' : 'Gửi yêu cầu tư vấn ngay'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Organization & Headquarters Information (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl p-6 bg-white border border-[#DDD0BC] shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8C521E] uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>Trụ Sở &amp; Cơ Sở Sản Xuất</span>
                </div>

                <div className="space-y-3.5 text-xs text-[#55493D]">
                  <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#DDD0BC]">
                    <span className="font-bold text-[#8C521E] block mb-0.5">
                      Đơn vị sở hữu &amp; Chịu trách nhiệm khoa học:
                    </span>
                    <p className="font-bold text-[#241D17] text-sm">{contact.researchUnit}</p>
                    <p className="text-[#6C5B4C] mt-1 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8C521E] shrink-0 mt-0.5" />
                      <span>22 Nguyễn Thức Tự, P. Ngũ Hành Sơn, TP. Đà Nẵng</span>
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#DDD0BC]">
                    <span className="font-bold text-[#8C521E] block mb-0.5">
                      Xưởng chưng cất &amp; Hợp tác xã dược liệu:
                    </span>
                    <p className="font-bold text-[#241D17] text-sm">{contact.facilityName}</p>
                    <p className="text-[#6C5B4C] mt-1 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8C521E] shrink-0 mt-0.5" />
                      <span>Thôn Tr'Hy, xã Hùng Sơn, huyện Tây Giang, tỉnh Quảng Nam</span>
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#DDD0BC]">
                    <span className="font-bold text-[#8C521E] block mb-0.5">
                      Đơn vị phân phối độc quyền:
                    </span>
                    <p className="font-bold text-[#241D17] text-sm">{contact.distributor}</p>
                    <p className="text-[#6C5B4C] mt-1 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8C521E] shrink-0 mt-0.5" />
                      <span>{contact.address}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DDD0BC] space-y-2 text-xs text-[#6C5B4C]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#8C521E] shrink-0" />
                    <span>Thời gian làm việc: <strong>08:00 - 21:00 (Cả Thứ 7 &amp; Chủ Nhật)</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#8C521E] shrink-0" />
                    <span>Email liên hệ: <strong>vsalabvietnam@gmail.com</strong></span>
                  </div>
                </div>
              </div>

              {/* Service Commitments Box */}
              <div className="rounded-2xl p-5 bg-[#2B231D] text-[#FAF5EB] shadow-md border border-[#483B32] space-y-2.5 text-xs">
                <span className="text-[#E6C285] font-bold text-xs uppercase tracking-wider block">
                  Cam Kết Hỗ Trợ Từ VSA LAB
                </span>
                <div className="space-y-2 text-[#DDD0BC]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E6C285] shrink-0" />
                    <span>Tư vấn trung thực, đúng hoạt tính dược học</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E6C285] shrink-0" />
                    <span>Bảo mật tuyệt đối thông tin khách hàng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E6C285] shrink-0" />
                    <span>Cung cấp hồ sơ công bố chất lượng theo quy định</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
