/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { QuotesComponent } from "./Quotes.component";
import { QuoteService } from "../service/Quote.service";
import { QuoteModel } from "../model/QuoteModel";
import { FormsModule } from "@angular/forms";

describe("QuotesComponent", () => {
  let component: QuotesComponent;
  let fixture: ComponentFixture<QuotesComponent>;
  let quoteServiceStub: Partial<QuoteService>;
  let quoteListMock = [
    new QuoteModel("I love unit testing", "Mon 4, 2018")
  ];

  quoteServiceStub = {
    quoteList: quoteListMock,
    getQuote: () => { return [
        {text:'Hello', timeCreated:'today'}
      ]
    },
    fetchQuotesFromServer: () => { return Promise.resolve(quoteListMock) }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [QuotesComponent],
      providers: [ {provide: QuoteService, useValue: quoteServiceStub}]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it("should create Quote component", () => {
    expect(component).toBeTruthy();
  });

  it("should use the quoteList from the service", () => {
    const quoteService = fixture.debugElement.injector.get(QuoteService);
    expect(quoteService.getQuote()).toBeTruthy(component.quoteList);
  });

  it("should use the quoteList from the stub service", () => {
    const quoteService = fixture.debugElement.injector.get(QuoteService);
     let spy = spyOn(quoteService, "getQuote").and.returnValue(
         [{text:'Hello', timeCreated:'today'}]
     )
  });

  it("should fill the form correctly", () => {
    // init value
    component.quoteText = "I love this test";
    // binding
    fixture.detectChanges();
    // get template
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain("I love this test");
  });

  it("should disable the button when textArea is empty", () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it("should enable button when textArea is not empty", () => {
    component.quoteText = "I love this test";
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it("should remove post upon card click", () => {
    component.quoteText = "This is a fresh post";
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css(".row"))
      .query(By.css(".card"))
      .triggerEventHandler("click", null);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain("This is a fresh post");
  });

  it("should fetch data asynchronously", async () => {
    const quoteService = fixture.debugElement.injector.get(QuoteService);
    let spy = spyOn(quoteService, "fetchQuotesFromServer").and.returnValue(
      Promise.resolve(quoteListMock)
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.fetchedList).toBe(quoteListMock);
    });
  });
});
