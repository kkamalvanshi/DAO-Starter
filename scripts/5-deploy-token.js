//airdrop formula = 0.27 * (# of days account owned at least on ENS name) + 0.067 * (# days until expiration of the last name on the account)
//multiplied by 2 if account has Primary ENS Name set

//users with more governance token are more powerful within the DAO 

//ENS Name is an NFT

import sdk from "./1-initialize-sdk.js";

const APP_ADDRESS = "0x7A32c465f8CC53C73Ac95f2C31e3a6b086A05fb0"

//need app address to deploy contract
const app = sdk.getAppModule(APP_ADDRESS);

