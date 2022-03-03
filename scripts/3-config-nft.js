import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const BUNDLE_DROP = "0xA2b39ff70F01aA33177D8E8E187EBE63f09f097F";

const bundleDrop = sdk.getBundleDropModule(
  BUNDLE_DROP,
);

(async () => {
  try {
    //setting up actual NFT on ERC-1155 contract using createBatch
    await bundleDrop.createBatch([
      {
        name: "ACCESS PASS",
        description: "This NFT will give access to kkDAO",
        image: readFileSync("scripts/assets/KK_nft_access.png"),
      },
    ]);
    console.log(
      "bundleDrop metadata:",
      await bundleDrop.getMetadata(),
    );
    console.log("Successfully created new NFT in the drop!");
  } catch (error) {
    console.log("failed to create new NFT", error);
  }
})()