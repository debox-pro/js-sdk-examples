import { useLogin } from '@debox-global/react'

export default function CustomButton() {
  const {
    data: { chainId, address, isConnected }
  } = useLogin()

  return (
    <div>
      address: {address}
      <br />
      chainId: {chainId}
      <br />
      isConnected: {isConnected}
    </div>
  )
}
