import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useContext } from "react";
import { HomePageContext } from "../../../Helper/HomePageContexts/HomePageProvider";


export default function Page() {
  const {setPage} = useContext(HomePageContext)

  const handleChange = (page) => {
    setPage(page);
  };

  
  return (
        <div>
        <Stack spacing={2}>   
            <Pagination  count={100} variant="outlined" shape="rounded"  size="large" onChange={(event) => handleChange(event.target.textContent)}/>  
        </Stack>
        </div>
    
  );
}