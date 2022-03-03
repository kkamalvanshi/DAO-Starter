import { useEffect, useMemo, useState } from "react";

//import thirdweb
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";

//instantiating sdk to rinkeby
const sdk = new ThirdwebSDK("rinkeby");

const BUNDLE_DROP = "0xA2b39ff70F01aA33177D8E8E187EBE63f09f097F";

const bundleDropModule = sdk.getBundleDropModule(
  BUNDLE_DROP,
);

const App = () => {

  const { connectWallet, address, error, provider } = useWeb3();
  console.log("Address:", address)

  //signer is required to sign transactions on blockchain
  const signer = provider ? provider.getSigner() : undefined;
  
  //lets us know if user has nft
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  //isClaiming shows keeps loading state while NFT is minting
  const [isClaiming,setIsClaiming] = useState(false);

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
    //pass signer to the SDK, which helps interact with deployed contract
  }, [signer]);

  useEffect(async () => {
    //if they don't have connected wallet, exit
    if (!address) {
      return;
    }

    //check if user has NFT by using bundleDropModule.balanceOf
    const balance = await bundleDropModule.balanceOf(address, "0");

    
    try {
      //if balance > 0, the user has the NFT
      if(balance.gt(0)) {
        setHasClaimedNFT(true);
        console.log("user has membership NFT");
      } else {
        setHasClaimedNFT(false);
        console.error("user doesn't have membership NFT");
      }
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("failed to nft balance", error);
    }

  }, [address]);
  
  // if wallet is not connected
  //button to connect wallet
  if(!address) {
    return (
      <div className="landing">
        <h1>Welcome to the kkDAO</h1>
        <button onClick={() => connectWallet("injected")} className = "btn-hero">
          Connect Wallet
        </button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className = "member-page">
        <h1>DAO Member Page</h1>
        <p1>Congrats on being a member!</p1>
      </div>
      );
  }

  const mintNft = async () => {
    setIsClaiming(true);
    try{
      //minting nft to user's wallet
      //tokenID is 0
      //we want to mint 1 membership nft to user's wallet
      await bundleDropModule.claim("0",1);
      //set claim state to true if previous line runs successfully
      setHasClaimedNFT(true);
      //shows user fancy new NFT
      console.log(`Successfully minted. Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`);
    } catch(error) {
      console.error("failed to claim", error);
    } finally {
      //stop loading state
      setIsClaiming(false);
    }
  }

  return (
    <div className="mint-nft">
      <h1>Mint your free kkDAO Membership NFT</h1>
      <button
        disabled={isClaiming}
        onClick={() => mintNft()}
      >
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
  );
};

export default App;
