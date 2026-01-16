import {Injectable} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BehaviorSubject, filter} from 'rxjs';
import {ModalService} from '../../services/modal.service';
import {TGameResult} from '../../types/score.type';
import {DEFAULT_DELAY} from '../constants/delay.const';
import {TActionCellStatus, TCell, TCellStatus} from '../types/cell.type';
import {addPoint} from '../utils/score.utils';

@Injectable()
export class GameService {
    readonly rowSize = 10;
    readonly rowCount = 10;
    readonly winScore = 10;

    private _field$ = new BehaviorSubject<TCell[]>([]);
    private _gameResult$ = new BehaviorSubject<TGameResult | null>(null);
    private _delay = DEFAULT_DELAY;
    private activeCells: Map<TCell['id'], number> = new Map();
    private timeoutId: ReturnType<typeof setTimeout> | null = null;

    get field$(){
        return this._field$.asObservable();
    }

    get gameResult$(){
        return this._gameResult$.asObservable();
    }

    set delay(value: number){
        this._delay = value;
    }

    constructor(
        private modalService: ModalService,
    ){
        this.createField();

        this._gameResult$.pipe(
            takeUntilDestroyed(),
            filter(result => Boolean(result)),
        ).subscribe(result => {
            if (result?.winner) {
                this.modalService.show(result);
            } else {
                this.activateCell();
            }
        });
    }

    resetField(){
        this.clearTimer();
        this.createField();
        this._gameResult$.next(null);
    }

    getColsCount(){
        return this.rowSize;
    }

    triggerGame(){
        const result = this._gameResult$.getValue();

        if (result) {
            this.resetField();
        } else {
            this._gameResult$.next({
                winner: null,
                totalRounds: 0,
                players: [
                    {name: 'Player', score: 0},
                    {name: 'Computer', score: 0},
                ],
            });
        }
    }

    userClick(id: number | string){
        this.clearTimer();

        if (!this.activeCells.has(id)) {
            return;
        }

        const cellIndex = this.activeCells.get(id)!;

        this.activeCells.delete(id);
        this.changeCellStatus(cellIndex, 'win');
    }

    private createField(){
        const length = this.rowSize * this.rowCount;
        const field = [];
        this.activeCells = new Map();

        for (let index = 0; index < length; index++) {
            const cell: TCell = {id: index, status: 'none'};
            field.push(cell);
            this.activeCells.set(cell.id, index);
        }

        this._field$.next(field);
    }

    private activateCell(){
        this.clearTimer();

        if (!this.activeCells.size) {
            return;
        }

        const activeCellIndex = Math.floor(Math.random() * this.activeCells.size);
        const cellId = [...this.activeCells.keys()][activeCellIndex];
        const cellIndex = this.activeCells.get(cellId)!;

        this.changeCellStatus(cellIndex, 'active');

        this.timeoutId = setTimeout(() => {
            this.changeCellStatus(cellIndex, 'lose');
            this.activeCells.delete(cellId);
        }, this._delay);
    }

    private changeCellStatus(index: number, status: TCellStatus){
        const field = this._field$.getValue();

        field[index].status = status;

        this._field$.next(field);

        if (status === 'win' || status === 'lose') {
            this.updateGameResult(status);
        }
    }

    private updateGameResult(status: TActionCellStatus){
        const gameResult = this._gameResult$.getValue()!;
        const players = addPoint(gameResult.players, status);
        const winner = players.find(player => player.score >= this.winScore);

        this._gameResult$.next({
            ...gameResult,
            players,
            totalRounds: gameResult.totalRounds + 1,
            winner: winner || null,
        });
    }

    private clearTimer(){
        this.timeoutId && clearTimeout(this.timeoutId);
    }
}
