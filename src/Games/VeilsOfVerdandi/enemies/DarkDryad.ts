import {Character, Enemy, IEnemy, IGame} from "../types";
import {ClassType} from "../classType";
import {damageSpecial} from "../combatRules";

export function DarkDryad() {
    return Enemy({
        name: 'The Dark Dryad',
        hitpoints: 20,
        defence: 4,
        currency: 15,
        attacks: [
            {
                damage: '1d6',
                isMagic: true,
                damageSpecial: (game: IGame, enemy: IEnemy, character: Character) => damageSpecial(game, enemy, character, 'frozen'),
                speed: 7,
                attackPriority: [
                    [ClassType.Wizard, [1, 2, 3, 4]],
                    [ClassType.Warrior, [5, 6]]
                ]
            }
        ],
        mediaEvents: {
            'attack': {
                sound: 'SoundEffects/dark_dryad_attack.mp3'
            },
            'special': {
                sound: 'SoundEffects/frostbite.mp3'
            },
            'defeat': {
                sound: 'SoundEffects/dark_dryad_defeat.mp3'
            }
        },
    });
}