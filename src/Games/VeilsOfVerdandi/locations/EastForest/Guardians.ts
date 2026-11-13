import {IGame, Location} from '../../types';
import description from './Guardians.html?raw';
import {CliffWall} from './CliffWall';
import {Parchment} from '../../items/Parchment';
import {EastRoad} from "./EastRoad";
import {backToForestText} from "../../explorationRules";
import {locationComplete} from "../../sharedFunctions";

export function Guardians() {
    return Location({
        name: 'The Strange Trees',
        description: description,
        destinations: [
            {
                name: backToForestText,
                target: EastRoad
            },
            {
                name: 'To the Cliff Wall',
                target: CliffWall,
                barriers: [
                    ['WallOfBranches', {
                        name: 'Wall of branches',
                        key: Parchment
                    }]]
            }
        ],
        leaveEvents:
            [[
                'Leave',
                (game: IGame) => {
                    const barrierRemoved = !game.currentLocation.destinations.find(d => d.barriers?.length > 0);
                    locationComplete(game, game.currentLocation, () => barrierRemoved, () => barrierRemoved);
                    return true;
                }
            ]]
    });
}