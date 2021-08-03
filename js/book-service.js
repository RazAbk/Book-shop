"use strict";

const PAGE_SIZE = 3;

var gBooks = [];

var gPageIdx = 0;

function updateBook(bookId, title, price, imgUrl) {
  var book = getBookById(bookId);

  if (title) book.title = title;
  if (price) book.price = price;
  if (imgUrl) book.img = imgUrl;

  _saveBooksToStorage();
}

function deleteBook(bookId) {
  var bookId = gBooks.findIndex(function (book) {
    return bookId === book.id;
  });
  gBooks.splice(bookId, 1);
  _saveBooksToStorage();
}

function addBook(title, price, imgUrl) {
  var book = _createBook(title, price, imgUrl);
  gBooks.unshift(book);
  _saveBooksToStorage();
}

function getBookById(bookId) {
  var book = gBooks.find(function (book) {
    return book.id === bookId;
  });

  return book;
}

function getBooksByPageSize() {
  var startIdx = gPageIdx * PAGE_SIZE;
  return gBooks.slice(startIdx, startIdx + PAGE_SIZE);
}

function setBookRating(bookId, rating) {
  var book = getBookById(bookId);
  book.rating = rating;
  _saveBooksToStorage();
}

function _createBook(title, price, imgUrl) {
  return {
    id: makeId(),
    title: title,
    price: price,
    img: imgUrl,
    rating: 0,
  };
}

function createBooks(){
  addBook("First friends",'12',"https://images-na.ssl-images-amazon.com/images/I/51d+JBAhLhL._SY344_BO1,204,203,200_.jpg");
  addBook("How I saved the world",'5',"https://images-na.ssl-images-amazon.com/images/I/411j0TUdamL._SX329_BO1,204,203,200_.jpg");
  addBook("I alone can fix it",'17',"https://images-na.ssl-images-amazon.com/images/I/41ItBEAc3kS._SY291_BO1,204,203,200_QL40_FMwebp_.jpg");
  addBook("If animals kissed good night",'22',"https://images-na.ssl-images-amazon.com/images/I/51PRQuO-xjL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg");
  addBook("The Cruelty",'23',"https://images-na.ssl-images-amazon.com/images/I/41UEsIyJR-S._SY291_BO1,204,203,200_QL40_FMwebp_.jpg");
  addBook("We did win this election",'15',"https://images-na.ssl-images-amazon.com/images/I/614mb3xlctS._SY291_BO1,204,203,200_QL40_FMwebp_.jpg");
  _saveBooksToStorage();
}

function _saveBooksToStorage() {
  saveToStorage("booksDb", gBooks);
}

function nextPage(indicator) {
  if (indicator === "+" && ((gPageIdx + 1) * PAGE_SIZE < gBooks.length)) {
    gPageIdx++;
  } else if (indicator === "-" && gPageIdx !== 0) {
    gPageIdx--;
  }
}

function filterBooks(filterBy) {
  // filterBy = 'title' / 'price
  var books = gBooks.sort(function (a, b) {
    if (a[filterBy] > b[filterBy]) return 1;
    if (a[filterBy] < b[filterBy]) return -1;
  });

  gBooks = books;
  _saveBooksToStorage();
}
