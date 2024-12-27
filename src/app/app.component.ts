import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',  // This is the selector used in the HTML template to insert this component into the DOM. The component can be used like <app-root></app-root> in the HTML.
  standalone: true,   // The component is standalone, which means it doesn't require an Angular module (NgModule) to function.
  templateUrl: './app.component.html'  // This points to the external HTML file that defines the component’s view (template).
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  // The inject function is used to inject a dependency, in this case, DestroyRef, which is used to help manage cleanup when a component is destroyed. It is particularly useful for managing resources like subscriptions or event listeners.

  ngOnInit() {  // The ngOnInit() method will be called when the component is initialized, which is the appropriate place to perform observable subscriptions and other initialization tasks.
    const subscription = interval(1000).pipe(
      // RxJS map operator
      map((val) => val * 2)
    ).subscribe({
      next: (val) => console.log(val)
    });
    // interval(1000): This is an RxJS operator that emits a number every 1000 milliseconds (1 second). It starts emitting values like 0, 1, 2, 3, ... at a 1-second interval.
    // .pipe(...): The pipe method is used to chain one or more operators to the observable. In this case, the map operator is applied to the observable stream.
    // map((val) => val * 2): The map operator transforms the emitted values. In this case, each emitted value (val) is multiplied by 2. For example, the values 0, 1, 2, 3, ... will be transformed to 0, 2, 4, 6, ....
    // .subscribe(...): This subscribes to the observable and provides an observer object with a next function, which is called every time the observable emits a new value. 
    // In this case, the emitted value is logged to the console using console.log(val).
    // So, every second, the console will log a number starting from 0 and incrementing by 2 each second: 0, 2, 4, 6, 8, ....

    this.destroyRef.onDestroy(() => {  // This is used to automatically handle the cleanup of the observable subscription when the component is destroyed.
      subscription.unsubscribe();
      // When the component is destroyed, the onDestroy method is called. It triggers the cleanup logic, which in this case calls unsubscribe on the subscription. 
      // This ensures that the interval observable stops emitting values and the subscription is properly disposed of to prevent memory leaks.
    });
  }
}

// RxJS (Reactive Extensions for JavaScript) is a powerful library for working with asynchronous programming using observables. 
// It provides a set of operators and utilities for composing and managing asynchronous data streams, events, and other reactive data flows.
// RxJS is heavily used in Angular to handle asynchronous operations like HTTP requests, event handling, and form value changes. 
// It enables reactive programming, where data changes trigger updates to the user interface or other parts of the application.

// An observable is a stream of data that can emit multiple values over time. Observables are the core concept of RxJS.
// They can emit multiple values, not just a single value.
// Observables can represent anything that emits data over time, such as mouse clicks, HTTP responses, or user input.

// An observer subscribes to an observable and listens for emitted values. It provides methods like next(), error(), and complete() that are invoked when the observable emits data, encounters an error, or completes.

// Operators are functions that allow you to transform, filter, or combine observable streams. Operators are used to manipulate the data flowing through observables.
// Common operators include:
// map(): Transforms emitted values.
// filter(): Filters emitted values based on a condition.
// mergeMap(), switchMap(), concatMap(): Transform observables into other observables.
// catchError(): Handles errors in the stream.
// debounceTime(): Delays emissions to reduce the frequency of values

// A subject is a special type of observable that can multicast to many observers. Unlike a regular observable, a subject allows values to be manually pushed into the stream using methods like next().
// BehaviorSubject, ReplaySubject, and AsyncSubject are types of subjects that have different behaviors regarding how they store and emit values.

// A scheduler in RxJS determines when the subscription should receive values. Schedulers allow you to control the timing of emissions, making it possible to delay, throttle, or prioritize tasks within the observable stream.