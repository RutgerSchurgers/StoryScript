import {Enemy as StoryScriptEnemy, ICharacter, IEnemy as StoryScriptIEnemy} from 'storyScript';
import {IFeature, IGame, IItem} from '../types';
import { ClassType } from '../classType';

export function Enemy(entity: IEnemy): IEnemy {
    return StoryScriptEnemy(entity);
}

export interface IEnemy extends IFeature, StoryScriptIEnemy {
    items?: IItem[];
    attacks?: IEnemyAttack[];
    defence?: number;
    activeNight?: boolean;
    activeDay?: boolean;
    frozen?: boolean;
    frightened?: boolean;
    confused?: boolean;

    effects?: { name: string, description: string }[];
}

export interface IEnemyAttack {
    isMagic?: boolean;
    damage: string;
    damageSpecial?: (game: IGame, enemy: IEnemy, character: ICharacter) => void;
    speed: number;
    attackPriority: [ClassType, number[]][]
}