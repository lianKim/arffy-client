import React from 'react';
import Landing from '../components/Landing';
import { usePrefetchProductList } from '../lib/apis/productAPIs';

export default function LandingPage() {
  // 상품 목록 프리페칭 (page 0, category 'ALL')
  usePrefetchProductList();

  return <Landing />;
}
