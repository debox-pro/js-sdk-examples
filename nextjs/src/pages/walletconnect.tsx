import { DeBoxChat } from '@debox-global/react'
import { useCallback, useEffect, useState } from 'react'
import Provider, {
  OPTIONAL_EVENTS,
  OPTIONAL_METHODS
} from '@walletconnect/ethereum-provider'

export default function HomePage () {
  const [ready, setReady] = useState<Provider | null>(null)

  const initWP = useCallback(async () => {
    const provider = await Provider.init({
      projectId: process.env.NEXT_PUBLIC_WCPID as string,
      chains: [1],
      showQrModal: true,
      optionalMethods: OPTIONAL_METHODS,
      optionalEvents: OPTIONAL_EVENTS
    })

    await provider.connect()

    setReady(provider)
  }, [])

  useEffect(() => {
    initWP()
  }, [])

  if (
    !ready ||
    !process.env.NEXT_PUBLIC_PKEY ||
    !process.env.NEXT_PUBLIC_API ||
    !process.env.NEXT_PUBLIC_WS
  ) {
    return null
  }

  return (
    <>
      <DeBoxChat
        style={{
          width: '100%',
          height: '50vh',
          display: 'block'
        }}
        config={{
          dao: {
            contractAddress: '0x...',
            chainId: 1,
            source: 0
          },
          projectId: process.env.NEXT_PUBLIC_PKEY,
          urls: {
            api: process.env.NEXT_PUBLIC_API,
            ws: process.env.NEXT_PUBLIC_WS
          }
        }}
        client={ready}
      />
    </>
  )
}
