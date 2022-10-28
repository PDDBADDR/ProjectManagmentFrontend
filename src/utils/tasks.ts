export const compareTasksIndex = (a: Task, b: Task): number => {
  if (a.index < b.index) return -1
  if (a.index > b.index) return 1
  return 0
}

export const reorderItem = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: { index: number; [key: string]: any }[],
  startIndex?: number,
  endIndex?: number,
) => {
  const result = Array.from(list)
  if (startIndex !== undefined && endIndex !== undefined) {
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
  }
  const resultReindexed = result.map((value, index) => ({ ...value, index: index }))
  return resultReindexed
}

export const moveTask = (
  source: Task[],
  destination: Task[],
  sourceIndex: number,
  destinationIndex: number,
  destinationStatusId: number,
): { task: Task; sourceList: Task[]; destList: Task[] } => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  let [removed] = sourceClone.splice(sourceIndex, 1)
  removed = { ...removed, status_id: destinationStatusId }
  destClone.splice(destinationIndex, 0, removed)

  return {
    task: removed,
    sourceList: sourceClone.map((value, index) => ({ ...value, index: index })),
    destList: destClone.map((value, index) => ({ ...value, index: index })),
  }
}

export const UpdateStatusState = (
  src: ProjectStatusState[],
  srcIndex: number,
  tasks: Task[],
): ProjectStatusState[] => {
  const newStatuses = [...src]
  newStatuses[srcIndex] = {
    ...newStatuses[srcIndex],
    tasks: tasks,
  }
  return newStatuses
}
