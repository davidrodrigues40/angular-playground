export abstract class SignalService
{
   protected abstract readonly details: {
      methods: { [k: string]: Function };
   }
   dispatch(name: string): void
   {
      if (this.details.methods[name]) this.details.methods[name]();
   }

}