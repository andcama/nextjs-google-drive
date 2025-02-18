import Head from "next/head";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import SideBar from "@/components/SideBar";
import { useEffect, useState } from "react";


const Home = () => {

  const [assets, setAssets] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const getData = async () => {
    try {
      const data = await fetch(`/api/assets?${searchTerm}`);
      const media = await data.json();
      setAssets(media)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => { getData() }, [searchTerm])

  console.log(assets)

  const onHandleNewUpload = (asset) => {
    setAssets(prev => [asset, ...prev])
  }
  return (
    <>
      <Head>
        <title>Google Drive CLone</title>
        <meta name="description" content="main page of google drive" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="main-container"     >
        <SideBar onHandleNewUpload={onHandleNewUpload} />
        <Dashboard assets={assets} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
    </>
  );
}

export default Home
