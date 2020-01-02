module.exports = function buildLifeCycleTree(gasket, lifecycles) {
  // lifecycles that are always invoked
  const always = lifecycles.filter(l => l.command === '*');

  // TODO: order correctly
  const prologue = 'graph TD;\n * -->' + always.map(l => l.name).join('-->');

  // find the commands that are directly invoked via command first
  let lastLink = always[always.length - 1].name;
  let content = gasket.commands.map(cmd => {
    return lastLink + '-->' + cmd;
  }).join(';\n');

  const invokedBy = lifecycles.filter(l => l.command !== '*').map(l => {
    if (l.command && l.command !== l.name) {
      return l.command + '-->' + l.name;
    }

    if (l.parent && l.parent !== l.name) {
      return l.parent + '-->' + l.name;
    }
  }).join(';\n');

  const mermaid = [prologue, content, invokedBy].join(';\n');
  return mermaid;
}
