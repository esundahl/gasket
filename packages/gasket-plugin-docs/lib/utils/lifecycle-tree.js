module.exports = function buildLifeCycleTree(gasket, lifecycles) {
  const hooks = gasket._hooks;
  // lifecycles that are always invoked
  const always = lifecycles.filter(l => l.command === '*');
  console.log(always);

  const prologue = 'graph TD;\n * -->' + always.map(l => l.name).join('-->');

  // find the commands that are directly invoked via command first
  const cmdPlugin = gasket.metadata.plugins.find(p => p.name === '@gasket/plugin-command');
  const cmds = cmdPlugin.commands.map(cmd => cmd.id);

  let lastLink = always[always.length - 1].name;
  let content = cmds.map(cmd => {
    return lastLink + '-->' + cmd;
  }).join(';\n')

  const mermaid = prologue + ';\n' + content;
  return mermaid;
}
