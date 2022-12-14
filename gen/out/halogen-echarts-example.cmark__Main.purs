module Main where

import Prelude

import Effect (Effect)
import Effect.Aff.Class (class MonadAff)
import Data.Maybe (Maybe(..), fromMaybe)
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
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

component
  :: forall query output m. MonadAff m
  => H.Component query DemoInput output m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
    }
  where
    initialState arg = fromMaybe "" arg.example
    render = case _ of
      "0" -> render0
      "1" -> render1
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
      [ HH.text "echarts simple-line example"
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
      [ HH.text "echarts simple-line example with two data-lines"
      , HH.slot_ _echarts unit ECharts.component {options: obj, modified:false}
      ]

main :: Effect Unit
main = mainWithDataArg \arg -> do
  let selector = case arg of
                  Just "0" -> "#example-0"
                  Just "1" -> "#example-1"
                  _ -> "#example-err"
  HA.runHalogenAff do
    body <- HA.awaitBody
    elem <- HA.selectElement (QuerySelector selector)
    let tgt = fromMaybe body elem
    runUI component {example: arg} tgt
