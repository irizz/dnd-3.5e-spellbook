import { Pipe, PipeTransform } from "@angular/core";
import { FlatTreeControl } from "@angular/cdk/tree";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Pipe({
  name: "spellsFilter"
})
export class SpellsFilterPipe implements PipeTransform {
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

  transform(TREE_DATA, searchString) {
    if (!searchString.trim()) {
      return TREE_DATA;
    }
    const dataArr = TREE_DATA._data._value;

    function findSpell(parent) {
      for (let i = 0; i < parent.children.length; i++) {
        if (
          parent.children[i].name
            .toLowerCase()
            .indexOf(searchString.toLowerCase()) !== -1
        ) {
          return true;
        } else {
          return false;
        }
      }
    }

    const filteredDataArr = dataArr.filter(parent => findSpell(parent));
    this.dataSource.data = filteredDataArr;
    return this.dataSource;
  }
}
