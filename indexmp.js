// productmovement

document.addEventListener('DOMContentLoaded', function() {

  const bookContainer = document.querySelector('#book-container')
    // const bookURL = `http://localhost:5501/books`
  const bookURL = `http://127.0.0.1:8009/api/viewProductMovement/`
  const addURL = `http://127.0.0.1:8009/api/addProductMovement/`
  const editURL = `http://127.0.0.1:8009/api/editProductMovement`
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
      <h4>Timestamp: ${book.timestamp}</h4>
      <h4>Fromlocation ${book.fromlocation}</h4>
      <h4>Tolocation ${book.to_location}</h4>
      <h4>ProductId: ${book.product_id}</h4>
      <h4>Location_id: ${book.Location_id}</h4>
      <p>Quantity: ${book.quantity}</p>
      
      
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
    const fromlocationInput = bookForm.querySelector('#fromlocation').value
    const tolocationInput = bookForm.querySelector('#to_location').value
    const timestampInput = bookForm.querySelector('#timestamp').value
    const quantityInput = bookForm.querySelector('#quantity').value
    const productidInput = bookForm.querySelector('#product_id').value
    const locationidInput = bookForm.querySelector('#location_id').value
    console.log(fromlocationInput,"fromlocationInputtttt");
      // const coverImageInput = bookForm.querySelector('#coverImage').value
      // const descInput = bookForm.querySelector('#description').value


    fetch(`${addURL}`, {
      method: 'POST',
      body: JSON.stringify({ 
        // title: titleInput,
      from_location: fromlocationInput,
      timestamp:timestampInput,
      to_location:tolocationInput,
      product_id:productidInput,
      Location_id:locationidInput,
      quantity:quantityInput,
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
        <h4>${book.timestamp}</h4>
        <h4>${book.fromlocation}</h4>
        <h4>${book.to_location}</h4>
        <h4>${book.product_id}</h4>
        <h4>${book.quantity}</h4>
        <h4>Fromlocation: ${book.Location_id}</h4>
        
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
        <input required id="edit-fromlocation" placeholder="${bookData.fromlocation}">
        <input required id="edit-timestamp" placeholder="${bookData.timestamp}">
        <input required id="edit-to_location" placeholder="${bookData.to_location}">
        <input required id="edit-product_id" placeholder="${bookData.product_id}">
        <input required id="edit-quantity" placeholder="${bookData.quantity}">
        <input required id="edit-Location_id" placeholder="${bookData.Location_id}">
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
    const fromlocationInput = document.querySelector("#edit-fromlocation").value
    console.log(fromlocationInput,"fromlocationInputtttttttt");
    const timestampInput = document.querySelector('#edit-timestamp').value
    console.log(timestampInput,"timestampInputtttttttttttt");
    const tolocationInput = document.querySelector('#edit-to_location').value
    console.log(tolocationInput,"tolocationInputtttttt");
    const productidInput = document.querySelector('#edit-product_id').value
    console.log(productidInput,"productidInputtttttttt");
    const quantityInput = document.querySelector('#edit-quantity').value
    console.log(quantityInput,"quantityInputtttttt");
    const locationidInput = document.querySelector('#edit-Location_id').value
    console.log(locationidInput,"locationidInputttttttt");
    // const coverImageInput = document.querySelector("#edit-coverImage").value
    // const descInput = document.querySelector("#edit-description").value
    const editedBook = document.querySelector(`#book-${bookData.id}`)


    // api call for update......
      fetch(`${editURL}/${bookData.id}`, {
        method: 'PUT',
        body: JSON.stringify({
        
        from_location:fromlocationInput,
        timestamp:timestampInput,
        to_location:tolocationInput,
        product_id:productidInput,
      Location_id:locationidInput,
      quantity:quantityInput,
        }),
         headers: {
        'Content-Type': 'application/json'
        }
     }).then( response => response.json() )
      .then( book => {
        editedBook.innerHTML = `
        <div id=book-${book.id}>
        <h2>Timestamp: ${book.timestamp}</h2>
        <h2>Tolocation: ${book.to_location}</h2>
        <h2>Productid: ${book.product_id}</h2>
        <h2>Quantity: ${book.quantity}</h2>
        <h4>Fromlocation: ${book.fromlocation}</h4>
        <p>Locationid: ${book.Location_id}</p>
        <button data-id=${book.id} id="edit-${book.id}" data-action="edit">Edit</button>
        <button data-id=${book.id} id="delete-${book.id}" data-action="delete">Delete</button>
        </div>
        <div id=edit-book-${book.id}>
        </div>`
        bookContainer.innerHTML = ""
     })
}) 

})


