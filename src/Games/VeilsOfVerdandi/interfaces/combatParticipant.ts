import {IEnemy, IEnemyAttack} from "./enemy";
import {Character} from "../character";

export interface CombatParticipant {
    participant: IEnemy | Character;
    attack?: IEnemyAttack;
    attackIndex?: number;
    combatSpeed?: number;
}