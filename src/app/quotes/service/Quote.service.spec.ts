/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuoteService } from "./Quote.service";
import { QuoteModel } from "../model/QuoteModel";

describe("QuoteService", () => {
  let service: QuoteService;
  let httpMock;

  beforeEach(async() => {
    //service = new QuoteService();
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [QuoteService]
    }).compileComponents();
    // Angular Mock
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(QuoteService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should remove a created post from the array of posts', () => {
    // complete implementation here
    expect(service).toBeTruthy();
  });

  it('should get a list of posts', () => {
    let quotesMock: QuoteModel[] = [
      new QuoteModel("I love unit testing", "Mon 4, 2018")
    ];

    // placer la request avant le mock
    service.listQuotes().subscribe(data => {
      expect(quotesMock[0]).toEqual(data[0]);
    });

    // intercept cal to api
    const req = httpMock.expectOne('http://jsonplaceholder.typicode.com/todos');
    expect(req.request.method).toBe('GET');
    req.flush(quotesMock);
    httpMock.verify();

  });

});
