import {IBarrier, IDestination} from 'storyScript';
import {IGame} from '../types';

export function Inspect(text: string) {
    return function (game: IGame, barrier: [string, IBarrier], destination: IDestination): void {
        if (text) {
            game.logToLocationLog(text);
        }
    }
}