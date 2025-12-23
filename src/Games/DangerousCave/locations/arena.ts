import {IGame, Location} from '../types';
import description from './arena.html?raw'
import {Orc} from '../enemies/orc';
import {Troll} from '../enemies/troll';
import {CandleLitCave} from './candleLitCave';

export function Arena() {
    return Location({
        name: 'Een hoek van de grot waar kaarsen branden',
        description: description,
        enemies: [
            Orc()
        ],
        destinations: [
            {
                name: 'De grote grot in',
                target: CandleLitCave
            }
        ],
        actions: [['SearchSymbol',
            {
                text: 'Onderzoek symbool',
                execute: function (game: IGame) {
                    const troll = Troll();
                    game.currentLocation.enemies.add(troll);
                    game.worldProperties.arenaStarted = true;
                    game.logToActionLog('Er verschijnt op magische wijze een enorme trol waar het symbool was! Hij valt je aan!');
                }
            }
        ]]
    });
}