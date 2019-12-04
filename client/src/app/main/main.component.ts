import { Component, OnInit, Input } from "@angular/core";
import { FlatTreeControl } from "@angular/cdk/tree";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";
import { SharedService, Spell, SpellCharClass } from "../shared/shared.service";

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  constructor(private service: SharedService) {}

  private sortOptions: Array<String> = ["By level", "By school"];
  private charClass: string = "";
  private spells: Spell[] = [];
  private allSpells: Spell[] = [];
  private currSpell: Spell;
  private currSpellClasses: string = "";
  private searchString: string = "";
  private sortBy: string = "By level";
  private isFavoritesMode: boolean = false;
  private isFavoritesBtnDisabled: boolean = true;
  private spellsTreeSortedByLevel = [];
  private spellsTreeSortedBySchool = [];

  // Variables required for Material data tree
  private _transformer = (node, level) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    };
  };
  private treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );
  private treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  private dataSource = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );
  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngOnInit() {
    this.spells = this.service.spells
      .map(item => ({
        ...item,
        isFavorite: false
      }))
      .sort((a, b) => (a.name > b.name ? 1 : -1));
    this.allSpells = [...this.spells];
    this.charClass = this.service.charClass;
    this.sortSpellsByLevel();
    this.sortSpellsBySchool();

    this.dataSource.data = this.spellsTreeSortedByLevel;
    this.currSpell = this.spells[0];
    this.currSpellClasses = this.transformResponseClassesToString(
      this.currSpell.classes
    );
  }

  transformResponseClassesToString(classesArr: SpellCharClass[]) {
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

  transformToDataTree(sortedSpells) {
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

  handleGoToSelectClassClick() {
    this.service.handleGoToSelectClassClick();
  }

  handleShowSpellCard(name: string) {
    this.currSpell = this.spells[
      this.spells.findIndex(item => item.name == name)
    ];
    this.currSpellClasses = this.transformResponseClassesToString(
      this.currSpell.classes
    );
  }

  handleChangeCurrSpell() {
    if (!this.searchString) {
      this.currSpell = this.spells[0];
      this.currSpellClasses = this.transformResponseClassesToString(
        this.currSpell.classes
      );
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

  handleChangeSorting() {
    if (this.sortBy == "By level") {
      this.dataSource.data = this.spellsTreeSortedByLevel;
    } else if (this.sortBy == "By school") {
      this.dataSource.data = this.spellsTreeSortedBySchool;
    }
  }

  toggleIsFavorite() {
    this.currSpell.isFavorite = !this.currSpell.isFavorite;
    const areThereFavSpells = this.spells.some(item => item.isFavorite == true);
    this.isFavoritesBtnDisabled = !areThereFavSpells;
  }

  handleFavoritesToggleClick() {
    if (this.isFavoritesMode) {
      this.isFavoritesMode = !this.isFavoritesMode;
      const otherSpells = this.allSpells.filter(
        item => !this.spells.includes(item)
      );
      const all = this.spells.concat(otherSpells);

      this.spells = all.sort((a, b) => (a.name > b.name ? 1 : -1));
      this.sortSpellsByLevel();
      this.sortSpellsBySchool();

      this.dataSource.data = this.spellsTreeSortedByLevel;
      this.currSpell = this.spells[0];
      this.currSpellClasses = this.transformResponseClassesToString(
        this.currSpell.classes
      );
    } else {
      this.isFavoritesMode = !this.isFavoritesMode;
      this.spells = this.spells
        .filter(item => item.isFavorite === true)
        .sort((a, b) => (a.name > b.name ? 1 : -1));
      this.sortSpellsByLevel();
      this.sortSpellsBySchool();

      this.dataSource.data = this.spellsTreeSortedByLevel;
      this.currSpell = this.spells[0];
      this.currSpellClasses = this.transformResponseClassesToString(
        this.currSpell.classes
      );
    }
  }
}
