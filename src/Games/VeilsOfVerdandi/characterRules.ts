import {getEquipmentType, ICharacter, ICharacterRules, ICreateCharacter, ICreateCharacterStep} from "storyScript";
import {ClassType} from "./classType";
import {IParty} from "./interfaces/party";
import {IGame} from "./interfaces/game";
import {Character} from "./character";
import {CharacterClasses} from "./characterClass";
import {Dagger} from "./items/Dagger";
import {IItem} from "./interfaces/item";

export const canEquip = (item: IItem, character: Character): boolean => {
    const classesToCheck = Array.isArray(item.itemClass) ? item.itemClass : [item.itemClass];
    return classesToCheck.indexOf(character.class.name) > -1;
}

export const characterRules = <ICharacterRules>{
    getCreateCharacterSheet: (): ICreateCharacter => {
        return {
            steps: [
                {
                    attributes: [
                        {
                            question: 'What is your name?',
                            entries: [
                                {
                                    attribute: 'name'
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            question: 'Choose your class',
                            entries: [
                                {
                                    text: 'Rogue',
                                    value: ClassType.Rogue
                                },
                                {
                                    text: 'Warrior',
                                    value: ClassType.Warrior
                                },
                                {
                                    text: 'Wizard',
                                    value: ClassType.Wizard
                                }
                            ]
                        }
                    ],
                    initStep: (party: IParty, character: ICreateCharacter, currentStep: ICreateCharacterStep, previousStep: number) => {
                        if (party?.characters) {
                            currentStep.questions[0].entries = currentStep.questions[0].entries.filter(e => !party.characters.find(c => c.class.name === e.value));
                            currentStep.questions[0].selectedEntry = currentStep.questions[0].entries[0];
                        }
                    }
                },
            ]
        };
    },

    createCharacter: (game: IGame, characterData: ICreateCharacter): ICharacter => {
        const character = new Character();
        const selectedClass = characterData.steps[1].questions[0].selectedEntry.value;
        const characterClass = CharacterClasses[selectedClass];
        character.hitpoints = characterClass.hitpoints;

        if (characterClass.name === ClassType.Rogue) {
            const dagger = Dagger();
            const secondDagger = Dagger();
            secondDagger['ss_added'] = true;
            dagger.members = [secondDagger];
            character.equipment['primaryWeapon'] = dagger;
            characterClass.inventory = characterClass.inventory.filter((i: any) => i.id !== 'dagger');
        }

        characterClass.inventory.forEach(i => {
            const item = i();
            const types = Array.isArray(item.equipmentType) ? item.equipmentType : [item.equipmentType];
            let equipped = false;

            for (const t in types) {
                const type = getEquipmentType(types[t]);

                if (Object.keys(character.equipment).find(k => k === type) && !character.equipment[type]) {
                    character.equipment[type] = item;
                    equipped = true;
                    break;
                }
            }

            if (!equipped) {
                character.items.push(item);
            }
        });

        character.class = characterClass;
        character.portraitFileName = characterClass.picture;
        return character;
    },

    isSlotUsed(character: Character, slot) {
        if (slot === 'bow') {
            return character.class.name === ClassType.Rogue;
        } else if (slot === 'special' || slot === 'secondaryWeapon') {
            return character.class.name !== ClassType.Wizard;
        } else if (slot === 'rightRing') {
            return character.class.name === ClassType.Wizard;
        }

        return true;
    },

    canEquip: canEquip,

    beforePickup(game: IGame, character: Character, item: IItem): boolean {
        if (!item.itemClass) {
            return true;
        }

        return Array.isArray(item.itemClass) ? item.itemClass.indexOf(character.class.name) > -1 : item.itemClass === character.class.name;
    }
}