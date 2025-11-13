import RoloLayout from '@/components/layout';
import { ReactNode } from 'react';

export default function MarketPlaceLayout({
  children,
}: {
  children?: ReactNode;
}) {
  return <RoloLayout>{children}</RoloLayout>;
}
