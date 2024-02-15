import { WritableSignal } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { SignalObject } from "../interfaces/models/signal-object";
import { ISignalStateService } from "../interfaces/services/signal-state-service.interface";
import { MockSignalComponent } from "./testing.components";
import { Observable } from "rxjs";

export function eventTest(obj: any, signal: WritableSignal<any>): void
{
   // Arrange
   const fixture = TestBed.createComponent(MockSignalComponent);

   // Act
   signal.set(obj);
   fixture.detectChanges();
};

export function configureEventTestingModule(signal: SignalObject<any>, effectName: string, service: ISignalStateService): void
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