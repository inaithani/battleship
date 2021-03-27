import BaseGrid from './base/BaseGrid';
import { IGridIndexProps } from './index.model';

export default function GridWrapper(props: IGridIndexProps) {
  return <BaseGrid {...props} />
}