import './styles/output.css'
import RequestForm from './components/RequestForm';
import MinterForm from './components/MintForm';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { getCurrentWalletConnected, connectWallet } from "./utils/walletHelper.js";

function App() {
  const [walletAddress, setWallet] = useState("");
  const [searchedUser, setSearchedUser] = useState();
  const [requestLoading, setRequestLoading] = useState(false);
  const [status, setStatus] = useState("");

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
  

  return (
    <Router>
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
                    <span className="ml-3 text-white text-300 text-2xl"> ForeverCert </span>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Switch>
          <Route exact path="/">
            <RequestForm />
          </Route>
          <Route path="/Mint">
            <MinterForm />
          </Route>          
        </Switch>     
        </div> 
    </Router>
  
  );
}

export default App;
