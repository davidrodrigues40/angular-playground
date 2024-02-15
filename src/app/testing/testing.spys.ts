export abstract class TestingSpys
{
   static signalService<T>(effects: Array<string>, methods: Array<string>): jasmine.SpyObj<T>
   {
      const spy = jasmine.createSpyObj('signalService', [], ['effects', 'methods', 'data']);

      Object.defineProperties(spy, {
         effects: {
            value: {}
         },
         methods: {
            value: {}
         },
         data: {
            value: {}
         }
      });
      effects.forEach(element =>
      {
         const effectSpy = jasmine.createSpy(element, spy.effects[element]);
         Object.defineProperty(spy.effects, element, { value: effectSpy, writable: true });
      });

      methods.forEach(element =>
      {
         const eventSpy = jasmine.createSpy(element, spy.methods[element]);
         Object.defineProperty(spy.methods, element, { value: eventSpy, writable: true });
      });

      return spy;
   };
}