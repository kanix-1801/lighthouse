import '@rainbow-me/rainbowkit/styles.css'
import {
  RainbowKitProvider,
  connectorsForWallets,
  lightTheme,
} from '@rainbow-me/rainbowkit'
import {
  metaMaskWallet,
  trustWallet,
  coinbaseWallet,
  rainbowWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { goerli, polygonMumbai } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const { chains, provider } = configureChains(
  [goerli],
  // [
  //   jsonRpcProvider({
  //     rpc: (chain) => ({ http: liberty20.shardeum.org / 8081 }),
  //   }),
  // ],
  // [
  //   jsonRpcProvider({
  //     rpc: (chainID) => ({ https: 'https://liberty20.shardeum.org/8081' }),
  //   }),
  //   // jsonRpcProvider({ rpc : () => ({https : "https://liberty20.shardeum.org/"})})
  // ],
  [publicProvider()],
)
// const { provider, chains } = configureChains(
//   [avalancheChain],
//   [
//     jsonRpcProvider({
//       rpc: (chain) => ({ http: chain.rpcUrls.default.http[8081] }),
//     }),
//   ],
// )

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ chains }),
      // trustWallet({ chains }),
      // coinbaseWallet({ chains }),
      // rainbowWallet({ chains }),
      // ledgerWallet({ chains }),
    ],
  },
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function ConnectWallet() {
  return (
    <div>
      <div>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            theme={lightTheme({
              accentColor: '#00191d',
              accentColorForeground: 'white',
            })}
          >
            <ConnectButton
              showBalance={false}
              chainStatus="icon"
              accountStatus="avatar"
            />
          </RainbowKitProvider>
        </WagmiConfig>
      </div>
    </div>
  )
}

export default ConnectWallet
