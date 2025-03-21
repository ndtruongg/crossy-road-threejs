import type { MoveDirection } from './../types'
import { calculateFinalPosition } from './calculateFinalPosition'
import { minTileIndex, maxTileIndex } from '../constants'
import { metadata as rows } from '../components/Map'

export function endsUpInValidPosition(currentPosition: { rowIndex: number; tileIndex: number }, moves: MoveDirection[]) {
  const finalPosition = calculateFinalPosition(currentPosition, moves)

  // Detect if we hit the edge of the map
  if (
    finalPosition.rowIndex === -1 ||
    finalPosition.tileIndex === minTileIndex - 1 ||
    finalPosition.tileIndex === maxTileIndex + 1
  ) {
    // Invalid move, ignore move command
    return false
  }

  // Detect if we hit a tree 
  const finalRow = rows[finalPosition.rowIndex - 1];
  if (
    finalRow &&
    finalRow.type === 'forest' && 
    finalRow.trees.some((tree) => tree.tileIndex === finalPosition.tileIndex)
  ) {
    // Invalid move, ignore move command
    return false
  }

  return true
}
