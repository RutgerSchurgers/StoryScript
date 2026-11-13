import { EquipmentType } from 'storyScript';
import { Item } from '../types';

export function Lantern() {
    return Item({
        name: 'Lantaren',
        oplettendheid: 1,
        equipmentType: EquipmentType.LeftHand
    });
}