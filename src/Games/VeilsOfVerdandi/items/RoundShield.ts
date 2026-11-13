import { EquipmentType } from 'storyScript';
import { ClassType } from '../classType';
import description from './RoundShield.html?raw';
import { Item } from '../types';
import {Constants} from "../constants";

export function RoundShield() {
    return Item({
        name: 'Round Shield',
        description: description,
        defense: 1,
        equipmentType: Constants.SecondaryWeapon,
        value: 15,
        itemClass: ClassType.Warrior
    });
}