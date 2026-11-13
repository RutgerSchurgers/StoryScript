import {Location} from '../../types';
import description from './CastleInside.html?raw';
import {QueenBee} from '../../persons/queenBee';
import {Fisherman} from "../Beach/Fisherman";
import {getId} from "storyScript";
import {IslandMeadow} from "./IslandMeadow";

export function CastleInside() {
    return Location({
        name: 'Honeycomb Castle',
        description: description,
        destinations: [
            {
                name: 'The Fisherman\'s cottage',
                target: Fisherman,
                style: 'location-water'
            },
        ],
        persons: [
            QueenBee()
        ],
        leaveEvents: [[
            'Leave', game => {
                const fisherman = game.locations.get(Fisherman);
                fisherman.destinations.find(d => d.target === getId(IslandMeadow)).target = getId(CastleInside);
            }
        ]]
    });
}