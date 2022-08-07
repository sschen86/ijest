export default eachValueToString({
  'process.env.NODE_ENV': 'production',
});

function eachValueToString(defines) {
  const nextDefines = {};
  Object.keys(defines).forEach((key) => {
    nextDefines[key] = `"${String(defines[key]).replace(/"/g, '\\"')}"`;
  });
  return nextDefines;
}
