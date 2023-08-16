// location
document.addEventListener('DOMContentLoaded', function() {

    const bookContainer = document.querySelector('#book-container')
    // const bookURL = `http://localhost:5501/books`
    const bookURL = `http://127.0.0.1:8009/api/viewLocation/`
    const addURL = `http://127.0.0.1:8009/api/addLocation`
    const editURL = `http://127.0.0.1:8009/api/editLocation`
    const bookForm = document.querySelector('#book-form')
    let allBooks = []
   
 
// fetch for get records....

    fetch(`${bookURL}`)
      .then( response =>{  console.log(response,"response jsonnnnnn");
          return response.json() })
      .then( bookData =>{
          console.log(bookData,"bookDatabookData");
          return  bookData.forEach(function(book) {
          bookContainer.innerHTML += `
          <div id=${book.id}>
            <h4>Location: ${book.locationname}</h4>
         
          <p>${book.locationname}</p>
          <button data-id="${book.id}" id="edit-${book.id}" data-action="edit">Edit</button>
          <button data-id="${book.id}" id="delete-${book.id}" data-action="delete">Delete</button>
          </div>`
      })})
      .catch((err)=>{
        console.log(err,"e");
      }) 

// ftech for add records.....

      bookForm.addEventListener('submit', (e) => {
        console.log('clickedddd add button' );
      e.preventDefault()
      console.log(e.target,"e.targetttttt")
   


    
      // const titleInput = bookForm.querySelector('#title').value
      const locationInput = bookForm.querySelector('#location').value
      console.log(locationInput,"locationInputtttt");
      // const coverImageInput = bookForm.querySelector('#coverImage').value
      // const descInput = bookForm.querySelector('#description').value


      fetch(`${addURL}`,{
            method: 'POST',
            body: JSON.stringify({
            // title: titleInput,
            location_name: locationInput,
            // coverImage: coverImageInput,
            // description: descInput
            }),
            headers: {
            'Content-Type': 'application/json'
           }
      })

          .then( response => response.json())
          .then( book => {
            bookContainer.innerHTML += `
            <div id=${book.id}>
            <h2>${book.location_name}</h2>
            
            <h4>Location: ${book.location_name}</h4>
            
            <p>${book.locationname}</p>
            <button data-id="${book.id}" id="edit-${book.id}" data-action="edit">Edit</button>
            <button data-id="${book.id}" id="delete-${book.id}" data-action="delete">Delete</button>
            </div>`
        })

    })


// fetch for edit records .....

   
bookContainer.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'edit') {
    console.log('you pressed edit')
     } else if (e.target.dataset.action === 'delete') {
      console.log('you pressed delete')
    }

  })


   fetch(`${bookURL}`)
   .then( response => response.json() )
     .then( bookData => bookData.forEach(function(book) {
   allBooks = bookData
   bookContainer.innerHTML += `
     <div id=book-${book.id}>`
     
     }))
  

     bookContainer.addEventListener('click', (e) => {
      if (e.target.dataset.action === 'edit') {
        const bookData = allBooks.find((book) => {
          return book.id == e.target.dataset.id
        })
        console.log(bookData,"bookkkkkkkkk")
     
    }}) 

    bookContainer.addEventListener('click', (e) => {
        if (e.target.dataset.action === 'edit') {
          const editButton = document.querySelector(`#edit-${e.target.dataset.id}`)
          editButton.disabled = true
          
          bookData = allBooks.find((book) => {
            return book.id == e.target.dataset.id
          })
          e.target.parentElement.innerHTML += `
          <div id='edit-book'>
          <form id="book-form">
         
          <input required id="edit-location" placeholder="${bookData.locationname}">
          
          <input type="submit" value="Edit Name">
          </div>`
        } else if (e.target.dataset.action === 'delete') {
          console.log('you pressed delete')
        }
      })
      
      // const editForm = document.querySelector('#edit-form')
      

      bookContainer.addEventListener("submit", (e) => {
      e.preventDefault()
      console.log("line num 1466666666666");
      // const titleInput = document.querySelector("#edit-title").value
      const locationInput = document.querySelector("#edit-location").value
      // const coverImageInput = document.querySelector("#edit-coverImage").value
      // const descInput = document.querySelector("#edit-description").value
      const editedBook = document.querySelector(`#book-${bookData.id}`)

      console.log(locationInput,"locationInputttttttt");

      // api call for update......
        fetch(`${editURL}/${bookData.id}`, {
          method: 'PUT',
          body: JSON.stringify({
          // title: titleInput,
          location_name: locationInput,
          // coverImage: coverImageInput,
          // description: descInput
          }),
           headers: {
          'Content-Type': 'application/json'
          }
       }).then( response => response.json() )
        .then( book => {
          editedBook.innerHTML = `
          <div id=book-${book.id}>
          <h2>${book.locationname}</h2>
          <h4>Location: ${book.locationname}</h4>
          
          <p>${book.locationname}</p>
          <button data-id=${book.id} id="edit-${book.id}" data-action="edit">Edit</button>
          <button data-id=${book.id} id="delete-${book.id}" data-action="delete">Delete</button>
          </div>
          <div id=edit-book-${book.id}>
          </div>`
          bookContainer.innerHTML = ""
       })
  }) 

})



