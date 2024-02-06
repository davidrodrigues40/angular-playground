import { Component } from '@angular/core';

@Component({
   selector: "app-base-footer",
   template: `
   <div class="footer">
      <ng-content></ng-content>
   </div>`,
   standalone: true,
   styleUrls: ["./base-footer.component.scss"]
})
export class BaseFooter { }