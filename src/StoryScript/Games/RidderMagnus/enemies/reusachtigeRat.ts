﻿module RidderMagnus.Enemies {
    export function ReusachtigeRat(): IEnemy {
        return {
            name: 'Reusachtige rat',
            pictureFileName: 'enemies/ReusachtigeRat.jpg',
            hitpoints: 13,
            attack: '1d6+2',
            reward: 2,
            onDefeat: defeatRat
            // reward should be: 1 rattenstaart (quest item), 2 punten (score)
        }
    }
}