import {ClassType} from '../classType';
import {Enemy} from '../types';
import {Constants} from "src/Games/VeilsOfVerdandi/constants";

export function Brennus() {
    return Enemy({
        name: 'Brennus',
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