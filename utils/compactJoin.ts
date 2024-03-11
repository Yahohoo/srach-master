export const compactJoin = (arr: string[], del = '. ') => {
  return arr.filter(item => item).join(del)
}