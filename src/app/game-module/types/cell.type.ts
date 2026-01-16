export type TActionCellStatus = 'win' | 'lose';
export type TCellStatus = 'none' | 'active' | TActionCellStatus;

export type TCell = {
    id: string | number;
    status: TCellStatus,
}
