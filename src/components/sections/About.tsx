import { motion } from "motion/react";
import { Award, ShieldCheck, Heart, Wrench } from "lucide-react";
import { OWNER_NAME } from "../../constants";
import ownerImg from "../../owner.png";

export default function About() {
  const features = [
    {
      icon: <Award className="text-secondary" size={32} />,
      title: "30년 현장 경력",
      description: "수만 건의 현장 경험을 통해 쌓은 노하우로 어떤 문제든 정확하게 진단하고 해결합니다."
    },
    {
      icon: <ShieldCheck className="text-secondary" size={32} />,
      title: "정직한 서비스",
      description: "과잉 수리 없이 꼭 필요한 작업만 제안하며, 투명한 견적으로 신뢰를 드립니다."
    },
    {
      icon: <Heart className="text-secondary" size={32} />,
      title: "내 집 같은 꼼꼼함",
      description: "보이지 않는 곳까지 세심하게 작업하여 재발 없는 완벽한 시공을 약속합니다."
    },
    {
      icon: <Wrench className="text-secondary" size={32} />,
      title: "만능 해결사",
      description: "전기부터 수도, 방수까지 여러 업체 부를 필요 없이 한 번에 해결 가능한 전문성."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={ownerImg} 
                alt={OWNER_NAME} 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full -z-0"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full -z-0"></div>
            
            <div className="absolute bottom-8 left-8 z-20 glass p-6 rounded-xl shadow-lg max-w-[240px]">
              <p className="text-primary font-bold text-lg mb-1">황병일 소장</p>
              <p className="text-sm text-text-main">"믿고 맡겨주시는 만큼 결과로 보답하겠습니다."</p>
            </div>
          </motion.div>

          {/* Content Side */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-secondary font-bold mb-4">WHY CHOOSE US</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-8 leading-tight">
                왜 부산 시민들이<br />
                <span className="text-secondary">주언설비</span>를 다시 찾을까요?
              </h3>
              <p className="text-lg text-text-main mb-12 leading-relaxed">
                갑작스러운 고장은 당황스럽고 불안합니다. 주언설비는 그 마음을 누구보다 잘 알기에, 
                단순히 고치는 것을 넘어 고객님의 일상에 '안심'을 더해드리는 것을 최우선 가치로 삼습니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex flex-col gap-4">
                    <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-bold text-primary">{feature.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
