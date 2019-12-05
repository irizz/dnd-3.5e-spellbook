import { Component, OnInit } from "@angular/core";
import { SORTING_OPTIONS } from "../shared/constants";
import { DataTree, TreeDataParentNode } from "../shared/data-tree.service";
import { SortedSpells, Spell, SpellCharClass } from "../shared/interfaces";
import { SharedService } from "../shared/shared.service";
import { sortingFunc } from "../shared/utils";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  constructor(private service: SharedService, private tree: DataTree) {}

  private charClass: string = "";
  private currSpell: Spell;
  private currSpellClasses: string = "";
  private isFavoritesBtnDisabled: boolean = true;
  private isFavoritesMode: boolean = false;
  private searchString: string = "";
  private sortBy: string = SORTING_OPTIONS.BY_LEVEL;
  private sortOptions: Array<String> = Object.values(SORTING_OPTIONS);
  private spells: Spell[] = [];
  private spellsCopy: Spell[] = [];
  private spellsTreeSortedByLevel: TreeDataParentNode[] = [];
  private spellsTreeSortedBySchool: TreeDataParentNode[] = [];

  ngOnInit() {
    this.spells = this.service.spellsList
      .map(item => ({
        ...item,
        isFavorite: false
      }))
      .sort(sortingFunc);
    this.spellsCopy = [...this.spells];
    this.charClass = this.service.charClassName;
    this.changeSorting();
    this.setCurrSpellToDefault();
  }

  changeSorting() {
    if (this.sortBy == SORTING_OPTIONS.BY_LEVEL) {
      this.sortSpellsByLevel();
      this.tree.dataSource.data = this.spellsTreeSortedByLevel.sort(
        sortingFunc
      );
    } else if (this.sortBy == SORTING_OPTIONS.BY_SCHOOL) {
      this.sortSpellsBySchool();
      this.tree.dataSource.data = this.spellsTreeSortedBySchool.sort(
        sortingFunc
      );
    }
  }

  handleChangeCurrSpell() {
    if (!this.searchString) {
      this.setCurrSpellToDefault();
      return;
    }
    for (let i = 0; i < this.spells.length; i++) {
      if (
        this.spells[i].name
          .toLowerCase()
          .indexOf(this.searchString.toLowerCase()) !== -1
      ) {
        this.currSpell = this.spells[i];
        this.currSpellClasses = this.transformResponseClassesToString(
          this.currSpell.classes
        );
      }
    }
  }

  handleFavoritesToggleClick() {
    this.isFavoritesMode = !this.isFavoritesMode;
    this.service.isFavoritesMode = this.isFavoritesMode;

    if (this.isFavoritesMode) {
      this.spells = this.spells
        .filter(item => item.isFavorite === true)
        .sort((a, b) => (a.name > b.name ? 1 : -1));
      this.changeSorting();
      this.setCurrSpellToDefault();
    } else {
      const restSpells = this.spellsCopy.filter(
        item => !this.spells.includes(item)
      );
      const mergedSpells = this.spells.concat(restSpells);
      this.spells = mergedSpells.sort(sortingFunc);
      this.changeSorting();
      this.setCurrSpellToDefault();
    }
  }

  handleShowSpellCard(name: string) {
    this.currSpell = this.spells[
      this.spells.findIndex(item => item.name == name)
    ];
    this.currSpellClasses = this.transformResponseClassesToString(
      this.currSpell.classes
    );
  }

  setCurrSpellToDefault() {
    this.currSpell = this.spells.sort(sortingFunc)[0];
    this.currSpellClasses = this.transformResponseClassesToString(
      this.currSpell.classes
    );
  }

  sortSpellsByLevel() {
    let sortedSpells = {};
    for (let i = 0; i < this.spells.length; i++) {
      const idx = this.spells[i].classes.findIndex(
        charClass => charClass.name == this.charClass
      );
      if (idx !== -1) {
        const currLvl = `${this.spells[i].classes[idx].level} lvl`;
        const existingLvls = Object.keys(sortedSpells);
        if (existingLvls.includes(currLvl)) {
          sortedSpells[currLvl].push({ name: this.spells[i].name });
        } else {
          sortedSpells[currLvl] = [];
          sortedSpells[currLvl].push({ name: this.spells[i].name });
        }
      }
    }
    this.spellsTreeSortedByLevel = this.transformToDataTree(sortedSpells);
  }

  sortSpellsBySchool() {
    let sortedSpells = {};
    for (let i = 0; i < this.spells.length; i++) {
      const currSchool = this.spells[i].school;
      const existingSchools = Object.keys(sortedSpells);
      if (existingSchools.includes(currSchool)) {
        sortedSpells[currSchool].push({ name: this.spells[i].name });
      } else {
        sortedSpells[currSchool] = [];
        sortedSpells[currSchool].push({ name: this.spells[i].name });
      }
    }
    this.spellsTreeSortedBySchool = this.transformToDataTree(sortedSpells);
  }

  toggleIsFavorite() {
    this.currSpell.isFavorite = !this.currSpell.isFavorite;
    const isThereFavoriteSpell = this.spells.some(
      item => item.isFavorite == true
    );
    this.isFavoritesBtnDisabled = !isThereFavoriteSpell;
  }

  transformResponseClassesToString(classesArr: SpellCharClass[]): string {
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
  }

  transformToDataTree(sortedSpells: SortedSpells): TreeDataParentNode[] {
    let sortedSpellsKeys = Object.keys(sortedSpells);
    let TREE_DATA = [];
    for (let i = 0; i < sortedSpellsKeys.length; i++) {
      TREE_DATA.push({
        name: sortedSpellsKeys[i],
        children: [...sortedSpells[sortedSpellsKeys[i]]]
      });
    }
    return TREE_DATA;
  }
}
