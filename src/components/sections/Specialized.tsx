import { motion } from "motion/react";
import { Heart, ShieldCheck, Trash2, CheckCircle2, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { PHONE_NUMBER } from "../../constants";
import Button from "../ui/Button";

export default function Specialized() {
  const points = [
    {
      icon: <Heart className="text-secondary" />,
      title: "추억을 존중하는 마음",
      desc: "고인의 유품을 단순히 짐이 아닌 소중한 추억으로 대하며 정성스럽게 정리합니다."
    },
    {
      icon: <ShieldCheck className="text-secondary" />,
      title: "철저한 비밀 보장",
      desc: "작업 과정에서 알게 된 정보나 프라이버시를 완벽하게 보호합니다."
    },
    {
      icon: <Trash2 className="text-secondary" />,
      title: "투명하고 합리적인 비용",
      desc: "불필요한 추가 비용 없이, 폐기물 처리부터 청소까지 투명한 견적을 제시합니다."
    }
  ];

  return (
    <section id="specialized" className="py-24 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content Side */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1 bg-secondary text-white rounded-full text-sm font-bold mb-6">
                주언설비 특화 서비스
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                유품정리 · 빈집정리<br />
                <span className="text-secondary">빈틈없이 정성껏</span> 마무리합니다.
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                복잡하고 힘든 과정, 주언설비가 곁에서 돕겠습니다. 
                고인의 마지막 길을 배웅하는 마음으로, 남겨진 공간을 깨끗하고 평온하게 되돌려 드립니다.
              </p>

              <div className="space-y-8 mb-12">
                {points.map((point, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                      {point.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{point.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`tel:${PHONE_NUMBER}`}>
                  <Button variant="secondary" className="w-full sm:w-auto text-lg py-4 px-8">
                    <Phone size={20} />
                    전문 상담하기
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Image/Process Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <img 
                  src="/services/service_cleanup_items_1775795503922.png" 
                  alt="유품 분류 및 정리 현장" 
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <Link to="/service/cleanup-items" className="block group">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 group-hover:bg-white/20 transition-all">
                    <p className="text-secondary font-bold text-2xl mb-2">01</p>
                    <p className="font-bold group-hover:text-secondary transition-colors">유품 분류 및 정리</p>
                    <p className="text-sm text-gray-400">귀중품과 폐기물 선별</p>
                  </div>
                </Link>
              </div>
              <div className="space-y-4">
                <Link to="/service/cleanup-waste" className="block group">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 group-hover:bg-white/20 transition-all">
                    <p className="text-secondary font-bold text-2xl mb-2">02</p>
                    <p className="font-bold group-hover:text-secondary transition-colors">폐기물 수거 및 처리</p>
                    <p className="text-sm text-gray-400">합법적이고 깔끔한 처리</p>
                  </div>
                </Link>
                <img 
                  src="/services/service_cleanup_waste_1775795518235.png" 
                  alt="폐기물 수거 및 처리 현장" 
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <Link to="/service/cleanup-special" className="block group">
                  <div className="bg-secondary p-6 rounded-2xl shadow-xl group-hover:bg-secondary/90 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 size={20} />
                      <p className="font-bold group-hover:underline">특수 청소 마무리</p>
                    </div>
                    <p className="text-sm text-white/80">공간의 평온을 되찾아 드립니다</p>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
