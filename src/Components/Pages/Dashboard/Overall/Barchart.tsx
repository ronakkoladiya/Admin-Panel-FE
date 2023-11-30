import React from 'react';
import style from './Barchart.module.css';
import ReactApexChart from 'react-apexcharts';
interface BarchartProps {
  width: any;
  data: number[];
  categories: string[];
}
const Barchart: React.FC<BarchartProps> = ({ categories,width ,data,}) => {
  
  return (
    <>
      <ReactApexChart
        type="bar"
        width={width}
        height={230}
        series={[{ data : data }]}
        options={{
          xaxis: {
            categories: categories, 
            axisBorder: {
              show: false
          },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '10px',
              borderRadius: 5,
              colors: {
                ranges: [{
                  from: 1,
                  to: 9,
                  color: '#FE0F5E',
                }]
              },
              dataLabels: {
                 position: 'left',
              }
            }
          },
          
        }}
        className={style.chart_menu}
      />
    </>
  );
}

export default Barchart;





