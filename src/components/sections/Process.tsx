import { motion } from "motion/react";
import { PhoneCall, CalendarCheck, Wrench, CheckCircle } from "lucide-react";

export default function Process() {
  const steps = [
    {
      icon: <PhoneCall size={32} />,
      title: "문의 및 상담",
      desc: "전화 또는 온라인으로 고장 상황이나 필요한 서비스를 문의합니다."
    },
    {
      icon: <CalendarCheck size={32} />,
      title: "방문 및 진단",
      desc: "소장님이 직접 방문하여 원인을 파악하고 정확한 견적을 안내합니다."
    },
    {
      icon: <Wrench size={32} />,
      title: "책임 시공",
      desc: "30년 경력의 노하우로 꼼꼼하고 완벽하게 작업을 진행합니다."
    },
    {
      icon: <CheckCircle size={32} />,
      title: "완료 및 사후관리",
      desc: "작업 결과를 확인하고, 향후 관리 방법 안내 및 AS를 보장합니다."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-secondary font-bold mb-4">OUR PROCESS</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              복잡한 절차 없이<br />
              <span className="text-secondary">빠르고 간편하게</span> 해결하세요
            </h3>
          </motion.div>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-secondary shadow-lg mb-6 border-4 border-background group hover:bg-secondary hover:text-white transition-all duration-300">
                  {step.icon}
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm w-full">
                  <span className="text-secondary font-bold text-sm mb-2 block">STEP 0{idx + 1}</span>
                  <h4 className="text-xl font-bold text-primary mb-3">{step.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
