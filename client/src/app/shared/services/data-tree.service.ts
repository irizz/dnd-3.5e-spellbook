import { Injectable } from "@angular/core";
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

interface TreeDataChildNode {
  name: string;
}

export interface TreeDataParentNode {
  name: string;
  children: TreeDataChildNode[];
}

@Injectable({ providedIn: "root" })
export class DataTree {
  constructor() {}

  _transformer = (node, level) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    };
  };
  
  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );
  
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  
  dataSource = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );
  
  hasChild = (_: number, node: FlatNode) => node.expandable;
}