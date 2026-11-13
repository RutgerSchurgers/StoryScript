import description from './PowerAttack2.html?raw';
import {customEntity} from "storyScript";
import {PowerAttack1} from "./PowerAttack1";

export function PowerAttack2() {
    return customEntity(PowerAttack1, {name: 'Power Attack 2', power: '1d6', description: description, value: 40});
}