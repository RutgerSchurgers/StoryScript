﻿module GameTemplate {
    export interface ICompiledLocation extends StoryScript.ICompiledLocation {
        activeEnemies?: StoryScript.ICollection<IEnemy>;
        enemies?: StoryScript.ICollection<IEnemy>;
        items?: StoryScript.ICollection<IItem>;
    }
}