export function useRefValue(obj) {
  const newObj = { ...obj };
  Object.keys(newObj).forEach(key => {
    if (key === 'original') {
      newObj.value = newObj.original.value;
    } else if (typeof newObj[key] === 'object') {
      newObj[key] = useRefValue(newObj[key]);
    }
  });
  return newObj;
}
