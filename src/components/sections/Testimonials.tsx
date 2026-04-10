import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../constants";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-secondary font-bold mb-4">CUSTOMER REVIEWS</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              많은 분들이 직접 경험하고<br />
              <span className="text-secondary">솔직하게 남겨주신</span> 후기입니다
            </h3>
          </motion.div>
        </div>

        <div className="relative">
          {/* Marquee Container */}
          <div className="flex overflow-hidden">
            <motion.div 
              className="flex gap-8 py-4"
              animate={{ 
                x: [0, -1500],
              }}
              transition={{ 
                duration: 40, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, idx) => (
                <div
                  key={`${testimonial.id}-${idx}`}
                  className="bg-background p-8 rounded-2xl relative shadow-sm hover:shadow-md transition-all border border-gray-100 min-w-[350px] md:min-w-[400px] flex flex-col"
                >
                  <Quote className="absolute top-6 right-8 text-secondary/10" size={60} />
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-secondary text-secondary" />
                    ))}
                  </div>

                  <p className="text-text-main text-lg leading-relaxed mb-6 relative z-10">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-200">
                    <div>
                      <p className="font-bold text-primary">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.service}</p>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-secondary font-bold shadow-sm">
                      {testimonial.name[0]}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Gradient Overlays for smooth edges */}
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 italic">
            * 고객님의 소중한 후기는 주언설비가 더 나은 서비스를 제공하는 원동력이 됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}
