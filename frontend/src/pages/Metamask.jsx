import React, { useState, useEffect } from 'react';

export const Metamask = () => {
  const [accountslist, setaccountslist] = useState([]);

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setaccountslist(accounts);
        console.log(accounts);
      } catch (error) {
        console.error('Error loading blockchain data:', error);
      }
    };

    loadBlockchainData();
    return () => {
    };
  }, []);

  const onClickHandler = async () => {
    
  }

  return (
    <div>
      <ul>
      {accountslist.map((account, index) => (
        <li>{account}</li>
      ))}
      </ul>
    </div>
  );
};
