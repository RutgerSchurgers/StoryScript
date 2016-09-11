﻿module QuestForTheKing.Locations {
    export function Quest1map2(): StoryScript.ILocation {
        return {
            name: 'The Northern Forest',
            destinations: [
                {
                    text: 'Go to the Tent',
                    target: Locations.BrennusDay
                },
                {
                    text: 'Go to the Woodcutters Lodge',
                    target: Locations.WoodcutterDay
                },
                {
                    text: 'Go to the Forest Lake',
                    target: Locations.ForestLakeDay
                },       
                {
                    text: 'Go to the Stone Mount',
                    target: Locations.StonemountDay
                },
                {
                    text: 'Go to the Merchant',
                    target: Locations.MerchantDay
                },
            
            ]    
           
        }
    }
}