import {ClassType} from '../classType';
import {Enemy} from '../types';
import {Constants} from "src/Games/VeilsOfVerdandi/constants";
import description from './Brennus.html?raw';

export function Brennus() {
    return Enemy({
        name: 'Brennus',
        description: description,
        hitpoints: 18,
        defence: 3,
        currency: 5,
        activeDay: true,
        attacks: [
            {
                damage: '1d8',
                speed: 5,
                attackPriority: [
                    [ClassType.Warrior, [1, 2, 3, 4]],
                    [ClassType.Wizard, [5, 6]]]
            }
        ],
        mediaEvents: Constants.enemyDelay
    });
}