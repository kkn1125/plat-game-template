export const taskQueue: string[] = [];

export function isBusy() {
  return taskQueue.length > 0;
}

export function isBlockedMove() {
  return taskQueue.some((task) => ['move', 'changeMap'].includes(task));
}

export function isBlockedAll() {
  return taskQueue.includes('changeMap');
}

export function addConstraint(type: string) {
  if (taskQueue.includes(type)) return;
  taskQueue.push(type);
}

export function deleteConstraint(type: string) {
  if (!taskQueue.includes(type)) return;
  const index = taskQueue.indexOf(type);
  taskQueue.splice(index, 1);
}

export const mode = process.env.MODE || 'production';
