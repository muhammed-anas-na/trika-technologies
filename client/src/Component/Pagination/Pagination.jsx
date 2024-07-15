import "./pagination.css"

function Pagination({
    currentPage,
    setCurrentPage,
    handleDelete,
    totalPages
}) {
  return (
    <div className='pagination-container'>
      
      <div>
        <button 
        className='deleteBtn'
        onClick={handleDelete}
        >Delete</button>  
      </div>
      
      <div>
      <button
        className='pagination-button'
        disabled={currentPage === 1}
        onClick={()=>{setCurrentPage(prev=>prev-1)}}
        >&lt;</button>

      <button
      disabled="true"
      className='pagination-button'
      style={{background:"gray"}}>
        {currentPage}
      </button>

      <button
      onClick={()=>setCurrentPage(prev=>prev+1)}
      className='pagination-button'>
        {currentPage+1}
      </button>

        <button
        disabled={currentPage === totalPages}
        className='pagination-button'
        onClick={()=>{setCurrentPage(prev=>prev+1)}}
        >&gt;</button>
      </div>
    </div>
  )
}

export default Pagination
