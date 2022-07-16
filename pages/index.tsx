import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import { useEffect, useState } from "react";
import { getStarknet } from "get-starknet";


function useNetworkDetector() {
  const starknet = getStarknet();
  starknet.enable({ showModal: true })

  const [network, setNetwork] = useState<string | null>(null)

  useEffect(() => {
    const handler = async (network: string) => {
      console.log(network)
      setNetwork(network)
    };

    starknet.on("networkChanged", handler);
    return () => starknet.off("networkChanged", handler);
  }, [starknet]);
  return {
    network
  }
}

const Home: NextPage = () => {
  const { network } = useNetworkDetector()

  return (
    <div className={styles.container}>
      Current Network: {network}
    </div>
  )
}

export default Home
