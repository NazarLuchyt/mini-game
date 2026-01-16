import {TPlayer} from '../../types/score.type';
import {TActionCellStatus} from '../types/cell.type';

export function addPoint(gamePlayers: TPlayer[], status: TActionCellStatus): TPlayer[]{
    const [human, computer] = gamePlayers;

    if (status === 'win') {
        return [
            {
                ...human,
                score: human.score + 1,
            },
            computer,
        ];
    }

    return [
        human,
        {
            ...computer,
            score: computer.score + 1,
        },
    ];
}
