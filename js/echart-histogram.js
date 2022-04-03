var ROOT_PATH = '';

$( document ).ready(function() {
var chartDom = document.getElementById('histogram');
var myChart = echarts.init(chartDom);
var option;

const jsonSrc = document.getElementsByName('ks:article_json')[0].content;

myChart.showLoading();
$.get(jsonSrc, function (articlejson) {
  myChart.hideLoading();
  const slitems = articlejson.skyline.skylineItems;
  const newSeries = (name) => { return { name: name, type: 'bar', stack: 'one', data: new Array(slitems.length) } };
  let series = [newSeries('total'), newSeries('incipit')];
  const offsetSeries = series[0];
  let currentSeries = series[1];
  let cumulativeSum = 0;
  slitems.forEach((item,idx) => {
    offsetSeries.data[idx] = cumulativeSum;
    if (item.tag == 'HeaderMark') {
      const title = item.contents[0];
      const heading = item.contents[1].reduce((c,x) => `${x}.${c}`, '');
      const s = newSeries(`${heading} ${title}`);
      series.push(s);
      currentSeries = s;
    }
    if (item.tag == 'TextualMark') {
      const val = item.contents[0];
      cumulativeSum += val;
      currentSeries.data[idx] = val;
    }
  });

  offsetSeries.itemStyle = {'borderColor': 'transparent', color: 'transparent'};
  offsetSeries.emphasis = {'itemStyle':  {'borderColor': 'transparent', color: 'transparent'}};

  option = {
    title: {
      text: 'article histogram',
      subtext: 'words per paragraph',
      top: 'bottom',
      left: 'right'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'shadow'},
    },
    xAxis: {
        name: 'cmark chunk',
        data: slitems.map((_,i) => i),
        silent: true,
    },
    yAxis: {
      name: 'total words',
      type: 'value'
    },
    series: series,
  };
  myChart.setOption(option);
});

option && myChart.setOption(option);

});

