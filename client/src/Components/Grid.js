import { Box } from "./Box"
import "./Grid.css";


export function Grid(){

  const profiles = [
    {"album_cover": "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed Album Covers 2.jpg", "name":"Eunice Ahn"},
    {"album_cover": "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed Album Covers 2.jpg", "name":"Kaylin Chung"}
   
  ]
    return (
      <center>
        <div class="grid">
        
        {profiles.map(item => (<Box image={item.album_cover} name={item.name}> </Box>))}
      </div>
      </center>
      );
      
    }

export default Grid;