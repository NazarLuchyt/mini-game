import {Injectable, signal} from '@angular/core';
import {TGameResult, TScore} from '../types/score.type';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    gameResult = signal<TGameResult | null>(null);

    show(result: TGameResult | null){
        this.gameResult.set(result);
    }

    close(){
        this.gameResult.set(null);
    }
}
