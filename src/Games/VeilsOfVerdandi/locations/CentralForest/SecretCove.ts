import { IGame, Location } from '../../types';
import description from './SecretCove.html?raw';
import {OceanShrine} from "../Sea/OceanShrine";
import {CentralForest} from "./CentralForest";
import {getId} from "storyScript";

export function SecretCove() {
	return Location({
		name: 'Secret Cove',
		description: description,
		destinations: [
			{
				name: 'The Ocean Shrine',
				target: OceanShrine,
			},
			{
				name: 'The Central Forest',
				target: CentralForest,
			},
		],
		leaveEvents: [['AddCoveDestinations', (game: IGame) => {
			const inactiveDestination = game.locations[getId(CentralForest)].destinations.get(getId(SecretCove));
			inactiveDestination.hidden = false;
		}]]
	});
}