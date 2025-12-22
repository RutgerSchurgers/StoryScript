<template>
  <div class="participant" :class="{ 'targeted': (<any>rules.combat).isTargeted(game, participant) !== '', 'single-column': !participant.picture }" :title="(<any>rules.combat).isTargeted(game, participant)">
    <div :class="{ 'participant-data': participant.picture }">
      <h4>{{ participant.name }}</h4>
      <p :class="{ 'enemy-health': participantType === 'enemy', 'character-health': participantType === 'character' }">
        {{ texts.format(participant.type === 'enemy' ? texts.enemyHitpoints : texts.characterHitpoints, [participant.currentHitpoints, participant.hitpoints]) }}
      </p>
      <ul v-if="participant.effects.length > 0" class="effects">
        <li v-for="effect of participant.effects" :class="effect.name" :title="effect.description">{{ effect.name }}</li>
      </ul>
    </div>
    <img v-if="participant.picture" class="participant-image" :src="participant.picture" :alt="participant.name" />
    <div class="clearfix"></div>
  </div>
</template>
<script lang="ts" setup>
import {useStateStore} from "ui/StateStore.ts";
import {computed} from "vue";
import {storeToRefs} from "pinia";

const store = useStateStore();
const {game} = storeToRefs(store);
const {texts, rules} = store.services;

const participantType = computed(() => participant.type ?? 'character');

const hitPointText = computed(() => participant.type ? texts.enemyHitpoints : texts.characterHitpoints);

const {participant} = defineProps<{
  participant: any
}>();

</script>