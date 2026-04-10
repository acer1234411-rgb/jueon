import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { Search, MessageSquare, Clock, CheckCircle, AlertCircle, Home, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function InquiryCheck() {
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (!supabase) {
      setError('데이터베이스 설정이 완료되지 않았습니다.');
      return;
    }

    if (!nameInput.trim() || !passwordInput.trim()) {
      alert('성함과 비밀번호를 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');
    setResults([]);

    try {
      const { data, error: supabaseError } = await supabase
        .from('inquiries')
        .select('id, name, service, message, created_at, reply, replied_at')
        .eq('name', nameInput.trim())
        .eq('inquiry_password', passwordInput.trim())
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;

      setResults(data || []);
      setSearched(true);
    } catch (err: any) {
      console.error('조회 실패:', err);
      setError(err.message || '조회 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-secondary" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-primary">내 문의 답변 확인</h1>
          <p className="text-gray-500 mt-2">문의 시 설정한 성함과 비밀번호를 입력하세요.</p>
        </div>

        {/* 검색 폼 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <form onSubmit={handleSearch} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">성함</label>
              <input
                type="text"
                required
                placeholder="문의 시 입력한 성함"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Lock size={14} />
                비밀번호
              </label>
              <input
                type="password"
                inputMode="numeric"
                required
                placeholder="설정한 숫자 비밀번호 입력"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                value={passwordInput}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setPasswordInput(val);
                }}
              />
            </div>
            <Button
              type="submit"
              variant="secondary"
              className="w-full py-3"
              disabled={isLoading}
            >
              <Search size={18} />
              {isLoading ? '조회 중...' : '문의 내역 확인하기'}
            </Button>
          </form>

          <div className="mt-4 p-4 bg-secondary/5 rounded-xl border border-secondary/10">
            <p className="text-xs text-gray-500 text-center">
              💡 비밀번호를 잊으신 경우, 전화 또는 문자로 문의해 주세요.
            </p>
          </div>
        </div>

        {/* 오류 표시 */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-6 text-center">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* 결과 표시 */}
        {searched && !isLoading && (
          <div className="space-y-4">
            {results.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <AlertCircle size={40} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 font-medium mb-1">문의 내역을 찾을 수 없습니다.</p>
                <p className="text-gray-400 text-sm">성함과 비밀번호를 다시 확인해주세요.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 font-medium px-1">총 {results.length}건의 문의 내역이 확인되었습니다.</p>
                {results.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6">
                      {/* 문의 헤더 */}
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-full border border-primary/10">
                              {item.service || '일반 문의'}
                            </span>
                            {item.reply ? (
                              <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100">
                                <CheckCircle size={12} />
                                답변 완료
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-500 text-xs font-bold rounded-full border border-orange-100">
                                <AlertCircle size={12} />
                                답변 준비 중
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                            <Clock size={12} />
                            {format(new Date(item.created_at), 'yyyy년 MM월 dd일 HH:mm', { locale: ko })} 접수
                          </div>
                        </div>
                      </div>

                      {/* 문의 내용 */}
                      <div className="mb-5">
                        <p className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1">
                          <MessageSquare size={12} />
                          문의 내용
                        </p>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">{item.message}</p>
                        </div>
                      </div>

                      {/* 답변 영역 */}
                      {item.reply ? (
                        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold text-green-700 flex items-center gap-1">
                              <CheckCircle size={12} />
                              주언설비 답변
                            </p>
                            {item.replied_at && (
                              <span className="text-xs text-gray-400">
                                {format(new Date(item.replied_at), 'yyyy.MM.dd HH:mm', { locale: ko })}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">{item.reply}</p>
                        </div>
                      ) : (
                        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-center">
                          <AlertCircle size={20} className="text-orange-300 mx-auto mb-2" />
                          <p className="text-sm text-orange-500 font-medium">아직 답변이 준비 중입니다.</p>
                          <p className="text-xs text-gray-400 mt-1">빠른 시간 내 답변을 드리겠습니다.</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* 홈으로 */}
        <div className="text-center mt-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors">
            <Home size={14} />
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
