import { motion } from "motion/react";
import { Zap, DoorOpen, Droplets, ShieldCheck, ArrowRight, Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { SERVICES } from "../../constants";
import Button from "../ui/Button";

const iconMap: Record<string, any> = {
  Zap,
  DoorOpen,
  Droplets,
  ShieldCheck,
  Heart,
  Trash2
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-secondary font-bold mb-4">OUR SERVICES</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              일상의 모든 불편함,<br />
              <span className="text-secondary">주언설비</span>가 완벽하게 해결합니다
            </h3>
            <p className="text-lg text-text-main">
              작은 전등 교체부터 대규모 설비 공사까지, 
              분야별 전문 지식과 최신 장비로 신속하고 정확하게 시공합니다.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, idx) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center text-secondary shadow-lg">
                    <Icon size={24} />
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-bold text-primary mb-4">{service.title}</h4>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {service.description}
                  </p>
                  <Link to={`/service/${service.id}`} className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all">
                    자세히 보기 <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-8">찾으시는 서비스가 목록에 없나요? 걱정 마세요!</p>
          <a href="#contact">
            <Button variant="primary" className="px-10">
              기타 서비스 문의하기
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
