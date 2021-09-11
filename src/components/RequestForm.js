import { useState } from 'react';
import { GetNFTOwnedByUser, GetNFTCollection } from "../utils";

function RequestForm() {
    const [searchedUser, setSearchedUser] = useState();
    const [requestLoading, setRequestLoading] = useState(false);
   
    async function handleGetNFTOwnedByUser() {
        setRequestLoading(true);
        await GetNFTOwnedByUser();
        setRequestLoading(false);
    }

    async function handleGetNFTCollection() {
        setRequestLoading(true);
        await GetNFTCollection();
        setRequestLoading(false);
    }

    async function handleSearchNFT() {
        setRequestLoading(true);
        await GetNFTCollection(searchedUser);
        setRequestLoading(false);
    }

    

    return (
        <div className="App" style={{ padding: "50px" }}>
            <div class="topMenubar">
                <h1>BeautyVerse</h1>
                <div>
                    <a href="https://testnets.opensea.io/collection/beautyverse" target="_blank"
                        class="inlineBlock"> OpenSea
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em"
                            width="1em" xmlns="http://www.w3.org/2000/svg"
                            class="svgIcon">
                            <path
                                d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z">
                            </path>
                        </svg></a>
                    <button id="btnConnectWallet" class="inlineBlock">Connect Wallet</button>
                </div>

            </div>



            {requestLoading && <div><p>Loading...</p><br /></div>}
          
            <div>

                <button id="btnGetNFTOwnedByUser" onClick={handleGetNFTOwnedByUser} class="inlineBlock">Show My
                    NFT</button>
                <button id="btnGetNFTCollection" onClick={handleGetNFTCollection} class="inlineBlock">Show
                    Collection</button>

            </div>


            <div id="divContainer" class="container">
                <label id="lblGallery"></label>
                <div id="divGallery" class="gallery">

                </div>
            </div>


        </div>
    );
}

export default RequestForm;