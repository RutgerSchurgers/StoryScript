<template>
  <div class="character-equipment">
    <div class="equipment-panel">
      <div class="row">
        <div class="col-12">
          <div class="item-box" @click="unequipItem(character.equipment.amulet)" :class="character.equipment.amulet ? '' : 'unavailable'">
            {{ getItemName(character.equipment.amulet) ?? texts.amulet }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="item-box" @click="unequipItem(character.equipment.body)" :class="character.equipment.body ? '' : 'unavailable'">
            {{ getItemName(character.equipment.body) ?? texts.body }}
          </div>
        </div>
        <div class="col-12">
          <div v-if="isSlotUsed('rightRing')" class="item-box" @click="unequipItem(character.equipment.rightRing)" :class="character.equipment.rightRing ? '' : 'unavailable'">
            {{ getItemName(character.equipment.rightRing) ?? texts.rightRing }}
          </div>
        </div>
      </div>
      <div v-for="slot of customSlots()" class="row">
        <div v-if="isSlotUsed(slot)" class="col-12">
          <div class="item-box" @click="unequipItem(character.equipment[slot])" :class="character.equipment[slot] ? '' : 'unavailable'">
            {{ getItemName(character.equipment[slot]) ?? texts[slot] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useStateStore} from "ui/StateStore.ts";
import {storeToRefs} from "pinia";
import {DefaultEquipment} from "storyScript/Interfaces/defaultEquipment.ts";
import {IItem} from "storyScript/Interfaces/item.ts";
import {ICharacter} from "storyScript/Interfaces/character.ts";

const store = useStateStore();
const {useEquipment} = storeToRefs(store);
const {texts, itemService, characterService} = store.services;

const {character} = defineProps<{
  character?: ICharacter
}>();

useEquipment.value = true;

const customSlots = (): string[] => {
  const defaultSlots = Object.keys(new DefaultEquipment());
  return Object.keys(character.equipment).filter(e => defaultSlots.indexOf(e) === -1)
};

const getItemName = (item: IItem): string => itemService.getItemName(item);

const unequipItem = (item: IItem): boolean => itemService.unequipItem(character, item);

const isSlotUsed = (slot: string | string[]): boolean => {
  const slots = Array.isArray(slot) ? slot : [slot];
  return slots.find(s => characterService.isSlotUsed(character, s)) !== undefined;
}

</script>