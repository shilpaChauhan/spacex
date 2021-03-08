import { Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { LaunchService } from '../../service/launch.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.scss']
})
export class LaunchComponent implements OnInit {
  public launches = Array<any>();
  public uniqueLaunchYears = Array<any>();
  private filters = {
    launchStatus: "",
    landStatus: "",
    year: ""
  }
  

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private launchService: LaunchService,
    private router: Router,
  ) {
    if (isPlatformBrowser(this.platformId)) {
     this.getLaunchMethod();
    }
  }

  ngOnInit() {}

  getLaunchMethod() {
    this.launchService.getAllLaunches().subscribe((data) => {
      this.launches = data;
      this.uniqueLaunchYears = [...new Set(data.map((item: any) => item.launch_year))];
    });
  }

  filterLaunch(status: string): void {
    this.filters.launchStatus = status;
    this.router.navigate([""], {
      queryParams: this.getRouteObject(),
    });
    this.launchService.getFilteredLaunches(this.filters).subscribe((data) => {
      this.launches = data;
    });
  }

  filterLand(status: string): void {
    this.filters.landStatus = status;
    this.launchService
      .getFilteredLaunches(this.filters)
      .subscribe((data) => {
        this.launches = data;
        this.router.navigate([""], {
          queryParams: this.getRouteObject()
        });
      });
  }

  filterYear(year: any) {
    this.filters.year = year;
    this.router.navigate([""], {
      queryParams: this.getRouteObject()
    });
    this.launchService.getFilteredLaunches(this.filters).subscribe((data) => {
      this.launches = data;
    });
  }

  private getRouteObject()  {
    let routeParameters: any = {};
    routeParameters.limit = 100;
    if (this.filters.landStatus) {
      routeParameters['land_status'] = this.filters.landStatus;
    }
    if (this.filters.launchStatus) {
      routeParameters['launch_status'] = this.filters.launchStatus;
    }
    if (this.filters.year) {
      routeParameters['launch_year'] = this.filters.year;
    }
    
    return routeParameters;
  }

}
