import {Component, effect, ElementRef, inject, signal, viewChild} from '@angular/core';
import {ModalService} from '../services/modal.service';
import {TGameResult} from '../types/score.type';

@Component({
    selector: 'app-result-modal',
    imports: [],
    templateUrl: './result-modal.component.html',
    styleUrl: './result-modal.component.scss',
})
export class ResultModalComponent {
    private modalService = inject(ModalService);

    dialog = viewChild<ElementRef<HTMLDialogElement>>('dialogRef');
    gameResult = this.modalService.gameResult;

    constructor(){
        effect(() => {
            const modal = this.dialog()!.nativeElement;
            const result = this.modalService.gameResult();

            if (result) {
                modal.showModal();
            } else {
                modal.close();
            }
        });
    }

    handleBackdropClick(event: MouseEvent){
        if (event.target === this.dialog()?.nativeElement) {
            this.modalService.close();
        }
    }
}
