import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {User} from "../../../auth/models/user";
import {HttpErrorResponse} from "@angular/common/http";
import {MovieService} from "../../../service/movie.service";
import {Movie} from "../../../interface/movie";

import {
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexMarkers,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStates,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from 'ng-apexcharts';
import {ArtistService} from "../../../service/artist.service";

export interface ChartOptions2 {
  // Apex-non-axis-chart-series
  series?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  stroke?: ApexStroke;
  tooltip?: ApexTooltip;
  dataLabels?: ApexDataLabels;
  fill?: ApexFill;
  colors?: string[];
  legend?: ApexLegend;
  labels?: any;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  markers?: ApexMarkers[];
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  states?: ApexStates;
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnalyticsComponent implements OnInit {
  @ViewChild('apexDonutChartRef') apexDonutChartRef: any;

  public apexDonutChart: Partial<ChartOptions2>;

  public artists;

  public projections;

  public users;
  public sortedUsers;


  public movies;
  public sortedMovies;

  public genresChartData

  chartColors = {
    column: {
      series1: '#826af9',
      series2: '#d2b0ff',
      bg: '#f8d3ff'
    },
    success: {
      shade_100: '#7eefc7',
      shade_200: '#06774f'
    },
    donut: {
      series1: '#ffe700',
      series2: '#00d4bd',
      series3: '#826bf8',
      series4: '#2b9bf4',
      series5: '#FFA1A1'
    },
    area: {
      series3: '#a4f8cd',
      series2: '#60f2ca',
      series1: '#2bdac7'
    }
  };

  constructor(private _usersService: UserService, private _movieService: MovieService,
              private _artistsService: ArtistService,
              //private _projectionsService: ProjectionService
  ) {

  }

  ngOnInit(): void {
    this.getAllUsers()
    this.getAllMovies()
    this.getAllArtists()
    this.getAllProjections()

  }

  public getAllMovies(): void {
    this._movieService.getAllMovies().subscribe(
      (response: Movie[]) => {

        this.movies = response;
        this.sortedMovies = this.movies.sort((a, b) => a.id > b.id ? -1 : a.id < b.id ? 1 : 0).slice(0, 5)


        this.genresChartData = this.groupBy(this.movies, movie => movie.genre.title)
        //console.log(this.genresChartData.values().map())


        this.apexDonutChart = {
          series: Array.from(this.genresChartData.values()).map((array: []) => {
            return array.length
          }),
          chart: {
            height: 350,
            type: 'donut'
          },
          colors: [],
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '2rem',
                    fontFamily: 'Montserrat'
                  },
                  value: {
                    fontSize: '1rem',
                    fontFamily: 'Montserrat',
                    formatter: (val) => {
                      return parseInt(val) + ' movies';
                    }
                  }
                }
              }
            }
          },
          legend: {
            show: true,
            position: 'bottom'
          },
          labels: Array.from(this.genresChartData.keys()),
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  height: 300
                },
                legend: {
                  position: 'bottom'
                }
              }
            }
          ]
        };
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  getAllArtists() {
    this._artistsService.getAllArtists().subscribe(
      (response: []) => {
        this.artists = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getAllProjections() {
    // this._projectionsService().getAll().subscribe(
    //   (response) => {
    //     this.projections = response;
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.log(error);
    //   }
    // );
    this.projections = [{}, {}, {}];
  }

  public getAllUsers(): void {
    this._usersService.getUsers().subscribe(
      (response: User[]) => {
        response.map((user: any) => {
          user.fullName = user.firstName + ' ' + user.lastName;
          return user;
        });
        this.users = response;


        this.sortedUsers = this.users.sort((a, b) => {
          return +new Date(a.joinDate) - +new Date(b.joinDate);
        }).reverse().slice(0, 5)
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
}
