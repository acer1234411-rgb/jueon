import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Phone, CheckCircle2, Zap, DoorOpen, Droplets, ShieldCheck, Heart, Trash2 } from "lucide-react";
import { SERVICES, PHONE_NUMBER } from "../constants";
import Button from "./ui/Button";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ScrollToTop from "./ui/ScrollToTop";

const iconMap: Record<string, any> = {
  Zap,
  DoorOpen,
  Droplets,
  ShieldCheck,
  Heart,
  Trash2
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = SERVICES.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">서비스를 찾을 수 없습니다.</h1>
        <Link to="/">
          <Button variant="primary">홈으로 돌아가기</Button>
        </Link>
      </div>
    );
  }

  const Icon = iconMap[service.icon];

  // Detailed content based on service type
  const details: Record<string, { points: string[], process: string[] }> = {
    electric: {
      points: [
        "노후 차단기 및 콘센트 교체",
        "LED 전등 및 조명 기구 설치",
        "누전 점검 및 긴급 복구",
        "전기 배선 증설 및 정리"
      ],
      process: [
        "현장 방문 및 원인 진단",
        "안전 조치 및 전원 차단",
        "부품 교체 및 배선 작업",
        "정상 작동 테스트 및 안전 점검"
      ]
    },
    door: {
      points: [
        "현관문 도어클로저 및 경첩 교체",
        "방문 손잡이 및 잠금장치 수리",
        "문 처짐 및 소음 해결",
        "디지털 도어락 설치"
      ],
      process: [
        "문 상태 및 부속품 마모 확인",
        "맞춤형 부품 선정",
        "정밀 수평 조절 및 교체",
        "개폐 테스트 및 부드러움 확인"
      ]
    },
    plumbing: {
      points: [
        "수도꼭지 및 수전 전체 교체",
        "변기/싱크대 막힘 해결",
        "배관 누수 지점 탐지 및 수리",
        "욕실/주방 설비 보수"
      ],
      process: [
        "누수 및 막힘 지점 파악",
        "전문 장비 투입 (내시경 등)",
        "이물질 제거 및 부품 교체",
        "통수 테스트 및 누수 여부 재확인"
      ]
    },
    waterproof: {
      points: [
        "옥상 우레탄 방수 시공",
        "화장실/베란다 침투 방수",
        "외벽 발수 및 균열 보수",
        "창틀 실리콘 코킹 작업"
      ],
      process: [
        "표면 청소 및 바탕 정리",
        "균열 보수 및 하도 작업",
        "방수재 도포 (중도/상도)",
        "완전 건조 및 품질 검사"
      ]
    },
    "cleanup-items": {
      points: [
        "고인의 소중한 유품 정성껏 분류",
        "귀중품 및 현금/통장 별도 전달",
        "추억이 담긴 사진 및 서류 보관",
        "유가족의 요청에 따른 맞춤 정리"
      ],
      process: [
        "유가족 상담 및 작업 범위 확정",
        "유품의 세밀한 분류 작업",
        "귀중품 전달 및 보관 물품 정리",
        "공간 정돈 및 마무리 보고"
      ]
    },
    "cleanup-waste": {
      points: [
        "대형 가구 및 가전제품 수거",
        "생활 폐기물 합법적 처리",
        "빈집/공가 완전 비우기",
        "폐기물 처리 신고 대행"
      ],
      process: [
        "폐기물 양 측정 및 견적 산출",
        "전문 인력 및 차량 투입",
        "신속하고 안전한 반출 작업",
        "바닥 청소 및 최종 점검"
      ]
    },
    "cleanup-special": {
      points: [
        "악취 제거 및 탈취 소독 작업",
        "특수 약품을 이용한 오염 제거",
        "해충 방제 및 살균 처리",
        "벽지/장판 제거 및 원상복구 지원"
      ],
      process: [
        "오염도 측정 및 작업 계획 수립",
        "전문 장비 및 약품 투입",
        "반복적인 살균 및 탈취 작업",
        "공기질 정화 및 최종 탈취 확인"
      ]
    }
  };

  const serviceDetail = details[service.id] || { points: [], process: [] };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <div className="bg-primary py-16 md:py-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src={service.image} 
              alt="" 
              className="w-full h-full object-cover blur-sm"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
              <ArrowLeft size={20} />
              메인으로 돌아가기
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Icon size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{service.title}</h1>
            </div>
            <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Left Column: Details */}
              <div className="lg:col-span-2">
                <section className="mb-16">
                  <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                    <span className="w-2 h-8 bg-secondary rounded-full"></span>
                    주요 작업 내용
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceDetail.points.map((point, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-4 p-6 bg-background rounded-2xl border border-gray-100"
                      >
                        <CheckCircle2 className="text-secondary shrink-0" size={24} />
                        <span className="text-lg font-medium text-text-main">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                    <span className="w-2 h-8 bg-secondary rounded-full"></span>
                    시공 프로세스
                  </h2>
                  <div className="space-y-6">
                    {serviceDetail.process.map((step, i) => (
                      <div key={i} className="flex gap-6 items-center">
                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shrink-0">
                          {i + 1}
                        </div>
                        <div className="flex-grow p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                          <p className="text-lg font-medium text-text-main">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column: Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-32 space-y-8">
                  {/* Contact Card */}
                  <div className="bg-background p-8 rounded-3xl border-2 border-primary/5 shadow-xl">
                    <h3 className="text-2xl font-bold text-primary mb-6">지금 바로 상담하세요</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      현장 사진을 찍어서 보내주시면 더 정확한 견적 상담이 가능합니다.
                    </p>
                    <a href={`tel:${PHONE_NUMBER}`} className="block mb-4">
                      <Button variant="secondary" className="w-full py-6 text-xl">
                        <Phone size={24} />
                        전화 상담 연결
                      </Button>
                    </a>
                    <p className="text-center text-primary font-bold text-2xl">{PHONE_NUMBER}</p>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                        <ShieldCheck size={20} />
                      </div>
                      <p className="font-bold text-primary">철저한 사후 관리</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                        <Zap size={20} />
                      </div>
                      <p className="font-bold text-primary">당일 방문 원칙</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
