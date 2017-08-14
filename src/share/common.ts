export function getDateString(d: Date = new Date()) {
  let day = d.getDate() - 1;
  let month = d.getMonth() + 1;
  let dayStr = day < 10 ? "0" + day.toString() : day.toString();
  let monthStr = month < 10 ? "0" + month.toString() : month.toString();
  return `${d.getFullYear()}${monthStr}${dayStr}`;
}

export function convertFirebaseObjectToArray(obj: object) {
  let arr = [];
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      arr.push(convertFirebaseObject(obj[k], k));
    }
  }
  return arr;
}

export function convertFirebaseObject(obj: object, key: string) {
  return Object.assign({ key: key }, obj);
}

export function b64ToBlob(b64data, contentType = "", sliceSize = 512) {
  const byteCharacters = atob(b64data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}