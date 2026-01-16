import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DEFAULT_DELAY} from '../../constants/delay.const';
import {GameService} from '../../services/game.service';

@Component({
    selector: 'app-field-header',
    imports: [
        AsyncPipe,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './field-header.component.html',
    styleUrl: './field-header.component.scss',
})
export class FieldHeaderComponent {
    private gameService = inject(GameService);

    minDelay = 0;
    delayValue = new FormControl(DEFAULT_DELAY);
    gameResult$ = this.gameService.gameResult$;

    triggerGame(){
        this.gameService.triggerGame();
    }

    constructor(){
        this.delayValue.valueChanges.subscribe(newVal => {
            const value = this.validateDelayValue(newVal);

            this.delayValue.setValue(value, {emitEvent: false});
            this.gameService.delay = value;
        });
    }

    private validateDelayValue(val: number | null){
        const value = Number(val);

        if (isNaN(value) || this.minDelay > value) {
            return this.minDelay;
        }

        return Math.floor(value);
    }
}
