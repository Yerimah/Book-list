const bookTitle = document.querySelector('#booktitle');
const bookAuthor = document.querySelector('#bookauthor');
const addBtn = document.querySelector('.addbtn');
const bookList = document.querySelector('.booklist');
const savedInput = localStorage.getItem('books');

let storedBooks = [];

if (JSON.parse(savedInput)) {
  storedBooks = JSON.parse(savedInput);
}

function removeBook(id) {
  storedBooks = storedBooks.filter((book) => book.id !== id);
  localStorage.setItem('books', JSON.stringify(storedBooks));
}

function render() {
  bookList.innerHTML = '';
  for (let i = 0; i < storedBooks.length; i += 1) {
    bookList.innerHTML += `
        <ul>
            <li>${storedBooks[i].title}</li>
            <li>${storedBooks[i].author}</li>
            <button class="removebtn" id="${storedBooks[i].id}">remove</button>
        </ul>
        <hr>
        `;
  }
  document.querySelectorAll('.removebtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      removeBook(btn.id);
      render();
    });
  });
}

function addBook(book) {
  storedBooks.push(book);

  localStorage.setItem('books', JSON.stringify(storedBooks));
}
// listens for a button click
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
  addBook(ola);
  render();
});

render();
