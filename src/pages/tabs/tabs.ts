import { ReportPage } from "./../report/report";
import { SettingPage } from "./../setting/setting";
import { Component } from "@angular/core";
import { LodgePage } from "../lodge/lodge";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = LodgePage;
  tab2Root = ReportPage;
  tab3Root = SettingPage;

  constructor() {}
}
