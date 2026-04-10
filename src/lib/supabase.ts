import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 값을 가져오고 모든 불순물을 제거하여 순수한 주소/키만 남깁니다.
const cleanValue = (val: string | undefined) => {
  if (!val) return '';
  
  // 1. 모든 종류의 괄호, 따옴표, 공백 제거 시도
  let cleaned = val.trim()
    .replace(/[\[\]\(\)\"\']/g, '') // [ ] ( ) " ' 제거
    .split(/\s+/)[0]; // 공백이 있다면 첫 번째 덩어리만 선택
    
  // 2. 만약 주소 형태라면 http로 시작하는 부분부터 끝까지만 추출
  if (cleaned.includes('http')) {
    const match = cleaned.match(/https?:\/\/[^\s\)]+/);
    if (match) cleaned = match[0];
  }
  
  return cleaned.trim();
};

const supabaseUrl = cleanValue(import.meta.env.VITE_SUPABASE_URL);
const supabaseAnonKey = cleanValue(import.meta.env.VITE_SUPABASE_ANON_KEY);

// URL 형식이 올바른지 확인하고, 오류 발생 시 앱이 멈추지 않도록 처리합니다.
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey || !supabaseUrl.startsWith('http')) {
    return null;
  }
  try {
    // 유효한 URL인지 한 번 더 확인
    new URL(supabaseUrl);
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.error('Supabase 클라이언트 초기화 실패:', e);
    return null;
  }
};

export const supabase = createSupabaseClient() as any;

if (!supabase) {
  console.warn('Supabase 설정이 올바르지 않거나 누락되었습니다. Secrets 설정을 확인해주세요.');
}
