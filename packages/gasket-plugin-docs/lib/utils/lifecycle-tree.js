module.exports = function buildLifeCycleTree(lifecycles) {
  const parents = {};

  lifecycles.forEach(l => {
    if (l.parent) {
      const parent = l.parent;
      if (parents[parent]) {
        parents[parent].push(l.name);
      } else {
        parents[parent] = [ l.name ];
      }
    }
  });

  console.log(parents);

  return JSON.stringify(lifecycles, null, 2);
}
