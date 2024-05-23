import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-alert-chart',
  standalone: true,
  imports: [],
  templateUrl: './alert-chart.component.html',
  styleUrl: './alert-chart.component.css'
})
export class AlertChartComponent {

  constructor(private dashboardService: DashboardService) {}
  public thing_id = 0;  

  public xAxisLabels: string[] = ['Alert simple','Anomalie degré simple','Anomalie degré Moyen'];
  public yAxisData: string[] = [];


  public xAxisLabels2: string[] = ['tttt'];
  public yAxisData2: number[] = [];

  public xAxisLabels3: string[] = ['ttt'];
  public yAxisData3: number[] = [];

  public xAxisLabels4: string[] = ['t'];
  public yAxisData4: number[] = [];

  public chart: any;
  public chart2: any;



  ngOnInit(): void {
    this.createChart();
    this.getDataFromApi(this.thing_id);
  }



  createChart() {
 
    this.chart = new Chart('MyChart5', {
      type: 'bar',
      data: {
        labels: this.xAxisLabels,
        datasets: [
          {
            label: 'Number of alerts',
            data: this.yAxisData,
            backgroundColor: 'rgba(4, 120, 228, 0.871)',
          },

        ]
      },
      options: {
        aspectRatio: 2.5,
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    });



    this.chart2 = new Chart('MyChart6', {
      type: 'line',
      data: {
        labels: this.xAxisLabels2,
        datasets: [
          {
            label: 'Alerte simple',
            data: this.yAxisData2,
            backgroundColor: 'rgba(4, 120, 228, 0.871)',
          },
          {
            label: 'Anomalie degré simple',
            data: this.yAxisData3,
            backgroundColor: 'rgb(244, 66, 66)',
          },
          {
            label: 'Anomalie degré moyen',
            data: this.yAxisData4,
            backgroundColor: 'rgba(252, 224, 255, 0.829)',
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: false
          }
        }
      }
    });

  }


  getDataFromApi(thing_id: number) {
    
    this.dashboardService.getAlerts(thing_id).subscribe((data: any) => {
      

      this.xAxisLabels = data[0];
      this.chart.data.datasets[0].data = data[1];
      this.chart.update();



    


    //  second


    this.dashboardService.getNumOfAlrersSimpleYear(thing_id).subscribe((data: any) => {


        
      
      this.xAxisLabels2 = data[0];      
      this.yAxisData2 = data[1];

      if(data[1].length == 0){
        this.yAxisData2 = [0];
      }

      this.chart.data.labels = data[0];
      this.chart2.data.datasets[0].data = this.yAxisData2 ;
      this.chart2.update();
    }
    );




    this.dashboardService.getNumOfAlertsMeduimYear(thing_id).subscribe((data: any) => {
          
  
      this.xAxisLabels3 = data[0];
      this.yAxisData3 = data[1];
      this.chart2.data.labels = data[0];
      this.chart2.data.datasets[1].data = data[1];
      this.chart2.update();
    }
    );

      this.dashboardService.getNumOfAlertsHighYear(thing_id).subscribe((data: any) => {
      this.xAxisLabels4 = data[0];
      this.yAxisData4 = data[1];
      this.chart2.data.labels = data[0];
      this.chart2.data.datasets[2].data = data[1];
      this.chart2.update();
    }
    );



  
      
    });
  }


  updateDashboard(mode:string,thing_id:any,group_id:any,type_id:any,year?:number,month?:number) {




    // return;
    
    this.dashboardService.getAlerts(thing_id,type_id,group_id).subscribe((data: any) => {


      
      // this.xAxisLabels = data[0];
  // public xAxisLabels: string[] = ['Alert simple','Anomalie degré simple','Anomalie degré Moyen'];
      this.chart.data.labels = ['Alert simple','Anomalie degré simple','Anomalie degré Moyen']; 
      this.chart.data.datasets[0].data = data[1];
      this.chart.update();
    });





    if(mode=='yearly') {





      this.dashboardService.getNumOfAlrersSimpleYear(thing_id,group_id,type_id).subscribe((data: any) => {

        

        
        this.xAxisLabels2 = data[0];
        this.yAxisData2 = data[1];

        if(data[1].length == 0){
          this.yAxisData2 = [0];
        }


        this.chart2.data.labels = data[0];
        this.chart2.data.datasets[0].data = this.yAxisData2;
        this.chart2.update();
      });

      this.dashboardService.getNumOfAlertsMeduimYear(thing_id,group_id,type_id).subscribe((data: any) => {
        this.xAxisLabels3 = data[0];
        this.yAxisData3 = data[1];

        if(data[1].length == 0){
          this.yAxisData2 = [0];
        }


        this.chart2.data.labels = data[0];
        this.chart2.data.datasets[1].data = data[1];
        this.chart2.update();
      });

      this.dashboardService.getNumOfAlertsHighYear(thing_id,group_id,type_id).subscribe((data: any) => {


        this.xAxisLabels4 = data[0];
        this.yAxisData4 = data[1];
        
        if(data[1].length == 0){
          this.yAxisData2 = [0];
        }


        this.chart2.data.labels = data[0];
        this.chart2.data.datasets[2].data = data[1];
        this.chart2.update();
        
      
      });

      
    
    }
    
    else if(mode=='monthly') {

    


      this.dashboardService.getNumOfAlrersSimpleMonth(thing_id,group_id,type_id,year as number).subscribe((data: any) => {
        this.xAxisLabels2 = data[0];
        this.yAxisData2 = data[1];
        if(data[1].length == 0){
          this.yAxisData2 = [0];
        }

        this.chart2.data.labels = data[0];
        this.chart2.data.datasets[0].data = this.yAxisData2;
        this.chart2.update();
      });

      this.dashboardService.getNumOfAlertsMeduimMonth(thing_id,group_id,type_id,year as number).subscribe((data: any) => {
        
        this.xAxisLabels3 = data[0];
        this.yAxisData3 = data[1];
        if(data[1].length == 0){
          this.yAxisData2 = [0];
        }

        this.chart2.data.labels = data[0];
        this.chart2.data.datasets[1].data = data[1];
        this.chart2.update();
      });

      this.dashboardService.getNumOfAlertsHighMonth(thing_id,group_id,type_id,year as number).subscribe((data: any) => {
        this.xAxisLabels4 = data[0];
        this.yAxisData4 = data[1];
        if(data[1].length == 0){
          this.yAxisData2 = [0];
        }

        this.chart2.data.labels = data[0];
        this.chart2.data.datasets[2].data = data[1];
        this.chart2.update();
        
      });
    }

    else if(mode=='daily') {



      this.dashboardService.getNumOfAlrersSimpleDay(thing_id,year as number,month as number,group_id,type_id,).subscribe((data: any) => {

   

        this.xAxisLabels2 = data[0];
        this.yAxisData2 = data[1];
       
        this.chart2.data.labels = data[0];
        this.chart2.data.datasets[0].data = data[1];
        console.log('Simple alert data');
        console.log(this.chart2.data.labels, this.chart2.data.datasets[0].data);

        
        this.chart2.update();
      });

      this.dashboardService.getNumOfAlertsMeduimDay(thing_id,year as number,month as number,group_id,type_id).subscribe((data: any) => {


        this.xAxisLabels3 = data[0];
        this.yAxisData3 = data[1];
     
        this.chart2.data.labels = data[0];
        this.chart2.data.datasets[1].data = data[1];
        this.chart2.update();
      });

      this.dashboardService.getNumOfAlertsHighDay(thing_id,year as number,month as number,group_id,type_id).subscribe((data: any) => {

       


        this.xAxisLabels4 = data[0];
        this.yAxisData4 = data[1];
       

        this.chart2.data.labels = data[0];
        this.chart2.data.datasets[2].data = data[1];
        this.chart2.update();
      });
    }


  }


}
