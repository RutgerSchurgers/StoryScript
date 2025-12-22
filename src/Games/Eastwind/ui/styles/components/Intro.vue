<template>
  <div v-if="game.state === GameState.Intro" id="intro" class="box-container">
    <img class="float-right" :src="'resources/Fasold.png'" alt="Fasold the storyteller" />
    <div class="float-left">
      <h2>Game introduction</h2>
      <p>
        'Welcome, friend. My name is Fasold the storyteller, and I thank you for taking the time to meet up with me in this tavern.
        I have observed your actions for some time, and I am convinced there is greatness within you,
        and with the adventure before you tomorrow, there shall be much to write down and chronicle for the ages.
        So please, take a seat and tell me all about you, for a good a historian and storyteller must know the subject of his
        writings.'
      </p>
      <button type="button" class="btn btn-primary" @click="endIntro()">{{ texts.skipIntro }}</button>
    </div>
    <div class="clearfix"></div>
  </div>
</template>
<script lang="ts" setup>

import {useStateStore} from "ui/StateStore.ts";
import {storeToRefs} from "pinia";
import {GameState} from "storyScript/Interfaces/storyScript.ts";

const store = useStateStore();
const {game} = storeToRefs(store);
const {texts, gameService} = store.services;

const endIntro = (): void => gameService.restart(true);

</script>