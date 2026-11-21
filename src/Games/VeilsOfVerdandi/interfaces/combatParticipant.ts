import {IEnemy, IEnemyAttack} from "./enemy";
import {Character} from "../character";
import {ICombatParticipant} from "storyScript";
import {IEffect} from "./effect";

export interface CombatParticipant extends ICombatParticipant {
    participant: IEnemy | Character;
    attack?: IEnemyAttack;
    attackIndex?: number;
    combatSpeed?: number;
    effects?: IEffect[];
}