import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQS } from "../../constants";

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Side */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-secondary font-bold mb-4">FAQ</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                자주 묻는 질문
              </h3>
              <p className="text-lg text-text-main mb-8">
                궁금하신 점이 있으신가요? 
                가장 많이 물어보시는 질문들을 모았습니다. 
                더 자세한 상담은 언제든 전화 주시기 바랍니다.
              </p>
              <div className="p-6 bg-background rounded-2xl border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                    <HelpCircle size={24} />
                  </div>
                  <p className="font-bold text-primary">추가 문의사항</p>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  목록에 없는 질문은 고객센터로 연락 주시면 친절히 답변해 드리겠습니다.
                </p>
                <p className="text-secondary font-bold text-xl">010-8938-2540</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Accordion */}
          <div className="lg:w-2/3 space-y-4">
            {FAQS.map((faq) => (
              <div 
                key={faq.id}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? "border-secondary shadow-md" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`text-lg font-bold ${openId === faq.id ? "text-secondary" : "text-primary"}`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`transition-transform duration-300 ${openId === faq.id ? "rotate-180 text-secondary" : "text-gray-400"}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
