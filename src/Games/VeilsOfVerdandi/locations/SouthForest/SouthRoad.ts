import {Location} from '../../types';
import description from './SouthRoad.html?raw';
import {Stonemount} from "./Stonemount";
import {Merchant} from "./Merchant";
import {Start} from "../ForestEntry/start";
import {EastRoad} from "../EastForest/EastRoad";
import {hotSpotProperties} from "../../explorationRules";

export function SouthRoad() {
    return Location({
        name: 'South Road',
        description: description,
		...hotSpotProperties,
        destinations: [
			{
				name: 'The Forest Entry',
				target: Start
			},
            {
                name: 'The Stone Mount',
                target: Stonemount,
                style: 'location-danger'
            },
            {
                name: 'The Merchant',
                target: Merchant,
                style: 'location-danger'
            },
			{
				name: 'The East Road',
				target: EastRoad
			},
        ]
    });
}