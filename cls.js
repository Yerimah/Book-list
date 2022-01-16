class Book {
  constructor() {
    this.storedBook = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
  }

  addBook(book) {
    this.storedBook.push(book);

    localStorage.setItem('books', JSON.stringify(this.storedBook));
  }

  removeBook(id) {
    this.storedBook = this.storedBook.filter((book) => book.id !== id);

    localStorage.setItem('books', JSON.stringify(this.storedBook));
  }
}

const bookTitle = document.querySelector('#booktitle');
const bookAuthor = document.querySelector('#bookauthor');
const bookList = document.querySelector('.booklist');
const addBtn = document.querySelector('#addbtn');
const form = document.querySelector('form');
const newBook = new Book();

function render() {
  bookList.innerHTML = '';
  newBook.storedBook.forEach((singleBook) => {
    bookList.innerHTML += `
          <ul id="${singleBook.id}">
              <li>${singleBook.title}</li>
              <li>${singleBook.author}</li>
              <button class="removebtn" id="delete">remove</button>
          </ul>
          <hr>
          `;
  });
}

bookList.addEventListener('click', (event) => {
  if (event.target.id === 'delete') {
    const element = event.target.parentNode;
    newBook.removeBook(element.id);
    render();
  }
});

addBtn.addEventListener('click', (e) => {
  // prevents a page reload
  e.preventDefault();
  // creates an object with the book values gotten from the inputs
  const ola = {
    title: bookTitle.value,
    author: bookAuthor.value,
    id: Date.now().toString(36),
  };
    // stores them in a temp array
  newBook.storedBook.push(ola);
  render();

  form.reset();
});

window.onload = () => render();