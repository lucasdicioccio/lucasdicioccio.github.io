var ROOT_PATH = '';

$( document ).ready(function() {
var chartDom = document.getElementById('histogram');
var myChart = echarts.init(chartDom);
var option;

const jsonSrc = document.getElementsByName('ks:article_json')[0].content;

myChart.showLoading();
$.get(jsonSrc, function (articlejson) {
  myChart.hideLoading();
  option = {
    title: {
      text: 'article histogram',
      subtext: 'words per paragraph',
      top: 'bottom',
      left: 'right'
    },
    tooltip: {},
    xAxis: {
        data: articlejson.histogram.map((_,i) => i),
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'words',
        type: 'bar',
        data: articlejson.histogram,
      }
    ]
  };
  myChart.setOption(option);
});

option && myChart.setOption(option);

});

