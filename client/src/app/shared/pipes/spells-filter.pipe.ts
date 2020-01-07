import { Pipe, PipeTransform } from "@angular/core";
import { DataTree, TreeDataParentNode } from "../services/data-tree.service";
import { sortingFunc } from "../utils";

@Pipe({
  name: "spellsFilter"
})
export class SpellsFilterPipe implements PipeTransform {
  constructor(private tree: DataTree) {}

  createNewParentNode(
    parentName: string,
    childName: string
  ): TreeDataParentNode {
    const newParentNode = {
      name: parentName,
      children: [
        {
          name: childName
        }
      ]
    };
    return newParentNode;
  }

  transform(oldTreeDataSource, searchString: string) {
    if (searchString.trim() === "") {
      return oldTreeDataSource;
    }

    const dataArr: TreeDataParentNode[] = oldTreeDataSource._data._value;
    let newTreeData = [];

    for (let i = 0; i < dataArr.length; i++) {
      for (let j = 0; j < dataArr[i].children.length; j++) {
        if (
          dataArr[i].children[j].name
            .toLowerCase()
            .indexOf(searchString.toLowerCase()) !== -1
        ) {
          const idx = newTreeData.findIndex(
            (item: TreeDataParentNode) => item.name == dataArr[i].name
          );
          if (idx === -1) {
            const newParentNode = this.createNewParentNode(
              dataArr[i].name,
              dataArr[i].children[j].name
            );
            newTreeData.push(newParentNode);
          } else {
            newTreeData[idx].children.push({
              name: dataArr[i].children[j].name
            });
          }
        }
      }
    }

    if (newTreeData.length > 0) {
      this.tree.dataSource.data = newTreeData.sort(sortingFunc);
      return this.tree.dataSource;
    } else {
      return oldTreeDataSource;
    }
  }
}
