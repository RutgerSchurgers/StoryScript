import {LocationMap} from "../types";
import {NorthRoad} from "../locations/NorthForest/NorthRoad";
import {SouthRoad} from "../locations/SouthForest/SouthRoad";
import {ForestLake} from "../locations/ForestEntry/ForestLake";
import {Brennus} from "../locations/ForestEntry/Brennus";
import {Woodcutter} from "../locations/NorthForest/Woodcutter";
import {MagicFlower} from "../locations/NorthForest/MagicFlower";
import {Merchant} from "../locations/SouthForest/Merchant";
import {Stonemount} from "../locations/SouthForest/Stonemount";
import {Dryad} from "../locations/EastForest/Dryad";
import {Guardians} from "../locations/EastForest/Guardians";
import {ForestPond} from "../locations/EastForest/ForestPond";
import {EastRoad} from "../locations/EastForest/EastRoad";
import {CliffWall} from "../locations/EastForest/CliffWall";
import {Darkcave} from "../locations/EastForest/Darkcave";
import {CentralForest} from "../locations/CentralForest/CentralForest";
import {Troll} from "../locations/CentralForest/Troll";
import {Treestump} from "../locations/CentralForest/Treestump";
import {SecretCove} from "../locations/CentralForest/SecretCove";
import {OceanShrine} from "../locations/Sea/OceanShrine";
import {Octopus} from "../locations/Sea/Octopus";
import {IslandMeadow} from "../locations/Sea/IslandMeadow";
import {CastleApproach} from "../locations/Sea/CastleApproach";
import {CastleInside} from "../locations/Sea/CastleInside";
import {Beach} from "../locations/Beach/Beach";
import {Fisherman} from "../locations/Beach/Fisherman";
import {Mermaid} from "../locations/Beach/Mermaid";
import {Start} from "../locations/ForestEntry/start";

export function ForestOfMyrr() {
    return LocationMap({
        name: 'Forest of Myrr',
        mapImage: 'gameboard.jpg',
        avatarImage: 'hero.png',
        locationNamesAsTextMarkers: true,
        toggleFullScreen: true,
        showMarkersOnKeyPress: ' ',
        locations: [
            {
                location: Start,
                coords: '220,1105'
            },
            {
                location: NorthRoad,
                coords: '590,635'
            },
            {
                location: SouthRoad,
                coords: '805,1200'
            },
            {
                location: ForestLake,
                coords: '645,915'
            },
            {
                location: Brennus,
                coords: '275,885'
            },
            {
                location: MagicFlower,
                coords: '855,795'
            },
            {
                location: Woodcutter,
                coords: '325,665'
            },
            {
                location: Merchant,
                coords: '1075,1165'
            },
            {
                location: Stonemount,
                coords: '645,1230'
            },
            {
                location: EastRoad,
                coords: '1070,730'
            },
            {
                location: Dryad,
                coords: '910,510'
            },
            {
                location: ForestPond,
                coords: '755,545'
            },
            {
                location: Guardians,
                coords: '1180,855'
            },
            {
                location: CliffWall,
                coords: '1285,920'
            },
            {
                location: Darkcave,
                coords: '1335,950'
            },
            {
                location: CentralForest,
                coords: '1230,390'
            },
            {
                location: Troll,
                coords: '1070,545'
            },
            {
                location: Treestump,
                coords: '1335,385'
            },
            {
                location: SecretCove,
                coords: '1070,230'
            },
            {
                location: OceanShrine,
                coords: '860,165'
            },
            {
                location: Octopus,
                coords: '540,165'
            },
            {
                location: IslandMeadow,
                coords: '325,230'
            },
            {
                location: CastleApproach,
                coords: '275,200'
            },
            {
                location: CastleInside,
                coords: '275,200'
            },
            {
                location: Beach,
                coords: '435,415'
            },
            {
                location: Fisherman,
                coords: '380,450'
            },
            {
                location: Mermaid,
                coords: '595,325'
            }
        ]
    });
}