var ROOT_PATH = '';

$( document ).ready(function() {
var chartDom = document.getElementById('echartzone');
var myChart = echarts.init(chartDom);
var option;

myChart.showLoading();
$.get(ROOT_PATH + '/json/topicsgraph.json', function (topicsgraph) {
  const categoryIndices = ["ArticleNode", "TopicNode", "ImageNode"];
  const sizeFor = (node) => {
    switch (node[1]?.tag) {
      case "ArticleNode":
        return 10 + Math.log(node[1].contents[1]) / Math.log(2);
      case "TopicNode":
        return 10;
      default:
        return 5;
    }
  };
  const indexArticleRef = "article:/index.html";
  const graph = {
    categories: [{"name":"articles"},{"name":"topics"},{"name":"images"}],
    links: topicsgraph.edges
      .filter((e) => { return e[0] !== indexArticleRef && e[1] !== indexArticleRef })
      .map((e) => { return {source:e[0], target:e[1]} }),
    nodes: topicsgraph.nodes
      .filter((n) => { return n[0] !== indexArticleRef })
      .map((n) => { return {
        id: n[0]
      , name: n[0]
      , symbolSize: sizeFor(n)
      , category: categoryIndices.findIndex((t) => t == n[1].tag)
      } 
    }),
  }

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

  myChart.on('click', function(params) {
    if (params.componentType === 'series') {
      if (params.dataType === 'node') {
	const n = topicsgraph.nodes[params.dataIndex];
	switch (n[1].tag) {
          case "ArticleNode": {
	    const url = n[1].contents[0];
            window.open(url, '_blank');
            break;
          }
          case "ImageNode": {
	    const url = n[1].contents;
            window.open(url, '_blank');
            break;
	  }
          case "TopicNode": {
	    const topic = n[0].split(':',2)[1];
	    const urlTopic = topic.replace(/\s/g, '-');
            const url = `/topics/${urlTopic}.html`
            window.open(url, '_blank');
            break;
	  }
	}
      }
    }
  });
});

option && myChart.setOption(option);

});
