


function DragAndDropComponent() {
    const [dragging, setDragging] = useState(false);
    const [file,setFile] = useState(null)
    const [processed,setIsProcessed] = useState(null)

    if(file && !processed){
        uploadFile(file,'/process',setIsProcessed)
    }
  
    const handleDragStart = (e) => {
      e.dataTransfer.setData('text/plain', ''); // Required for some browsers
      setDragging(true);
    };
  
    const handleDragEnd = () => {
      setDragging(false);
    };
  
    const handleDragOver = (e) => {
      e.preventDefault(); // Allow dropping
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      setDragging(false);
      if(e.dataTransfer.files[0].type === 'application/pdf'){
        setFile(e.dataTransfer.files[0])
      }else{
        alert('Alas ! This is not a pdf file')
      }

    };

    if(processed){
        return  (
        <div
        style={{
          height: '70vh',
          backgroundColor: dragging ? 'lightblue' : 'white',
        }}
        className='d-flex justify-content-center align-items-center'>
            <div>
                <div className='container mb-3' style={{width : 'fit-content'}} >
                    <img style={{height : '10vh'}} src='static/icons/checked.png' /> 
                </div>
                <p className='text-center text-primary'>Conversion Completed :)</p>

                <div className='container mb-3' style={{width : 'fit-content'}} >
                  <a class="btn btn-sm me-1 btn-primary" href='/'>Convert Again</a>
                </div>
                
               
            </div>
        </div>)
    }
  
    return (
      <div
        style={{
          height: '70vh',
          border: 'dashed 1px black',
          backgroundColor: dragging ? 'lightblue' : 'white',
        }}
        className='d-flex justify-content-center align-items-center'
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        draggable={true}
      >
        {!file ? <div>
            <div className='container mb-3' style={{width : 'fit-content'}} >
                <img style={{height : '10vh'}} src='static/icons/drag-and-drop.png' /> 
            </div>
            <p className='text-center text-primary'>Drag and Drop Your PDF File Here</p>
        </div> : 
        <div>
            <div className='container mb-3' style={{width : 'fit-content'}} >
                <img style={{height : '5vh'}} src='static/icons/pdf.png' /> 
            </div>
            
            <p className='text-center'>
                {file.name}
            </p>

            <div className="progress">
                <div className="progress-bar progress-bar-striped bg-primary progress-bar-animated" role="progressbar" style={{width : '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>

        </div>
        }
        
      </div>
    );
}


function UpcomingProducts(){

  function handleMouseEnter(dom){

    dom.actualHTML = dom.innerHTML
    dom.innerHTML = 'coming soon'
    
    dom.classList.add('bg-success')
    dom.classList.add('text-light')
  }

  function handleMouseLeave(dom){

    dom.innerHTML = dom.actualHTML 
    
    dom.classList.remove('bg-success')
    dom.classList.remove('text-light')
  }

  return <ul className='list-group'>
    <li className='list-group-item' style={{cursor:'pointer'}} onMouseLeave={(e)=>{handleMouseLeave(e.target)}}  onMouseEnter={(e)=>handleMouseEnter(e.target)}>Word To Pdf Converter</li>
    <li className='list-group-item' style={{cursor:'pointer'}} onMouseLeave={(e)=>{handleMouseLeave(e.target)}}  onMouseEnter={(e)=>handleMouseEnter(e.target)}>OCR To PDF</li>
    <li className='list-group-item' style={{cursor:'pointer'}} onMouseLeave={(e)=>{handleMouseLeave(e.target)}}  onMouseEnter={(e)=>handleMouseEnter(e.target)}>PDF Compressor</li>
    <li className='list-group-item' style={{cursor:'pointer'}} onMouseLeave={(e)=>{handleMouseLeave(e.target)}}  onMouseEnter={(e)=>handleMouseEnter(e.target)}>Images To PDF</li>
    <li className='list-group-item' style={{cursor:'pointer'}} onMouseLeave={(e)=>{handleMouseLeave(e.target)}}  onMouseEnter={(e)=>handleMouseEnter(e.target)}>Batch Conversions</li>
  </ul>
}
  
function App() {
    
    return (
      <>
        <div className='row'>
          <div className='col-3'></div>
          <div className='col-6'>
            <div className="container">
                <DragAndDropComponent />
            </div>
          </div>
          <div className='col-3'>
             <div className="card border-info mb-3">
              <div className="card-header">Features</div>
              <div className="card-body">
                {/* <h4 className="card-title">Secondary card title</h4> */}
                <p className='p-0 m-0'>Fast and Efficient</p>
                <p className='p-0 m-0'>No Download Required</p>
                <p className='p-0 m-0'>No Registration</p>
                <p className='p-0 m-0'>Privacy</p>
                <p className='p-0 m-0'>Ease of Use</p>
              </div>
            </div>
            <UpcomingProducts />

            
            
          </div>
        </div>
      
        <div className='fixed-bottom'>
          <div className='alert alert-primary p-0 m-0'>
            <p className='text-center p-0 m-0'>Made with <span className='text-danger'>&hearts;</span>Love in India</p>
          </div>
        </div>
      </>
        
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)
