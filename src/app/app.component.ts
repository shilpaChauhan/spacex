import { Component, OnInit } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private title: Title,
    private meta: Meta) { }

  ngOnInit() {
    this.title.setTitle("SpacesX Launche Programs");
    this.meta.addTag({ keywords: "Single Page Application, Angular 11" });
    this.meta.addTag({
      description: "Single page application in angular 11",
    });
  }
}
