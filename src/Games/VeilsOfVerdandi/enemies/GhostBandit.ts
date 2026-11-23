import { ClassType } from '../classType';
import {IGame, Enemy, Character, IEnemy} from '../types';
import description from './GhostBandit.html?raw';
import {damageSpecial} from "../combatRules";
import {Constants} from "src/Games/VeilsOfVerdandi/constants";

export function GhostBandit() {
	return Enemy({
		name: 'Ghost bandit',
		description: description,
        hitpoints: 15,
        defence: 4,
        currency: 4,
        attacks: [
            {
                damage: '1d4',
                isMagic: true,
                damageSpecial: (game: IGame, enemy: IEnemy, character: Character) => damageSpecial(game, enemy, character, 'frozen'),
                speed: 3,
                attackPriority: [
                    [ClassType.Wizard, [1,2,3,4]],
                    [ClassType.Rogue, [5,6]]
                ]
            }  
        ],
        mediaEvents: Constants.enemyDelay,
		activeNight: true
	});
}