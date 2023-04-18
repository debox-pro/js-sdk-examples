import {
  configureChains,
  createClient,
  WagmiConfig,
  useAccount,
  useConnect,
  useDisconnect
} from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { DeBoxChat } from '@debox-global/react'
import { useEffect, useState } from 'react'
import { type EthereumProvider } from '@debox-global/core'

const chains = [mainnet]

const { provider, webSocketProvider } = configureChains(chains, [
  publicProvider()
])

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider
})

function DAPPHeader () {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div>
        Connected to {address}...{' '}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() =>
          connect({
            connector: new WalletConnectConnector({
              chains,
              options: {
                qrcode: true
              }
            })
          })
        }
      >
        Connect Wallet with WalletConnectConnector
      </button>
      <button
        onClick={() =>
          connect({
            connector: new InjectedConnector({
              chains
            })
          })
        }
      >
        Connect Wallet with InjectedConnector
      </button>
    </div>
  )
}

function Chat () {
  const { connector, isConnected } = useAccount()
  const [client, setClient] = useState<EthereumProvider>()

  useEffect(() => {
    if (isConnected) {
      connector?.getProvider().then(res => setClient(res))
    } else {
      setClient(undefined)
    }
  }, [isConnected, connector])

  return (
    <DeBoxChat
      config={{
        dao: {
          contractAddress: '0x...', // TODO: contract address
          chainId: 1,
          source: 0
        },
        projectId: process.env.REACT_APP_PKEY as string,
        urls: {
          api: process.env.REACT_APP_API as string,
          ws: process.env.REACT_APP_WS as string
        }
      }}
      client={client}
    />
  )
}

export default function App () {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <div
          style={{ height: '90vh', display: 'flex', flexDirection: 'column' }}
        >
          <header style={{ height: 100 }}>
            <DAPPHeader />
          </header>
          <div
            style={{
              flex: 1,
              overflow: 'hidden',
              borderWidth: 1,
              borderStyle: 'solid'
            }}
          >
            <Chat />
          </div>
        </div>
      </WagmiConfig>
    </>
  )
}
