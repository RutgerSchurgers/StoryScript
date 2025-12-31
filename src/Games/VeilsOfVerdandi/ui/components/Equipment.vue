<template>
  <div class="character-equipment">
    <div class="equipment-panel">
      <equipment-slot slot="amulet" :character="character" :inline="true"></equipment-slot>
      <equipment-slot slot="body" :character="character" :inline="true"></equipment-slot>
      <equipment-slot slot="rightRing" :character="character" :inline="true"></equipment-slot>
      <equipment-slot v-for="slot of customSlots()" :slot="slot" :character="character" :inline="true"></equipment-slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useStateStore} from "ui/StateStore.ts";
import {storeToRefs} from "pinia";
import {DefaultEquipment} from "storyScript/Interfaces/defaultEquipment.ts";
import {ICharacter} from "storyScript/Interfaces/character.ts";

const store = useStateStore();
const {useEquipment} = storeToRefs(store);

const {character} = defineProps<{
  character?: ICharacter
}>();

useEquipment.value = true;

const customSlots = (): string[] => {
  const defaultSlots = Object.keys(new DefaultEquipment());
  return Object.keys(character.equipment).filter(e => defaultSlots.indexOf(e) === -1)
};

</script>