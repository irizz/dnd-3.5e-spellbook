import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SORTING_OPTIONS } from "../shared/constants";
import { Spell } from "../shared/interfaces";
import { sortingFunc } from "../shared/utils";
import { DataService } from "../shared/services/data.service";
import {
  DataTree,
  TreeDataParentNode
} from "../shared/services/data-tree.service";
import { ViewService } from "../shared/services/view.service";
import { ComponentsInfoComponent } from "../components-info/components-info.component";
import {
  transformResponseClassesToString,
  transformSpellsToDataTree
} from "./main-utils";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private data: DataService,
    private tree: DataTree,
    private view: ViewService
  ) {}

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
    this.spells = this.data.spellsList
      .map(item => ({
        ...item,
        isFavorite: false
      }))
      .sort(sortingFunc);
    this.spellsCopy = [...this.spells];
    this.charClass = this.data.charClassName;
    this.setDefaultCurrSpellAndSorting();
  }

  openComponentsInfoModal() {
    const dialogRef = this.dialog.open(ComponentsInfoComponent);
    dialogRef.afterClosed().subscribe();
  }

  handleFindSpell() {
    if (!this.searchString) {
      this.setDefaultCurrSpellAndSorting();
      return;
    }

    let spellEqualsSearchString = false;
    let spellStartsWithSearchString = false;
    for (let i = 0; i < this.spells.length; i++) {
      if (
        this.spells[i].name.toLowerCase() == this.searchString.toLowerCase()
      ) {
        this.setCurrSpell(i);
        spellEqualsSearchString = true;
      } else if (
        this.spells[i].name
          .toLowerCase()
          .indexOf(this.searchString.toLowerCase()) === 0 &&
        !spellEqualsSearchString
      ) {
        this.setCurrSpell(i);
        spellStartsWithSearchString = true;
      } else if (
        this.spells[i].name
          .toLowerCase()
          .indexOf(this.searchString.toLowerCase()) !== -1 &&
        !spellEqualsSearchString &&
        !spellStartsWithSearchString
      ) {
        this.setCurrSpell(i);
      }
    }
  }

  handleSpellNameClick(name: string) {
    const idx = this.spells.findIndex(item => item.name == name);
    this.setCurrSpell(idx);
  }

  setCurrSpell(idx: number) {
    this.currSpell = this.spells[idx];
    this.currSpellClasses = transformResponseClassesToString(
      this.currSpell.classes
    );
  }

  setDefaultCurrSpellAndSorting() {
    this.setSorting();
    this.setCurrSpell(0);
  }

  toggleIsCurrSpellFavorite() {
    this.currSpell.isFavorite = !this.currSpell.isFavorite;
    const isThereFavoriteSpell = this.spells.some(
      item => item.isFavorite == true
    );
    this.isFavoritesBtnDisabled = !isThereFavoriteSpell;
  }

  toggleFavoritesMode() {
    this.isFavoritesMode = !this.isFavoritesMode;
    this.view.isFavoritesMode = this.isFavoritesMode;

    if (this.isFavoritesMode) {
      this.spells = this.spells
        .filter(item => item.isFavorite === true)
        .sort((a, b) => (a.name > b.name ? 1 : -1));
      this.setDefaultCurrSpellAndSorting();
    } else {
      const restSpells = this.spellsCopy.filter(
        item => !this.spells.includes(item)
      );
      const mergedSpells = this.spells.concat(restSpells);
      this.spells = mergedSpells.sort(sortingFunc);
      this.setDefaultCurrSpellAndSorting();
    }
  }

  setSorting() {
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
    this.spellsTreeSortedByLevel = transformSpellsToDataTree(sortedSpells);
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
    this.spellsTreeSortedBySchool = transformSpellsToDataTree(sortedSpells);
  }
}
