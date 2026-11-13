import { ITrade as StoryScriptTrade } from 'storyScript';

export interface ITrade extends StoryScriptTrade {
    currentDay?: number;
}