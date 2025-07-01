import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './hoof/hoof.config';
import { AppComponent } from './hoof/hoof.component';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
