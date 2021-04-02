import BaseGrid from './base/BaseGrid';
import { IGridIndexProps } from './index.model';

export default function GridWrapper({ id, hiddenViewMode = false }: IGridIndexProps) {
  return <BaseGrid id={id} hiddenViewMode={hiddenViewMode} />;
}
