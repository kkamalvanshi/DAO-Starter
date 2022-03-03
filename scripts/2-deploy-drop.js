import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const APP_ADDRESS = "0x7A32c465f8CC53C73Ac95f2C31e3a6b086A05fb0";

const app = sdk.getAppModule(APP_ADDRESS);

//Creating a ERC-1155 contract
//for ERC-721, every NFT is unique even if they have same image, name, and properties
//for ERC-1155, multiple people can hold same NFT instead of making new NFT each time to save on gas fees
(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      //collection's name, ex. cryptopunks
      name: "kkDAO Membership",
      //description of NFT
      description: "A DAO for fans of KK",
      //image for NFT
      image: readFileSync("scripts/assets/KK_nft.PNG"),
      //passing in address for receiver of proceeds from sales of nfts in module
      //not charging people for the drop, hence pass 0x0 address
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log(
      "successfully deployed bundleDrop module, address:", bundleDropModule.address,
    );
    console.log(
      "bundleDrop metadata:",
      await bundleDropModule.getMetadata(),
    );
  } catch(error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})()