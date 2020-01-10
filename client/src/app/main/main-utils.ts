import { SortedSpells, SpellCharClass } from "../shared/interfaces";
import { TreeDataParentNode } from "../shared/services/data-tree.service";

export const transformResponseClassesToString = (
  classesArr: SpellCharClass[]
): string => {
  let resultString = "";
  for (let i = 0; i < classesArr.length; i++) {
    if (i == classesArr.length - 1) {
      resultString =
        resultString + `${classesArr[i].name} ${classesArr[i].level} lvl`;
    } else {
      resultString =
        resultString + `${classesArr[i].name} ${classesArr[i].level} lvl, `;
    }
  }
  return resultString;
};

export const transformSpellsToDataTree = (
  sortedSpells: SortedSpells
): TreeDataParentNode[] => {
  let sortedSpellsKeys = Object.keys(sortedSpells);
  let TREE_DATA = [];
  for (let i = 0; i < sortedSpellsKeys.length; i++) {
    TREE_DATA.push({
      name: sortedSpellsKeys[i],
      children: [...sortedSpells[sortedSpellsKeys[i]]]
    });
  }
  return TREE_DATA;
};
