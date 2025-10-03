import { Component, input, OnInit, effect } from '@angular/core';
import { HighchartsChartComponent, ChartConstructorType } from 'highcharts-angular';
import { EmissionsTimeSeries } from '../../models/emissions-time-series';

@Component({
  selector: 'app-emissions-chart',
  imports: [HighchartsChartComponent],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
})
export class Chart implements OnInit {
  chartOptions!: Highcharts.Options;
  chartConstructor: ChartConstructorType = 'chart';
  updateFlag: boolean = false;
  oneToOneFlag: boolean = true;

  readonly vesselName = input.required<string>();
  readonly emissionsData = input.required<EmissionsTimeSeries[] | null>();

  constructor() {
    // React to changes in inputs
    effect(() => {
      const data = this.emissionsData();
      const vesselName = this.vesselName();
      if (data && vesselName) {
        this.updateChart(data, vesselName);
      }
    });
  }

  ngOnInit(): void {
    this.initializeChart();
  }

  private initializeChart() {
    const data = this.emissionsData();
    const vesselName = this.vesselName();

    if (data && vesselName) {
      this.updateChart(data, vesselName);
    } else {
      // Default empty chart
      this.chartOptions = {
        title: { text: `${vesselName || 'Unknown Vessel'} Emissions` },
        series: [],
      };
    }
  }

  private updateChart(data: EmissionsTimeSeries[], vesselName: string) {
    // Prepare data with proper timestamp format for Highcharts
    const prepareSeriesData = (extractValue: (d: EmissionsTimeSeries) => number) => {
      return data.map((d) => ({
        x: new Date(d.report_from_utc).getTime(),
        y: extractValue(d),
      }));
    };

    this.chartOptions = {
      title: {
        text: `${vesselName} Emissions`,
        style: { color: '#ffffff', fontSize: '18px' }
      },
      chart: {
        spacingTop: 30,
        spacingRight: 60,
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
          stops: [
            [0, '#4a6fa5'], // Light blue (top-left)
            [1, '#1a2332'], // Dark blue (bottom-right)
          ],
        },
        type: 'line',
        borderWidth: 2,
        borderColor: '#000000',
        plotBorderWidth: 1,
        plotBorderColor: '#ffffff',
        plotBackgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
      xAxis: [
        {
          type: 'datetime',
          labels: {
            style: { color: '#cccccc' },
            format: '{value:%e %b}',
          },
          gridLineColor: 'rgba(30, 41, 56, 0.5)',
          gridLineWidth: 1,
          tickInterval: 14 * 24 * 3600 * 1000, // 14 days in milliseconds
          tickColor: '#ffffff',
          tickWidth: 1,
          lineColor: '#ffffff',
          lineWidth: 1,
        },
        {
          type: 'datetime',
          opposite: true,
          labels: {
            enabled: false,
          },
          lineColor: '#ffffff',
          lineWidth: 1,
          tickLength: 0,
        },
      ],
      yAxis: {
        title: {
          text: 'Values',
          style: { color: '#cccccc' },
        },
        labels: {
          style: { color: '#cccccc' },
          format: '{value:.0f}',
        },
        gridLineColor: 'rgba(30, 41, 56, 0.5)',
        gridLineWidth: 1,
        allowDecimals: false,
        tickInterval: 1,
        tickColor: '#ffffff',
        tickWidth: 1,
        lineColor: '#ffffff',
        lineWidth: 1,
      },
      legend: {
        backgroundColor: '#000000',
        itemStyle: {
          color: '#cccccc',
          lineHeight: '30px',
        },
        itemHoverStyle: { color: '#ffffff' },
        itemMarginTop: 0,
        itemMarginBottom: 0,
        symbolWidth: 0,
        useHTML: true,
        labelFormatter: function () {
          // Choose symbol type per series
          let symbol = '●'; // Unicode or inline SVG; change based on series
          if (this.name === 'NOx') symbol = '◆';
          else if (this.name === 'PM') symbol = '■';
          else if (this.name === 'SOx') symbol = '▲';

          // Style line and center symbol above line
          return `
      <div style="display:flex;align-items:center;height:15px;padding-right:8px;">
        <span style="border-bottom:2px solid ${this.color};width:24px;position:relative;display:inline-block;height:1px;margin:auto 0;">
          <span style="position:absolute;left:50%;top:50%;transform:translateX(-50%) translateY(calc(-50% + 1px)); font-size:10px; color:${this.color};line-height:1;">${symbol}</span>
        </span>
        <span style="margin-left:8px;line-height:20px;">${this.name}</span>
      </div>
    `;
        },
      },
      tooltip: {
        backgroundColor: '#2a2a2a',
        style: { color: '#ffffff' },
        shared: false,
        useHTML: true,
        formatter: function () {
          let symbol = '●'; // default circle

          // Match the symbol based on series name
          if (this.series.name === 'NOx') {
            symbol = '◆'; // diamond
          } else if (this.series.name === 'PM') {
            symbol = '■'; // square
          } else if (this.series.name === 'SOx') {
            symbol = '▲'; // triangle
          }

          const date = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }).format(new Date(this.x || 0));

          return `<b>${date}</b><br/>
                  <span style="color:${this.color}">${symbol}</span> ${this.series.name}: <b>${this.y?.toFixed(2)}</b>`;
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false,
          },
          enableMouseTracking: true,
          marker: {
            enabled: false,
            enabledThreshold: 0,
            states: {
              hover: {
                enabled: true,
                radius: 4,
              },
            },
          },
        },
        series: {
          lineWidth: 2,
          showInLegend: true,
        },
      },
      series: [
        {
          name: 'Methane',
          data: prepareSeriesData((d) => d.ch4_emissions),
          color: '#ffeaa7',
          type: 'line',
          marker: {
            symbol: 'circle',
          },
        },
        {
          name: 'NOx',
          data: prepareSeriesData((d) => d.nox_emissions),
          color: '#4caf50',
          type: 'line',
          marker: {
            symbol: 'diamond',
          },
        },
        {
          name: 'PM',
          data: prepareSeriesData((d) => d.pm_emissions),
          color: '#ff6666',
          type: 'line',
          marker: {
            symbol: 'square',
          },
        },
        {
          name: 'SOx',
          data: prepareSeriesData((d) => d.sox_emissions),
          color: '#4ecdc4',
          type: 'line',
          marker: {
            symbol: 'triangle',
          },
        },
      ],
    };

    this.updateFlag = true;
  }
}
