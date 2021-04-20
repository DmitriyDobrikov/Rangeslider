

const testContext = require.context('./src', true, /\.test\.js/);

function allTestFiles(requireContext) {
  return requireContext.keys().map(requireContext);
}

allTestFiles(testContext);