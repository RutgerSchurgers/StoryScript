﻿module DangerousCave {
    export class Rules implements StoryScript.IRules {
        getSheetAttributes = () => {
            return [
                'kracht',
                'vlugheid',
                'oplettendheid',
                'defense'
            ];
        }

        getCreateCharacterSheet = (): StoryScript.ICreateCharacter => {
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
                                        value: (<any>Items.Dagger).name,
                                    },
                                    {
                                        text: 'Leren helm',
                                        value: (<any>Items.LeatherHelmet).name,
                                    },
                                    {
                                        text: 'Lantaren',
                                        value: (<any>Items.Lantern).name,
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        }

        public createCharacter(game: IGame, characterData: StoryScript.ICreateCharacter): StoryScript.ICharacter {
            var self = this;
            var character = new Character();
            var chosenItem = characterData.steps[1].questions[1].selectedEntry;
            character.items.push(game.helpers.getItem(chosenItem.value));
            return character;
        }

        public addEnemyToLocation(game: IGame, location: StoryScript.ICompiledLocation, enemy: ICompiledEnemy) {
            var self = this;
            self.addFleeAction(game, location);
        }

        public enterLocation(game: IGame, location: StoryScript.ICompiledLocation): void {
            var self = this;

            game.logToActionLog('Je komt aan in ' + location.name);

            if (location.id != 'start' && !location.hasVisited) {
                game.character.score += 1;
            }

            if (location.activeEnemies) {
                location.activeEnemies.forEach(function (enemy) {
                    game.logToActionLog('Er is hier een ' + enemy.name);
                });
            }
        }

        public initCombat(game: IGame, location: StoryScript.ICompiledLocation) {
            var self = this;

            self.addFleeAction(game, location);
        }

        fight = (game: IGame, enemy: ICompiledEnemy) => {
            var self = this;
            var check = game.helpers.rollDice(6, game.character.kracht);
            var characterDamage = check + game.character.oplettendheid + game.helpers.calculateBonus(game.character, 'attack') - game.helpers.calculateBonus(enemy, 'defense');
            game.logToCombatLog('Je doet de ' + enemy.name + ' ' + characterDamage + ' schade!');
            enemy.hitpoints -= characterDamage;

            if (enemy.hitpoints <= 0) {
                game.logToCombatLog('Je verslaat de ' + enemy.name + '!');
                game.logToLocationLog('Er ligt hier een dode ' + enemy.name + ', door jou verslagen.');
            }

            game.currentLocation.activeEnemies.filter((enemy: ICompiledEnemy) => { return enemy.hitpoints > 0; }).forEach(function (enemy) {
                var check = game.helpers.rollDice(enemy.attack);
                var enemyDamage = Math.max(0, (check - (game.character.vlugheid + game.helpers.calculateBonus(game.character, 'defense'))) + game.helpers.calculateBonus(enemy, 'damage'));
                game.logToCombatLog('De ' + enemy.name + ' doet ' + enemyDamage + ' schade!');
                game.character.currentHitpoints -= enemyDamage;
            });
        }

        enemyDefeated(game: IGame, enemy: ICompiledEnemy) {
            var self = this;

            if (enemy.reward) {
                game.character.score += enemy.reward;
            }
        }

        levelUp = (game: IGame, reward: string) => {
            var self = this;

            if (reward != 'gezondheid') {
                game.character[reward]++;
            }
            else {
                game.character.hitpoints += 10;
                game.character.currentHitpoints += 10;
            }

            game.state = StoryScript.GameState.Play;
        }


        hitpointsChange(game: IGame, change: number) {
            var self = this;

            if (game.character.hitpoints < 5) {
                game.logToActionLog('Pas op! Je bent zwaar gewond!');
                game.logToCombatLog('Pas op! Je bent zwaar gewond!');
            }
        }

        scoreChange(game: IGame, change: number): boolean {
            var self = this;
            var character = game.character;
            character.scoreToNextLevel += change;
            var levelUp = character.level >= 1 && character.scoreToNextLevel >= 2 + (2 * (character.level));

            game.logToActionLog('Je verdient ' + change + ' punt(en)');

            if (levelUp) {
                character.level += 1;
                character.scoreToNextLevel = 0;
                game.logToActionLog('Je wordt hier beter in! Je bent nu niveau ' + character.level);
            }

            return levelUp;
        }

        private addFleeAction(game: IGame, location: StoryScript.ICompiledLocation): void {
            var self = this;
            var numberOfEnemies = location.activeEnemies.length;
            var fleeAction = location.combatActions.get(Actions.Flee);


            if (!fleeAction && numberOfEnemies > 0 && numberOfEnemies < game.character.vlugheid) {
                var action = Actions.Flee('');
                (<any>action).id = (<any>Actions.Flee).name;
                location.combatActions.push(action);
            }
        }
    }
}