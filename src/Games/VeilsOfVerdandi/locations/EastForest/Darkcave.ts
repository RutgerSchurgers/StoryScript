import {Location} from '../../types';
import description from './Darkcave.html?raw';
import {Enchantress} from "../../enemies/Enchantress";
import {ActionType, GameState} from "storyScript";

export function Darkcave() {
    return Location({
        name: 'The Dark Cave',
        description: description,
        enemies: [
            Enchantress()
        ],
        actions: [[
            'FinalScore', {
                text: 'Final Score',
                actionType: ActionType.Regular,
                execute: game => {
                    game.state = GameState.Victory;
                }
            }
        ]]
    });
}