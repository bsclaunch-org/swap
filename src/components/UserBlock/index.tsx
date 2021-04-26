import React from "react";
import { ConnectorNames } from "@pancakeswap-libs/uikit";
import { useWeb3React } from '@web3-react/core'
import useAuth from '../../hooks/useAuth'
import AppButton from "../AppButton"

const UserBlock: React.FC = () => {
  const { account } = useWeb3React()
  const { login } = useAuth()
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  return (
    <div>
      {account ? (
        <AppButton
          scale="md"
          variant="tertiary"
        >
          {accountEllipsis}
        </AppButton>
      ) : (
        <AppButton
          scale="md"
          onClick={() => {
            login(ConnectorNames.Injected)
          }}
        >
          Connect Wallet
        </AppButton>
      )}
    </div>
  );
};

export default UserBlock