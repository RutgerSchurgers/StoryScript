import {Character, Enemy, IEnemy, IGame} from '../types';
import description from './ShadowDog.html?raw';
import {ClassType} from "../classType";
import {check} from "../sharedFunctions";
import {damageSpecial} from "../combatRules";

export function ShadowDog() {
    return Enemy({
        name: 'Shadow Dog',
        description: description,
        hitpoints: 20,
        defence: 3,
        currency: 4,
        attacks: [
            {
                damage: '1d8',
                damageSpecial: (game: IGame, enemy: IEnemy, character: Character) => damageSpecial(game, enemy, character, 'frightened', 3),
                speed: 4,
                attackPriority: [
                    [ClassType.Warrior, [1, 2, 3, 4]],
                    [ClassType.Rogue, [5, 6]]
                ],
            }],
        activeNight: true
    });
}