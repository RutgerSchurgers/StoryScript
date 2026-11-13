import {IAction as StoryScriptIAction} from 'storyScript';

export interface IAction extends StoryScriptIAction {
    level?: number;
    activeNight?: boolean;
    activeDay?: boolean;
}