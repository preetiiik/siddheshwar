import { type LucideIcon } from 'lucide-react';
import './selected-features.css';
export type SelectedFeature = { title:string; description:string; Icon:LucideIcon };
export default function SelectedFeatures({ features, id }: { features:SelectedFeature[]; id:string }) {
 return <div className="sf-features"><div className="sf-grid" id={id}>{features.map(({title,description,Icon})=><div className="sf-card" key={title}><Icon size={24} strokeWidth={1.5} aria-hidden="true"/><div><h3>{title}</h3><p>{description}</p></div></div>)}</div></div>;
}
