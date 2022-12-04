function extractNumbers(input) {
  const regex = /\d+/g;
  return input.match(regex).map((el) => parseInt(el));
}

function group(array, size) {
  const groups = [];
  for (var i = 0; i < array.length; i += size) {
    groups.push(array.slice(i, i + size));
  }
  return groups;
}

module.exports = { extractNumbers, group };
