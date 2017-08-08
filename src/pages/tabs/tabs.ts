import { ReportPage } from "./../report/report";
import { SettingPage } from "./../setting/setting";
import { Component } from "@angular/core";
import { LodgePage } from "../lodge/lodge";
import { Events } from "ionic-angular";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = LodgePage;
  tab2Root = ReportPage;
  tab3Root = SettingPage;

  unlodgeCount: number = 0;
  constructor(public events: Events) {
    events.subscribe("unlodge:count", (data) => {
      this.unlodgeCount = data;
    })
  }
}
