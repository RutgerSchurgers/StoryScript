﻿module StoryScript {
    export interface ITrade {
        title?: string;
        description?: string;
        sell?: IStock;
        buy?: IStock;
        currency?: number;
        ownItemsOnly?: boolean;
        initCollection?: (game: IGame, trade: ITrade) => boolean;
        onBuy?: (game: IGame, item: IItem) => void;
        onSell?: (game: IGame, item: IItem) => void;
    }

    export interface IStock {
        description?: string;
        emptyText?: string;
        items?: ICollection<IItem>;
        priceModifier?: number | ((game: IGame) => number);
        itemSelector?: (game: IGame, item: IItem) => boolean;
        maxItems?: number;
    }
}