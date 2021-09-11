import { ethers } from 'ethers';
import { requestAccount, getContract } from "./common";
import contractArtifact from "../abis/SampleContract.json";
import $ from 'jquery';
export const contract = getContract(process.env.REACT_APP_CONTRACT_ADDRESS, contractArtifact);


async function LoadNFTById(tokenId) {
    try {
        var result = await contract.tokenURI(tokenId);
        console.log(result);

        var test = atob(result.substring(29));
        var imgBase64 = JSON.parse(test).image.split(',')[1];
        var img = atob(imgBase64);
    }
    catch (err) {
        console.log(err);
    }
    AddNftToGallery(img, tokenId);
};

async function GetNFTOwnedByUser() {
    if (typeof window.ethereum != undefined) {
        var account = await requestAccount();

        try {
            ClearNFTGallery();
            var tokenIds = await contract.tokensOfOwner(account);
            if (tokenIds.length == 0) {
                $('#lblGallery').text("You don't own any NFT from the collection, please purchase at OpenSea.");
                return;
            }
            $('#lblGallery').text("My NFTs");
            for (let i = 0; i < tokenIds.length; i++) {
                await LoadNFTById(tokenIds[i]);
            }
        } catch (err) {
            console.log(err);
        }
    }
};


export const GetNFTCollection = async () => {

    if (typeof window.ethereum != undefined) {
        await requestAccount();

        try {
            ClearNFTGallery();
            $('#lblGallery').text("NFT Collection");
            var test = contract;
            debugger;
            var totalSupply = await contract.totalSupply();

            for (var i = 1; i <= 20; i++) {
                await LoadNFTById(i);
            }
            return "";
        } catch (err) {
            console.log(err);
            return err;
        }
    }
};

function AddNftToGallery(img, tokenId) {
    var imgItem = $('<div />')
        .attr({ "class": "gallery-image" })
        .html(img);

    $('<div />')
        .attr({ "class": "gallery-item" })
        .html(imgItem.html() + "</br><label>Avatar# " + tokenId + " </label>").appendTo('#divGallery');
}

function ClearNFTGallery() {
    $('#divGallery').html("");
}



export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const obj = {
                status: "GET NFT",
                address: addressArray[0],
            };
            return obj;
        } catch (err) {
            return {
                address: "",
                status: err.message,
            };
        }
    } else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="_blank" href={`https://metamask.io/download.html`}>
                            You must install Metamask, a virtual Ethereum wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (addressArray.length > 0) {
                return {
                    address: addressArray[0],
                    status: "GET NFT",
                };
            } else {
                return {
                    address: "",
                    status: "🦊 Connect to Metamask using the top right button.",
                };
            }
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
            };
        }
    } else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="_blank" href={`https://metamask.io/download.html`}>
                            You must install Metamask, a virtual Ethereum wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};

export { GetNFTOwnedByUser }
