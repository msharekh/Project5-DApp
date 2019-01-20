// Allows us to use ES6 in our migrations and tests.
var HDWalletProvider = require('truffle-hdwallet-provider');

require('babel-register');

// Edit truffle.config file should have settings to deploy the contract to the Rinkeby Public Network.
// Infura should be used in the truffle.config file for deployment to Rinkeby.

module.exports = {
  networks: {
    ganache: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          'uphold picnic age aunt sheriff embody dune gauge merit hero purse innocent',
          'https://rinkeby.infura.io/v3/141bd5d2a2d243a7aab8388795ffd2ea'
        );
      },
      network_id: '4',
      gas: 4500000,
      gasPrice: 10000000000
    }
  }
};
