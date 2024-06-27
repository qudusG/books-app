import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatListModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  @Input() book!: Book;

  constructor(private bookService: BookService) { }

  ngOnInit(): void { }

  editBook(): void {
    console.log('Edit book:', this.book);
    // Implement functionality to edit the book
  }

  deleteBook(): void {
    this.bookService.deleteBook(this.book.id).subscribe(() => {
      console.log('Book deleted:', this.book);
    });
  }
}
