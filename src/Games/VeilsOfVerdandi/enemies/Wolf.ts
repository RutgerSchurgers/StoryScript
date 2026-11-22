import { Enemy } from "../types";
import description from './Wolf.html?raw';
import {ClassType} from "../classType";

export function Wolf() {
    return Enemy({
        name: 'Wolf',
        hitpoints: 10,
        defence: 2,
        currency: 1,
        description: description,
        attacks: [{
            damage: '1d6',
            speed: 4,attackPriority: [
                [ClassType.Warrior, [1,2,3]],
                [ClassType.Rogue, [4,5,6]]
            ],
        }],
        mediaEvents: {
            'attack': {
                sound: 'SoundEffects/wolf_attack.mp3'
            },
            'defeat': {
                sound: 'SoundEffects/wolf_defeat.mp3'
            }
        },
        activeDay: true
    });
}