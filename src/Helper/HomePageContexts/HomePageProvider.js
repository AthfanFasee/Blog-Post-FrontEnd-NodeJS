import { createContext, useState } from "react";


export const HomePageContext = createContext(null)

export function HomePageProvider({children}) {

    //For all the posts in HomePage
    const [postLists, setPostLists] = useState([]);
          
    //To save noOfPages
   const [pageCount, setPageCount] = useState(1);

  //to save sort value
   const [sort, setSort] = useState('-createdAt');

   //to render or not render Edit or Update menue
    const [editsection, isEditsection] = useState(false);

    //For Pagination
    const [page, setPage] = useState(1);


    //For reloading homepage after a post is deleted
    const [ isdeleted, setIsdeleted ] = useState("")

    
   
    
    
    
    return (
        <HomePageContext.Provider value={{isdeleted,setIsdeleted, sort, setSort, pageCount, setPageCount, postLists, setPostLists, editsection, isEditsection, page, setPage}}>
            {children}
        </HomePageContext.Provider>
    )
}


