import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [MatButtonModule,
    MatCardModule,
    CommonModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatListModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})

export class BookListComponent implements OnInit {
  books = new MatTableDataSource<Book>();
  displayedColumns: string[] = ['title', 'author', 'publishedDate', 'isbn', 'action'];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.books.data = books.map(book => ({ ...book, editing: false }));
    });
  }

  toggleEditMode(book: Book): void {
    book.editing = true;
  }

  saveChanges(book: Book): void {
    this.bookService.editBook(book);
    book.editing = false;
    // Optionally, reload book data to reflect changes
    this.getBooks();
  }

  cancelEdit(book: Book): void {
    book.editing = false;
    // Optionally, reload book data to discard changes
    this.getBooks();
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.getBooks();
    });
  }