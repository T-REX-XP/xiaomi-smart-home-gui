import { Component, OnInit } from '@angular/core';
import { XiaomiEvent } from "../../models/xiaomi_event";
import { BreadcrumbService } from "../../services/breadcrumb.service";
import { XiaomiEventService } from "../../services/data/xiaomi_event.service";
import { XiaomiDeviceService } from "../../services/data/xiaomi_device.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public date: Date = new Date();

  public last_events : Array<XiaomiEvent> = [];
  public event_by_day: any;
  public dates : Array<string> = [];

  constructor(
    private _bread_serv: BreadcrumbService,
    private _events: XiaomiEventService,
    private _devices: XiaomiDeviceService
  ) { }

  ngOnInit() {
    //on charge les devices
    this._devices.getAll().subscribe((devices) => {
      console.log(devices);
    });

    //on ecoute le service rest
    this._events.getAll().subscribe((all) => {
      this.last_events = all;

      //tri des données par jours
      this.event_by_day = {};
      console.log(this.last_events);
      this.last_events.forEach((event)=>{
        let date: Date = new Date(event.date);
        let day = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        if(typeof this.event_by_day[day] === "undefined"){
          this.event_by_day[day] = [];
          this.dates.push(day);
        }
        this.event_by_day[day].push(event);

      });
      console.log(this.event_by_day);
      //this.dates = this.dates.unique();
    });

    //on place le header
    this._bread_serv.set({
      display: false,
      header : "Timeline",
      description: "Activité de la maison",
      levels: [
        {
          title: "Timeline",
          link: "/",
          icon: "clock-o"
        }
      ]
    });


  }

  ngOnDestroy(){
    this._bread_serv.clear();
  }

}
