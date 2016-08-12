﻿module StoryScript {
    export interface IItem {
        id?: string;
        name: string;
        pictureFileName?: string;
        equipmentType: EquipmentType;
        description?: string;
        damage?: string;
        defense?: number;
        charges?: number;
        bonuses?: any;
        actions?: ICollection<IAction>;
        use?: (game: IGame, item: IItem) => void
        //requirement?
        value?: number;
    }
}