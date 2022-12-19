import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer
  ) {
    [
      'notification',
      'action',
      'alert',
      'communication',
      'device',
      'file',
      'image',
      'social',
      'toggle',
      'navigation',
    ].map((url) =>
      matIconRegistry.addSvgIconSet(
        sanitizer.bypassSecurityTrustResourceUrl(
          `mat-icons/svg-sprite-${url}.svg`
        )
      )
    );
  }
}
