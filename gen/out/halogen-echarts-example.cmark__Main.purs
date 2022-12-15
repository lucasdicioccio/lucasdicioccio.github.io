module Main where

import Prelude

import Effect (Effect)
import Effect.Aff.Class (class MonadAff)
import Data.Int as Int
import Data.Maybe (Maybe(..), fromMaybe)
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP
import Halogen.HTML.Events as HE
import Halogen.VDom.Driver (runUI)
import Type.Proxy (Proxy(..))
import Halogen.ECharts as ECharts 
import Web.DOM.ParentNode (QuerySelector(..))
import HumDrum (mainWithDataArg)

type Slots =
  ( echarts :: forall query output. H.Slot query output Unit 
  )
_echarts = Proxy :: Proxy "echarts"

type SimpleExampleOptions =
  { xAxis :: { type :: String, data :: Array String }
  , yAxis :: { type :: String }
  , series :: Array { data :: Array Int, type :: String }
  }

type DemoInput = { example :: Maybe String }

data DemoAction
  = SetChart2Offset String

component
  :: forall query output m. MonadAff m
  => H.Component query DemoInput output m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
      { handleAction = handleAction
      }
    }
  where
    initialState arg = {chartkey: fromMaybe "" arg.example, chart2Offset: 5}
    render state = case state.chartkey of
      "0" -> render0
      "1" -> render1
      "2" -> render2 state.chart2Offset
      _ -> render0

    render0 =
      let
        obj :: SimpleExampleOptions
        obj =
          { xAxis: {type: "category", data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          , yAxis: {type: "value"}
          , series: [{type: "line", data: [150, 230, 224, 218, 135, 147, 260]}]
          }
      in
      HH.div_
      [ HH.p_ [ HH.text "echarts simple-line example" ]
      , HH.slot_ _echarts unit ECharts.component {options: obj, modified:false}
      ]

    render1 =
      let
        obj :: SimpleExampleOptions
        obj =
          { xAxis: {type: "category", data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          , yAxis: {type: "value"}
          , series:
            [{type: "line", data: [150, 230, 224, 218, 135, 147, 260]}
            ,{type: "line", data: [250, 130, 254, 318, 137, 247, 160]}
            ]
          }
      in
      HH.div_
      [ HH.p_ [ HH.text "echarts simple-line example with two data-lines" ]
      , HH.slot_ _echarts unit ECharts.component {options: obj, modified:false}
      ]

    render2 offset =
      let
        ys = [150, 230, 224, 218, 135, 147, 260]
        obj :: SimpleExampleOptions
        obj =
          { xAxis: {type: "category", data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          , yAxis: {type: "value"}
          , series:
            [{type: "line", data: ys }
            ,{type: "line", data: map (\v -> v + offset) ys}
            ]
          }
      in
      HH.div_
      [ HH.p_ [ HH.text "echarts simple-line example with an offset" ]
      , HH.p_ [ HH.text "we update the offset with the value in the input below:" ]
      , HH.input
        [ HP.type_ HP.InputNumber
        , HP.value $ show offset
        , HE.onValueInput SetChart2Offset
        ]
      , HH.slot_ _echarts unit ECharts.component {options: obj, modified:true}
      ]

    handleAction = case _ of
     SetChart2Offset str -> do
       case Int.fromString str of
         Nothing -> pure unit
         Just n -> H.modify_ _ { chart2Offset = n }


main :: Effect Unit
main = mainWithDataArg \arg -> do
  let selector = case arg of
                  Just "0" -> "#example-0"
                  Just "1" -> "#example-1"
                  Just "2" -> "#example-2"
                  _ -> "#example-err"
  HA.runHalogenAff do
    body <- HA.awaitBody
    elem <- HA.selectElement (QuerySelector selector)
    let tgt = fromMaybe body elem
    runUI component {example: arg} tgt
