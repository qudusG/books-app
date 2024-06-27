import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookService } from '../../services/book.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../models/book';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatListModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {
  @Input() book: Book | null = null;
  bookForm!: FormGroup;
  @Output() bookAdded = new EventEmitter<Book>();

  constructor(private fb: FormBuilder, private bookService: BookService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl(),
      author: new FormControl(),
      isbn: new FormControl(),
      publishedDate: new FormControl()
  });
    if (this.book) {
      this.bookForm.patchValue(this.book);
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData: Book = this.bookForm.value;
      if (this.book) {
        bookData.id = this.book.id;
        this.bookService.updateBook(bookData).subscribe(() => {
          this.bookService.booksUpdated.emit();
        });
      } else {
        this.bookService.addBook(bookData).subscribe(() => {
          this.cdr.detectChanges();
        });
      }
      this.bookForm.reset();
    }
  }

  onDelete(): void {
    if (this.book) {
      this.bookService.deleteBook(this.book.id).subscribe(() => {
        this.cdr
      });
    }
  }

  clearForm(): void {
    this.bookForm.reset();
  }
}