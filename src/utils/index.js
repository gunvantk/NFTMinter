import { ethers } from 'ethers';
import { requestAccount, getContract } from "./common";
import contractArtifact from "../abis/SampleContract.json";
import $ from 'jquery';

async function LoadNFTById(tokenId, contract) {
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

        const contract = getContract(process.env.REACT_APP_CONTRACT_ADDRESS, contractArtifact);
        try {
            ClearNFTGallery();
            var tokenIds = await contract.tokensOfOwner(account);
            if (tokenIds.length == 0) {
                $('#lblGallery').text("You don't own any NFT from the collection, please purchase at OpenSea.");
                return;
            }
            $('#lblGallery').text("My NFTs");
            for (let i = 0; i < tokenIds.length; i++) {
                await LoadNFTById(tokenIds[i], contract);
            }
        } catch (err) {
            console.log(err);
        }
    }
};

async function GetNFTCollection() {

    if (typeof window.ethereum != undefined) {
        await requestAccount();

        const contract = getContract(process.env.REACT_APP_CONTRACT_ADDRESS, contractArtifact);
        try {
            ClearNFTGallery();
            $('#lblGallery').text("NFT Collection");

            var totalSupply = await contract.totalSupply();

            for (var i = 1; i <= 20; i++) {
                await LoadNFTById(i, contract);
            }
        } catch (err) {
            console.log(err);
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

export { GetNFTOwnedByUser, GetNFTCollection }
