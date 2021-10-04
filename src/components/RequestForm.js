import { Fragment } from 'react'

import { useEffect, useState } from 'react';
import { GetNFTOwnedByUser, GetNFTCollection, contract } from "../utils";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function RequestForm() {
    const [searchedUser, setSearchedUser] = useState();
    const [requestLoading, setRequestLoading] = useState(false);
    const [status, setStatus] = useState("");
 

  

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
           
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-lg leading-6 font-semibold text-gray-900">Collection</h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">                    
                    <div className="">
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


                    <div id="divContainer" className="mt-6">
                        <h2 id="lblGallery" className="text-3xl font-bold leading-tight text-gray-900 mb-3">
                            Please pick option from above to continue..
                        </h2>
                        <ul id="divGallery" role="list"
                            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"> </ul>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default RequestForm;