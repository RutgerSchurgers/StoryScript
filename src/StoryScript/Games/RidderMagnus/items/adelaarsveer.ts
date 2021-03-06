﻿module RidderMagnus.Items {
    export function Adelaarsveer(): IItem {
        return {
            name: 'Adelaarsveer',
            equipmentType: StoryScript.EquipmentType.Amulet,
            description: 'Een verzilverde veer aan een zilveren ketting. Men zegt dat de drager er scherpere ogen van krijgt.' ,
            bonuses: {
                zoeken: 1
            },
            value: 11
            //requirement: zoeken >1
        }
    }
}