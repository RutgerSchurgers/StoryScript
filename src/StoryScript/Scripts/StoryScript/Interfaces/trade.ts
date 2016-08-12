﻿module StoryScript {
    export interface ITrade {
        description?: string;
        sell?: IStock;
        buy?: IStock;
        currency?: number;
        ownItemsOnly?: boolean;
    }

    export interface IStock {
        description?: string;
        emptyText?: string;
        items?: ICollection<IItem>;
        priceModifier?: number | ((game: IGame) => number);
        itemSelector?: (item: IItem) => boolean;
        maxItems?: number;
    }
}