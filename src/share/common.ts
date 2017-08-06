export function getDateString(d: Date = new Date()) {
  let day = d.getDate() - 1;
  let month = d.getMonth() + 1;
  let dayStr = day < 10 ? "0" + day.toString() : day.toString();
  let monthStr = month < 10 ? "0" + month.toString() : month.toString();
  return `${d.getFullYear()}${monthStr}${dayStr}`;
}

export function convertFirebaseObject(obj: object, key: string) {
  return Object.assign({ key: key }, obj);
}
