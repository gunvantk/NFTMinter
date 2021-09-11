import { useEffect, useState } from 'react';
import { GetNFTOwnedByUser, GetNFTCollection, contract} from "../utils";
import { getCurrentWalletConnected, connectWallet } from "../utils/walletHelper.js";

function RequestForm() {
    const [searchedUser, setSearchedUser] = useState();
    const [requestLoading, setRequestLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [walletAddress, setWallet] = useState("");

    //called only once
    useEffect(async () => {
        await handleGetNFTCollection();
        addSmartContractListener();

        const { address, status } = await getCurrentWalletConnected();

        setWallet(address);
        setStatus(status);

        addWalletListener();
    }, []);

    function addSmartContractListener() {
        // contract.events.UpdatedMessages({}, (error, data) => {
        //     if (error) {
        //         setStatus(error.message);
        //     } else {
        //         setStatus(data.returnValues[1]);
        //     }
        // });
    }

    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0]);
                    setStatus("Get NFT");
                } else {
                    setWallet("");
                    setStatus("🦊 Connect to Metamask using the top right button.");
                }
            });
        } else {
            setStatus(
                <p>
                    {" "}
                    🦊{" "}
                    <a target="_blank" href={`https://metamask.io/download.html`}>
                        You must install Metamask, a virtual Ethereum wallet, in your
                        browser.
                    </a>
                </p>
            );
        }
    }

    const connectWalletPressed = async () => {
        debugger;
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWallet(walletResponse.address);
    };

    async function handleGetNFTOwnedByUser() {
        setRequestLoading(true);
        const { status } = await GetNFTOwnedByUser();
        setStatus(status);
        setRequestLoading(false);
    }

    async function handleGetNFTCollection() {
        setRequestLoading(true);
        const { status } = await GetNFTCollection();
        setStatus(status);
        setRequestLoading(false);
    }

    async function handleSearchNFT() {
        setRequestLoading(true);
        const { status } = await GetNFTCollection(searchedUser);
        setStatus(status);
        setRequestLoading(false);
    }



    return (
        <div className="App" style={{ padding: "50px" }}>
            <div class="topMenubar">
                <h1>BeautyVerse</h1>
                <p id="status">{status}</p>
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
                    <button id="btnWallet" class="inlineBlock" onClick={connectWalletPressed}>
                        {walletAddress.length > 0 ? (
                            "Connected: " +
                            String(walletAddress).substring(0, 6) +
                            "..." +
                            String(walletAddress).substring(38)
                        ) : (
                            <span>Connect Wallet</span>
                        )}
                    </button>

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