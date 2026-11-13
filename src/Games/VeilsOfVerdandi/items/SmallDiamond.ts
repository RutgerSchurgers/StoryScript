import { IGame, Item } from '../types';
import { EquipmentType } from 'storyScript';
import description from './SmallDiamond.html?raw';
import {IGroupableItem} from "../interfaces/item";

export function SmallDiamond() {
	return <IGroupableItem>Item(<IGroupableItem>{
		name: 'Small Diamond',
		description: description,
		equipmentType: EquipmentType.Miscellaneous,
		value: 15,
		isGroupable: true,
		groupName: '{0} small diamonds'
	});
}