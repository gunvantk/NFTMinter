import { NFTStorage } from 'nft.storage';
import { getContract } from "./common";
import contractArtifact from "../abis/SampleContract.json";
import { getCurrentWalletConnected, connectWallet } from "./walletHelper.js";

export const contract = window.ethereum ? getContract(process.env.REACT_APP_CONTRACT_ADDRESS, contractArtifact) : "";

async function mintNFT({setStatus, image, name, description}) {
debugger;
    var ownerAddress = await (await getCurrentWalletConnected()).address;

    // First we use the nft.storage client library to add the image and metadata to IPFS / Filecoin
    const client = new NFTStorage({ token: process.env.REACT_APP_PINNING_SERVICE_KEY });
    setStatus("Uploading to nft.storage...")
    const metadata = await client.store({
      name,
      description,
      image,
    });
    setStatus(`Upload complete! Minting token with metadata URI: ${metadata.url}`);
  
    // the returned metadata.url has the IPFS URI we want to add.
    // our smart contract already prefixes URIs with "ipfs://", so we remove it before calling the `mintToken` function
    const metadataURI = metadata.url.replace(/^ipfs:\/\//, "");
  

    const tokenId = await contract.mintToken(ownerAddress, metadataURI);
  
    setStatus("Blockchain transaction sent, waiting confirmation...");    
  
    setStatus(`Minted token #${tokenId}`);
    return tokenId;
  }

  export { mintNFT }