import ImageCard from "./ImageCard";
import VideoCard from "./VideoCard";



const Dashboard = ({ assets,setSearchTerm,searchTerm }) => {
  return (
    <main>
      <h2>Welcome to Drive AI</h2>
      <input className="main-search" placeholder="Search in Drive" value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}/>
      <div className="uploads-container">
        {assets?.map(asset => asset.resource_type == "image" && <ImageCard key={asset.asset_id} asset={asset} /> 
        ||
         <VideoCard key={asset.public_id} asset={asset} />)}
      </div>
    </main>
  );
}

export default Dashboard;