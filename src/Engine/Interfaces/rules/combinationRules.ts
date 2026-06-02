import {IGame} from "storyScript/Interfaces/game.ts";
import {IActiveCombination} from "storyScript/Interfaces/combinations/activeCombination.ts";
import {ICombinationAction} from "storyScript/Interfaces/combinations/combinationAction.ts";
import {ICombinable} from "storyScript/Interfaces/combinations/combinable.ts";

export interface ICombinationRules {
    /**
     * If you want to use combinations in your game, you must use this property to specify the 
     * combination actions that your game uses (e.g. 'Look at', 'Use', etc.).
     */
    combinationActions?: ICombinationAction[];
    
    /**
     * Use this function to run code after each successful combination.
     * @param game The game object
     * @param combination The combination used
     * @param target The target of the combination
     */
    success?: (game: IGame, combination: IActiveCombination, target: ICombinable) => void;
}