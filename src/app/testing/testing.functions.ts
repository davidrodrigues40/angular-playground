import { WritableSignal } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { SignalObject } from "../interfaces/models/signal-object";
import { MockSignalComponent } from "./testing.components";

export function eventTest(obj: any, signal: WritableSignal<any>): void
{
   // Arrange
   const fixture = TestBed.createComponent(MockSignalComponent);

   // Act
   signal.set(obj);
   fixture.detectChanges();
};

export function configureEventTestingModule(signal: SignalObject<any>, effectName: string, service: any): void
{
   TestBed.resetTestingModule();
   TestBed.configureTestingModule({
      providers: [
         { provide: 'signal', useValue: signal },
         { provide: 'effectName', useValue: effectName },
         { provide: 'service', useValue: service }
      ]
   });
};

export function observableTest<T>(observable: Observable<T>, expected: T): void
{
   observable
      .subscribe(result =>
      {
         expect(result).toEqual(expected);
      });
}