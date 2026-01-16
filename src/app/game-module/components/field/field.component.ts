import {AsyncPipe, NgClass} from '@angular/common';
import {Component, inject} from '@angular/core';
import {GameService} from '../../services/game.service';
import {FieldHeaderComponent} from '../field-header/field-header.component';

@Component({
    selector: 'app-field',
    imports: [
        AsyncPipe,
        NgClass,
        FieldHeaderComponent,
    ],
    templateUrl: './field.component.html',
    styleUrl: './field.component.scss',
    providers: [
        GameService,
    ],
})
export class FieldComponent {
    private gameService = inject(GameService);
    field$ = this.gameService.field$;
    colsCount = this.gameService.getColsCount();

    handleClick(id: number | string, status: string){
        if (status === 'active') {
            this.gameService.userClick(id);
        }
    }
}
