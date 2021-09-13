import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react';
import { GetNFTOwnedByUser, GetNFTCollection, contract } from "../utils";
import { getCurrentWalletConnected, connectWallet } from "../utils/walletHelper.js";

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function RequestForm() {
    const [searchedUser, setSearchedUser] = useState();
    const [requestLoading, setRequestLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [walletAddress, setWallet] = useState("");

    //called only once at startup
    useEffect(async () => {
        // await handleGetNFTCollection();
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
        <div>
            <Disclosure as="nav" className="bg-indigo-600">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-8 w-8"
                                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                                            alt="Workflow"
                                        />
                                    </div>
                                    <div className="hidden md:block">
                                        <span class="ml-3 text-white text-300 text-2xl"> ForeverCert </span>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <button id="btnWallet" onClick={connectWalletPressed}
                                            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
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
                            </div>
                        </div>                        
                    </>
                )}
            </Disclosure>

            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-lg leading-6 font-semibold text-gray-900">Collection</h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* Replace with your content */}
                    <div>
                        <button type="button" onClick={handleGetNFTOwnedByUser}
                            className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span>Show My NFT</span>
                        </button>

                        <button type="button" onClick={handleGetNFTCollection}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span>Show
                                Collection</span>
                        </button>

                    </div>


                    <div id="divContainer" class="container">
                        <label id="lblGallery"></label>
                        <div id="divGallery" class="gallery">

                        </div>
                    </div>
                    <div className="px-4 py-4 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                    </div>
                    {/* /End replace */}
                </div>
            </main>
        </div>
    )
}

export default RequestForm;