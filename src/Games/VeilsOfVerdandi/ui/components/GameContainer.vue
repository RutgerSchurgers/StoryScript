<template>
  <div class="container-fluid body-content">
    <div class="row">
      <div v-if="game.state === 'Play'" id="party-container" :class="{ 'col-3': showCharacterPane }">
        <party></party>
      </div>
      <div id="location-container"
           :class="{ 'col-6': game.state === 'Play' && showCharacterPane, 'col-12': game.state !== 'Play' || !showCharacterPane }">
        <div v-if="!game.state">
          {{ texts.loading }}
        </div>

        <div v-if="game.state === 'Play'">
          <encounter></encounter>
          <location-text></location-text>
          <location-visual :hidden="true"></location-visual>
          <exploration></exploration>
          <ground></ground>
          <enemy></enemy>
        </div>

        <intro></intro>
        <create-character></create-character>
        <level-up></level-up>
        <game-over></game-over>
        <victory></victory>
      </div>
      <div v-if="game.state === GameState.Play" :class="{ 'col-3': showCharacterPane }">
        <div class="box-container world-info">
          <div class="box-title">{{ game.party.name }}</div>
          <ul class="list-unstyled float-left">
            <li>{{ texts.currency }}
              <div class="currency-editor">
                <span v-if="!isDevelopment">{{ game.party.currency }}</span>
                <input v-if="isDevelopment" v-model="game.party.currency" max="1000" min="{{ 0 }}" type="number">
              </div>
            </li>
            <li>Day: {{ game.worldProperties.currentDay }}</li>
            <li v-if="isDevelopment">Time:
              <div class="time-editor float-right">
                <select class="custom-select" @change="changeTime">
                  <option v-for="item of time" :value="item" :selected="item === game.worldProperties.timeOfDay">{{ item }}</option>
                </select>
              </div>
            </li>
          </ul>
          <img :src="`resources/candle-${(game.worldProperties.isDay ? 'day' : 'night')}-small.png`"
               class="candle pull-right"/>
          <div class="clearfix"></div>
        </div>
        <location-map :location="game.currentLocation" :map="game.currentMap"></location-map>
        <quests :quests="game.party.quests"></quests>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useStateStore} from "ui/StateStore.ts";
import {storeToRefs} from "pinia";
import {computed} from "vue";
import {GameState} from "storyScript/Interfaces/storyScript.ts";
import {isDevelopment} from "../../../../../constants.ts";

const store = useStateStore();
const {game, useEquipment, useBackpack, useQuests, useCharacterSheet} = storeToRefs(store);
const {texts} = store.services;

const time = ['day', 'night'];

const changeTime = (e) => {
  (<any>game.value).changeTime(e.target.value);
}

const showCharacterPane = computed(() => useCharacterSheet.value || useEquipment.value || useBackpack.value || useQuests.value);

</script>