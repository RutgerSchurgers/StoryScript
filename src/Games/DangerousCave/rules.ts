import {ICharacter, ICompiledLocation, ICreateCharacter, IRules} from 'storyScript/Interfaces/storyScript';
import {Character, IEnemy, IGame} from './types';
import {Dagger} from './items/dagger';
import {LeatherHelmet} from './items/leatherHelmet';
import {Lantern} from './items/lantern';
import {Flee} from './actions/flee';
import {ICombatSetup} from "./interfaces/combatSetup.ts";

export function Rules(): IRules {
    return {
        setup: {},

        general: {
            scoreChange: (game: IGame, change: number): boolean => {
                const character = game.activeCharacter;
                character.scoreToNextLevel += change;
                const levelUp = character.level >= 1 && character.scoreToNextLevel >= 2 + (2 * (character.level));

                if (levelUp) {
                    character.level += 1;
                    character.scoreToNextLevel = 0;
                    game.logToActionLog('Je wordt hier beter in! Je bent nu niveau ' + character.level);
                }

                return levelUp;
            }
        },

        character: {
            getSheetAttributes: (): string[] => {
                return [
                    'kracht',
                    'vlugheid',
                    'oplettendheid',
                    'verdediging'
                ];
            },

            getCreateCharacterSheet: (): ICreateCharacter => {
                return {
                    steps: [
                        {
                            attributes: [
                                {
                                    question: 'Hoe heet je?',
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
                                    question: 'Ben je sterk, snel of slim?',
                                    entries: [
                                        {
                                            text: 'Sterk',
                                            value: 'kracht',
                                            bonus: 1
                                        },
                                        {
                                            text: 'Snel',
                                            value: 'vlugheid',
                                            bonus: 1
                                        },
                                        {
                                            text: 'Slim',
                                            value: 'oplettendheid',
                                            bonus: 1
                                        }
                                    ]
                                },
                                {
                                    question: 'Wat neem je mee?',
                                    entries: [
                                        {
                                            text: 'Dolk',
                                            value: Dagger.name,
                                        },
                                        {
                                            text: 'Leren helm',
                                            value: LeatherHelmet.name,
                                        },
                                        {
                                            text: 'Lantaren',
                                            value: Lantern.name,
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                };
            },

            getLevelUpSheet: (): ICreateCharacter => {
                return {
                    steps: [
                        {
                            questions: [
                                {
                                    question: 'Wat wil je verbeteren?',
                                    entries: [
                                        {
                                            text: 'Kracht',
                                            value: 'kracht',
                                            bonus: 1
                                        },
                                        {
                                            text: 'Vlugheid',
                                            value: 'vlugheid',
                                            bonus: 1
                                        },
                                        {
                                            text: 'Oplettendheid',
                                            value: 'oplettendheid',
                                            bonus: 1
                                        },
                                        {
                                            text: 'Gezondheid',
                                            value: 'gezondheid',
                                            bonus: 1
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },

            levelUp: (character: ICharacter, characterData: ICreateCharacter): boolean => {
                const question = characterData.steps[0].questions[0];
                const reward = question.entries.filter(entry => entry.value === question.selectedEntry.value)[0].value;

                if (reward != 'gezondheid') {
                    character[reward]++;
                } else {
                    character.hitpoints += 10;
                    character.currentHitpoints += 10;
                }

                return false;
            },

            createCharacter: (game: IGame, characterData: ICreateCharacter): ICharacter => {
                const character = new Character();
                const chosenItem = characterData.steps[1].questions[1].selectedEntry;
                character.items.push(game.helpers.getItem(chosenItem.value));
                return character;
            },

            hitpointsChange(game: IGame, character: ICharacter, change: number) {
                if (game.activeCharacter.hitpoints < 5) {
                    game.logToActionLog('Pas op! Je bent zwaar gewond!');
                    game.logToCombatLog('Pas op! Je bent zwaar gewond!');
                }
            }
        },

        exploration: {
            enterLocation: (game: IGame, location: ICompiledLocation): void => {
                if (location.id != 'start' && !location.hasVisited) {
                    game.party.score += 1;
                }

                if (location.enemies) {
                    location.enemies.forEach(function (enemy) {
                        game.logToActionLog('Er is hier een ' + enemy.name);
                    });
                }
            }
        },

        combat: {
            initCombat: (game: IGame, location: ICompiledLocation): void => {
                addFleeAction(game, location);
            },

            fight: (game: IGame, combatSetup: ICombatSetup, retaliate?: boolean): void => {
                const character = combatSetup[0].character;
                const enemy = combatSetup[0].target;
                const check = game.helpers.rollDice(6, character.kracht);
                const characterDamage = check + character.oplettendheid + game.helpers.calculateBonus(character, 'schade') - game.helpers.calculateBonus(enemy, 'verdediging');
                game.logToCombatLog('Je doet de ' + enemy.name + ' ' + characterDamage + ' schade!');
                enemy.currentHitpoints -= characterDamage;

                if (enemy.currentHitpoints <= 0) {
                    game.logToCombatLog('Je verslaat de ' + enemy.name + '!');
                    game.logToActionLog('De ' + enemy.name + ' is dood.');
                    game.logToLocationLog('Er ligt hier een dode ' + enemy.name + ', door jou verslagen.');
                }

                combatSetup.enemies.filter((e: IEnemy) => {
                    return e.currentHitpoints > 0;
                }).forEach(function (e: IEnemy) {
                    const check = game.helpers.rollDice(e.attack);
                    const enemyDamage = Math.max(0, (check - (character.vlugheid + game.helpers.calculateBonus(character, 'verdediging'))) + game.helpers.calculateBonus(e, 'schade'));
                    game.logToCombatLog('De ' + e.name + ' doet ' + enemyDamage + ' schade!');
                    character.currentHitpoints -= enemyDamage;
                });
            },

            enemyDefeated: (game: IGame, character: ICharacter, enemy: IEnemy): void => {
                if (enemy.reward) {
                    game.party.score += enemy.reward;
                }
            }
        },
    };

    function addFleeAction(game: IGame, location: ICompiledLocation): void {
        const numberOfEnemies = location.enemies.length;
        const fleeAction = location.combatActions.get('Flee');

        if (!fleeAction && numberOfEnemies > 0 && numberOfEnemies < game.activeCharacter.vlugheid) {
            const action = Flee('');
            location.combatActions.add(['Flee', action]);
        }
    }
}