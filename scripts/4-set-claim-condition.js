import sdk from "./1-initialize-sdk.js";

const BUNDLE_DROP = "0xA2b39ff70F01aA33177D8E8E187EBE63f09f097F";

const bundleDrop = sdk.getBundleDropModule(
  BUNDLE_DROP,
);

(async () => {
  try {
    const claimConditionFactory = bundleDrop.getClaimConditionFactory();

    //newClaimPhase to specify parameters
    claimConditionFactory.newClaimPhase({
      //startTime is when users are allowed to start minting NDTs
      //setting it to current time so that it can start minting immediately
      startTime: new Date(),
      //max number of membership NFTs that can be minted
      maxQuantity: 50_000,
      //maxQuantityPerTransaction specifies how many tokens can someone claim in a single transaction
      //minting 1 nft at a time
      maxQuantityPerTransaction: 1,
    });

    //interacting with deployed contract on-chain
    //0 because membership NFT has tokenID of 0 since it is first token of ERC 1155 contract
    await bundleDrop.setClaimCondition(0, claimConditionFactory);
    //we could also have different nft where people own one that has tokenID of 1 (distinguished membership?)
    console.log("Succesfully set claim condition on bundle drop:", bundleDrop.address);
    } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})()