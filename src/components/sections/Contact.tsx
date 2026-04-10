import { motion, useInView } from "motion/react";
import { Phone, Send, MapPin, MessageSquare, Lock, Search, CheckCircle, Users, Clock } from "lucide-react";
import { PHONE_NUMBER, OWNER_NAME } from "../../constants";
import Button from "../ui/Button";
import { useState, useEffect, useRef, FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";

// 숫자 카운트업 애니메이션 컴포넌트
function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || target === 0) return;
    let start = 0;
    const step = Math.max(1, Math.floor(target / (duration / 30)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState({ total: 0, replied: 0 });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);

  // 이름 마스킹 (김충수 → 김○○)
  const maskName = (name: string) => {
    if (!name) return '익명';
    if (name.length <= 1) return name + '○';
    return name[0] + '○'.repeat(name.length - 1);
  };

  // 상대적 시간 표시
  const getRelativeTime = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return '방금 전';
    if (diffMin < 60) return `${diffMin}분 전`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}시간 전`;
    const diffDay = Math.floor(diffHour / 24);
    if (diffDay < 7) return `${diffDay}일 전`;
    return `${Math.floor(diffDay / 7)}주 전`;
  };

  // 문의 통계 + 최근 문의 가져오기
  useEffect(() => {
    const fetchStats = async () => {
      if (!supabase) return;
      try {
        const { count: totalCount } = await supabase
          .from('inquiries')
          .select('*', { count: 'exact', head: true });

        const { count: repliedCount } = await supabase
          .from('inquiries')
          .select('*', { count: 'exact', head: true })
          .not('reply', 'is', null);

        // 최근 문의 5건 가져오기 (개인정보 최소화: 이름, 서비스, 시간, 답변여부만)
        const { data: recent } = await supabase
          .from('inquiries')
          .select('name, service, message, created_at, reply')
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({
          total: totalCount || 0,
          replied: repliedCount || 0
        });
        setRecentInquiries(recent || []);
      } catch (err) {
        console.error('통계 조회 실패:', err);
      }
    };
    fetchStats();
  }, []);

  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    service: "전기 공사",
    message: "",
    inquiry_password: "",
    inquiry_password_confirm: ""
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 환경 변수 체크
    if (!supabase) {
      alert("데이터베이스 설정이 완료되지 않았습니다. 관리자 페이지의 Secrets 설정을 확인해주세요.");
      return;
    }

    // 비밀번호 숫자 체크
    if (!/^\d+$/.test(formState.inquiry_password)) {
      alert("비밀번호는 숫자만 입력해주세요.");
      return;
    }

    // 비밀번호 확인 체크
    if (formState.inquiry_password !== formState.inquiry_password_confirm) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const insertPromise = supabase
        .from('inquiries')
        .insert([
          {
            name: formState.name,
            phone: formState.phone,
            email: formState.email || null,
            service: formState.service,
            message: formState.message,
            inquiry_password: formState.inquiry_password,
            created_at: new Date().toISOString()
          }
        ]);

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('서버 응답 시간이 초과되었습니다. 인터넷 연결이나 데이터베이스 상태를 확인해주세요.')), 8000);
      });

      const { error } = await Promise.race([
        insertPromise,
        timeoutPromise
      ]) as any;

      if (error) throw error;

      alert(`문의가 접수되었습니다!\n\n설정한 비밀번호(${formState.inquiry_password})로 '내 문의 확인' 페이지에서 답변을 확인하실 수 있습니다.\n\n비밀번호를 꼭 기억해 두세요!`);
      setFormState({ name: "", phone: "", email: "", service: "전기 공사", message: "", inquiry_password: "", inquiry_password_confirm: "" });
    } catch (error: any) {
      console.error("저장 실패:", error);
      alert(`저장 중 오류가 발생했습니다: ${error.message || "알 수 없는 오류"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectSMS = () => {
    const message = `[주언설비 문의]\n성함: \n연락처: \n문의내용: `;
    const smsUrl = `sms:${PHONE_NUMBER}${window.navigator.userAgent.match(/iPhone/i) ? '&' : '?'}body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Info Side */}
            <div className="lg:w-2/5 bg-primary p-12 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-8">지금 바로<br /><span className="text-secondary">상담을 시작</span>하세요</h2>
                <p className="text-gray-300 mb-12 leading-relaxed">
                  전화 한 통이면 충분합니다.
                  고객님의 소중한 공간을 가장 정직하고 확실하게 수리해 드리겠습니다.
                </p>

                <div className="space-y-6">
                  <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-secondary transition-colors">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">대표 전화</p>
                      <p className="text-2xl font-bold">{PHONE_NUMBER}</p>
                    </div>
                  </a>

                  <button
                    onClick={handleDirectSMS}
                    className="w-full flex items-center gap-6 group text-left"
                  >
                    <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-secondary/80 transition-colors">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">문자 상담</p>
                      <p className="text-xl font-bold">문자로 문의하기</p>
                    </div>
                  </button>

                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">서비스 지역</p>
                      <p className="text-lg font-bold">부산 전 지역 및 인근 경남</p>
                    </div>
                  </div>
                </div>

                {/* 실시간 문의 통계 */}
                {stats.total > 0 && (
                  <div className="mt-10 grid grid-cols-2 gap-3">
                    <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Users size={16} className="text-secondary" />
                        <span className="text-xs text-gray-400">총 문의 접수</span>
                      </div>
                      <p className="text-3xl font-bold text-white">
                        <AnimatedCounter target={stats.total} />건
                      </p>
                    </div>
                    <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <CheckCircle size={16} className="text-green-400" />
                        <span className="text-xs text-gray-400">답변 완료</span>
                      </div>
                      <p className="text-3xl font-bold text-green-400">
                        <AnimatedCounter target={stats.replied} />건
                      </p>
                    </div>
                  </div>
                )}

                {/* 실시간 문의 피드 */}
                {recentInquiries.length > 0 && (
                  <div className="mt-5">
                    <p className="text-xs text-gray-400 mb-3 flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex h-2 w-2 rounded-full bg-green-400"></span></span>
                      최근 문의 현황
                    </p>
                    <div className="space-y-2 max-h-[220px] overflow-y-auto scrollbar-thin pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}>
                      {recentInquiries.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white truncate">{maskName(item.name)}</span>
                              <span className="text-[10px] px-1.5 py-0.5 bg-secondary/30 text-secondary rounded-md font-medium flex-shrink-0">{item.service || '문의'}</span>
                              {item.reply && (
                                <CheckCircle size={12} className="text-green-400 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-gray-400 truncate mt-0.5">{item.message}</p>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-gray-500 flex-shrink-0">
                            <Clock size={10} />
                            {getRelativeTime(item.created_at)}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 내 문의 확인 버튼 */}
                <div className="mt-5">
                  <Link
                    to="/inquiry-check"
                    className="flex items-center gap-4 p-5 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-secondary/80 rounded-xl flex items-center justify-center group-hover:bg-secondary transition-colors flex-shrink-0">
                      <Search size={22} />
                    </div>
                    <div>
                      <p className="font-bold text-lg">내 문의 답변 확인</p>
                      <p className="text-sm text-gray-300 mt-0.5">설정한 비밀번호로 답변을 확인하세요</p>
                    </div>
                  </Link>
                </div>

                <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-sm italic text-gray-400">
                    "현장에 있을 때는 전화를 못 받을 수 있습니다.
                    부재 시 문자를 남겨주시면 확인 즉시 연락드리겠습니다."
                  </p>
                  <p className="text-right mt-2 font-bold text-secondary">- {OWNER_NAME} 소장</p>
                </div>
              </motion.div>
            </div>

            {/* Form Side */}
            <div className="lg:w-3/5 p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-primary mb-8">온라인 문의 양식</h3>
                <form ref={form} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">성함 <span className="text-red-400">*</span></label>
                      <input
                        name="user_name"
                        type="text"
                        required
                        placeholder="성함을 입력해주세요"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">연락처 <span className="text-red-400">*</span></label>
                      <input
                        name="user_phone"
                        type="tel"
                        required
                        placeholder="010-0000-0000"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                        value={formState.phone}
                        onChange={(e) => setFormState({...formState, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* 이메일 - 선택 입력 */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      이메일 주소 <span className="text-gray-400 font-normal text-xs">(선택 사항)</span>
                    </label>
                    <input
                      name="user_email"
                      type="email"
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">문의 서비스</label>
                    <select
                      name="service_type"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all appearance-none bg-white"
                      value={formState.service}
                      onChange={(e) => setFormState({...formState, service: e.target.value})}
                    >
                      <option value="전기 공사">전기 공사</option>
                      <option value="문/경첩 수리">문/경첩 수리</option>
                      <option value="수도/배관">수도/배관</option>
                      <option value="방수 공사">방수 공사</option>
                      <option value="유품/빈집정리">유품/빈집정리</option>
                      <option value="기타 문의">기타 문의</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">문의 내용 <span className="text-red-400">*</span></label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="수리가 필요한 부분이나 궁금하신 내용을 자유롭게 적어주세요."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all resize-none"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                    ></textarea>
                  </div>

                  {/* 비밀번호 설정 섹션 */}
                  <div className="p-4 bg-secondary/5 rounded-2xl border border-secondary/20 space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Lock size={16} className="text-secondary" />
                      <p className="text-sm font-bold text-gray-700">답변 확인용 비밀번호 설정 <span className="text-red-400">*</span></p>
                    </div>
                    <p className="text-xs text-gray-500 -mt-2">숫자만 입력해주세요 (예: 1234). 나중에 '내 문의 답변 확인' 페이지에서 이 번호로 답변을 확인합니다.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-600">비밀번호</label>
                        <input
                          type="password"
                          inputMode="numeric"
                          pattern="\d*"
                          required
                          placeholder="숫자만 입력 (예: 1234)"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                          value={formState.inquiry_password}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            setFormState({...formState, inquiry_password: val});
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-600">비밀번호 확인</label>
                        <input
                          type="password"
                          inputMode="numeric"
                          pattern="\d*"
                          required
                          placeholder="비밀번호를 다시 입력"
                          className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all ${
                            formState.inquiry_password_confirm && formState.inquiry_password !== formState.inquiry_password_confirm
                              ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                              : 'border-gray-200 focus:border-secondary focus:ring-secondary/20'
                          }`}
                          value={formState.inquiry_password_confirm}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            setFormState({...formState, inquiry_password_confirm: val});
                          }}
                        />
                        {formState.inquiry_password_confirm && formState.inquiry_password !== formState.inquiry_password_confirm && (
                          <p className="text-xs text-red-500">비밀번호가 일치하지 않습니다.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" required id="privacy" className="w-4 h-4 text-secondary border-gray-300 rounded focus:ring-secondary" />
                    <label htmlFor="privacy" className="text-sm text-gray-500 underline cursor-pointer">개인정보 수집 및 이용에 동의합니다.</label>
                  </div>

                  <Button
                    type="submit"
                    variant="secondary"
                    className="w-full py-4 text-lg"
                    disabled={isSubmitting}
                  >
                    <Send size={20} />
                    {isSubmitting ? "전송 중..." : "문의 내용 보내기"}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
