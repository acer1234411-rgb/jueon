import { motion } from "motion/react";
import { Phone, MessageSquare, CheckCircle2 } from "lucide-react";
import { PHONE_NUMBER, OWNER_NAME } from "../../constants";
import Button from "../ui/Button";
import ownerImg from "../../owner.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero.png" 
          alt="한국형 깔끔한 집 인테리어 배경" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 bg-secondary text-white rounded-full text-sm font-bold mb-6">
              부산 전 지역 신속 출장 가능
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              우리 동네 만능 해결사,<br />
              <span className="text-secondary">주언설비 {OWNER_NAME}</span> 소장입니다.
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              전기, 문, 수도, 방수, 철거까지!<br />
              일상의 소소한 불편함부터 복잡한 공사까지 한 번에 해결해 드립니다.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {["30년 경력 베테랑", "정직한 가격 정찰제", "내 집처럼 꼼꼼하게"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-white/90 text-sm md:text-base">
                  <CheckCircle2 size={18} className="text-secondary" />
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${PHONE_NUMBER}`} className="flex-1 sm:flex-none">
                <Button variant="secondary" className="w-full sm:w-auto text-lg py-4 px-8">
                  <Phone size={20} />
                  지금 바로 전화문의
                </Button>
              </a>
              <a href="#contact" className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full sm:w-auto text-lg py-4 px-8 border-white text-white hover:bg-white hover:text-primary">
                  <MessageSquare size={20} />
                  온라인 문의하기
                </Button>
              </a>
            </div>
            
            <div className="mt-8 text-white/70 font-medium">
              대표번호: <span className="text-white text-xl">{PHONE_NUMBER}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Badge */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="hidden lg:block absolute right-12 bottom-24 glass p-6 rounded-2xl max-w-xs"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary">
            <img src={ownerImg} alt={OWNER_NAME} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-bold text-primary">{OWNER_NAME} 소장</p>
            <p className="text-xs text-gray-500">현장 책임 시공 전문가</p>
          </div>
        </div>
        <p className="text-sm text-text-main italic">
          "고객님의 불편함을 내 가족의 일처럼 생각하고 가장 정직한 방법으로 해결해 드립니다."
        </p>
      </motion.div>
    </section>
  );
}
