export function markTokenset(obj) {
  const _obj = { ...obj };
  Object.keys(_obj).forEach(key => {
    if (typeof _obj[key] === 'object') {
      Object.keys(_obj[key]).forEach(_key => {
        if (_key === 'tokenset') {
          if (typeof _obj[_obj[key][_key]] !== 'object') {
            _obj[_obj[key][_key]] = {};
          }
          _obj[_obj[key][_key]][key] = _obj[key];
          delete _obj[key][_key];
          delete _obj[key];
        }
      });
    }
  });
  return _obj;
}
