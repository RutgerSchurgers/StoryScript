﻿module QuestForTheKing.Locations {
    export function WeaponSmith(): StoryScript.ILocation {
        return {
            name: 'Weapon Smith',
            destinations: [
                {
                    text: 'Day 2',
                    target: Locations.Day2
                },              
                {

                    text: 'Healers Tent',
                    target: Locations.HealersTent
                },
                {
                    text: 'Fasold the Storyteller',
                    target: Locations.Fasold1
                }, 
            ],
            trade: {
                title: 'Trade Bjarni',
                description: 'Bjarni has several items for sale',
                buy: {
                    description: 'Sell to Bjarni',
                    emptyText: 'There is nothing for you to trade',
                    itemSelector: (item: IItem) => {
                        return true;
                    },
                    maxItems: 5,
                    priceModifier: 0
                },
                sell: {
                    description: 'Buy from Bjarni',
                    emptyText: 'Bjarni has nothing to trade',
                    itemSelector: (item: IItem) => {
                        return true;
                    },
                    maxItems: 5,
                    priceModifier: (game: IGame) => {
                        return 0;
                    }
                }
            }
        }
    }
}