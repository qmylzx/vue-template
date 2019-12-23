<template>
  <div class="app-container">
    <button @click="test">11</button>
    <grid-layout
      :layout="layout"
      :col-num="100"
      :col-width="100"
      :row-height="10"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="false"
      :margin="[10, 10]"
      :use-css-transforms="true"
      @layout-updated='this.layoutUpdatedEvent'
    >
      <grid-item v-for="item in layout"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 :key="item.i"
                 :id="-item.i"
                 @moved="movedEvent"
                 @resized="resizedEvent(arguments,item)"
                 ref="chartRef"
      >
        <div>
          <line-chart :id="item.i" :height=item.height :width=item.width :data="item.data" />
        </div>
      </grid-item>
    </grid-layout>
  </div>

</template>

<script>
  import VueGridLayout from 'vue-grid-layout'
  import Chart from '@/components/charts/line'
  import $ from 'jquery'
  import { getChartInfo } from '@/api/groups'

  export default {
    data() {
      return {
        layout: [
          //  { x: 0, y: 0, h: 17, w: 49, i: 1111, width: '538px', height: '320px',data:[99, 86, 57, 75, 345, 64, 55, 66, 120, 111, 132, 111]}
        ],
        chartInfo: {
          chartType: 's',
          i: 0,
          x: 0,
          y: 10,
          h: 17,
          w: 49,
          width: 538,
          height: 320
        }
      }
    },
    components: {
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem,
      lineChart: Chart
    },
    created() {
      getChartInfo().then(response => {
        return response.data
      }).then(data => {
        data.forEach(e => {
          console.log('------')
          console.log(data.data)
          this.layout.push({
            x: e.x,
            y: e.y,
            h: e.h,
            w: e.w,
            i: e.chartId + '',
            width: e.width,
            height: e.height,
            data: e.data
          })
          console.log('------')
        })

      })
    },
    mounted() {
    },
    methods: {
      test() {
        console.log('layoutUpdatedEvent' + this.layout.length)
        this.layout.push({ 'x': 8, 'y': 0, 'w': 2, 'h': 3, 'i': '411' })
        console.log('layoutUpdatedEvent' + this.layout.length)
      },
      movedEvent: function(i, newX, newY) { //todo store mysql
        console.log('MOVED chartId=' + i + ', X=' + newX + ', Y=' + newY)
      },
      layoutUpdatedEvent() {
        let array = this.layout
        let refs = this.$refs['chartRef']
        refs.forEach(ref => {
          let chartId = -ref.$refs.item.id
          console.log('chartId:[' + chartId + ']:[x:' + ref.x + ' y:' + ref.y + ' h:' + ref.h + ' w:' + ref.w + ' ]')
          console.log(ref)
        })
      },
      resizedEvent: function(args, currentChart) { //todo store mysql
        console.log('RESIZED chartId=' + args[0] + ', H=' + args[1] + ', W=' + args[2] + ', H(px)=' + args[3] + ', W(px)=' + args[4])
        currentChart.width = args[4] - 10 + 'px'
        currentChart.height = args[3] - 10 + 'px'
      }
    }
  }
</script>
<style scoped>

</style>
