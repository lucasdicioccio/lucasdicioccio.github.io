module Main where

import Prelude

import Effect (Effect)
import Effect.Aff.Class (class MonadAff)
import Data.Maybe (fromMaybe)
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.VDom.Driver (runUI)
import Type.Proxy (Proxy(..))
import Halogen.ECharts as ECharts 
import Web.DOM.ParentNode (QuerySelector(..))

type Slots =
  ( echarts :: forall query output. H.Slot query output Unit 
  )
_echarts = Proxy :: Proxy "echarts"

type Options =
  { xAxis :: { type :: String, data :: Array String }
  , yAxis :: { type :: String }
  , series :: Array { data :: Array Int, type :: String }
  }

type Output = {}
  
component
  :: forall query input output m. MonadAff m
  => H.Component query input output m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
    }
  where
    initialState _ = unit
    render _ =
      let
        obj :: Options
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

main :: Effect Unit
main = do
  HA.runHalogenAff do
    body <- HA.awaitBody
    elem <- HA.selectElement (QuerySelector "#example")
    let tgt = fromMaybe body elem
    runUI component {} tgt
