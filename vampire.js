class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }
  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfPeople = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfPeople++;
    } return numberOfPeople;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let vampSelf = this.numberOfVampiresFromOriginal;
    let vampOther = vampire.numberOfVampiresFromOriginal;
    if (vampSelf < vampOther) {
      return true;
    } else {
      return false;
    }
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

    if (this.name === name) {
      return this;
    }

    let result = null;

    for (let offspring of this.offspring) {
      if (offspring.name === name) {
        console.log(offspring.name);
        result = offspring;
      } else {
        result = offspring.vampireWithName(name);
      }
    } if (result) {return result};
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let descendentCount = 0;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  closestCommonAncestor(vampire) { // trying this iteratively
    if (!this.creator) { return this };
    if (!vampire.creator) { return vampire };
    let parentArray1 = []; let parentArray2 = [];
    let parent1 = this; let parent2 = vampire;
    if (parent1 === parent2) { return parent1; }

    for (let i = 0; i <= vampire.numberOfVampiresFromOriginal; i++) {
      parentArray1.push(parent1); parentArray2.push(parent2);
      if (parentArray1.includes(parent2)) { return parent2; }
      if (parentArray2.includes(parent1)) { return parent1; }
      if (parent1.creator) { parent1 = parent1.creator; }
      if (parent2.creator) { parent2 = parent2.creator; }
    }
  }
}

const ada = new Vampire("Ada", 1900);
const craig = new Vampire("Craig", 1950);
const arvinder = new Vampire("Arvinder", 1990);
const angela = new Vampire("Angela", 1980);
const phil = new Vampire("Phil", 2000);
const joe = new Vampire("Joe", 2002);
const jean = new Vampire("Jean", 2002);
const sansa = new Vampire("Sansa", 2002);
const henry = new Vampire("Henry", 2002);

ada.addOffspring(craig);
ada.addOffspring(arvinder);
ada.addOffspring(angela);
arvinder.addOffspring(phil);
phil.addOffspring(joe);
angela.addOffspring(jean)
arvinder.addOffspring(sansa);
joe.addOffspring(henry);


console.log(ada.vampireWithName("Henry"));

module.exports = Vampire;
