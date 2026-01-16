import {Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';

export const routes: Routes = [
    {
        path: 'game',
        loadChildren: () => import('./game-module/game-module.routes').then(mod => mod.gameModuleRoutes),
    },
    {
        path: '',
        component: HomePageComponent,
    },

    {path: '**', redirectTo: ''},
];
