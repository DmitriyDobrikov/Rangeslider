

const testContext = require.context('./src', true, /\.test\.ts/);

function allTestFiles(requireContext) {
  return requireContext.keys().map(requireContext);
}

allTestFiles(testContext);