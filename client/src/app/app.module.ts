import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTreeModule } from "@angular/material/tree";

import { AppComponent } from "./app.component";
import { ContainerComponent } from "./container/container.component";
import { ErrorComponent } from "./error/error.component";
import { LoadingComponent } from "./loading/loading.component";
import { MainComponent } from "./main/main.component";
import { SelectClassComponent } from "./select-class/select-class.component";
import { SpellsFilterPipe } from "./shared/spells-filter.pipe";
import { ComponentsInfoComponent } from "./components-info/components-info.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { SignupFormComponent } from "./signup-form/signup-form.component";

@NgModule({
  declarations: [
    AppComponent,
    ComponentsInfoComponent,
    ContainerComponent,
    ErrorComponent,
    LoadingComponent,
    MainComponent,
    SelectClassComponent,
    SpellsFilterPipe,
    LoginFormComponent,
    SignupFormComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ComponentsInfoComponent,
    LoginFormComponent,
    SignupFormComponent
  ]
})
export class AppModule {}
