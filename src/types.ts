export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  content: string;
  service: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
