﻿module RidderMagnus.Items {
    export function NachtLaarzen(): IItem {
        return {
            name: 'Nachtlaarzen',
            equipmentType: StoryScript.EquipmentType.Feet,
            description: 'Diepzwarte laarzen van fluweelzacht leer, waarmee je geluidloos loopt.',
            bonuses: {
                sluipen: 1 ,
                snelheid: 1
            },
            value: 25
            //requirement: sluipen >1
        }
    }
}