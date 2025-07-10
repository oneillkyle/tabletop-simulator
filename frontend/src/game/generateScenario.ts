export function generateScenarioFromNode(node: any) {
    return {
        missionName: node.title,
        missionType: node.missionType,
        objective: 'Eliminate all enemies and secure the area.',
        terrain: ['ruins', 'forest', 'craters'],
        playerUnits: [
            { name: 'Alpha-1', type: 'Ranger', hp: 100 },
            { name: 'Alpha-2', type: 'Sniper', hp: 75 }
        ],
        enemyUnits: [
            { name: 'Enemy Drone', type: 'Drone', hp: 60 },
            { name: 'Enemy Brute', type: 'Brute', hp: 120 }
        ],
        obstacles: [
            [2, 1],
            [3, 1],
            [4, 1], // a wall
            [5, 3] // single rock
        ]
    };
}
