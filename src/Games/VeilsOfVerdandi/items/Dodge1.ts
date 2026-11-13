import {IGame, IItem, Item} from '../types';
import description from './Dodge1.html?raw';
import {ClassType} from "../classType";
import {ICharacter} from "storyScript";

export function Dodge1() {
    return Item({
        name: 'Dodge 1',
        description: description,
        equipmentType: 'Special',
        canDrop: false,
        power: '0.5',
        itemClass: ClassType.Rogue,
        unequip(character: ICharacter, item: IItem, game: IGame): boolean {
            return false;
        }
    });
}