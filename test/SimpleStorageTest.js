const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", accounts => {
  it("should store the value 89", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();
    await simpleStorageInstance.set(89, { from: accounts[0] });
    const storedData = await simpleStorageInstance.get();
    assert.equal(storedData, 89, "The value 89 was not stored.");
  });
});
