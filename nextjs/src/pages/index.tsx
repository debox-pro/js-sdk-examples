import { DeBoxChat } from '@debox-global/react'
import { useEffect, useState } from 'react'

import Custom from '../components/Custom'

export default function HomePage () {
  const [ca, setCA] = useState<`0x${string}`>('0x...')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  if (
    !ready ||
    !process.env.NEXT_PUBLIC_PKEY ||
    !process.env.NEXT_PUBLIC_API ||
    !process.env.NEXT_PUBLIC_WS ||
    !window.ethereum
  ) {
    return null
  }

  const style: Partial<CSSStyleDeclaration> = {
    width: '100%',
    height: '50vh',
    display: 'block'
  }

  return (
    <>
      <div>
        <p>Input contract address:</p>
        <input
          onChange={e => {
            if (`${e.target.value}`.length === 42) {
              setCA(e.target.value as `0x${string}`)
            }
          }}
        />
      </div>
      <DeBoxChat
        style={style}
        config={{
          dao: {
            contractAddress: ca,
            chainId: 1,
            source: 0
          },
          projectId: process.env.NEXT_PUBLIC_PKEY,
          urls: {
            api: process.env.NEXT_PUBLIC_API,
            ws: process.env.NEXT_PUBLIC_WS
          }
        }}
        client={window.ethereum}
      />

      {/* use hook */}
      <Custom />
    </>
  )
}
