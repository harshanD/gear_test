import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: any = [];

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.books = this.route.snapshot.data.books;
  }

}
