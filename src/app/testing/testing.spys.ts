export abstract class TestingSpys
{
   static signalService<T>(effects: Array<string>, events: Array<string>): jasmine.SpyObj<T>
   {
      const spy = jasmine.createSpyObj('signalService', [], ['effects', 'events', 'observables']);

      Object.defineProperties(spy, {
         events: {
            value: {}
         },
         effects: {
            value: {}
         },
         observables: {
            value: {}
         }
      });
      effects.forEach(element =>
      {
         const effectSpy = jasmine.createSpy(element, spy.effects[element]);
         Object.defineProperty(spy.effects, element, { value: effectSpy, writable: true });
      });

      events.forEach(element =>
      {
         const eventSpy = jasmine.createSpy(element, spy.events[element]);
         Object.defineProperty(spy.events, element, { value: eventSpy, writable: true });
      });

      return spy;
   };
}