import BaseGrid from './base/BaseGrid';
import { IGridIndexProps } from './index.model';

export default function GridWrapper(props: IGridIndexProps) {
  const {
    columns,
    rows,
    gridState,
    updateGridState,
  } = props;
  return (
    <BaseGrid
      rows={rows}
      columns={columns}
      gridState={gridState}
      updateGridState={updateGridState}
    />
  );
}
