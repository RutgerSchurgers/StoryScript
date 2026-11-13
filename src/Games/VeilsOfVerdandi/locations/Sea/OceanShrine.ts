import {IGame, Location} from '../../types';
import description from './OceanShrine.html?raw';
import {Octopus} from './Octopus';
import {locationComplete} from "../../sharedFunctions";
import {SecretCove} from "../CentralForest/SecretCove";
import {MagicRing} from "../../items/MagicRing";

export function OceanShrine() {
    return Location({
        name: 'The Ocean Shrine',
        description: description,
        destinations: [
            {
                name: 'The Octopus',
                target: Octopus,
                style: 'location-water'
            },
            {
                name: 'The Secret Cove',
                target: SecretCove,
            },
        ],
        items: [
            MagicRing()
        ],
        enterEvents:
            [[
                'Enter',
                (game: IGame) => {
                    game.currentLocation.items.map(i => i.inactive = true);
                }
            ]],
        actions:
            [[
                'TouchAltar',
                {
                    text: 'Touch the Altar',
                    execute: (game: IGame) => {
                        game.currentLocation.descriptionSelector = game.worldProperties.isDay ? 'touchday' : 'touchnight';

                        // Fully heal the party.
                        game.party.characters.forEach(c => {
                            c.currentHitpoints = c.hitpoints;
                        });

                        game.currentLocation.items.map(i => i.inactive = false);
                    }
                },
            ]],
        leaveEvents:
            [[
                'Leave',
                (game: IGame) => {
                    locationComplete(game, game.currentLocation, () => game.currentLocation.actions.length == 0, () => game.currentLocation.actions.length == 0);
                    return true;
                }
            ]]
    });
}