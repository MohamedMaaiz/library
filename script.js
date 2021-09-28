
const addBookBTN = document.getElementById('add-book')
const bookForm = document.querySelector('form')
const submitBTN = document.getElementById('book-info')
const libraryDisplay = document.getElementById('library-display')
const selectBTN2 = document.querySelector('select')


submitBTN.onclick = () => collectBookInfo()
addBookBTN.onclick = () => displayFrom()


let myLibrary = [{
    title: 'book1',
    authour: 'writer1',
    pages: '1',
    status: 'completed',
},{
    title: 'book2',
    authour: 'writer2',
    pages: '2',
    status: 'completed',
}]

displayBooks()
function displayBooks() {
    libraryDisplay.innerHTML = ''
    for (const object of myLibrary) {
        createDisplayCards (object.title, object.authour, object.pages, object.status)
    }
}


function createDisplayCards(title, authour, pages, status) {
    const card = document.createElement('div')
    const removeBTN = document.createElement('button')
    const editBTN = document.createElement('button')
    let titleP = document.createElement('p')
    let authourP = document.createElement('p')
    let pagesP = document.createElement('p')
    let statusP = document.createElement('p')

    removeBTN.textContent = 'X'
    editBTN.textContent = 'E'
    titleP.textContent = 'Title: ' + title
    authourP.textContent = 'Authour: ' + authour
    pagesP.textContent = 'Page: ' + pages
    statusP.textContent = 'Status: ' + status

    removeBTN.onclick = () => removeBook(title)
    editBTN.onclick = () => editCard(title)

    card.appendChild(removeBTN)
    card.appendChild(editBTN)
    card.appendChild(titleP)
    card.appendChild(authourP)
    card.appendChild(pagesP)
    card.appendChild(statusP)
    libraryDisplay.appendChild(card)
}

function editCard(target){
    let index = myLibrary.findIndex(x => x.title === target)
    let obj = myLibrary.find(x => x.title === target)

    let title = obj.title
    let authour = obj.authour
    let pages = obj.pages

    bookForm.style.display = 'flex'
    console.log(title, authour, pages)

    document.querySelector('span').textContent = index
    document.getElementById('title').value = title
    document.getElementById('authour').value = authour
    document.getElementById('page').value = pages
    document.getElementById('book-info').textContent = 'Update'  
}
    
function saveUpdate(title, authour, pages, status, index) {
    const updatedLibrary = { ...myLibrary[index], title: title, authour:authour, pages: pages, status: status};
    myLibrary[index] = updatedLibrary
    displayBooks()
}

function removeBook(target) {
    let index = myLibrary.findIndex(x => x.title === target)
    myLibrary.splice(index, 1)
    displayBooks()
}

function Book(title, authour, pages, status) {
    this.title = title
    this.authour = authour
    this.pages = pages
    this.status = status
}

function addBookToLibrary(title, authour, pages, status) {
    bookForm.style.display = 'none'
    createDisplayCards(title, authour, pages, status)
    myLibrary.push(new Book(title, authour, pages, status))
    console.table(myLibrary)
}

function collectBookInfo() {
    let title = document.getElementById('title').value
    let authour = document.getElementById('authour').value
    let pages = document.getElementById('page').value
    let selector = document.getElementById('status')
    let status = selector.options[selector.selectedIndex].text
    
    if (document.getElementById('book-info').textContent === 'Update') {
        let index = document.querySelector('span').textContent
        return saveUpdate(title, authour, pages, status, index)
    }

    return addBookToLibrary(title, authour, pages, status)
}

function displayFrom() {
    bookForm.style.display === 'flex' ? bookForm.style.display = 'none' : bookForm.style.display = 'flex'
    document.getElementById('book-info').textContent = 'Submit' 
}