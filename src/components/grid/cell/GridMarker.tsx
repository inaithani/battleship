import classNames from 'classnames';
import { DefaultGridDimesions } from '../../../App.model';
import styles from './Cell.module.scss';

const GridMarker = ({ rowIndex, columnIndex } : { rowIndex: number, columnIndex: number }) => {
  const isColumnMarker = rowIndex === 0;
  const isRowMarker = columnIndex === 0;
  const { CellSize } = DefaultGridDimesions;
  const columnMarkertLetterCharCode = 65 + columnIndex;

  const classes = classNames({
    [styles.columnMarker]: isColumnMarker,
    [styles.rowMarker]: isRowMarker,
  });

  const inlineStyles = isColumnMarker
    ? { top: -CellSize } : { left: -CellSize };

  return (
    <div className={classes} style={!(isRowMarker && isColumnMarker) ? inlineStyles : {}}>
      {
        isRowMarker && !isColumnMarker ? rowIndex + 1 : null
      }
      {
        !isRowMarker && isColumnMarker ? String.fromCharCode(columnMarkertLetterCharCode) : null
      }
      {
        isRowMarker && isColumnMarker ? (
          <>
            <div className={styles.columnIndexMarker} style={{ top: -CellSize }}>
              { String.fromCharCode(columnMarkertLetterCharCode) }
            </div>
            <div className={styles.rowIndexMarker} style={{ left: -CellSize }}>
              { rowIndex + 1 }
            </div>
          </>
        ) : null
      }
    </div>
  );
};

export default GridMarker;
