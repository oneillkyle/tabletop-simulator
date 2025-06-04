import { CampaignNode } from './campaignNodes';

export function generateCampaign(): CampaignNode[] {
    const nodes = [
        {
            id: 'n1',
            title: 'Landing Zone',
            x: 100,
            y: 100,
            missionType: 'Skirmish',
            completed: false,
            unlocked: true,
            adjacentTo: ['n2']
        },
        {
            id: 'n2',
            title: 'Radar Outpost',
            x: 240,
            y: 160,
            missionType: 'Sabotage',
            completed: false,
            unlocked: false,
            adjacentTo: ['n3']
        },
        {
            id: 'n3',
            title: 'Ruins Ambush',
            x: 380,
            y: 100,
            missionType: 'Ambush',
            completed: false,
            unlocked: false,
            adjacentTo: ['n4']
        },
        {
            id: 'n4',
            title: 'Supply Depot',
            x: 520,
            y: 160,
            missionType: 'Hold Position',
            completed: false,
            unlocked: false,
            adjacentTo: ['n5']
        },
        {
            id: 'n5',
            title: 'Command Node',
            x: 660,
            y: 100,
            missionType: 'Boss Fight',
            completed: false,
            unlocked: false,
            adjacentTo: []
        }
    ];
    return nodes;
}
