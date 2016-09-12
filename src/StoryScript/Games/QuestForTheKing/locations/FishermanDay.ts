﻿module QuestForTheKing.Locations {
    export function FishermanDay(): StoryScript.ILocation {
        return {
            name: 'The Fishermans Cottage',
            destinations: [
                {
                    text: 'Back to the Map',
                    target: Locations.Quest1map2
                }                                       
            ]
        }
    }
}
   
