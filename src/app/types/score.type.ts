export type TScore = {
    human: number;
    computer: number;
}

export type TPlayer = {
    name: string,
    score: number;
}

export type TGameResult = {
    players: TPlayer[];
    totalRounds: number;
    winner: TPlayer | null;
}
