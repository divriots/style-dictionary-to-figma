export function trimValue(obj) {
  const newObj = { ...obj };
  Object.keys(newObj).forEach(key => {
    if (key === 'value') {
      const val = newObj[key];
      const reg = /^\{(.*)\}$/g;
      const matches = reg.exec(val);
      if (matches && matches[1]) {
        newObj[key] = val.replace('.value', '');
      }
    } else if (typeof newObj[key] === 'object') {
      newObj[key] = trimValue(newObj[key]);
    }
  });
  return newObj;
}
