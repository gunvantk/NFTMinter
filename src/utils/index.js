import { ethers } from 'ethers';
import { requestAccount, getContract } from "./common";
import contractArtifact from "../abis/SampleContract.json";
import { getCurrentWalletConnected } from "../utils/walletHelper.js";
import $ from 'jquery';
export const contract = window.ethereum ? getContract(process.env.REACT_APP_CONTRACT_ADDRESS, contractArtifact) : "";


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

export const GetNFTOwnedByUser = async () => {
    if (typeof window.ethereum != undefined) {

        try {
            ClearNFTGallery();
            var currentAccount = await (await getCurrentWalletConnected()).address;

            var tokenIds = await contract.tokensOfOwner(currentAccount);
            if (tokenIds.length == 0) {
                $('#lblGallery').text("You don't own any NFT from the collection, please purchase at OpenSea.");
                return "You don't own any NFT from the collection, please purchase at OpenSea.";
            }
            $('#lblGallery').text("My NFTs");
            for (let i = 0; i < tokenIds.length; i++) {
                await LoadNFTById(tokenIds[i]);
            }
            return "";
        } catch (err) {
            console.log(err);
            return err;
        }
    } else {
        return "💡 Connect your Metamask wallet to continue.";
    }
};


export const GetNFTCollection = async () => {

    if (typeof window.ethereum != undefined) {

        try {
            ClearNFTGallery();
            $('#lblGallery').text("NFT Collection");
            var totalSupply = await contract.totalSupply();

            for (var i = 1; i <= 20; i++) {
                await LoadNFTById(i);
            }
            return "";
        } catch (err) {
            console.log(err);
            return err;
        }
    } else {
        return "💡 Connect your Metamask wallet to continue.";
    }
};

function AddNftToGallery(img, tokenId) {
    var imgItem = $('<div />')
        .attr({ "class": "group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden object-cover pointer-events-none group-hover:opacity-75" })
        .html(img);

    $('<li />')
        .attr({ "class": "relative shadow-xl" })
        .html(imgItem.html() + "<p class=\"m-2\">Avatar# " + tokenId + " </p>").appendTo('#divGallery');
}

function ClearNFTGallery() {
    $('#divGallery').html("");
}
