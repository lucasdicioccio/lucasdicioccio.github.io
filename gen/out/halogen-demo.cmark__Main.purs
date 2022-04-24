module Main where

import Prelude

import Affjax as AX
import Affjax.ResponseFormat as ResponseFormat
import Data.Argonaut.Core as J
import Data.Codec.Argonaut as CA
import Data.Either (Either(..))
import Data.Maybe (Maybe(..),fromMaybe)
import Effect (Effect)
import Effect.Aff (Aff)
import Effect.Aff.Class (class MonadAff)
import Effect.Class.Console (log)
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP
import Halogen.VDom.Driver (runUI)
import Web.DOM.ParentNode (QuerySelector(..))


type Routes = Array String

decodeStringArray :: J.Json -> Either CA.JsonDecodeError Routes
decodeStringArray = CA.decode (CA.array CA.string)

fetchRoutes :: Aff (Maybe Routes)
fetchRoutes = do
  res <- AX.get ResponseFormat.json "/json/paths.json" 
  case res of
    Left err -> do
      log $ "failed: " <> AX.printError err
      pure Nothing
    Right rsp -> do
      let routes = decodeStringArray rsp.body
      case routes of 
         Left err -> do
           log $ "failed: " <> show err
           pure Nothing
         Right val -> pure $ Just val

main :: Effect Unit
main = HA.runHalogenAff do
  body <- HA.awaitBody
  routes <- H.liftAff fetchRoutes
  elem <- HA.selectElement (QuerySelector "#halogen-routes")
  let tgt = fromMaybe body elem
  runUI component {routes: fromMaybe [] routes} tgt

type Action = Unit

data Query a = Query a

type Input =
  { routes :: Array String
  }

type Output = Unit

type State =
  { routes :: Array String
  }

component
  :: forall m. MonadAff m
  => H.Component Query Input Output m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
    }
  where

  initialState input = { routes: input.routes }

  render state =
    HH.div_
      [ renderRoutes state.routes
      ]

  renderRoutes rts =
      HH.ul
      [ HP.class_ (HH.ClassName "routes-list")
      ]
      $ map renderRoute
      $ rts

  renderRoute r =
      HH.li
      [ HP.class_ (HH.ClassName "routes-list-item")
      ]
      [ HH.a
        [ HP.href r
        , HP.class_ (HH.ClassName "link")
        ]
        [ HH.text r
        ]
      ]
