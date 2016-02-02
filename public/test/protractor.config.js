exports.config = {
  seleniumAdress: 'https://localhost:4444/hd/hub',
  capabilities: {
    'browserName': 'chrome'
  },
  specs: ['e2e/*.js'],
  jasmineNodeOpts: {
    showColors:true
  }
}
