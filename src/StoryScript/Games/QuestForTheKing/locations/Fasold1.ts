﻿module QuestForTheKing.Locations {
    export function Fasold1(): StoryScript.ILocation {
        return {
            name: 'Fasold the Storyteller',
            destinations: [
                {
                    text: 'Day 2',
                    target: Locations.Day2
                },
                {

                    text: 'Weapon Smith',
                    target: Locations.WeaponSmith
                },            
                {

                    text: 'Healers Tent',
                    target: Locations.HealersTent
                }
            ]
        }
    }
}