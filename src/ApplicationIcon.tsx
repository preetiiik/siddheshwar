import { House, Building2, Hotel, Store, Utensils, BedDouble, Sofa, Trees, Film, Presentation, MapPin } from 'lucide-react';

export default function ApplicationIcon({ label }: { label: string }) {
  const icons = [
    { pattern: /hotel|hospitality|resort/i, Icon: Hotel },
    { pattern: /office|commercial|corporate|building/i, Icon: Building2 },
    { pattern: /retail|shop|showroom|display/i, Icon: Store },
    { pattern: /restaurant|cafe|café|dining/i, Icon: Utensils },
    { pattern: /theatre|theater|cinema|entertainment/i, Icon: Film },
    { pattern: /conference|meeting/i, Icon: Presentation },
    { pattern: /bedroom/i, Icon: BedDouble },
    { pattern: /living room|lounge/i, Icon: Sofa },
    { pattern: /outdoor|garden|landscape|pathway|walkway/i, Icon: Trees },
    { pattern: /home|villa|apartment|residen|flat/i, Icon: House },
  ];
  const Icon = icons.find(({ pattern }) => pattern.test(label))?.Icon ?? MapPin;
  return <Icon className="application-icon" size={19} strokeWidth={1.6} aria-hidden="true" />;
}
