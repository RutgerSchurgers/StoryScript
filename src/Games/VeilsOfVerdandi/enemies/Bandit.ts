import {ClassType} from '../classType';
import {Enemy} from '../types';
import description from './Bandit.html?raw';

export function Bandit() {
    return Enemy({
        name: 'Bandit',
        description: description,
        hitpoints: 12,
        defence: 2,
        currency: 1,
        attacks: [
            {
                damage: '1d6',
                speed: 4,
                attackPriority: [
                    [ClassType.Rogue, [1, 2, 3, 4]],
                    [ClassType.Wizard, [5, 6]]
                ],
            }
        ],
        mediaEvents: {
            'attack': {
                sound: 'SoundEffects/bandit_attack.mp3'
            },
            'defeat': {
                sound: 'SoundEffects/bandit_defeat.mp3'
            }
        },
        activeDay: true
    });
}