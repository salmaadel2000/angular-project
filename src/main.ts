import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { APP_ROUTES } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [APP_ROUTES, provideHttpClient()]
}).catch(err => console.error(err));
