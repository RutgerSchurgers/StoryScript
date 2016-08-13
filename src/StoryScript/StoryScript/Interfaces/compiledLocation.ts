﻿module StoryScript {
    export interface ICompiledLocation {
        id?: string;
        name: string;
        descriptionSelector?: string | ((game: IGame) => string);
        enemies?: ICollection<IEnemy>;
        persons?: ICollection<IPerson>;
        items?: ICollection<IItem>;
        destinations?: ICollection<IDestination>;
        events?: ICollection<(game: IGame) => void>;
        actions?: ICollection<IAction>;
        combatActions?: ICollection<IAction>;
        text: string;
        hasVisited: boolean;
        descriptions: { [key: string] : string; };
        trade?: ITrade;
        activePerson?: IPerson;
        activeTrade?: ITrade;
        log: string[];
    }
}