import {Enemy as StoryScriptEnemy, IEnemy as StoryScriptIEnemy} from 'storyScript';
import {IFeature} from '../types';

export function Enemy(entity: IEnemy): IEnemy {
    return StoryScriptEnemy(entity);
}

export interface IEnemy extends IFeature, StoryScriptIEnemy {
    attack?: string;
    reward?: number;
}