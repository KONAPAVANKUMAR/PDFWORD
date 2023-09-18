async function uploadFile(file,endpoint,setIsProcessed) {
    // Create a FormData object to hold the file data
    const formData = new FormData();
    formData.append('file', file);

    // Make the fetch request
    fetch(endpoint, {
        method: 'POST', // Use the appropriate HTTP method
        body: formData, // Use the FormData object as the request body
        
    })
    .then(response => {
        const contentDisposition = response.headers.get('Content-Disposition');
        const fileName = contentDisposition && contentDisposition.match(/filename="(.+)"/)[1]
        return response.blob().then(blob => ({ blob, fileName }));
    }).then(({blob,fileName})=>{
        const url = URL.createObjectURL(blob);

        // Create a link for downloading the file
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName; // Set the desired file name
        a.style.display = 'none';
    
        // Append the link to the document and trigger a click event
        document.body.appendChild(a);
        a.click();
    
        // Clean up by revoking the URL
        URL.revokeObjectURL(url);
        setIsProcessed(true)

    })


    
}
