
export class Book {
    id: number;
  
    title: string;
  
    author: string;
  
    publishedDate: Date;
  
    isbn: string;
    editing: boolean;

    constructor(id: number, title: string, author: string, publishedDate: Date, isbn: string, editing: boolean) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.publishedDate = publishedDate;
      this.isbn = isbn;
      this.editing = editing;
    }
  }
  