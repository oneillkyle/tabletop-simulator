export interface CampaignNode {
  id: string;
  name: string;
  unlocked: boolean;
  completed: boolean;
  dependencies: string[];
}

export function canUnlock(node: CampaignNode, nodes: CampaignNode[]): boolean {
  return node.dependencies.every(depId => {
    const dep = nodes.find(n => n.id === depId);
    return dep?.completed;
  });
}
