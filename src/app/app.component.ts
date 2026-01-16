import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ResultModalComponent} from './result-modal/result-modal.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ResultModalComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
