
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
        return  (<div
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
  
function App() {
    
    return (
        <div className="container mt-5">
            <DragAndDropComponent />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)
