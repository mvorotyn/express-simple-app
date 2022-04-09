export type positionName = 'Security' | 'Designer' | 'Content Manager' | 'Lawyer';
export type positionID = 1 | 2 | 3 | 4;
export interface Position {
  name: positionName;
  id: positionID;
}
export const PositionsMap: Map<positionID, Position> = new Map([
  [1, { id: 1, name: 'Security' }],
  [2, { id: 2, name: 'Designer' }],
  [3, { id: 3, name: 'Content Manager' }],
  [4, { id: 4, name: 'Lawyer' }],
]);

export const PositionsRegistry: Map<positionID, positionName> = new Map([
  [1, 'Security'],
  [2, 'Designer'],
  [3, 'Content Manager'],
  [4, 'Lawyer'],
]);

export const PositionsSimpleRegistry: { [key: number | string]: string } = {
  1: 'Security',
  2: 'Designer',
  3: 'Content Manager',
  4: 'Lawyer',
};

export const allPositions: Position[] = [
  { id: 1, name: 'Security' },
  { id: 2, name: 'Designer' },
  { id: 3, name: 'Content Manager' },
  { id: 4, name: 'Lawyer' },
];

// const pos: Position = PositionsMap.get('Lawyer');
//PositionsSimpleRegistry[5]
