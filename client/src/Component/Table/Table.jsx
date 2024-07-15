import { getProductsData, getSearchResult } from '../../utils/Axios/Methods/GET';
import './Table.css';
import { useEffect , useState } from 'react';
import useDebounce from '../../Hooks/useDebounce';
import Pagination from '../Pagination/Pagination';

const Table = () => {
  const [products ,  setProducts] = useState([]);
  const [currentPage , setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalProducts, setTotalProducts] = useState(0);
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const [selectedRow , setSelectedRow]= useState([])
  
  
  const fetchSearchData = async(value)=>{
    const response = await getSearchResult(value);

      setProducts(response.data.response)
    
  }
  console.log("Selected row =>")
  const debouncedFetchSearchData = useDebounce(fetchSearchData, 500);

  useEffect(()=>{
    async function fetchData(){
      const response = await getProductsData(currentPage,itemsPerPage)
      setProducts(response.data.products);
      setTotalProducts(response.data.total);
    }
    fetchData()
  } , [currentPage])



  const handleDelete = () =>{
    setProducts(
      products.filter((product) => !selectedRow.includes(product.id))
    )
    setSelectedRow([])
  }
  return (
    <>
    <h1 className='title'>Trika Technologies</h1>
      <div className='searchParent'>
        <input type="text" placeholder='Search here' onChange={(e)=>{
          debouncedFetchSearchData(e.target.value);
        }} />
      </div>

        <h1>{selectedRow.length != '0'? selectedRow.length+" Selected" : "" }</h1>
    <table> 
      <thead>
        <tr>
          <th>
          <input type="checkbox" id="selectAll" onClick={function() {
          document.querySelectorAll('input[type="checkbox"]').forEach((checkbox,index)=>{
            if (index != 0) {
              checkbox.checked = !checkbox.checked;
              setSelectedRow(checkbox.id);
            }
          });
        }} />
          </th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Brand</th>
        </tr>
      </thead>
      <tbody>
        {
          products.length > 0 ? (
            products.map((product)=>(
              <tr key={product.id} className={selectedRow.includes(product.id) == true ? "selectedRow" : ""}>
                <td>
                <input type="checkbox" onClick={()=>{
                  setSelectedRow(prev=> {
                    if(prev.includes(product.id)){
                      return prev.filter(id=> id!= product.id)
                    }else{
                      return [...prev, product.id];
                    }
                  })
                }}/>
                </td>
                <td>{product.title}</td>
                <td>{product.description.slice(0, 50)}{product.description.length > 50 ? '...' : ''}</td>
                <td>{product.price}</td>
                <td>{product.brand ? product.brand : "No brand"}</td>
              </tr>
            ))
          ) : (
            <div className='empty'>
              <h1>No prodcuts</h1>
            </div>

          )
        }

        </tbody>
    </table>
      
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} handleDelete={handleDelete} totalPages={totalPages}/>
    
    </>
  );
};

export default Table;
