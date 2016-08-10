﻿module QuestForTheKing.Locations {
    export function Day3(): StoryScript.ILocation {
        return {
            name: 'Day 3',
            destinations: [
                {
                    text: 'Shieldmaiden Defeated',
                    target: Locations.ShieldmaidenDefeated
                },

            ],
            actions: [
                //Actions.Search({
                //    difficulty: 10,
                //    success: function (game) {
                //        game.logToLocationLog('Aan de achterkant van het waarschuwingsbord staan enkele runen in de taal van de orken en trollen. Je kan deze taal helaas niet lezen. Het lijkt erop dat er bloed gebruikt is als inkt.')
                //    },
                //    fail: function (game) {
                //        game.logToLocationLog('Je ziet gras, bomen en struiken. Alle plantengroei stopt een paar centimeter buiten de grot. Binnen is het donker.');
                //    }
                //})
            ]
        }
    }
}