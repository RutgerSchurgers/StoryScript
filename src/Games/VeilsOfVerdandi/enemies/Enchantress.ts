import {Character, Enemy, IEnemy, IGame} from "../types";
import {ClassType} from "../classType";
import {damageSpecial} from "../combatRules";
import {Constants} from "src/Games/VeilsOfVerdandi/constants";
import description from './Enchantress.html?raw';

export function Enchantress() {
    return Enemy({
        name: 'Enchantress',
        description: description,
        hitpoints: 30,
        defence: 3,
        currency: 25,
        attacks: [
            {
                damage: '1d6',
                speed: 4,
                attackPriority: [
                    [ClassType.Warrior, [1, 2, 3, 4]],
                    [ClassType.Rogue, [5, 6]]
                ]
            },
            {
                damage: '1d4',
                isMagic: true,
                speed: 7,
                damageSpecial: (game: IGame, enemy: IEnemy, character: Character) => damageSpecial(game, enemy, character, 'confused', 4),
                attackPriority: [
                    [ClassType.Wizard, [1, 2, 3, 4]],
                    [ClassType.Wizard, [5, 6]]
                ]
            }
        ],
        onDefeat(game: IGame) {
            game.delayedDescriptionChanges.length = 0;
            
            game.delayedDescriptionChanges.push(() => {
                game.currentLocation.descriptionSelector = 'after';
            });
        },
        mediaEvents: Constants.enemyDelay
    });
}