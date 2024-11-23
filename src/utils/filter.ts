import { DutyData, HierarchyDutyData } from "../types/recruit.ts";

export function getHierarchyDuties(data: DutyData[]): {
  dutyMap: Map<DutyData["id"], HierarchyDutyData>;
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
