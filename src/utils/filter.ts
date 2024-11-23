import { DutyData, DutyMapData, HierarchyDutyData } from "../types/recruit.ts";

export function getHierarchyDuties(data: DutyData[]): {
  dutyMap: DutyMapData;
  rootDutyIds: DutyData["id"][];
} {
  const dutyMap = new Map();
  const rootDutyIds: DutyData["id"][] = [];

  data.forEach((node: DutyData) => {
    dutyMap.set(node.id, { ...node, children: [], isSelected: false });
  });

  data.forEach((node: DutyData) => {
    if (node.parent_id !== null) {
      const parentNode = dutyMap.get(node.parent_id);
      if (parentNode) {
        parentNode.children.push(node.id);
      }
    } else {
      rootDutyIds.push(node.id);
    }
  });

  return { dutyMap, rootDutyIds };
}

export function updateSelectionToTargetAndChild(
  nodeMap: DutyMapData,
  node: HierarchyDutyData,
  isSelected: boolean
) {
  node.isSelected = isSelected;
  node.children.forEach((childId) => {
    const prev = nodeMap.get(childId);
    if (prev) {
      nodeMap.set(childId, { ...prev, isSelected });
      updateSelectionToTargetAndChild(nodeMap, prev, isSelected);
    }
  });
}

export function updateSelectionToParent(
  nodeMap: DutyMapData,
  node: HierarchyDutyData
) {
  if (node.parent_id !== null) {
    const parentNode = nodeMap.get(node.parent_id);
    if (parentNode) {
      const allChildrenSelected = parentNode.children.every((childId) => {
        const child = nodeMap.get(childId);
        return child?.isSelected;
      });

      nodeMap.set(node.parent_id, {
        ...parentNode,
        isSelected: allChildrenSelected,
      });

      updateSelectionToParent(nodeMap, parentNode);
    }
  }
}
