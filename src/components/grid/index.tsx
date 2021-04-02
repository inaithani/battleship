import BaseGrid from './base/BaseGrid';
import { IGridIndexProps } from './index.model';

export default function GridWrapper({ id }: IGridIndexProps) {
  return <BaseGrid id={id} />;
}
