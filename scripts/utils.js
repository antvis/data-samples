// FIXME 目前只是满足现有图表，算法待升级
function singlePreCombine(minQty, maxQty, fieldConditions) {
  if (minQty > maxQty || fieldConditions.length <= 0) return null;

  let result = [];
  if (minQty === 0) {
    result.push(null);
    minQty++;
  }

  if (fieldConditions.length === 1) {
    for (let i = minQty; i <= maxQty; i++) {
      result.push(new Array(i).fill(fieldConditions[0]));
    }
    return result;
  }

  if (minQty === maxQty && minQty <= fieldConditions.length) {
    if (minQty === 1) {
      fieldConditions.forEach((f) => result.push([f]));
      return result;
    }

    if (minQty === 2) {
      fieldConditions.forEach((f) => result.push([f, f]));
      result.push(fieldConditions);
      return result;
    }
  }
  throw new Error("not cover");
}

// remove special item in array
function removeItemFromArr(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1) arr.splice(index, 1);
  return arr;
}

function getAllCombine(dataPresArr, curIdx = 0, cache = []) {
  if (!dataPresArr[curIdx]) {
    return cache
      .map((i) => removeItemFromArr(i, null)) // 去除 null
      .map((i) => i.sort().join("*")); // transfer to string
  }
  if (curIdx === 0) return getAllCombine(dataPresArr, 1, dataPresArr[0]);
  let curArr = [];
  for (let i = 0; i < dataPresArr[curIdx].length; i++) {
    // null, [ 'Nominal' ]
    const item = dataPresArr[curIdx][i];
    curArr = curArr.concat(
      cache.map((i) => (item ? [...i, ...item] : [...i, null]))
    );
  }
  return getAllCombine(dataPresArr, curIdx + 1, curArr);
}

module.exports = { singlePreCombine, getAllCombine, removeItemFromArr };
