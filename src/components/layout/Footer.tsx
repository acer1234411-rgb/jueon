import { MapPin, Phone, Clock, Mail, ChevronRight, Wrench } from "lucide-react";
import { PHONE_NUMBER, COMPANY_NAME, OWNER_NAME } from "../../constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "소장님 소개", href: "#about" },
    { name: "핵심 서비스", href: "#services" },
    { name: "유품정리", href: "#specialized" },
    { name: "이용후기", href: "#testimonials" },
    { name: "자주 묻는 질문", href: "#faq" },
    { name: "문의하기", href: "#contact" },
  ];

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary transition-colors">
                <Wrench size={24} className="rotate-45" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                {COMPANY_NAME}
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              30년 경력의 베테랑 황병일 소장이 직접 책임지는 우리 동네 만능 해결사. 
              내 집처럼 꼼꼼하고 정직하게 수리해 드립니다.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b border-white/20 pb-2 inline-block">연락처</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <Phone className="text-secondary shrink-0" size={20} />
                <div>
                  <p className="font-medium text-white">대표 전화</p>
                  <a href={`tel:${PHONE_NUMBER}`} className="hover:text-secondary transition-colors">
                    {PHONE_NUMBER}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin className="text-secondary shrink-0" size={20} />
                <div>
                  <p className="font-medium text-white">서비스 지역</p>
                  <p>부산 전 지역 및 인근 경남 지역</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Business Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b border-white/20 pb-2 inline-block">운영 정보</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <Clock className="text-secondary shrink-0" size={20} />
                <div>
                  <p className="font-medium text-white">운영 시간</p>
                  <p>연중무휴 08:00 - 20:00</p>
                  <p className="text-sm text-secondary">(긴급 수리 상시 대기)</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <Mail className="text-secondary shrink-0" size={20} />
                <div>
                  <p className="font-medium text-white">대표자</p>
                  <p>{OWNER_NAME} 소장</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b border-white/20 pb-2 inline-block">바로가기</h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="hover:text-secondary transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight size={14} className="text-secondary/60 group-hover:text-secondary transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {currentYear} {COMPANY_NAME}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">개인정보처리방침</a>
            <a href="#" className="hover:text-white">이용약관</a>
            <a href="/admin" className="text-white/20 hover:text-white transition-colors">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
