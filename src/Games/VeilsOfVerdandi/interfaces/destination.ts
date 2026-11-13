import { IDestination as StoryScriptIDestination } from 'storyScript';

export interface IDestination extends StoryScriptIDestination {
    activeNight?: boolean;
    activeDay?: boolean;
    hidden?: boolean;
}