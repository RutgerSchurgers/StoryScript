<template>
  <div v-for="character of game.party.characters"
       :class="{ 'is-active': character === activeCharacter, 'unavailable': character.currentHitpoints <= 0 }"
       class="character-container"
       @click="store.setActiveCharacter(character)">
    <character-sheet :character="character" :party="game.party"></character-sheet>
  </div>
</template>
<script lang="ts" setup>
import {useStateStore} from "ui/StateStore.ts";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const store = useStateStore();
const {game} = storeToRefs(store);

const activeCharacter = computed(() => game.value.activeCharacter);

</script>