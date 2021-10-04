const addBookBTN = document.getElementById('add-book')
const bookForm = document.querySelector('form')
const blur = document.getElementById('blur')
const submitBTN = document.getElementById('book-info')
const libraryDisplay = document.getElementById('library-display')

submitBTN.onclick = () => collectBookInfo()
addBookBTN.onclick = () => blurMode.on()
blur.onclick = () => blurMode.off();

let myLibrary = [{
    title: 'The Book',
    authour: 'Writer',
    pages: '100',
    status: 'Droped',
},{
    title: 'Another Book',
    authour: 'Writer',
    pages: '0',
    status: 'On Hold',
}]

getLocal()
displayBooks()

function Book(title, authour, pages, status) {
    this.title = title
    this.authour = authour
    this.pages = pages
    this.status = status
}

function addBookToLibrary(title, authour, pages, status) {
    blurMode.off()
    createDisplayCards(title, authour, pages, status)
    myLibrary.push(new Book(title, authour, pages, status))
    setLocal()
}

function displayBooks() {
    libraryDisplay.innerHTML = ''
    for (const object of myLibrary) {
        createDisplayCards (object.title, object.authour, object.pages, object.status)
    }
    libraryDisplay.appendChild(addBookBTN)
}

function createDisplayCards(title, authour, pages, status) {
    const card = document.createElement('div')
    const buttons = document.createElement('div')
    const removeBTN = document.createElement('button')
    const editBTN = document.createElement('button')
    let titleP = document.createElement('p')
    let authourP = document.createElement('p')
    let pagesP = document.createElement('p')
    let statusP = document.createElement('p')

    titleP.textContent = title
    authourP.textContent = 'Authour: ' + authour
    pagesP.textContent = 'Pages: ' + pages
    statusP.textContent = 'Status: ' + status
    removeBTN.textContent = 'Remove'
    editBTN.textContent = 'Edit'

    removeBTN.onclick = () => removeBook(title)
    editBTN.onclick = () => editCard(title)

    buttons.appendChild(editBTN)
    buttons.appendChild(removeBTN)
    card.appendChild(titleP)
    card.appendChild(authourP)
    card.appendChild(pagesP)
    card.appendChild(statusP)
    card.appendChild(buttons)
    libraryDisplay.appendChild(card)
}

function editCard(target){
    let index = myLibrary.findIndex(x => x.title === target)
    let obj = myLibrary.find(x => x.title === target)

    blurMode.on()

    document.querySelector('form span').textContent = index
    document.getElementById('title').value = obj.title
    document.getElementById('authour').value = obj.authour
    document.getElementById('page').value = obj.pages
    document.getElementById('book-info').textContent = 'Update'  
}

function saveUpdate(title, authour, pages, status, index) {
    const updatedCard = { ...myLibrary[index], title: title, authour:authour, pages: pages, status: status};
    myLibrary[index] = updatedCard
    blurMode.off()
    displayBooks()
    setLocal()
}

function removeBook(target) {
    let index = myLibrary.findIndex(x => x.title === target)
    myLibrary.splice(index, 1)
    displayBooks()
    setLocal()
}

function collectBookInfo() {
    let title = document.getElementById('title').value
    let authour = document.getElementById('authour').value
    let pages = document.getElementById('page').value
    let selector = document.getElementById('status')
    let status = selector.options[selector.selectedIndex].text

    if (validationCheck(title, authour, pages) === false) return
    
    if (document.getElementById('book-info').textContent === 'Update') {
        let index = document.querySelector('form span').textContent
        if (updateValidTitle(title, index) === false) return
        return saveUpdate(title, authour, pages, status, index)
    }
    return addBookToLibrary(title, authour, pages, status)
}

function updateValidTitle(newTitle, index) {
    let titles = myLibrary.map(x => x.title)
    titles.splice(index, 1)
    let check = titles.find(x => x === newTitle)

    if (check) {
        document.querySelector('.valid-text').innerHTML =  '* Same title exits'
        return false
    }
}

function validationCheck(title, authour, pages) {
    validText = ''
    let book = false
    
    if(document.getElementById('book-info').textContent === 'Submit') {
        book = myLibrary.find(x => x.title === title)
        if(book) validText += '* Same title exits<br>'
    }

    if(title === '') validText += '* Title not Defined<br>'
    if(authour === '') validText += '* Authour not Defined<br>'
    if(pages === '') validText += '* page not Defined'
    if (validText !== '') {
        document.querySelector('.valid-text').innerHTML = validText
        return false
    }
}

var blurMode = {
    off: function(){
        menu()
        bookForm.style.display = 'none'
        clearFrom()
    },
    on: function(){
        blur.style.display = 'block'
        bookForm.style.display = 'flex'
    }   
}

function clearFrom() {
    document.querySelector('form span').textContent = ''
    document.getElementById('title').value = ''
    document.getElementById('authour').value = ''
    document.getElementById('page').value = ''
    document.querySelector('.valid-text').innerHTML = ''
    document.getElementById('book-info').textContent = 'Submit' 
}

function updateCounter() {
    document.getElementById('book-count').textContent = myLibrary.length
    document.getElementById('book-complete').textContent = myLibrary.filter(x => x.status === 'Completed').length
    document.getElementById('book-want').textContent = myLibrary.filter(x => x.status === 'Want To Read').length
    document.getElementById('book-hold').textContent = myLibrary.filter(x => x.status === 'On Hold').length
    document.getElementById('book-drop').textContent = myLibrary.filter(x => x.status === 'Droped').length 
}

function setLocal() {
    clearFrom()
    updateCounter()
    localStorage.setItem('MyLibrary', JSON.stringify(myLibrary))
}
function getLocal() {
    if(localStorage.getItem('MyLibrary') === null) setLocal()
    myLibrary = JSON.parse(localStorage.getItem('MyLibrary'))
    updateCounter()
}

let sideBar = document.querySelector('.side-bar')
function menu() {
    if (sideBar.classList.contains('active')) {
        sideBar.classList.remove('active')
        blur.style.display = 'none'
    } else if (blur.style.display === 'block') {
        blur.style.display = 'none'
    } else {
        sideBar.classList.add('active')
        blur.style.display = 'block'
    }
}