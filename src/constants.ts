import { Service, Testimonial, FAQItem } from './types';

export const PHONE_NUMBER = "010-8938-2540";
export const OWNER_NAME = "황병일";
export const COMPANY_NAME = "주언설비";

export const SERVICES: Service[] = [
  {
    id: "electric",
    title: "전기 공사",
    description: "전등 교체, 콘센트 증설, 누전 차단기 점검 및 수리 등 모든 전기 문제 해결",
    icon: "Zap",
    image: "/services/service_electric_1775795413437.png"
  },
  {
    id: "door",
    title: "문/경첩 수리",
    description: "현관문, 방문, 경첩 교체, 도어클로저 설치 및 각종 문 관련 수리",
    icon: "DoorOpen",
    image: "/services/service_door_1775795458856.png"
  },
  {
    id: "plumbing",
    title: "수도/배관",
    description: "수도꼭지 교체, 변기/싱크대 막힘 해결, 배관 수리 및 설비",
    icon: "Droplets",
    image: "/services/service_plumbing_1775795476202.png"
  },
  {
    id: "waterproof",
    title: "방수 공사",
    description: "옥상 방수, 화장실 방수, 외벽 방수 등 누수 걱정 없는 완벽 시공",
    icon: "ShieldCheck",
    image: "/services/service_waterproof_1775795489028.png"
  },
  {
    id: "cleanup-items",
    title: "유품 분류 및 정리",
    description: "고인의 소중한 유품을 정성껏 분류하고 정리해 드립니다.",
    icon: "Heart",
    image: "/services/service_cleanup_items_1775795503922.png"
  },
  {
    id: "cleanup-waste",
    title: "폐기물 수거 및 처리",
    description: "빈집의 가구와 폐기물을 합법적이고 깔끔하게 처리해 드립니다.",
    icon: "Trash2",
    image: "/services/service_cleanup_waste_1775795518235.png"
  },
  {
    id: "cleanup-special",
    title: "특수 청소 마무리",
    description: "공간의 오염과 냄새를 완벽하게 제거하여 평온한 일상을 되찾아 드립니다.",
    icon: "ShieldCheck",
    image: "/services/service_cleanup_special_1775795532954.png"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "김*수 (부산 해운대구)",
    rating: 5,
    content: "갑자기 전기가 나가서 당황했는데, 소장님이 정말 빨리 오셔서 해결해주셨어요. 설명도 친절하시고 가격도 정직해서 믿음이 갑니다.",
    service: "전기 수리"
  },
  {
    id: 2,
    name: "이*영 (부산 연제구)",
    rating: 5,
    content: "유품정리 서비스를 이용했는데, 고인의 물건을 정말 정성스럽게 다뤄주셔서 감동받았습니다. 깔끔한 마무리에 마음이 한결 가벼워졌어요.",
    service: "유품정리"
  },
  {
    id: 3,
    name: "박*호 (부산 수영구)",
    rating: 5,
    content: "수도꼭지 하나 바꾸는 소소한 일인데도 내 집 일처럼 꼼꼼하게 봐주셨어요. 역시 베테랑은 다르시네요.",
    service: "수도 교체"
  },
  {
    id: 4,
    name: "최*지 (부산 남구)",
    rating: 5,
    content: "싱크대 막힘 때문에 고생했는데 소장님이 오셔서 시원하게 뚫어주셨어요. 뒷정리까지 깔끔하게 해주셔서 너무 만족합니다.",
    service: "배관 수리"
  },
  {
    id: 5,
    name: "정*훈 (부산 동래구)",
    rating: 5,
    content: "옥상 방수 공사 맡겼는데 비가 많이 와도 이제 걱정이 없네요. 꼼꼼한 시공 정말 감사합니다.",
    service: "방수 공사"
  },
  {
    id: 6,
    name: "강*민 (부산 북구)",
    rating: 5,
    content: "현관문 도어락이랑 경첩 수리 받았는데 소리도 안 나고 부드럽게 잘 열리네요. 진작 부를 걸 그랬어요.",
    service: "문 수리"
  },
  {
    id: 7,
    name: "윤*서 (부산 사하구)",
    rating: 5,
    content: "화장실 타일 사이로 물이 새서 걱정했는데 원인을 바로 찾아주셨어요. 전문가는 역시 다르다는 걸 느꼈습니다.",
    service: "누수 탐지"
  },
  {
    id: 8,
    name: "임*철 (부산 금정구)",
    rating: 5,
    content: "부모님 댁 전등 전체 교체해드렸는데 너무 밝아져서 좋아하세요. 친절하게 작업해주셔서 감사합니다.",
    service: "전등 교체"
  },
  {
    id: 9,
    name: "한*아 (부산 기장군)",
    rating: 5,
    content: "이사 가면서 각종 설비 점검 받았는데 하나하나 세심하게 체크해주셔서 안심하고 이사할 수 있었습니다.",
    service: "종합 점검"
  },
  {
    id: 10,
    name: "송*우 (부산 사상구)",
    rating: 5,
    content: "베란다 수도 연결 문제로 연락드렸는데 당일 방문해주셔서 빠르게 해결해주셨어요. 최고입니다!",
    service: "수도 설비"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "출장 가능 지역은 어디인가요?",
    answer: "부산 전 지역 및 인근 경남 지역(양산, 김해 등)까지 신속하게 출장 가능합니다."
  },
  {
    id: 2,
    question: "견적 확인은 어떻게 하나요?",
    answer: "전화(010-8938-2540)로 문의 주시면 대략적인 상담이 가능하며, 정확한 견적은 현장 방문 후 상세히 안내해 드립니다."
  },
  {
    id: 3,
    question: "긴급 수리도 가능한가요?",
    answer: "누수나 전기 고장 등 긴급한 상황의 경우 최대한 우선적으로 일정을 조율하여 신속히 방문하고 있습니다."
  },
  {
    id: 4,
    question: "유품정리 비용은 어떻게 산정되나요?",
    answer: "정리해야 할 물품의 양, 폐기물 처리 비용, 작업 인원 및 소요 시간 등을 종합적으로 고려하여 투명하게 산정합니다."
  }
];
