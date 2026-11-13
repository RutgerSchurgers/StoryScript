import { BeeSting } from '../items/BeeSting';
import { MagicFlower } from '../items/MagicFlower';
import { Person } from '../types';
import description from './QueenBee.html?raw';
import {FlowerForTheQueen} from "../quests/FlowerForTheQueen";

export function QueenBee() {
    return Person({
        name: 'Queen Bee',
        description: description,
        hitpoints: 10,
        canAttack: false,
        items: [
            BeeSting()
        ],
        conversation: {
            showUnavailableReplies: false
        },
        quests: [
            FlowerForTheQueen()
        ]
    });
}