import { Component, OnInit } from '@angular/core';
import { HeatmapService } from '../heatmap.service';
import { Incident } from '../incident';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {

  incidents: Incident[];
  paginador: any;

  constructor(private heatmapService: HeatmapService,
  private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params=>{
    let page:number = +params.get('page');
    if(!page){
      page = 0
    }
    this.heatmapService.getIncidents(page).subscribe(
        response => {
          this.incidents = response.content as Incident[];
          this.paginador = response;
        });
  });

  }

}
