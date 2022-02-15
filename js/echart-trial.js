var ROOT_PATH = '';

$( document ).ready(function() {
var chartDom = document.getElementById('echartzone');
var myChart = echarts.init(chartDom);
var option;

myChart.showLoading();
$.get(ROOT_PATH + '/json/topicsgraph.json', function (topicsgraph) {
  const categoryIndices = ["TargetNode", "TopicNode"];
  const graph = {
    categories: [{"name":"articles"},{"name":"topics"}],
    links: topicsgraph.edges.map((e) => { return {source:e[0], target:e[1]} }),
    nodes: topicsgraph.nodes.map((n) => { return {
        id:n[0]
      , name:n[0]
      , symbolSize: 15
      , category: categoryIndices.findIndex((t) => t == n[1].tag)
      } 
    }),
  }

  console.log(graph);

  myChart.hideLoading();
  option = {
    title: {
      text: 'blog map',
      subtext: 'Default layout',
      top: 'bottom',
      left: 'right'
    },
    tooltip: {},
    legend: [
      {
        // selectedMode: 'single',
        data: graph.categories.map(function (a) {
          return a.name;
        })
      }
    ],
    series: [
      {
        name: 'blog',
        type: 'graph',
        layout: 'force',
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        label: {
          position: 'right'
        },
        force: {
          repulsion: 100
        }
      }
    ]
  };
  myChart.setOption(option);
});

option && myChart.setOption(option);

});
