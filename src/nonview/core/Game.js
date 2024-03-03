import { Random } from "../base";
import { GROUP_TO_ANSWERS } from "../constants";
export default class Game {
  static GROUP_SIZE = 4;
  static NUM_GROUPS = 4;

  constructor(groupToAnswers) {
    this.groupToAnswers = groupToAnswers;
    this.correctGroupNames = [];
    this.incompleteAnswersShuffled = undefined;
  }

  static random() {
    const groupNames = Object.keys(GROUP_TO_ANSWERS);
    const gameGroupNames = Random.sample(groupNames, Game.NUM_GROUPS);
    const groupToAnswers = Object.fromEntries(
      gameGroupNames.map(function (groupName) {
        const answers = Random.sample(
          GROUP_TO_ANSWERS[groupName],
          Game.GROUP_SIZE
        );
        return [groupName, answers];
      })
    );
    return new Game(groupToAnswers);
  }

  get groupNames() {
    return Object.keys(this.groupToAnswers);
  }

  get incompleteGroupNames() {
    return this.groupNames.filter(
      (key) => !this.correctGroupNames.includes(key)
    );
  }

  get incompleteAnswers() {
    return this.incompleteGroupNames.reduce(
      function (answers, groupName) {
        return [].concat(answers, this.groupToAnswers[groupName]);
      }.bind(this),
      []
    );
  }

  shuffle() {
    this.incompleteAnswersShuffled = Random.shuffle(this.incompleteAnswers);
  }

  static setEquals(set1, set2) {
    if (set1.size !== set2.size) {
      return false;
    }
    for (let item of set1) {
      if (!set2.has(item)) {
        return false;
      }
    }
    return true;
  }

  submit(selectedValues) {
    const selectedValueSet = new Set(selectedValues);
    console.debug(selectedValueSet);
    for (let key of this.incompleteGroupNames) {
      const candidateValuesSet = new Set(this.groupToAnswers[key]);
      console.debug(candidateValuesSet);
      if (Game.setEquals(selectedValueSet, candidateValuesSet)) {
        this.correctGroupNames.push(key);
        return true;
      }
    }
    return false;
  }
}
