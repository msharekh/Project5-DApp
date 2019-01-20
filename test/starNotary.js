//import 'babel-polyfill';
const StarNotary = artifacts.require('./starNotary.sol');

let instance;
let accounts;

contract('StarNotary', async accs => {
  accounts = accs;
  console.log('accounts', ':	', accs);

  instance = await StarNotary.deployed();
});

/* it('can Create a Star', async() => {
    let tokenId = 1;
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
  }); */

/* it('lets user1 put up their star for sale', async() => {
    let user1 = accounts[1]
    let starId = 2;
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    assert.equal(await instance.starsForSale.call(starId), starPrice)
  }); */

/* it('lets user1 get the funds after the sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 3
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user1)
    await instance.buyStar(starId, {from: user2, value: starPrice})
    let balanceOfUser1AfterTransaction = web3.eth.getBalance(user1)
    assert.equal(balanceOfUser1BeforeTransaction.add(starPrice).toNumber(), balanceOfUser1AfterTransaction.toNumber());
  }); */

/* it('lets user2 buy a star, if it is put up for sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 4
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
    await instance.buyStar(starId, {from: user2, value: starPrice});
    assert.equal(await instance.ownerOf.call(starId), user2);
  }); */

/*   it('lets user2 buy a star and decreases its balance in ether', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 5
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
    const balanceOfUser2BeforeTransaction = web3.eth.getBalance(user2)
    await instance.buyStar(starId, {from: user2, value: starPrice, gasPrice:0})
    const balanceAfterUser2BuysStar = web3.eth.getBalance(user2)
    assert.equal(balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar), starPrice);
  }); */

// Write Tests for:

// 1) The token name and token symbol are added properly.
it('can set name and set symbol', async () => {
  let name = 'DApp Star';
  let symbol = 'ABC';
  await instance.setName(name);
  assert(name, await instance.name());
  await instance.setSymbol(symbol);
  assert(symbol, await instance.symbol());
});
// 2) 2 users can exchange their stars.
it('2 users can exchange their stars', async () => {
  //user 1 create and put for sale
  let user1 = accounts[1];
  let starId1 = 1;
  let starPrice1 = web3.toWei(0.01, 'ether');
  await instance.createStar('awesome star 1', starId1, { from: user1 });
  await instance.putStarUpForSale(starId1, starPrice1, { from: user1 });

  //user 2 create and put for sale
  let user2 = accounts[2];
  let starId2 = 2;
  let starPrice2 = web3.toWei(0.01, 'ether');
  await instance.createStar('awesome star 2', starId2, { from: user2 });
  await instance.putStarUpForSale(starId2, starPrice2, { from: user2 });

  //exchange

  await instance.exchangeStars(starId1, starId2);

  assert.equal(user1, await instance.ownerOf(starId2));
  assert.equal(user2, await instance.ownerOf(starId1));
});

// 3) Stars Tokens can be transferred from one address to another.
