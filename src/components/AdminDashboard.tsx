import { useState, useEffect, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, MessageSquare, Clock, User, Phone, Mail, Trash2, RefreshCw, Home, Send, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Button from './ui/Button';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // 답변 작성 중인 문의 id와 내용
  const [replyingId, setReplyingId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSavingReply, setIsSavingReply] = useState(false);

  const ADMIN_PASSWORD = "admin7788";

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const fetchInquiries = async () => {
    if (!supabase) {
      setError('데이터베이스 설정(URL 또는 Key)이 올바르지 않거나 누락되었습니다. Secrets 설정을 확인해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const fetchPromise = supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('서버 응답 시간이 초과되었습니다. 데이터베이스 설정을 확인해주세요.')), 8000);
      });

      const { data, error: supabaseError } = await Promise.race([
        fetchPromise,
        timeoutPromise
      ]) as any;

      if (supabaseError) throw supabaseError;
      setInquiries(data || []);
    } catch (err: any) {
      console.error('데이터 불러오기 실패:', err);
      setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchInquiries();
    }
  }, [isLoggedIn]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('이 문의 내역을 삭제하시겠습니까?')) return;

    try {
      const { error, count } = await supabase
        .from('inquiries')
        .delete({ count: 'exact' })
        .eq('id', id);

      if (error) throw error;

      if (count === 0) {
        alert('삭제에 실패했습니다. DB 상의 권한(RLS Policy)이 부족할 수 있습니다. Supabase 설정을 확인해주세요.');
        return;
      }

      setInquiries(inquiries.filter(item => item.id !== id));
    } catch (err: any) {
      console.error('삭제 오류 세부사항:', err);
      alert('삭제 실패: ' + (err.message || '알 수 없는 오류가 발생했습니다.'));
    }
  };

  const handleStartReply = (item: any) => {
    if (replyingId === item.id) {
      // 이미 열려있으면 닫기
      setReplyingId(null);
      setReplyText('');
    } else {
      setReplyingId(item.id);
      setReplyText(item.reply || '');
    }
  };

  const handleSaveReply = async (id: number) => {
    if (!replyText.trim()) {
      alert('답변 내용을 입력해주세요.');
      return;
    }

    setIsSavingReply(true);
    try {
      const { error, count } = await supabase
        .from('inquiries')
        .update(
          {
            reply: replyText.trim(),
            replied_at: new Date().toISOString()
          },
          { count: 'exact' }
        )
        .eq('id', id);

      if (error) throw error;

      // RLS 권한 문제로 실제 업데이트가 안 된 경우 감지
      if (count === 0) {
        alert('답변 저장에 실패했습니다.\n\nSupabase RLS 정책에서 UPDATE 권한이 필요합니다.\nSupabase 대시보드 > inquiries 테이블 > RLS > "Enable update for anon users" 정책을 추가해주세요.');
        return;
      }

      // DB에서 실제로 저장되었는지 재확인
      const { data: verifyData } = await supabase
        .from('inquiries')
        .select('reply, replied_at')
        .eq('id', id)
        .single();

      if (!verifyData?.reply) {
        alert('답변이 DB에 저장되지 않았습니다. Supabase RLS UPDATE 정책을 확인해주세요.');
        return;
      }

      // 검증 완료 후 로컬 상태 업데이트
      setInquiries(inquiries.map(item =>
        item.id === id
          ? { ...item, reply: verifyData.reply, replied_at: verifyData.replied_at }
          : item
      ));
      setReplyingId(null);
      setReplyText('');
      alert('답변이 정상적으로 저장되었습니다!');
    } catch (err: any) {
      console.error('답변 저장 실패:', err);
      alert('답변 저장 실패: ' + (err.message || '알 수 없는 오류'));
    } finally {
      setIsSavingReply(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="text-primary" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-primary">관리자 로그인</h1>
            <p className="text-gray-500 mt-2">문의 내역 확인을 위해 비밀번호를 입력하세요.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="비밀번호 입력"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            <Button type="submit" variant="primary" className="w-full py-3">
              로그인하기
            </Button>
          </form>
          <div className="flex justify-center mt-6">
            <Link to="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors">
              <Home size={14} />
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
              <MessageSquare className="text-secondary" />
              고객 문의 관리
            </h1>
            <p className="text-gray-500 mt-1">홈페이지를 통해 접수된 실시간 문의 내역입니다.</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              <Home size={16} />
              홈으로 가기
            </Link>
            <button
              onClick={fetchInquiries}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              새로고침
            </button>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              로그아웃
            </button>
          </div>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <Button onClick={fetchInquiries} variant="primary" className="mx-auto">
              다시 시도하기
            </Button>
          </div>
        ) : isLoading && inquiries.length === 0 ? (
          <div className="text-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">데이터를 불러오는 중입니다...</p>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-20 text-center border border-gray-100">
            <MessageSquare size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">아직 접수된 문의가 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {inquiries.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                        <User size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-primary">{item.name} 고객님</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <Clock size={14} />
                          {format(new Date(item.created_at), 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-full border border-primary/10">
                        {item.service || '일반 문의'}
                      </span>
                      {/* 답변 상태 배지 */}
                      {item.reply ? (
                        <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100">
                          <CheckCircle size={12} />
                          답변 완료
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-500 text-xs font-bold rounded-full border border-orange-100">
                          <AlertCircle size={12} />
                          미답변
                        </span>
                      )}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="삭제"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <a href={`tel:${item.phone}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <Phone size={18} className="text-secondary" />
                      <span className="font-medium">{item.phone}</span>
                    </a>
                    {item.email && (
                      <a href={`mailto:${item.email}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <Mail size={18} className="text-secondary" />
                        <span className="font-medium">{item.email}</span>
                      </a>
                    )}
                  </div>

                  {/* 문의 내용 */}
                  <div className="bg-primary/5 rounded-2xl p-6 mb-4">
                    <p className="text-primary leading-relaxed whitespace-pre-wrap">
                      {item.message}
                    </p>
                  </div>

                  {/* 기존 답변 표시 */}
                  {item.reply && replyingId !== item.id && (
                    <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-sm font-bold text-green-700">관리자 답변</span>
                        {item.replied_at && (
                          <span className="text-xs text-gray-400 ml-auto">
                            {format(new Date(item.replied_at), 'yyyy.MM.dd HH:mm', { locale: ko })}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                        {item.reply}
                      </p>
                    </div>
                  )}

                  {/* 답변 작성/수정 버튼 */}
                  <button
                    onClick={() => handleStartReply(item)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      replyingId === item.id
                        ? 'bg-gray-100 text-gray-600'
                        : item.reply
                        ? 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-100'
                        : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                    }`}
                  >
                    {replyingId === item.id ? (
                      <><ChevronUp size={16} /> 답변 닫기</>
                    ) : item.reply ? (
                      <><Send size={16} /> 답변 수정</>
                    ) : (
                      <><Send size={16} /> 답변 작성</>
                    )}
                  </button>

                  {/* 인라인 답변 작성 영역 */}
                  {replyingId === item.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                      <label className="text-sm font-bold text-gray-700">답변 내용</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all resize-none bg-white text-sm"
                        placeholder="고객님께 전달할 답변을 작성해주세요..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        autoFocus
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => { setReplyingId(null); setReplyText(''); }}
                          className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          취소
                        </button>
                        <Button
                          onClick={() => handleSaveReply(item.id)}
                          variant="primary"
                          className="py-2 px-5 text-sm"
                          disabled={isSavingReply}
                        >
                          <Send size={14} />
                          {isSavingReply ? '저장 중...' : '답변 저장'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
