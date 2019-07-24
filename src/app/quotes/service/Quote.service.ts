import { Injectable } from "@angular/core";
import { QuoteModel } from "../model/QuoteModel";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class QuoteService {
  public quoteList: QuoteModel[] = [];

  private daysOfTheWeeks = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  constructor(private http: HttpClient) {}

  addNewQuote(quote: String) {
    const date = new Date();
    const dayOfTheWeek = this.daysOfTheWeeks[date.getDate()];
    const day = date.getDay();
    const year = date.getFullYear();
    this.quoteList.push(
      new QuoteModel(quote, `${dayOfTheWeek} ${day}, ${year}`)
    );
  }

  getQuote() {
    return this.quoteList;
  }

  removeQuote(index) {
    this.quoteList.splice(index, 1);
  }

  fetchQuotesFromServer() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([new QuoteModel("I love unit testing", "Mon 4, 2018")]);
      }, 2000);
    });
  }

  listQuotes() {
    return this.http.get('http://jsonplaceholder.typicode.com/todos');
  }
}
