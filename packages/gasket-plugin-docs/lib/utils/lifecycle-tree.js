module.exports = function buildLifeCycleTree(gasket, lifecycles) {
  const hooks = gasket._hooks;
  // lifecycles that are always invoked
  const always = lifecycles.filter(l => l.command === '*');
  console.log(always);

  const prologue = 'graph TD;\n * -->' + always.map(l => l.name).join('-->');

  // find the commands that are directly invoked via command first
  const cmdPlugin = gasket.metadata.plugins.find(p => p.name === '@gasket/plugin-command');
  const cmds = cmdPlugin.commands.map(cmd => cmd.id);

  let x = always[always.length - 1].name;
  let content = cmds.map(cmd => {
    return x + '-->' + cmd;
  }).join(';\n')

  console.log(prologue + ';\n' + content);
  return JSON.stringify({ hooks, lifecycles }, null, 2);

}
