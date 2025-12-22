<template>
  <div id="character-attributes" class="box-container">
    <collapsible :headerClass="'box-title' + (!character.isActiveCharacter ? ' unavailable' : '')" :text="character.name || texts.characterSheet" :preventCollapse="(collapsed: boolean) => clickCollapsible(character, collapsed)">
      <template v-slot:header>
        <div class="character-name">{{ character.name || texts.characterSheet }}</div>
        <div class="character-hitpoints">{{ texts.hitpoints }}
          <div class="hitpoint-editor">
            <span v-if="!isDevelopment">{{ character.currentHitpoints }}</span>
            <input v-if="isDevelopment" v-model="character.currentHitpoints" :max="character.hitpoints" min="1"
                   type="number" @blur="limitInput($event, character)">
          </div>
          &nbsp;/ {{ character.hitpoints }}
        </div>
        <div class="clearfix"></div>
      </template>

      <div class="row">
        <div class="col-6">
          <div class="portraitFrame">
            <img :src="character.portraitFileName" alt="character.name" class="portrait"/>
          </div>
          <ul id="attributes-panel" class="list-unstyled">
            <li v-for="attribute of displayCharacterAttributes">
              {{ texts.titleCase(attribute) }} {{ character[attribute] }}
            </li>
          </ul>
        </div>
        <equipment :character="character" class="col-6"></equipment>
      </div>
      <backpack :character="character"></backpack>

    </collapsible>
  </div>
</template>
<script lang="ts" setup>
import {useStateStore} from "ui/StateStore.ts";
import {storeToRefs} from "pinia";
import {ICharacter} from "storyScript/Interfaces/character.ts";
import {ref} from "vue";
import {IParty} from "storyScript/Interfaces/party.ts";
import {isDevelopment} from "../../../../../constants.ts";

const store = useStateStore();
const {game} = storeToRefs(store);
const {useCharacterSheet} = storeToRefs(store);
const {texts, characterService} = store.services;

const {character} = defineProps<{
  party: IParty,
  character?: ICharacter
}>();

useCharacterSheet.value = true;

const displayCharacterAttributes = ref<string[]>(characterService.getSheetAttributes());

const limitInput = (event: any, character: ICharacter): void => {
  if (character.currentHitpoints > character.hitpoints) {
    character.currentHitpoints = character.hitpoints;
  } else if (character.currentHitpoints <= 0) {
    character.currentHitpoints = 1;
  }
}

const clickCollapsible = (character: ICharacter, collapsed: boolean): boolean => {
  if (character.hitpoints > 0 && game.value.activeCharacter !== character) {
    store.setActiveCharacter(character);
    return true;
  }
  
  return false;
}

</script>