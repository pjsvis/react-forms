
interface Book { type: string, authorId: number, title: string }
interface Author { authorId: number, name: string }
interface BookView { title: string, author: string }

const books: Book[] = [
      { type: 'T', authorId: 1, title: 'Point Free Programming' },
  { type: 'T', authorId: 2, title: 'Functional Style' },
  { type: 'T', authorId: 2, title: 'More Functional Stuff' },
]
const authors: Author[] = [
  { authorId: 1, name: 'Peter J Smith' },
  { authorId: 2, name: 'Albert Pruffock' },
  { authorId: 3, name: 'Ernest Shackleton' }
]


export const getBooks = () => {
  return books.filter(isTechnology)
    .map(toBookView)
    .sort(ascByAuthor);
}
//Small functions with points
const isTechnology = (book: Book) => {
       return book.type === "T";
}

const toBookView = (book: Book): BookView => {
  const bookView =  {
    title: book.title,
    author: authorName(book.authorId)
  };
  return bookView
}

const authorName = (id: number) => {
  return authors.filter( x => x.authorId === id)[0].name || 'Unknown'
}


const ascByAuthor = (book1: BookView, book2: BookView) => {
  if(!book2){return 0}
  if (book1.author < book2.author) return -1;
  if (book1.author > book2.author) return 1;
  return 0;
}

// toBookView(books[0]) /*?*/
getBooks() /*?*/

