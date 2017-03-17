import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app.module";
/**
 * Created by anil on 3/8/17.
 */
const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);