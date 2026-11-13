import {Character, Enemy, IEnemy, IGame} from "../types";
import description from './Spectre.html?raw';
import {ClassType} from "../classType";
import {damageSpecial} from "../combatRules";

export function Spectre() {
    return Enemy({
        name: 'Spectre',
        description: description,
        hitpoints: 15,
        defence: 4,
        currency: 4,
        attacks: [
            {
                damage: '1d4',
                isMagic: true,
                damageSpecial: (game: IGame, enemy: IEnemy, character: Character) => damageSpecial(game, enemy, character, 'frightened', 4),
                speed: 5,
                attackPriority: [
                    [ClassType.Wizard, [1, 2, 3, 4]],
                    [ClassType.Warrior, [5, 6]]
                ]
            }
        ],
        activeNight: true
    });
}