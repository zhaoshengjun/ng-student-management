import { PeriodModalPage } from "./../pages/period-modal/period-modal";
import { LodgeDetailPage } from "./../pages/lodge-detail/lodge-detail";
import { StudentModalPage } from "./../pages/student-modal/student-modal";
import { SettingPage } from "./../pages/setting/setting";
import { ReportPage } from "./../pages/report/report";
import { LodgePage } from "./../pages/lodge/lodge";
import { SignupPage } from "./../pages/signup/signup";
import { LoginPage } from "./../pages/login/login";
import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { TabsPage } from "../pages/tabs/tabs";
import { LoadingPage } from "./../pages/loading/loading";
import { HttpModule } from "@angular/http";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { DataService } from "../share/data-service";
import { LodgeFormPage } from "../pages/lodge-form/lodge-form";
import { EmailComposer } from "@ionic-native/email-composer";
import { CallNumber } from "@ionic-native/call-number";
import { SMS } from "@ionic-native/sms";
import { ExcelService } from "../share/excel-service";

export const firebaseConfig = {
  apiKey: "AIzaSyCETsqdUtSsWkz4oCP8_EsM3mbeDlfscKQ",
  authDomain: "unilodge-6fd12.firebaseapp.com",
  databaseURL: "https://unilodge-6fd12.firebaseio.com",
  projectId: "unilodge-6fd12",
  storageBucket: "unilodge-6fd12.appspot.com",
  messagingSenderId: "550368336024"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    LodgePage,
    ReportPage,
    SettingPage,
    StudentModalPage,
    LoadingPage,
    LodgeFormPage,
    LodgeDetailPage,
    PeriodModalPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      mode: "md",
      iconMode: "md",
      pageTransition: "md-transition"
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    LodgePage,
    ReportPage,
    SettingPage,
    StudentModalPage,
    LoadingPage,
    LodgeFormPage,
    LodgeDetailPage,
    PeriodModalPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EmailComposer,
    CallNumber,
    SMS,
    ExcelService,
    DataService
  ]
})
export class AppModule { }
