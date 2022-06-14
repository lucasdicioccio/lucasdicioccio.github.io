(() => {
  // output/Main/foreign.js
  var tabUrl = (f) => () => function() {
    if (typeof chrome === "undefined")
      return;
    if (chrome && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var url = new URL(tabs[0].url);
        f(url.protocol + "//" + url.host)();
      });
    }
  }();

  // output/Control.Apply/foreign.js
  var arrayApply = function(fs) {
    return function(xs) {
      var l2 = fs.length;
      var k = xs.length;
      var result = new Array(l2 * k);
      var n = 0;
      for (var i2 = 0; i2 < l2; i2++) {
        var f = fs[i2];
        for (var j = 0; j < k; j++) {
          result[n++] = f(xs[j]);
        }
      }
      return result;
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g2) {
        return function(x3) {
          return f(g2(x3));
        };
      };
    }
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x3) {
      return x3;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var on = function(f) {
    return function(g2) {
      return function(x3) {
        return function(y3) {
          return f(g2(x3))(g2(y3));
        };
      };
    };
  };
  var flip = function(f) {
    return function(b2) {
      return function(a3) {
        return f(a3)(b2);
      };
    };
  };
  var $$const = function(a3) {
    return function(v2) {
      return a3;
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l2 = arr.length;
      var result = new Array(l2);
      for (var i2 = 0; i2 < l2; i2++) {
        result[i2] = f(arr[i2]);
      }
      return result;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Type.Proxy/index.js
  var $$Proxy = /* @__PURE__ */ function() {
    function $$Proxy2() {
    }
    ;
    $$Proxy2.value = new $$Proxy2();
    return $$Proxy2;
  }();

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map114 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map114(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var voidLeft = function(dictFunctor) {
    var map114 = map(dictFunctor);
    return function(f) {
      return function(x3) {
        return map114($$const(x3))(f);
      };
    };
  };
  var voidRight = function(dictFunctor) {
    var map114 = map(dictFunctor);
    return function(x3) {
      return map114($$const(x3));
    };
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var applyArray = {
    apply: arrayApply,
    Functor0: function() {
      return functorArray;
    }
  };
  var apply = function(dict) {
    return dict.apply;
  };
  var applyFirst = function(dictApply) {
    var apply1 = apply(dictApply);
    var map34 = map(dictApply.Functor0());
    return function(a3) {
      return function(b2) {
        return apply1(map34($$const)(a3))(b2);
      };
    };
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map34 = map(dictApply.Functor0());
    return function(a3) {
      return function(b2) {
        return apply1(map34($$const(identity2))(a3))(b2);
      };
    };
  };
  var lift2 = function(dictApply) {
    var apply1 = apply(dictApply);
    var map34 = map(dictApply.Functor0());
    return function(f) {
      return function(a3) {
        return function(b2) {
          return apply1(map34(f)(a3))(b2);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var unless = function(dictApplicative) {
    var pure110 = pure(dictApplicative);
    return function(v2) {
      return function(v1) {
        if (!v2) {
          return v1;
        }
        ;
        if (v2) {
          return pure110(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 68, column 1 - line 68, column 65): " + [v2.constructor.name, v1.constructor.name]);
      };
    };
  };
  var when = function(dictApplicative) {
    var pure110 = pure(dictApplicative);
    return function(v2) {
      return function(v1) {
        if (v2) {
          return v1;
        }
        ;
        if (!v2) {
          return pure110(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v2.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply3 = apply(dictApplicative.Apply0());
    var pure110 = pure(dictApplicative);
    return function(f) {
      return function(a3) {
        return apply3(pure110(f))(a3);
      };
    };
  };

  // output/Control.Bind/foreign.js
  var arrayBind = function(arr) {
    return function(f) {
      var result = [];
      for (var i2 = 0, l2 = arr.length; i2 < l2; i2++) {
        Array.prototype.push.apply(result, f(arr[i2]));
      }
      return result;
    };
  };

  // output/Control.Bind/index.js
  var discard = function(dict) {
    return dict.discard;
  };
  var bindArray = {
    bind: arrayBind,
    Apply0: function() {
      return applyArray;
    }
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisliFlipped = function(dictBind) {
    var bindFlipped12 = bindFlipped(dictBind);
    return function(f) {
      return function(g2) {
        return function(a3) {
          return bindFlipped12(f)(g2(a3));
        };
      };
    };
  };
  var composeKleisli = function(dictBind) {
    var bind15 = bind(dictBind);
    return function(f) {
      return function(g2) {
        return function(a3) {
          return bind15(f(a3))(g2);
        };
      };
    };
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showNumberImpl = function(n) {
    var str = n.toString();
    return isNaN(str + ".0") ? str : str + ".0";
  };
  var showCharImpl = function(c2) {
    var code2 = c2.charCodeAt(0);
    if (code2 < 32 || code2 === 127) {
      switch (c2) {
        case "\x07":
          return "'\\a'";
        case "\b":
          return "'\\b'";
        case "\f":
          return "'\\f'";
        case "\n":
          return "'\\n'";
        case "\r":
          return "'\\r'";
        case "	":
          return "'\\t'";
        case "\v":
          return "'\\v'";
      }
      return "'\\" + code2.toString(10) + "'";
    }
    return c2 === "'" || c2 === "\\" ? "'\\" + c2 + "'" : "'" + c2 + "'";
  };
  var showStringImpl = function(s2) {
    var l2 = s2.length;
    return '"' + s2.replace(/[\0-\x1F\x7F"\\]/g, function(c2, i2) {
      switch (c2) {
        case '"':
        case "\\":
          return "\\" + c2;
        case "\x07":
          return "\\a";
        case "\b":
          return "\\b";
        case "\f":
          return "\\f";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case "	":
          return "\\t";
        case "\v":
          return "\\v";
      }
      var k = i2 + 1;
      var empty9 = k < l2 && s2[k] >= "0" && s2[k] <= "9" ? "\\&" : "";
      return "\\" + c2.charCodeAt(0).toString(10) + empty9;
    }) + '"';
  };
  var showArrayImpl = function(f) {
    return function(xs) {
      var ss = [];
      for (var i2 = 0, l2 = xs.length; i2 < l2; i2++) {
        ss[i2] = f(xs[i2]);
      }
      return "[" + ss.join(",") + "]";
    };
  };
  var cons = function(head6) {
    return function(tail2) {
      return [head6].concat(tail2);
    };
  };
  var intercalate = function(separator) {
    return function(xs) {
      return xs.join(separator);
    };
  };

  // output/Data.Symbol/index.js
  var reflectSymbol = function(dict) {
    return dict.reflectSymbol;
  };

  // output/Record.Unsafe/foreign.js
  var unsafeGet = function(label5) {
    return function(rec) {
      return rec[label5];
    };
  };

  // output/Data.Show/index.js
  var showString = {
    show: showStringImpl
  };
  var showRecordFieldsNil = {
    showRecordFields: function(v2) {
      return function(v1) {
        return [];
      };
    }
  };
  var showRecordFields = function(dict) {
    return dict.showRecordFields;
  };
  var showRecord = function() {
    return function() {
      return function(dictShowRecordFields) {
        var showRecordFields1 = showRecordFields(dictShowRecordFields);
        return {
          show: function(record) {
            var v2 = showRecordFields1($$Proxy.value)(record);
            if (v2.length === 0) {
              return "{}";
            }
            ;
            return intercalate(" ")(["{", intercalate(", ")(v2), "}"]);
          }
        };
      };
    };
  };
  var showNumber = {
    show: showNumberImpl
  };
  var showInt = {
    show: showIntImpl
  };
  var showChar = {
    show: showCharImpl
  };
  var show = function(dict) {
    return dict.show;
  };
  var showArray = function(dictShow) {
    return {
      show: showArrayImpl(show(dictShow))
    };
  };
  var showRecordFieldsCons = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function(dictShowRecordFields) {
      var showRecordFields1 = showRecordFields(dictShowRecordFields);
      return function(dictShow) {
        var show16 = show(dictShow);
        return {
          showRecordFields: function(v2) {
            return function(record) {
              var tail2 = showRecordFields1($$Proxy.value)(record);
              var key = reflectSymbol2($$Proxy.value);
              var focus3 = unsafeGet(key)(record);
              return cons(intercalate(": ")([key, show16(focus3)]))(tail2);
            };
          }
        };
      };
    };
  };

  // output/Data.Generic.Rep/index.js
  var from = function(dict) {
    return dict.from;
  };

  // output/Data.Semigroup/foreign.js
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };
  var semigroupFn = function(dictSemigroup) {
    var append13 = append(dictSemigroup);
    return {
      append: function(f) {
        return function(g2) {
          return function(x3) {
            return append13(f(x3))(g2(x3));
          };
        };
      }
    };
  };

  // output/Control.Alt/index.js
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Control.Lazy/index.js
  var defer = function(dict) {
    return dict.defer;
  };

  // output/Control.Monad/index.js
  var unlessM = function(dictMonad) {
    var bind15 = bind(dictMonad.Bind1());
    var unless2 = unless(dictMonad.Applicative0());
    return function(mb) {
      return function(m2) {
        return bind15(mb)(function(b2) {
          return unless2(b2)(m2);
        });
      };
    };
  };
  var ap = function(dictMonad) {
    var bind15 = bind(dictMonad.Bind1());
    var pure21 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a3) {
        return bind15(f)(function(f$prime) {
          return bind15(a3)(function(a$prime) {
            return pure21(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Bounded/foreign.js
  var topInt = 2147483647;
  var bottomInt = -2147483648;
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq7) {
      return function(gt) {
        return function(x3) {
          return function(y3) {
            return x3 < y3 ? lt : x3 === y3 ? eq7 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordNumberImpl = unsafeCompareImpl;
  var ordStringImpl = unsafeCompareImpl;
  var ordCharImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqBooleanImpl = refEq;
  var eqIntImpl = refEq;
  var eqNumberImpl = refEq;
  var eqCharImpl = refEq;
  var eqStringImpl = refEq;

  // output/Data.Eq/index.js
  var eqString = {
    eq: eqStringImpl
  };
  var eqNumber = {
    eq: eqNumberImpl
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eqChar = {
    eq: eqCharImpl
  };
  var eqBoolean = {
    eq: eqBooleanImpl
  };
  var eq1 = function(dict) {
    return dict.eq1;
  };
  var eq = function(dict) {
    return dict.eq;
  };
  var eq2 = /* @__PURE__ */ eq(eqBoolean);
  var notEq = function(dictEq) {
    var eq32 = eq(dictEq);
    return function(x3) {
      return function(y3) {
        return eq2(eq32(x3)(y3))(false);
      };
    };
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();
  var eqOrdering = {
    eq: function(v2) {
      return function(v1) {
        if (v2 instanceof LT && v1 instanceof LT) {
          return true;
        }
        ;
        if (v2 instanceof GT && v1 instanceof GT) {
          return true;
        }
        ;
        if (v2 instanceof EQ && v1 instanceof EQ) {
          return true;
        }
        ;
        return false;
      };
    }
  };

  // output/Data.Ring/foreign.js
  var intSub = function(x3) {
    return function(y3) {
      return x3 - y3 | 0;
    };
  };

  // output/Data.Semiring/foreign.js
  var intAdd = function(x3) {
    return function(y3) {
      return x3 + y3 | 0;
    };
  };
  var intMul = function(x3) {
    return function(y3) {
      return x3 * y3 | 0;
    };
  };

  // output/Data.Semiring/index.js
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };

  // output/Data.Ring/index.js
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };

  // output/Data.Ord/index.js
  var ordString = /* @__PURE__ */ function() {
    return {
      compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqString;
      }
    };
  }();
  var ordNumber = /* @__PURE__ */ function() {
    return {
      compare: ordNumberImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqNumber;
      }
    };
  }();
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var ordChar = /* @__PURE__ */ function() {
    return {
      compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqChar;
      }
    };
  }();
  var compare1 = function(dict) {
    return dict.compare1;
  };
  var compare = function(dict) {
    return dict.compare;
  };
  var max = function(dictOrd) {
    var compare32 = compare(dictOrd);
    return function(x3) {
      return function(y3) {
        var v2 = compare32(x3)(y3);
        if (v2 instanceof LT) {
          return y3;
        }
        ;
        if (v2 instanceof EQ) {
          return x3;
        }
        ;
        if (v2 instanceof GT) {
          return x3;
        }
        ;
        throw new Error("Failed pattern match at Data.Ord (line 181, column 3 - line 184, column 12): " + [v2.constructor.name]);
      };
    };
  };
  var min = function(dictOrd) {
    var compare32 = compare(dictOrd);
    return function(x3) {
      return function(y3) {
        var v2 = compare32(x3)(y3);
        if (v2 instanceof LT) {
          return x3;
        }
        ;
        if (v2 instanceof EQ) {
          return x3;
        }
        ;
        if (v2 instanceof GT) {
          return y3;
        }
        ;
        throw new Error("Failed pattern match at Data.Ord (line 172, column 3 - line 175, column 12): " + [v2.constructor.name]);
      };
    };
  };
  var clamp = function(dictOrd) {
    var min1 = min(dictOrd);
    var max1 = max(dictOrd);
    return function(low2) {
      return function(hi) {
        return function(x3) {
          return min1(hi)(max1(low2)(x3));
        };
      };
    };
  };

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedInt = {
    top: topInt,
    bottom: bottomInt,
    Ord0: function() {
      return ordInt;
    }
  };
  var boundedChar = {
    top: topChar,
    bottom: bottomChar,
    Ord0: function() {
      return ordChar;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Maybe/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v2) {
    return function(v1) {
      return function(v22) {
        if (v22 instanceof Nothing) {
          return v2;
        }
        ;
        if (v22 instanceof Just) {
          return v1(v22.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v2.constructor.name, v1.constructor.name, v22.constructor.name]);
      };
    };
  };
  var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
  var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
  var functorMaybe = {
    map: function(v2) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v2(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var fromMaybe = function(a3) {
    return maybe(a3)(identity3);
  };
  var fromJust = function() {
    return function(v2) {
      if (v2 instanceof Just) {
        return v2.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v2.constructor.name]);
    };
  };
  var eqMaybe = function(dictEq) {
    var eq7 = eq(dictEq);
    return {
      eq: function(x3) {
        return function(y3) {
          if (x3 instanceof Nothing && y3 instanceof Nothing) {
            return true;
          }
          ;
          if (x3 instanceof Just && y3 instanceof Just) {
            return eq7(x3.value0)(y3.value0);
          }
          ;
          return false;
        };
      }
    };
  };
  var ordMaybe = function(dictOrd) {
    var compare4 = compare(dictOrd);
    var eqMaybe1 = eqMaybe(dictOrd.Eq0());
    return {
      compare: function(x3) {
        return function(y3) {
          if (x3 instanceof Nothing && y3 instanceof Nothing) {
            return EQ.value;
          }
          ;
          if (x3 instanceof Nothing) {
            return LT.value;
          }
          ;
          if (y3 instanceof Nothing) {
            return GT.value;
          }
          ;
          if (x3 instanceof Just && y3 instanceof Just) {
            return compare4(x3.value0)(y3.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Maybe (line 0, column 0 - line 0, column 0): " + [x3.constructor.name, y3.constructor.name]);
        };
      },
      Eq0: function() {
        return eqMaybe1;
      }
    };
  };
  var applyMaybe = {
    apply: function(v2) {
      return function(v1) {
        if (v2 instanceof Just) {
          return map2(v2.value0)(v1);
        }
        ;
        if (v2 instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v2.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v2) {
      return function(v1) {
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        if (v2 instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v2.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };
  var applicativeMaybe = /* @__PURE__ */ function() {
    return {
      pure: Just.create,
      Apply0: function() {
        return applyMaybe;
      }
    };
  }();

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var note = function(a3) {
    return maybe(new Left(a3))(Right.create);
  };
  var functorEither = {
    map: function(f) {
      return function(m2) {
        if (m2 instanceof Left) {
          return new Left(m2.value0);
        }
        ;
        if (m2 instanceof Right) {
          return new Right(f(m2.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m2.constructor.name]);
      };
    }
  };
  var map3 = /* @__PURE__ */ map(functorEither);
  var either = function(v2) {
    return function(v1) {
      return function(v22) {
        if (v22 instanceof Left) {
          return v2(v22.value0);
        }
        ;
        if (v22 instanceof Right) {
          return v1(v22.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v2.constructor.name, v1.constructor.name, v22.constructor.name]);
      };
    };
  };
  var hush = /* @__PURE__ */ function() {
    return either($$const(Nothing.value))(Just.create);
  }();
  var applyEither = {
    apply: function(v2) {
      return function(v1) {
        if (v2 instanceof Left) {
          return new Left(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return map3(v2.value0)(v1);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 70, column 1 - line 72, column 30): " + [v2.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorEither;
    }
  };
  var applicativeEither = /* @__PURE__ */ function() {
    return {
      pure: Right.create,
      Apply0: function() {
        return applyEither;
      }
    };
  }();

  // output/Data.Identity/index.js
  var Identity = function(x3) {
    return x3;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m2) {
        return f(m2);
      };
    }
  };
  var applyIdentity = {
    apply: function(v2) {
      return function(v1) {
        return v2(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v2) {
      return function(f) {
        return f(v2);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x3) {
    return Math.min(Math.abs(x3), 2147483647);
  };
  var intDiv = function(x3) {
    return function(y3) {
      if (y3 === 0)
        return 0;
      return y3 > 0 ? Math.floor(x3 / y3) : -Math.floor(x3 / -y3);
    };
  };
  var intMod = function(x3) {
    return function(y3) {
      if (y3 === 0)
        return 0;
      var yy = Math.abs(y3);
      return (x3 % yy + yy) % yy;
    };
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
  };

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
  };

  // output/Data.Monoid/index.js
  var monoidArray = {
    mempty: [],
    Semigroup0: function() {
      return semigroupArray;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/foreign.js
  var pureE = function(a3) {
    return function() {
      return a3;
    };
  };
  var bindE = function(a3) {
    return function(f) {
      return function() {
        return f(a3())();
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
  var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref2) {
    return function() {
      return ref2.value;
    };
  };
  var modifyImpl = function(f) {
    return function(ref2) {
      return function() {
        var t2 = f(ref2.value);
        ref2.value = t2.state;
        return t2.value;
      };
    };
  };
  var write = function(val) {
    return function(ref2) {
      return function() {
        ref2.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var $$new = _new;
  var modify$prime = modifyImpl;
  var modify = function(f) {
    return modify$prime(function(s2) {
      var s$prime = f(s2);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var modify_ = function(f) {
    return function(s2) {
      return $$void2(modify(f)(s2));
    };
  };

  // output/Control.Monad.Rec.Class/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindEffect);
  var map4 = /* @__PURE__ */ map(functorEffect);
  var Loop = /* @__PURE__ */ function() {
    function Loop2(value0) {
      this.value0 = value0;
    }
    ;
    Loop2.create = function(value0) {
      return new Loop2(value0);
    };
    return Loop2;
  }();
  var Done = /* @__PURE__ */ function() {
    function Done2(value0) {
      this.value0 = value0;
    }
    ;
    Done2.create = function(value0) {
      return new Done2(value0);
    };
    return Done2;
  }();
  var tailRecM = function(dict) {
    return dict.tailRecM;
  };
  var tailRec = function(f) {
    var go2 = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v2) {
        if (v2 instanceof Loop) {
          $copy_v = f(v2.value0);
          return;
        }
        ;
        if (v2 instanceof Done) {
          $tco_done = true;
          return v2.value0;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 93, column 3 - line 93, column 25): " + [v2.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    return function($85) {
      return go2(f($85));
    };
  };
  var monadRecIdentity = {
    tailRecM: function(f) {
      var runIdentity = function(v2) {
        return v2;
      };
      var $86 = tailRec(function($88) {
        return runIdentity(f($88));
      });
      return function($87) {
        return Identity($86($87));
      };
    },
    Monad0: function() {
      return monadIdentity;
    }
  };
  var monadRecEffect = {
    tailRecM: function(f) {
      return function(a3) {
        var fromDone = function(v2) {
          if (v2 instanceof Done) {
            return v2.value0;
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 113, column 30 - line 113, column 44): " + [v2.constructor.name]);
        };
        return function __do3() {
          var r2 = bindFlipped2($$new)(f(a3))();
          (function() {
            while (!function __do4() {
              var v2 = read(r2)();
              if (v2 instanceof Loop) {
                var e = f(v2.value0)();
                write(e)(r2)();
                return false;
              }
              ;
              if (v2 instanceof Done) {
                return true;
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 104, column 22 - line 109, column 28): " + [v2.constructor.name]);
            }()) {
            }
            ;
            return {};
          })();
          return map4(fromDone)(read(r2))();
        };
      };
    },
    Monad0: function() {
      return monadEffect;
    }
  };
  var forever = function(dictMonadRec) {
    var tailRecM1 = tailRecM(dictMonadRec);
    var voidRight2 = voidRight(dictMonadRec.Monad0().Bind1().Apply0().Functor0());
    return function(ma) {
      return tailRecM1(function(u2) {
        return voidRight2(new Loop(u2))(ma);
      })(unit);
    };
  };
  var bifunctorStep = {
    bimap: function(v2) {
      return function(v1) {
        return function(v22) {
          if (v22 instanceof Loop) {
            return new Loop(v2(v22.value0));
          }
          ;
          if (v22 instanceof Done) {
            return new Done(v1(v22.value0));
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 29, column 1 - line 31, column 34): " + [v2.constructor.name, v1.constructor.name, v22.constructor.name]);
        };
      };
    }
  };

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b2) {
      return b1 && b2;
    };
  };
  var boolDisj = function(b1) {
    return function(b2) {
      return b1 || b2;
    };
  };
  var boolNot = function(b2) {
    return !b2;
  };

  // output/Data.HeytingAlgebra/index.js
  var tt = function(dict) {
    return dict.tt;
  };
  var not = function(dict) {
    return dict.not;
  };
  var implies = function(dict) {
    return dict.implies;
  };
  var ff = function(dict) {
    return dict.ff;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a3) {
      return function(b2) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a3))(b2);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };
  var conj = function(dict) {
    return dict.conj;
  };
  var heytingAlgebraFunction = function(dictHeytingAlgebra) {
    var ff1 = ff(dictHeytingAlgebra);
    var tt1 = tt(dictHeytingAlgebra);
    var implies1 = implies(dictHeytingAlgebra);
    var conj1 = conj(dictHeytingAlgebra);
    var disj1 = disj(dictHeytingAlgebra);
    var not1 = not(dictHeytingAlgebra);
    return {
      ff: function(v2) {
        return ff1;
      },
      tt: function(v2) {
        return tt1;
      },
      implies: function(f) {
        return function(g2) {
          return function(a3) {
            return implies1(f(a3))(g2(a3));
          };
        };
      },
      conj: function(f) {
        return function(g2) {
          return function(a3) {
            return conj1(f(a3))(g2(a3));
          };
        };
      },
      disj: function(f) {
        return function(g2) {
          return function(a3) {
            return disj1(f(a3))(g2(a3));
          };
        };
      },
      not: function(f) {
        return function(a3) {
          return not1(f(a3));
        };
      }
    };
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var snd = function(v2) {
    return v2.value1;
  };
  var functorTuple = {
    map: function(f) {
      return function(m2) {
        return new Tuple(m2.value0, f(m2.value1));
      };
    }
  };
  var fst = function(v2) {
    return v2.value0;
  };
  var eqTuple = function(dictEq) {
    var eq7 = eq(dictEq);
    return function(dictEq1) {
      var eq15 = eq(dictEq1);
      return {
        eq: function(x3) {
          return function(y3) {
            return eq7(x3.value0)(y3.value0) && eq15(x3.value1)(y3.value1);
          };
        }
      };
    };
  };
  var ordTuple = function(dictOrd) {
    var compare4 = compare(dictOrd);
    var eqTuple1 = eqTuple(dictOrd.Eq0());
    return function(dictOrd1) {
      var compare13 = compare(dictOrd1);
      var eqTuple2 = eqTuple1(dictOrd1.Eq0());
      return {
        compare: function(x3) {
          return function(y3) {
            var v2 = compare4(x3.value0)(y3.value0);
            if (v2 instanceof LT) {
              return LT.value;
            }
            ;
            if (v2 instanceof GT) {
              return GT.value;
            }
            ;
            return compare13(x3.value1)(y3.value1);
          };
        },
        Eq0: function() {
          return eqTuple2;
        }
      };
    };
  };

  // output/Data.Bifunctor/index.js
  var bimap = function(dict) {
    return dict.bimap;
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i2 = len - 1; i2 >= 0; i2--) {
          acc = f(xs[i2])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i2 = 0; i2 < len; i2++) {
          acc = f(acc)(xs[i2]);
        }
        return acc;
      };
    };
  };

  // output/Control.Plus/index.js
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Data.Monoid.Disj/index.js
  var Disj = function(x3) {
    return x3;
  };
  var semigroupDisj = function(dictHeytingAlgebra) {
    var disj2 = disj(dictHeytingAlgebra);
    return {
      append: function(v2) {
        return function(v1) {
          return disj2(v2)(v1);
        };
      }
    };
  };
  var monoidDisj = function(dictHeytingAlgebra) {
    var semigroupDisj1 = semigroupDisj(dictHeytingAlgebra);
    return {
      mempty: ff(dictHeytingAlgebra),
      Semigroup0: function() {
        return semigroupDisj1;
      }
    };
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x3) {
    return x3;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };
  var alaF = function() {
    return function() {
      return function() {
        return function() {
          return function(v2) {
            return coerce2;
          };
        };
      };
    };
  };

  // output/Data.Foldable/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var eq12 = /* @__PURE__ */ eq(eqOrdering);
  var alaF2 = /* @__PURE__ */ alaF()()()();
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond6 = applySecond(dictApplicative.Apply0());
    var pure21 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($449) {
          return applySecond6(f($449));
        })(pure21(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_14 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_14(dictFoldable));
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var maximumBy = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(cmp) {
      var max$prime = function(v2) {
        return function(v1) {
          if (v2 instanceof Nothing) {
            return new Just(v1);
          }
          ;
          if (v2 instanceof Just) {
            return new Just(function() {
              var $298 = eq12(cmp(v2.value0)(v1))(GT.value);
              if ($298) {
                return v2.value0;
              }
              ;
              return v1;
            }());
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 441, column 3 - line 441, column 27): " + [v2.constructor.name, v1.constructor.name]);
        };
      };
      return foldl22(max$prime)(Nothing.value);
    };
  };
  var maximum = function(dictOrd) {
    var compare4 = compare(dictOrd);
    return function(dictFoldable) {
      return maximumBy(dictFoldable)(compare4);
    };
  };
  var minimumBy = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(cmp) {
      var min$prime = function(v2) {
        return function(v1) {
          if (v2 instanceof Nothing) {
            return new Just(v1);
          }
          ;
          if (v2 instanceof Just) {
            return new Just(function() {
              var $302 = eq12(cmp(v2.value0)(v1))(LT.value);
              if ($302) {
                return v2.value0;
              }
              ;
              return v1;
            }());
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 454, column 3 - line 454, column 27): " + [v2.constructor.name, v1.constructor.name]);
        };
      };
      return foldl22(min$prime)(Nothing.value);
    };
  };
  var minimum = function(dictOrd) {
    var compare4 = compare(dictOrd);
    return function(dictFoldable) {
      return minimumBy(dictFoldable)(compare4);
    };
  };
  var foldableMaybe = {
    foldr: function(v2) {
      return function(z2) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return z2;
          }
          ;
          if (v1 instanceof Just) {
            return v2(v1.value0)(z2);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v2.constructor.name, z2.constructor.name, v1.constructor.name]);
        };
      };
    },
    foldl: function(v2) {
      return function(z2) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return z2;
          }
          ;
          if (v1 instanceof Just) {
            return v2(z2)(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v2.constructor.name, z2.constructor.name, v1.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      return function(v2) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty3;
          }
          ;
          if (v1 instanceof Just) {
            return v2(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v2.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append8 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x3) {
          return function(acc) {
            return append8(f(x3))(acc);
          };
        })(mempty3);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };
  var foldMap = function(dict) {
    return dict.foldMap;
  };
  var foldM = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(dictMonad) {
      var bind15 = bind(dictMonad.Bind1());
      var pure21 = pure(dictMonad.Applicative0());
      return function(f) {
        return function(b0) {
          return foldl22(function(b2) {
            return function(a3) {
              return bind15(b2)(flip(f)(a3));
            };
          })(pure21(b0));
        };
      };
    };
  };
  var fold = function(dictFoldable) {
    var foldMap22 = foldMap(dictFoldable);
    return function(dictMonoid) {
      return foldMap22(dictMonoid)(identity4);
    };
  };
  var any = function(dictFoldable) {
    var foldMap22 = foldMap(dictFoldable);
    return function(dictHeytingAlgebra) {
      return alaF2(Disj)(foldMap22(monoidDisj(dictHeytingAlgebra)));
    };
  };

  // output/Data.FunctorWithIndex/index.js
  var mapWithIndex = function(dict) {
    return dict.mapWithIndex;
  };

  // output/Data.FoldableWithIndex/index.js
  var foldrWithIndex = function(dict) {
    return dict.foldrWithIndex;
  };
  var foldlWithIndex = function(dict) {
    return dict.foldlWithIndex;
  };
  var foldMapWithIndex = function(dict) {
    return dict.foldMapWithIndex;
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a3) {
      return [a3];
    }
    function array2(a3) {
      return function(b2) {
        return [a3, b2];
      };
    }
    function array3(a3) {
      return function(b2) {
        return function(c2) {
          return [a3, b2, c2];
        };
      };
    }
    function concat22(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply3) {
      return function(map34) {
        return function(pure21) {
          return function(f) {
            return function(array) {
              function go2(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure21([]);
                  case 1:
                    return map34(array1)(f(array[bot]));
                  case 2:
                    return apply3(map34(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply3(apply3(map34(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply3(map34(concat22)(go2(bot, pivot)))(go2(pivot, top3));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Traversable/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse22 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse22(dictApplicative)(identity5);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };
  var sequence = function(dict) {
    return dict.sequence;
  };
  var $$for = function(dictApplicative) {
    return function(dictTraversable) {
      var traverse22 = traverse(dictTraversable)(dictApplicative);
      return function(x3) {
        return function(f) {
          return traverse22(f)(x3);
        };
      };
    };
  };

  // output/Data.Unfoldable/foreign.js
  var unfoldrArrayImpl = function(isNothing2) {
    return function(fromJust6) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b2) {
              var result = [];
              var value15 = b2;
              while (true) {
                var maybe2 = f(value15);
                if (isNothing2(maybe2))
                  return result;
                var tuple = fromJust6(maybe2);
                result.push(fst2(tuple));
                value15 = snd2(tuple);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/foreign.js
  var unfoldr1ArrayImpl = function(isNothing2) {
    return function(fromJust6) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b2) {
              var result = [];
              var value15 = b2;
              while (true) {
                var tuple = f(value15);
                result.push(fst2(tuple));
                var maybe2 = snd2(tuple);
                if (isNothing2(maybe2))
                  return result;
                value15 = fromJust6(maybe2);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var unfoldable1Array = {
    unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
  };

  // output/Data.Unfoldable/index.js
  var fromJust3 = /* @__PURE__ */ fromJust();
  var unfoldr = function(dict) {
    return dict.unfoldr;
  };
  var unfoldableArray = {
    unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
    Unfoldable10: function() {
      return unfoldable1Array;
    }
  };

  // output/Data.NonEmpty/index.js
  var NonEmpty = /* @__PURE__ */ function() {
    function NonEmpty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    NonEmpty2.create = function(value0) {
      return function(value1) {
        return new NonEmpty2(value0, value1);
      };
    };
    return NonEmpty2;
  }();
  var singleton2 = function(dictPlus) {
    var empty9 = empty(dictPlus);
    return function(a3) {
      return new NonEmpty(a3, empty9);
    };
  };

  // output/Data.List.Types/index.js
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var Nil = /* @__PURE__ */ function() {
    function Nil3() {
    }
    ;
    Nil3.value = new Nil3();
    return Nil3;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons3.create = function(value0) {
      return function(value1) {
        return new Cons3(value0, value1);
      };
    };
    return Cons3;
  }();
  var NonEmptyList = function(x3) {
    return x3;
  };
  var toList = function(v2) {
    return new Cons(v2.value0, v2.value1);
  };
  var listMap = function(f) {
    var chunkedRevMap = function($copy_chunksAcc) {
      return function($copy_v) {
        var $tco_var_chunksAcc = $copy_chunksAcc;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(chunksAcc, v2) {
          if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Cons)) {
            $tco_var_chunksAcc = new Cons(v2, chunksAcc);
            $copy_v = v2.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v1) {
            if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Nil)) {
              return new Cons(f(v1.value0), new Cons(f(v1.value1.value0), Nil.value));
            }
            ;
            if (v1 instanceof Cons && v1.value1 instanceof Nil) {
              return new Cons(f(v1.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v1) {
            return function($copy_acc) {
              var $tco_var_v1 = $copy_v1;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v1, acc) {
                if (v1 instanceof Cons && (v1.value0 instanceof Cons && (v1.value0.value1 instanceof Cons && v1.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v1 = v1.value1;
                  $copy_acc = new Cons(f(v1.value0.value0), new Cons(f(v1.value0.value1.value0), new Cons(f(v1.value0.value1.value1.value0), acc)));
                  return;
                }
                ;
                $tco_done1 = true;
                return acc;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v1, $copy_acc);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(chunksAcc)(unrolledMap(v2));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_chunksAcc, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var map5 = /* @__PURE__ */ map(functorList);
  var foldableList = {
    foldr: function(f) {
      return function(b2) {
        var rev3 = function() {
          var go2 = function($copy_acc) {
            return function($copy_v) {
              var $tco_var_acc = $copy_acc;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(acc, v2) {
                if (v2 instanceof Nil) {
                  $tco_done = true;
                  return acc;
                }
                ;
                if (v2 instanceof Cons) {
                  $tco_var_acc = new Cons(v2.value0, acc);
                  $copy_v = v2.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [acc.constructor.name, v2.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_acc, $copy_v);
              }
              ;
              return $tco_result;
            };
          };
          return go2(Nil.value);
        }();
        var $281 = foldl(foldableList)(flip(f))(b2);
        return function($282) {
          return $281(rev3($282));
        };
      };
    },
    foldl: function(f) {
      var go2 = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b2, v2) {
            if (v2 instanceof Nil) {
              $tco_done1 = true;
              return b2;
            }
            ;
            if (v2 instanceof Cons) {
              $tco_var_b = f(b2)(v2.value0);
              $copy_v = v2.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v2.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go2;
    },
    foldMap: function(dictMonoid) {
      var append22 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $283 = append22(acc);
          return function($284) {
            return $283(f($284));
          };
        })(mempty3);
      };
    }
  };
  var foldl2 = /* @__PURE__ */ foldl(foldableList);
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
  var foldableWithIndexList = {
    foldrWithIndex: function(f) {
      return function(b2) {
        return function(xs) {
          var v2 = function() {
            var rev3 = foldl2(function(v1) {
              return function(a3) {
                return new Tuple(v1.value0 + 1 | 0, new Cons(a3, v1.value1));
              };
            });
            return rev3(new Tuple(0, Nil.value))(xs);
          }();
          return snd(foldl2(function(v1) {
            return function(a3) {
              return new Tuple(v1.value0 - 1 | 0, f(v1.value0 - 1 | 0)(a3)(v1.value1));
            };
          })(new Tuple(v2.value0, b2))(v2.value1));
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(acc) {
        var $285 = foldl2(function(v2) {
          return function(a3) {
            return new Tuple(v2.value0 + 1 | 0, f(v2.value0)(v2.value1)(a3));
          };
        })(new Tuple(0, acc));
        return function($286) {
          return snd($285($286));
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      var append22 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldlWithIndex(foldableWithIndexList)(function(i2) {
          return function(acc) {
            var $287 = append22(acc);
            var $288 = f(i2);
            return function($289) {
              return $287($288($289));
            };
          };
        })(mempty3);
      };
    },
    Foldable0: function() {
      return foldableList;
    }
  };
  var foldrWithIndex1 = /* @__PURE__ */ foldrWithIndex(foldableWithIndexList);
  var functorWithIndexList = {
    mapWithIndex: function(f) {
      return foldrWithIndex1(function(i2) {
        return function(x3) {
          return function(acc) {
            return new Cons(f(i2)(x3), acc);
          };
        };
      })(Nil.value);
    },
    Functor0: function() {
      return functorList;
    }
  };
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr2(Cons.create)(ys)(xs);
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupList);
  var monoidList = /* @__PURE__ */ function() {
    return {
      mempty: Nil.value,
      Semigroup0: function() {
        return semigroupList;
      }
    };
  }();
  var semigroupNonEmptyList = {
    append: function(v2) {
      return function(as$prime) {
        return new NonEmpty(v2.value0, append1(v2.value1)(toList(as$prime)));
      };
    }
  };
  var traversableList = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      var map114 = map(Apply0.Functor0());
      var lift22 = lift2(Apply0);
      var pure110 = pure(dictApplicative);
      return function(f) {
        var $298 = map114(foldl2(flip(Cons.create))(Nil.value));
        var $299 = foldl2(function(acc) {
          var $301 = lift22(flip(Cons.create))(acc);
          return function($302) {
            return $301(f($302));
          };
        })(pure110(Nil.value));
        return function($300) {
          return $298($299($300));
        };
      };
    },
    sequence: function(dictApplicative) {
      return traverse(traversableList)(dictApplicative)(identity6);
    },
    Functor0: function() {
      return functorList;
    },
    Foldable1: function() {
      return foldableList;
    }
  };
  var unfoldable1List = {
    unfoldr1: function(f) {
      return function(b2) {
        var go2 = function($copy_source) {
          return function($copy_memo) {
            var $tco_var_source = $copy_source;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(source3, memo) {
              var v2 = f(source3);
              if (v2.value1 instanceof Just) {
                $tco_var_source = v2.value1.value0;
                $copy_memo = new Cons(v2.value0, memo);
                return;
              }
              ;
              if (v2.value1 instanceof Nothing) {
                $tco_done = true;
                return foldl2(flip(Cons.create))(Nil.value)(new Cons(v2.value0, memo));
              }
              ;
              throw new Error("Failed pattern match at Data.List.Types (line 135, column 22 - line 137, column 61): " + [v2.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_source, $copy_memo);
            }
            ;
            return $tco_result;
          };
        };
        return go2(b2)(Nil.value);
      };
    }
  };
  var unfoldableList = {
    unfoldr: function(f) {
      return function(b2) {
        var go2 = function($copy_source) {
          return function($copy_memo) {
            var $tco_var_source = $copy_source;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(source3, memo) {
              var v2 = f(source3);
              if (v2 instanceof Nothing) {
                $tco_done = true;
                return foldl2(flip(Cons.create))(Nil.value)(memo);
              }
              ;
              if (v2 instanceof Just) {
                $tco_var_source = v2.value0.value1;
                $copy_memo = new Cons(v2.value0.value0, memo);
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.List.Types (line 142, column 22 - line 144, column 52): " + [v2.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_source, $copy_memo);
            }
            ;
            return $tco_result;
          };
        };
        return go2(b2)(Nil.value);
      };
    },
    Unfoldable10: function() {
      return unfoldable1List;
    }
  };
  var eq1List = {
    eq1: function(dictEq) {
      var eq7 = eq(dictEq);
      return function(xs) {
        return function(ys) {
          var go2 = function($copy_v) {
            return function($copy_v1) {
              return function($copy_v2) {
                var $tco_var_v = $copy_v;
                var $tco_var_v1 = $copy_v1;
                var $tco_done = false;
                var $tco_result;
                function $tco_loop(v2, v1, v22) {
                  if (!v22) {
                    $tco_done = true;
                    return false;
                  }
                  ;
                  if (v2 instanceof Nil && v1 instanceof Nil) {
                    $tco_done = true;
                    return v22;
                  }
                  ;
                  if (v2 instanceof Cons && v1 instanceof Cons) {
                    $tco_var_v = v2.value1;
                    $tco_var_v1 = v1.value1;
                    $copy_v2 = v22 && eq7(v1.value0)(v2.value0);
                    return;
                  }
                  ;
                  $tco_done = true;
                  return false;
                }
                ;
                while (!$tco_done) {
                  $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_v2);
                }
                ;
                return $tco_result;
              };
            };
          };
          return go2(xs)(ys)(true);
        };
      };
    }
  };
  var eq13 = /* @__PURE__ */ eq1(eq1List);
  var eqList = function(dictEq) {
    return {
      eq: eq13(dictEq)
    };
  };
  var ord1List = {
    compare1: function(dictOrd) {
      var compare4 = compare(dictOrd);
      return function(xs) {
        return function(ys) {
          var go2 = function($copy_v) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v2, v1) {
                if (v2 instanceof Nil && v1 instanceof Nil) {
                  $tco_done = true;
                  return EQ.value;
                }
                ;
                if (v2 instanceof Nil) {
                  $tco_done = true;
                  return LT.value;
                }
                ;
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return GT.value;
                }
                ;
                if (v2 instanceof Cons && v1 instanceof Cons) {
                  var v22 = compare4(v2.value0)(v1.value0);
                  if (v22 instanceof EQ) {
                    $tco_var_v = v2.value1;
                    $copy_v1 = v1.value1;
                    return;
                  }
                  ;
                  $tco_done = true;
                  return v22;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 60, column 5 - line 60, column 20): " + [v2.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
          return go2(xs)(ys);
        };
      };
    },
    Eq10: function() {
      return eq1List;
    }
  };
  var compare12 = /* @__PURE__ */ compare1(ord1List);
  var ordList = function(dictOrd) {
    var eqList1 = eqList(dictOrd.Eq0());
    return {
      compare: compare12(dictOrd),
      Eq0: function() {
        return eqList1;
      }
    };
  };
  var applyList = {
    apply: function(v2) {
      return function(v1) {
        if (v2 instanceof Nil) {
          return Nil.value;
        }
        ;
        if (v2 instanceof Cons) {
          return append1(map5(v2.value0)(v1))(apply(applyList)(v2.value1)(v1));
        }
        ;
        throw new Error("Failed pattern match at Data.List.Types (line 157, column 1 - line 159, column 48): " + [v2.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorList;
    }
  };
  var bindList = {
    bind: function(v2) {
      return function(v1) {
        if (v2 instanceof Nil) {
          return Nil.value;
        }
        ;
        if (v2 instanceof Cons) {
          return append1(v1(v2.value0))(bind(bindList)(v2.value1)(v1));
        }
        ;
        throw new Error("Failed pattern match at Data.List.Types (line 164, column 1 - line 166, column 37): " + [v2.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyList;
    }
  };
  var altList = {
    alt: append1,
    Functor0: function() {
      return functorList;
    }
  };
  var plusList = /* @__PURE__ */ function() {
    return {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
  }();

  // output/Data.List/index.js
  var map6 = /* @__PURE__ */ map(functorMaybe);
  var bimap2 = /* @__PURE__ */ bimap(bifunctorStep);
  var foldl3 = /* @__PURE__ */ foldl(foldableList);
  var bind2 = /* @__PURE__ */ bind(bindList);
  var identity7 = /* @__PURE__ */ identity(categoryFn);
  var uncons = function(v2) {
    if (v2 instanceof Nil) {
      return Nothing.value;
    }
    ;
    if (v2 instanceof Cons) {
      return new Just({
        head: v2.value0,
        tail: v2.value1
      });
    }
    ;
    throw new Error("Failed pattern match at Data.List (line 259, column 1 - line 259, column 66): " + [v2.constructor.name]);
  };
  var toUnfoldable = function(dictUnfoldable) {
    return unfoldr(dictUnfoldable)(function(xs) {
      return map6(function(rec) {
        return new Tuple(rec.head, rec.tail);
      })(uncons(xs));
    });
  };
  var singleton3 = function(a3) {
    return new Cons(a3, Nil.value);
  };
  var reverse = /* @__PURE__ */ function() {
    var go2 = function($copy_acc) {
      return function($copy_v) {
        var $tco_var_acc = $copy_acc;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(acc, v2) {
          if (v2 instanceof Nil) {
            $tco_done = true;
            return acc;
          }
          ;
          if (v2 instanceof Cons) {
            $tco_var_acc = new Cons(v2.value0, acc);
            $copy_v = v2.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [acc.constructor.name, v2.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_acc, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return go2(Nil.value);
  }();
  var take = /* @__PURE__ */ function() {
    var go2 = function($copy_acc) {
      return function($copy_v) {
        return function($copy_v1) {
          var $tco_var_acc = $copy_acc;
          var $tco_var_v = $copy_v;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(acc, v2, v1) {
            if (v2 < 1) {
              $tco_done = true;
              return reverse(acc);
            }
            ;
            if (v1 instanceof Nil) {
              $tco_done = true;
              return reverse(acc);
            }
            ;
            if (v1 instanceof Cons) {
              $tco_var_acc = new Cons(v1.value0, acc);
              $tco_var_v = v2 - 1 | 0;
              $copy_v1 = v1.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List (line 513, column 3 - line 513, column 35): " + [acc.constructor.name, v2.constructor.name, v1.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_acc, $tco_var_v, $copy_v1);
          }
          ;
          return $tco_result;
        };
      };
    };
    return go2(Nil.value);
  }();
  var zipWith = function(f) {
    return function(xs) {
      return function(ys) {
        var go2 = function($copy_v) {
          return function($copy_v1) {
            return function($copy_acc) {
              var $tco_var_v = $copy_v;
              var $tco_var_v1 = $copy_v1;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v2, v1, acc) {
                if (v2 instanceof Nil) {
                  $tco_done = true;
                  return acc;
                }
                ;
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return acc;
                }
                ;
                if (v2 instanceof Cons && v1 instanceof Cons) {
                  $tco_var_v = v2.value1;
                  $tco_var_v1 = v1.value1;
                  $copy_acc = new Cons(f(v2.value0)(v1.value0), acc);
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List (line 779, column 3 - line 779, column 21): " + [v2.constructor.name, v1.constructor.name, acc.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_acc);
              }
              ;
              return $tco_result;
            };
          };
        };
        return reverse(go2(xs)(ys)(Nil.value));
      };
    };
  };
  var zip = /* @__PURE__ */ function() {
    return zipWith(Tuple.create);
  }();
  var $$null = function(v2) {
    if (v2 instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var mapMaybe = function(f) {
    var go2 = function($copy_acc) {
      return function($copy_v) {
        var $tco_var_acc = $copy_acc;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(acc, v2) {
          if (v2 instanceof Nil) {
            $tco_done = true;
            return reverse(acc);
          }
          ;
          if (v2 instanceof Cons) {
            var v1 = f(v2.value0);
            if (v1 instanceof Nothing) {
              $tco_var_acc = acc;
              $copy_v = v2.value1;
              return;
            }
            ;
            if (v1 instanceof Just) {
              $tco_var_acc = new Cons(v1.value0, acc);
              $copy_v = v2.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List (line 419, column 5 - line 421, column 32): " + [v1.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 417, column 3 - line 417, column 27): " + [acc.constructor.name, v2.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_acc, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return go2(Nil.value);
  };
  var manyRec = function(dictMonadRec) {
    var bind15 = bind(dictMonadRec.Monad0().Bind1());
    var tailRecM5 = tailRecM(dictMonadRec);
    return function(dictAlternative) {
      var Alt0 = dictAlternative.Plus1().Alt0();
      var alt8 = alt(Alt0);
      var map114 = map(Alt0.Functor0());
      var pure21 = pure(dictAlternative.Applicative0());
      return function(p2) {
        var go2 = function(acc) {
          return bind15(alt8(map114(Loop.create)(p2))(pure21(new Done(unit))))(function(aa) {
            return pure21(bimap2(function(v2) {
              return new Cons(v2, acc);
            })(function(v2) {
              return reverse(acc);
            })(aa));
          });
        };
        return tailRecM5(go2)(Nil.value);
      };
    };
  };
  var length = /* @__PURE__ */ foldl3(function(acc) {
    return function(v2) {
      return acc + 1 | 0;
    };
  })(0);
  var fromFoldable = function(dictFoldable) {
    return foldr(dictFoldable)(Cons.create)(Nil.value);
  };
  var drop = function($copy_v) {
    return function($copy_v1) {
      var $tco_var_v = $copy_v;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v2, v1) {
        if (v2 < 1) {
          $tco_done = true;
          return v1;
        }
        ;
        if (v1 instanceof Nil) {
          $tco_done = true;
          return Nil.value;
        }
        ;
        if (v1 instanceof Cons) {
          $tco_var_v = v2 - 1 | 0;
          $copy_v1 = v1.value1;
          return;
        }
        ;
        throw new Error("Failed pattern match at Data.List (line 536, column 1 - line 536, column 42): " + [v2.constructor.name, v1.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_v, $copy_v1);
      }
      ;
      return $tco_result;
    };
  };
  var concat = function(v2) {
    return bind2(v2)(identity7);
  };
  var catMaybes = /* @__PURE__ */ mapMaybe(identity7);

  // output/Data.Show.Generic/foreign.js
  var intercalate3 = function(separator) {
    return function(xs) {
      return xs.join(separator);
    };
  };

  // output/Data.Show.Generic/index.js
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var genericShowArgsArgument = function(dictShow) {
    var show8 = show(dictShow);
    return {
      genericShowArgs: function(v2) {
        return [show8(v2)];
      }
    };
  };
  var genericShowArgs = function(dict) {
    return dict.genericShowArgs;
  };
  var genericShowConstructor = function(dictGenericShowArgs) {
    var genericShowArgs1 = genericShowArgs(dictGenericShowArgs);
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return {
        "genericShow'": function(v2) {
          var ctor = reflectSymbol2($$Proxy.value);
          var v1 = genericShowArgs1(v2);
          if (v1.length === 0) {
            return ctor;
          }
          ;
          return "(" + (intercalate3(" ")(append2([ctor])(v1)) + ")");
        }
      };
    };
  };
  var genericShow$prime = function(dict) {
    return dict["genericShow'"];
  };
  var genericShow = function(dictGeneric) {
    var from4 = from(dictGeneric);
    return function(dictGenericShow) {
      var genericShow$prime1 = genericShow$prime(dictGenericShow);
      return function(x3) {
        return genericShow$prime1(from4(x3));
      };
    };
  };

  // output/Charting.Charts/index.js
  var Samples = /* @__PURE__ */ function() {
    function Samples2() {
    }
    ;
    Samples2.value = new Samples2();
    return Samples2;
  }();
  var DiffSamples = /* @__PURE__ */ function() {
    function DiffSamples2() {
    }
    ;
    DiffSamples2.value = new DiffSamples2();
    return DiffSamples2;
  }();
  var TimeSeries = /* @__PURE__ */ function() {
    function TimeSeries2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    TimeSeries2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new TimeSeries2(value0, value1, value22, value32);
          };
        };
      };
    };
    return TimeSeries2;
  }();
  var specKey = function(v2) {
    return new Tuple(v2.value2, v2.value3);
  };
  var eqChartDisplayMode = {
    eq: function(x3) {
      return function(y3) {
        if (x3 instanceof Samples && y3 instanceof Samples) {
          return true;
        }
        ;
        if (x3 instanceof DiffSamples && y3 instanceof DiffSamples) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var cycleDisplayMode = function(v2) {
    if (v2 instanceof Samples) {
      return DiffSamples.value;
    }
    ;
    if (v2 instanceof DiffSamples) {
      return Samples.value;
    }
    ;
    throw new Error("Failed pattern match at Charting.Charts (line 23, column 1 - line 23, column 57): " + [v2.constructor.name]);
  };

  // output/Data.Int/foreign.js
  var toNumber = function(n) {
    return n;
  };

  // output/Data.Number/foreign.js
  var nan = NaN;
  var infinity = Infinity;
  var isFiniteImpl = isFinite;
  function fromStringImpl(str, isFinite2, just, nothing) {
    var num = parseFloat(str);
    if (isFinite2(num)) {
      return just(num);
    } else {
      return nothing;
    }
  }

  // output/Data.Number/index.js
  var fromString = function(str) {
    return fromStringImpl(str, isFiniteImpl, Just.create, Nothing.value);
  };

  // output/Data.Array/foreign.js
  var replicateFill = function(count) {
    return function(value15) {
      if (count < 1) {
        return [];
      }
      var result = new Array(count);
      return result.fill(value15);
    };
  };
  var replicatePolyfill = function(count) {
    return function(value15) {
      var result = [];
      var n = 0;
      for (var i2 = 0; i2 < count; i2++) {
        result[n++] = value15;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons3(head6, tail2) {
      this.head = head6;
      this.tail = tail2;
    }
    var emptyList = {};
    function curryCons(head6) {
      return function(tail2) {
        return new Cons3(head6, tail2);
      };
    }
    function listToArray(list) {
      var result = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr5) {
      return function(xs) {
        return listToArray(foldr5(curryCons)(emptyList)(xs));
      };
    };
  }();
  var length2 = function(xs) {
    return xs.length;
  };
  var findIndexImpl = function(just) {
    return function(nothing) {
      return function(f) {
        return function(xs) {
          for (var i2 = 0, l2 = xs.length; i2 < l2; i2++) {
            if (f(xs[i2]))
              return just(i2);
          }
          return nothing;
        };
      };
    };
  };
  var _deleteAt = function(just) {
    return function(nothing) {
      return function(i2) {
        return function(l2) {
          if (i2 < 0 || i2 >= l2.length)
            return nothing;
          var l1 = l2.slice();
          l1.splice(i2, 1);
          return just(l1);
        };
      };
    };
  };
  var filter = function(f) {
    return function(xs) {
      return xs.filter(f);
    };
  };
  var sortByImpl = function() {
    function mergeFromTo(compare4, fromOrdering, xs1, xs2, from4, to) {
      var mid;
      var i2;
      var j;
      var k;
      var x3;
      var y3;
      var c2;
      mid = from4 + (to - from4 >> 1);
      if (mid - from4 > 1)
        mergeFromTo(compare4, fromOrdering, xs2, xs1, from4, mid);
      if (to - mid > 1)
        mergeFromTo(compare4, fromOrdering, xs2, xs1, mid, to);
      i2 = from4;
      j = mid;
      k = from4;
      while (i2 < mid && j < to) {
        x3 = xs2[i2];
        y3 = xs2[j];
        c2 = fromOrdering(compare4(x3)(y3));
        if (c2 > 0) {
          xs1[k++] = y3;
          ++j;
        } else {
          xs1[k++] = x3;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare4) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare4, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();

  // output/Data.Array.ST/foreign.js
  var pushAll = function(as) {
    return function(xs) {
      return function() {
        return xs.push.apply(xs, as);
      };
    };
  };
  var unsafeFreeze = function(xs) {
    return function() {
      return xs;
    };
  };
  function copyImpl(xs) {
    return function() {
      return xs.slice();
    };
  }
  var thaw = copyImpl;
  var sortByImpl2 = function() {
    function mergeFromTo(compare4, fromOrdering, xs1, xs2, from4, to) {
      var mid;
      var i2;
      var j;
      var k;
      var x3;
      var y3;
      var c2;
      mid = from4 + (to - from4 >> 1);
      if (mid - from4 > 1)
        mergeFromTo(compare4, fromOrdering, xs2, xs1, from4, mid);
      if (to - mid > 1)
        mergeFromTo(compare4, fromOrdering, xs2, xs1, mid, to);
      i2 = from4;
      j = mid;
      k = from4;
      while (i2 < mid && j < to) {
        x3 = xs2[i2];
        y3 = xs2[j];
        c2 = fromOrdering(compare4(x3)(y3));
        if (c2 > 0) {
          xs1[k++] = y3;
          ++j;
        } else {
          xs1[k++] = x3;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare4) {
      return function(fromOrdering) {
        return function(xs) {
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare4, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

  // output/Data.Array.ST/index.js
  var withArray = function(f) {
    return function(xs) {
      return function __do3() {
        var result = thaw(xs)();
        f(result)();
        return unsafeFreeze(result)();
      };
    };
  };
  var push = function(a3) {
    return pushAll([a3]);
  };

  // output/Data.Array/index.js
  var fromJust4 = /* @__PURE__ */ fromJust();
  var append3 = /* @__PURE__ */ append(semigroupArray);
  var sortBy = function(comp) {
    return sortByImpl(comp)(function(v2) {
      if (v2 instanceof GT) {
        return 1;
      }
      ;
      if (v2 instanceof EQ) {
        return 0;
      }
      ;
      if (v2 instanceof LT) {
        return -1 | 0;
      }
      ;
      throw new Error("Failed pattern match at Data.Array (line 829, column 31 - line 832, column 11): " + [v2.constructor.name]);
    });
  };
  var snoc = function(xs) {
    return function(x3) {
      return withArray(push(x3))(xs)();
    };
  };
  var singleton4 = function(a3) {
    return [a3];
  };
  var $$null2 = function(xs) {
    return length2(xs) === 0;
  };
  var fromFoldable2 = function(dictFoldable) {
    return fromFoldableImpl(foldr(dictFoldable));
  };
  var findIndex = /* @__PURE__ */ function() {
    return findIndexImpl(Just.create)(Nothing.value);
  }();
  var elemIndex = function(dictEq) {
    var eq22 = eq(dictEq);
    return function(x3) {
      return findIndex(function(v2) {
        return eq22(v2)(x3);
      });
    };
  };
  var notElem2 = function(dictEq) {
    var elemIndex1 = elemIndex(dictEq);
    return function(a3) {
      return function(arr) {
        return isNothing(elemIndex1(a3)(arr));
      };
    };
  };
  var elem2 = function(dictEq) {
    var elemIndex1 = elemIndex(dictEq);
    return function(a3) {
      return function(arr) {
        return isJust(elemIndex1(a3)(arr));
      };
    };
  };
  var deleteAt = /* @__PURE__ */ function() {
    return _deleteAt(Just.create)(Nothing.value);
  }();
  var deleteBy = function(v2) {
    return function(v1) {
      return function(v22) {
        if (v22.length === 0) {
          return [];
        }
        ;
        return maybe(v22)(function(i2) {
          return fromJust4(deleteAt(i2)(v22));
        })(findIndex(v2(v1))(v22));
      };
    };
  };
  var cons2 = function(x3) {
    return function(xs) {
      return append3([x3])(xs);
    };
  };
  var concatMap = /* @__PURE__ */ flip(/* @__PURE__ */ bind(bindArray));
  var mapMaybe2 = function(f) {
    return concatMap(function() {
      var $185 = maybe([])(singleton4);
      return function($186) {
        return $185(f($186));
      };
    }());
  };
  var catMaybes2 = /* @__PURE__ */ mapMaybe2(/* @__PURE__ */ identity(categoryFn));

  // output/Data.String.Common/foreign.js
  var joinWith = function(s2) {
    return function(xs) {
      return xs.join(s2);
    };
  };

  // output/Data.String.Common/index.js
  var $$null3 = function(s2) {
    return s2 === "";
  };

  // output/DOM.HTML.Indexed.ButtonType/index.js
  var ButtonButton = /* @__PURE__ */ function() {
    function ButtonButton2() {
    }
    ;
    ButtonButton2.value = new ButtonButton2();
    return ButtonButton2;
  }();
  var ButtonSubmit = /* @__PURE__ */ function() {
    function ButtonSubmit2() {
    }
    ;
    ButtonSubmit2.value = new ButtonSubmit2();
    return ButtonSubmit2;
  }();
  var ButtonReset = /* @__PURE__ */ function() {
    function ButtonReset2() {
    }
    ;
    ButtonReset2.value = new ButtonReset2();
    return ButtonReset2;
  }();
  var renderButtonType = function(v2) {
    if (v2 instanceof ButtonButton) {
      return "button";
    }
    ;
    if (v2 instanceof ButtonSubmit) {
      return "submit";
    }
    ;
    if (v2 instanceof ButtonReset) {
      return "reset";
    }
    ;
    throw new Error("Failed pattern match at DOM.HTML.Indexed.ButtonType (line 14, column 20 - line 17, column 25): " + [v2.constructor.name]);
  };

  // output/DOM.HTML.Indexed.InputType/index.js
  var InputButton = /* @__PURE__ */ function() {
    function InputButton2() {
    }
    ;
    InputButton2.value = new InputButton2();
    return InputButton2;
  }();
  var InputCheckbox = /* @__PURE__ */ function() {
    function InputCheckbox2() {
    }
    ;
    InputCheckbox2.value = new InputCheckbox2();
    return InputCheckbox2;
  }();
  var InputColor = /* @__PURE__ */ function() {
    function InputColor2() {
    }
    ;
    InputColor2.value = new InputColor2();
    return InputColor2;
  }();
  var InputDate = /* @__PURE__ */ function() {
    function InputDate2() {
    }
    ;
    InputDate2.value = new InputDate2();
    return InputDate2;
  }();
  var InputDatetimeLocal = /* @__PURE__ */ function() {
    function InputDatetimeLocal2() {
    }
    ;
    InputDatetimeLocal2.value = new InputDatetimeLocal2();
    return InputDatetimeLocal2;
  }();
  var InputEmail = /* @__PURE__ */ function() {
    function InputEmail2() {
    }
    ;
    InputEmail2.value = new InputEmail2();
    return InputEmail2;
  }();
  var InputFile = /* @__PURE__ */ function() {
    function InputFile2() {
    }
    ;
    InputFile2.value = new InputFile2();
    return InputFile2;
  }();
  var InputHidden = /* @__PURE__ */ function() {
    function InputHidden2() {
    }
    ;
    InputHidden2.value = new InputHidden2();
    return InputHidden2;
  }();
  var InputImage = /* @__PURE__ */ function() {
    function InputImage2() {
    }
    ;
    InputImage2.value = new InputImage2();
    return InputImage2;
  }();
  var InputMonth = /* @__PURE__ */ function() {
    function InputMonth2() {
    }
    ;
    InputMonth2.value = new InputMonth2();
    return InputMonth2;
  }();
  var InputNumber = /* @__PURE__ */ function() {
    function InputNumber2() {
    }
    ;
    InputNumber2.value = new InputNumber2();
    return InputNumber2;
  }();
  var InputPassword = /* @__PURE__ */ function() {
    function InputPassword2() {
    }
    ;
    InputPassword2.value = new InputPassword2();
    return InputPassword2;
  }();
  var InputRadio = /* @__PURE__ */ function() {
    function InputRadio2() {
    }
    ;
    InputRadio2.value = new InputRadio2();
    return InputRadio2;
  }();
  var InputRange = /* @__PURE__ */ function() {
    function InputRange2() {
    }
    ;
    InputRange2.value = new InputRange2();
    return InputRange2;
  }();
  var InputReset = /* @__PURE__ */ function() {
    function InputReset2() {
    }
    ;
    InputReset2.value = new InputReset2();
    return InputReset2;
  }();
  var InputSearch = /* @__PURE__ */ function() {
    function InputSearch2() {
    }
    ;
    InputSearch2.value = new InputSearch2();
    return InputSearch2;
  }();
  var InputSubmit = /* @__PURE__ */ function() {
    function InputSubmit2() {
    }
    ;
    InputSubmit2.value = new InputSubmit2();
    return InputSubmit2;
  }();
  var InputTel = /* @__PURE__ */ function() {
    function InputTel2() {
    }
    ;
    InputTel2.value = new InputTel2();
    return InputTel2;
  }();
  var InputText = /* @__PURE__ */ function() {
    function InputText2() {
    }
    ;
    InputText2.value = new InputText2();
    return InputText2;
  }();
  var InputTime = /* @__PURE__ */ function() {
    function InputTime2() {
    }
    ;
    InputTime2.value = new InputTime2();
    return InputTime2;
  }();
  var InputUrl = /* @__PURE__ */ function() {
    function InputUrl2() {
    }
    ;
    InputUrl2.value = new InputUrl2();
    return InputUrl2;
  }();
  var InputWeek = /* @__PURE__ */ function() {
    function InputWeek2() {
    }
    ;
    InputWeek2.value = new InputWeek2();
    return InputWeek2;
  }();
  var renderInputType = function(v2) {
    if (v2 instanceof InputButton) {
      return "button";
    }
    ;
    if (v2 instanceof InputCheckbox) {
      return "checkbox";
    }
    ;
    if (v2 instanceof InputColor) {
      return "color";
    }
    ;
    if (v2 instanceof InputDate) {
      return "date";
    }
    ;
    if (v2 instanceof InputDatetimeLocal) {
      return "datetime-local";
    }
    ;
    if (v2 instanceof InputEmail) {
      return "email";
    }
    ;
    if (v2 instanceof InputFile) {
      return "file";
    }
    ;
    if (v2 instanceof InputHidden) {
      return "hidden";
    }
    ;
    if (v2 instanceof InputImage) {
      return "image";
    }
    ;
    if (v2 instanceof InputMonth) {
      return "month";
    }
    ;
    if (v2 instanceof InputNumber) {
      return "number";
    }
    ;
    if (v2 instanceof InputPassword) {
      return "password";
    }
    ;
    if (v2 instanceof InputRadio) {
      return "radio";
    }
    ;
    if (v2 instanceof InputRange) {
      return "range";
    }
    ;
    if (v2 instanceof InputReset) {
      return "reset";
    }
    ;
    if (v2 instanceof InputSearch) {
      return "search";
    }
    ;
    if (v2 instanceof InputSubmit) {
      return "submit";
    }
    ;
    if (v2 instanceof InputTel) {
      return "tel";
    }
    ;
    if (v2 instanceof InputText) {
      return "text";
    }
    ;
    if (v2 instanceof InputTime) {
      return "time";
    }
    ;
    if (v2 instanceof InputUrl) {
      return "url";
    }
    ;
    if (v2 instanceof InputWeek) {
      return "week";
    }
    ;
    throw new Error("Failed pattern match at DOM.HTML.Indexed.InputType (line 33, column 19 - line 55, column 22): " + [v2.constructor.name]);
  };

  // output/Halogen.Query.Input/index.js
  var RefUpdate = /* @__PURE__ */ function() {
    function RefUpdate2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RefUpdate2.create = function(value0) {
      return function(value1) {
        return new RefUpdate2(value0, value1);
      };
    };
    return RefUpdate2;
  }();
  var Action = /* @__PURE__ */ function() {
    function Action3(value0) {
      this.value0 = value0;
    }
    ;
    Action3.create = function(value0) {
      return new Action3(value0);
    };
    return Action3;
  }();

  // output/Data.Nullable/foreign.js
  var nullImpl = null;
  function nullable(a3, r2, f) {
    return a3 == null ? r2 : f(a3);
  }
  function notNull(x3) {
    return x3;
  }

  // output/Data.Nullable/index.js
  var toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Halogen.VDom.Machine/index.js
  var Step = /* @__PURE__ */ function() {
    function Step3(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Step3.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Step3(value0, value1, value22, value32);
          };
        };
      };
    };
    return Step3;
  }();
  var unStep = unsafeCoerce2;
  var step = function(v2, a3) {
    return v2.value2(v2.value1, a3);
  };
  var mkStep = unsafeCoerce2;
  var halt = function(v2) {
    return v2.value3(v2.value1);
  };
  var extract2 = /* @__PURE__ */ unStep(function(v2) {
    return v2.value0;
  });

  // output/Halogen.VDom.Types/index.js
  var map7 = /* @__PURE__ */ map(functorArray);
  var map1 = /* @__PURE__ */ map(functorTuple);
  var Text = /* @__PURE__ */ function() {
    function Text2(value0) {
      this.value0 = value0;
    }
    ;
    Text2.create = function(value0) {
      return new Text2(value0);
    };
    return Text2;
  }();
  var Elem = /* @__PURE__ */ function() {
    function Elem2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Elem2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Elem2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Elem2;
  }();
  var Keyed = /* @__PURE__ */ function() {
    function Keyed2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Keyed2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Keyed2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Keyed2;
  }();
  var Widget = /* @__PURE__ */ function() {
    function Widget2(value0) {
      this.value0 = value0;
    }
    ;
    Widget2.create = function(value0) {
      return new Widget2(value0);
    };
    return Widget2;
  }();
  var Grafted = /* @__PURE__ */ function() {
    function Grafted2(value0) {
      this.value0 = value0;
    }
    ;
    Grafted2.create = function(value0) {
      return new Grafted2(value0);
    };
    return Grafted2;
  }();
  var Graft = /* @__PURE__ */ function() {
    function Graft2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Graft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Graft2(value0, value1, value22);
        };
      };
    };
    return Graft2;
  }();
  var unGraft = function(f) {
    return function($61) {
      return f($61);
    };
  };
  var graft = unsafeCoerce2;
  var bifunctorGraft = {
    bimap: function(f) {
      return function(g2) {
        return unGraft(function(v2) {
          return graft(new Graft(function($63) {
            return f(v2.value0($63));
          }, function($64) {
            return g2(v2.value1($64));
          }, v2.value2));
        });
      };
    }
  };
  var bimap3 = /* @__PURE__ */ bimap(bifunctorGraft);
  var runGraft = /* @__PURE__ */ unGraft(function(v2) {
    var go2 = function(v22) {
      if (v22 instanceof Text) {
        return new Text(v22.value0);
      }
      ;
      if (v22 instanceof Elem) {
        return new Elem(v22.value0, v22.value1, v2.value0(v22.value2), map7(go2)(v22.value3));
      }
      ;
      if (v22 instanceof Keyed) {
        return new Keyed(v22.value0, v22.value1, v2.value0(v22.value2), map7(map1(go2))(v22.value3));
      }
      ;
      if (v22 instanceof Widget) {
        return new Widget(v2.value1(v22.value0));
      }
      ;
      if (v22 instanceof Grafted) {
        return new Grafted(bimap3(v2.value0)(v2.value1)(v22.value0));
      }
      ;
      throw new Error("Failed pattern match at Halogen.VDom.Types (line 86, column 7 - line 86, column 27): " + [v22.constructor.name]);
    };
    return go2(v2.value2);
  });

  // output/Halogen.VDom.Util/foreign.js
  function unsafeGetAny(key, obj) {
    return obj[key];
  }
  function unsafeHasAny(key, obj) {
    return obj.hasOwnProperty(key);
  }
  function unsafeSetAny(key, val, obj) {
    obj[key] = val;
  }
  function forE2(a3, f) {
    var b2 = [];
    for (var i2 = 0; i2 < a3.length; i2++) {
      b2.push(f(i2, a3[i2]));
    }
    return b2;
  }
  function forEachE(a3, f) {
    for (var i2 = 0; i2 < a3.length; i2++) {
      f(a3[i2]);
    }
  }
  function forInE(o, f) {
    var ks = Object.keys(o);
    for (var i2 = 0; i2 < ks.length; i2++) {
      var k = ks[i2];
      f(k, o[k]);
    }
  }
  function diffWithIxE(a1, a22, f1, f2, f3) {
    var a3 = [];
    var l1 = a1.length;
    var l2 = a22.length;
    var i2 = 0;
    while (1) {
      if (i2 < l1) {
        if (i2 < l2) {
          a3.push(f1(i2, a1[i2], a22[i2]));
        } else {
          f2(i2, a1[i2]);
        }
      } else if (i2 < l2) {
        a3.push(f3(i2, a22[i2]));
      } else {
        break;
      }
      i2++;
    }
    return a3;
  }
  function strMapWithIxE(as, fk, f) {
    var o = {};
    for (var i2 = 0; i2 < as.length; i2++) {
      var a3 = as[i2];
      var k = fk(a3);
      o[k] = f(k, i2, a3);
    }
    return o;
  }
  function diffWithKeyAndIxE(o1, as, fk, f1, f2, f3) {
    var o2 = {};
    for (var i2 = 0; i2 < as.length; i2++) {
      var a3 = as[i2];
      var k = fk(a3);
      if (o1.hasOwnProperty(k)) {
        o2[k] = f1(k, i2, o1[k], a3);
      } else {
        o2[k] = f3(k, i2, a3);
      }
    }
    for (var k in o1) {
      if (k in o2) {
        continue;
      }
      f2(k, o1[k]);
    }
    return o2;
  }
  function refEq2(a3, b2) {
    return a3 === b2;
  }
  function createTextNode(s2, doc) {
    return doc.createTextNode(s2);
  }
  function setTextContent(s2, n) {
    n.textContent = s2;
  }
  function createElement(ns, name16, doc) {
    if (ns != null) {
      return doc.createElementNS(ns, name16);
    } else {
      return doc.createElement(name16);
    }
  }
  function insertChildIx(i2, a3, b2) {
    var n = b2.childNodes.item(i2) || null;
    if (n !== a3) {
      b2.insertBefore(a3, n);
    }
  }
  function removeChild(a3, b2) {
    if (b2 && a3.parentNode === b2) {
      b2.removeChild(a3);
    }
  }
  function parentNode(a3) {
    return a3.parentNode;
  }
  function setAttribute(ns, attr3, val, el) {
    if (ns != null) {
      el.setAttributeNS(ns, attr3, val);
    } else {
      el.setAttribute(attr3, val);
    }
  }
  function removeAttribute(ns, attr3, el) {
    if (ns != null) {
      el.removeAttributeNS(ns, attr3);
    } else {
      el.removeAttribute(attr3);
    }
  }
  function hasAttribute(ns, attr3, el) {
    if (ns != null) {
      return el.hasAttributeNS(ns, attr3);
    } else {
      return el.hasAttribute(attr3);
    }
  }
  function addEventListener(ev, listener, el) {
    el.addEventListener(ev, listener, false);
  }
  function removeEventListener(ev, listener, el) {
    el.removeEventListener(ev, listener, false);
  }
  var jsUndefined = void 0;

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };

  // output/Halogen.VDom.Util/index.js
  var unsafeLookup = unsafeGetAny;
  var unsafeFreeze2 = unsafeCoerce2;
  var pokeMutMap = unsafeSetAny;
  var newMutMap = newImpl;

  // output/Web.DOM.Element/foreign.js
  var getProp = function(name16) {
    return function(doctype) {
      return doctype[name16];
    };
  };
  var _namespaceURI = getProp("namespaceURI");
  var _prefix = getProp("prefix");
  var localName = getProp("localName");
  var tagName = getProp("tagName");

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp = function(name16) {
    return function(node) {
      return function() {
        return node[name16];
      };
    };
  };
  var children = getEffProp("children");
  var _firstElementChild = getEffProp("firstElementChild");
  var _lastElementChild = getEffProp("lastElementChild");
  var childElementCount = getEffProp("childElementCount");
  function _querySelector(selector) {
    return function(node) {
      return function() {
        return node.querySelector(selector);
      };
    };
  }

  // output/Web.DOM.ParentNode/index.js
  var map8 = /* @__PURE__ */ map(functorEffect);
  var querySelector = function(qs) {
    var $2 = map8(toMaybe);
    var $3 = _querySelector(qs);
    return function($4) {
      return $2($3($4));
    };
  };

  // output/Web.DOM.Element/index.js
  var toNode = unsafeCoerce2;

  // output/Halogen.VDom.DOM/index.js
  var $runtime_lazy2 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var haltWidget = function(v2) {
    return halt(v2.widget);
  };
  var $lazy_patchWidget = /* @__PURE__ */ $runtime_lazy2("patchWidget", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchWidget(291)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Widget) {
        var res = step(state3.widget, vdom.value0);
        var res$prime = unStep(function(v2) {
          return mkStep(new Step(v2.value0, {
            build: state3.build,
            widget: res
          }, $lazy_patchWidget(296), haltWidget));
        })(res);
        return res$prime;
      }
      ;
      haltWidget(state3);
      return state3.build(vdom);
    };
  });
  var patchWidget = /* @__PURE__ */ $lazy_patchWidget(286);
  var haltText = function(v2) {
    var parent2 = parentNode(v2.node);
    return removeChild(v2.node, parent2);
  };
  var $lazy_patchText = /* @__PURE__ */ $runtime_lazy2("patchText", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchText(82)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Text) {
        if (state3.value === vdom.value0) {
          return mkStep(new Step(state3.node, state3, $lazy_patchText(85), haltText));
        }
        ;
        if (otherwise) {
          var nextState = {
            build: state3.build,
            node: state3.node,
            value: vdom.value0
          };
          setTextContent(vdom.value0, state3.node);
          return mkStep(new Step(state3.node, nextState, $lazy_patchText(89), haltText));
        }
        ;
      }
      ;
      haltText(state3);
      return state3.build(vdom);
    };
  });
  var patchText = /* @__PURE__ */ $lazy_patchText(77);
  var haltKeyed = function(v2) {
    var parent2 = parentNode(v2.node);
    removeChild(v2.node, parent2);
    forInE(v2.children, function(v1, s2) {
      return halt(s2);
    });
    return halt(v2.attrs);
  };
  var haltElem = function(v2) {
    var parent2 = parentNode(v2.node);
    removeChild(v2.node, parent2);
    forEachE(v2.children, halt);
    return halt(v2.attrs);
  };
  var eqElemSpec = function(ns1, v2, ns2, v1) {
    var $63 = v2 === v1;
    if ($63) {
      if (ns1 instanceof Just && (ns2 instanceof Just && ns1.value0 === ns2.value0)) {
        return true;
      }
      ;
      if (ns1 instanceof Nothing && ns2 instanceof Nothing) {
        return true;
      }
      ;
      return false;
    }
    ;
    return false;
  };
  var $lazy_patchElem = /* @__PURE__ */ $runtime_lazy2("patchElem", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchElem(135)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Elem && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v2 = length2(vdom.value3);
        var v1 = length2(state3.children);
        if (v1 === 0 && v2 === 0) {
          var attrs2 = step(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchElem(149), haltElem));
        }
        ;
        var onThis = function(v22, s2) {
          return halt(s2);
        };
        var onThese = function(ix, s2, v22) {
          var res = step(s2, v22);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var onThat = function(ix, v22) {
          var res = state3.build(v22);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithIxE(state3.children, vdom.value3, onThese, onThis, onThat);
        var attrs2 = step(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchElem(172), haltElem));
      }
      ;
      haltElem(state3);
      return state3.build(vdom);
    };
  });
  var patchElem = /* @__PURE__ */ $lazy_patchElem(130);
  var $lazy_patchKeyed = /* @__PURE__ */ $runtime_lazy2("patchKeyed", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchKeyed(222)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Keyed && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v2 = length2(vdom.value3);
        if (state3.length === 0 && v2 === 0) {
          var attrs2 = step(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children,
            length: 0
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(237), haltKeyed));
        }
        ;
        var onThis = function(v22, s2) {
          return halt(s2);
        };
        var onThese = function(v22, ix$prime, s2, v3) {
          var res = step(s2, v3.value1);
          insertChildIx(ix$prime, extract2(res), state3.node);
          return res;
        };
        var onThat = function(v22, ix, v3) {
          var res = state3.build(v3.value1);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithKeyAndIxE(state3.children, vdom.value3, fst, onThese, onThis, onThat);
        var attrs2 = step(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2,
          length: v2
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(261), haltKeyed));
      }
      ;
      haltKeyed(state3);
      return state3.build(vdom);
    };
  });
  var patchKeyed = /* @__PURE__ */ $lazy_patchKeyed(217);
  var buildWidget = function(v2, build, w) {
    var res = v2.buildWidget(v2)(w);
    var res$prime = unStep(function(v1) {
      return mkStep(new Step(v1.value0, {
        build,
        widget: res
      }, patchWidget, haltWidget));
    })(res);
    return res$prime;
  };
  var buildText = function(v2, build, s2) {
    var node = createTextNode(s2, v2.document);
    var state3 = {
      build,
      node,
      value: s2
    };
    return mkStep(new Step(node, state3, patchText, haltText));
  };
  var buildKeyed = function(v2, build, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v2.document);
    var node = toNode(el);
    var onChild = function(v1, ix, v22) {
      var res = build(v22.value1);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = strMapWithIxE(ch1, fst, onChild);
    var attrs = v2.buildAttributes(el)(as1);
    var state3 = {
      build,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2,
      length: length2(ch1)
    };
    return mkStep(new Step(node, state3, patchKeyed, haltKeyed));
  };
  var buildElem = function(v2, build, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v2.document);
    var node = toNode(el);
    var onChild = function(ix, child) {
      var res = build(child);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = forE2(ch1, onChild);
    var attrs = v2.buildAttributes(el)(as1);
    var state3 = {
      build,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2
    };
    return mkStep(new Step(node, state3, patchElem, haltElem));
  };
  var buildVDom = function(spec) {
    var $lazy_build = $runtime_lazy2("build", "Halogen.VDom.DOM", function() {
      return function(v2) {
        if (v2 instanceof Text) {
          return buildText(spec, $lazy_build(59), v2.value0);
        }
        ;
        if (v2 instanceof Elem) {
          return buildElem(spec, $lazy_build(60), v2.value0, v2.value1, v2.value2, v2.value3);
        }
        ;
        if (v2 instanceof Keyed) {
          return buildKeyed(spec, $lazy_build(61), v2.value0, v2.value1, v2.value2, v2.value3);
        }
        ;
        if (v2 instanceof Widget) {
          return buildWidget(spec, $lazy_build(62), v2.value0);
        }
        ;
        if (v2 instanceof Grafted) {
          return $lazy_build(63)(runGraft(v2.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.VDom.DOM (line 58, column 27 - line 63, column 52): " + [v2.constructor.name]);
      };
    });
    var build = $lazy_build(58);
    return build;
  };

  // output/Foreign/foreign.js
  function typeOf(value15) {
    return typeof value15;
  }
  function tagOf(value15) {
    return Object.prototype.toString.call(value15).slice(8, -1);
  }
  var isArray = Array.isArray || function(value15) {
    return Object.prototype.toString.call(value15) === "[object Array]";
  };

  // output/Effect.Exception/foreign.js
  function error(msg) {
    return new Error(msg);
  }
  function message(e) {
    return e.message;
  }
  function throwException(e) {
    return function() {
      throw e;
    };
  }

  // output/Effect.Exception/index.js
  var $$throw = function($4) {
    return throwException(error($4));
  };

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };
  var catchError = function(dict) {
    return dict.catchError;
  };
  var $$try = function(dictMonadError) {
    var catchError1 = catchError(dictMonadError);
    var Monad0 = dictMonadError.MonadThrow0().Monad0();
    var map34 = map(Monad0.Bind1().Apply0().Functor0());
    var pure21 = pure(Monad0.Applicative0());
    return function(a3) {
      return catchError1(map34(Right.create)(a3))(function($52) {
        return pure21(Left.create($52));
      });
    };
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };
  var put = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(s2) {
      return state1(function(v2) {
        return new Tuple(unit, s2);
      });
    };
  };
  var modify_2 = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(f) {
      return state1(function(s2) {
        return new Tuple(unit, f(s2));
      });
    };
  };
  var get = function(dictMonadState) {
    return state(dictMonadState)(function(s2) {
      return new Tuple(s2, s2);
    });
  };

  // output/Effect.Class/index.js
  var monadEffectEffect = {
    liftEffect: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Monad.Except.Trans/index.js
  var map9 = /* @__PURE__ */ map(functorEither);
  var ExceptT = function(x3) {
    return x3;
  };
  var runExceptT = function(v2) {
    return v2;
  };
  var mapExceptT = function(f) {
    return function(v2) {
      return f(v2);
    };
  };
  var functorExceptT = function(dictFunctor) {
    var map114 = map(dictFunctor);
    return {
      map: function(f) {
        return mapExceptT(map114(map9(f)));
      }
    };
  };
  var monadExceptT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeExceptT(dictMonad);
      },
      Bind1: function() {
        return bindExceptT(dictMonad);
      }
    };
  };
  var bindExceptT = function(dictMonad) {
    var bind15 = bind(dictMonad.Bind1());
    var pure21 = pure(dictMonad.Applicative0());
    return {
      bind: function(v2) {
        return function(k) {
          return bind15(v2)(either(function($187) {
            return pure21(Left.create($187));
          })(function(a3) {
            var v1 = k(a3);
            return v1;
          }));
        };
      },
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var applyExceptT = function(dictMonad) {
    var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadExceptT(dictMonad)),
      Functor0: function() {
        return functorExceptT1;
      }
    };
  };
  var applicativeExceptT = function(dictMonad) {
    return {
      pure: function() {
        var $188 = pure(dictMonad.Applicative0());
        return function($189) {
          return ExceptT($188(Right.create($189)));
        };
      }(),
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var monadThrowExceptT = function(dictMonad) {
    var monadExceptT1 = monadExceptT(dictMonad);
    return {
      throwError: function() {
        var $198 = pure(dictMonad.Applicative0());
        return function($199) {
          return ExceptT($198(Left.create($199)));
        };
      }(),
      Monad0: function() {
        return monadExceptT1;
      }
    };
  };
  var altExceptT = function(dictSemigroup) {
    var append8 = append(dictSemigroup);
    return function(dictMonad) {
      var Bind1 = dictMonad.Bind1();
      var bind15 = bind(Bind1);
      var pure21 = pure(dictMonad.Applicative0());
      var functorExceptT1 = functorExceptT(Bind1.Apply0().Functor0());
      return {
        alt: function(v2) {
          return function(v1) {
            return bind15(v2)(function(rm) {
              if (rm instanceof Right) {
                return pure21(new Right(rm.value0));
              }
              ;
              if (rm instanceof Left) {
                return bind15(v1)(function(rn) {
                  if (rn instanceof Right) {
                    return pure21(new Right(rn.value0));
                  }
                  ;
                  if (rn instanceof Left) {
                    return pure21(new Left(append8(rm.value0)(rn.value0)));
                  }
                  ;
                  throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 86, column 9 - line 88, column 49): " + [rn.constructor.name]);
                });
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 82, column 5 - line 88, column 49): " + [rm.constructor.name]);
            });
          };
        },
        Functor0: function() {
          return functorExceptT1;
        }
      };
    };
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
  };

  // output/Data.List.NonEmpty/index.js
  var toList2 = function(v2) {
    return new Cons(v2.value0, v2.value1);
  };
  var singleton5 = /* @__PURE__ */ function() {
    var $199 = singleton2(plusList);
    return function($200) {
      return NonEmptyList($199($200));
    };
  }();
  var head = function(v2) {
    return v2.value0;
  };
  var cons$prime = function(x3) {
    return function(xs) {
      return new NonEmpty(x3, xs);
    };
  };
  var cons3 = function(y3) {
    return function(v2) {
      return new NonEmpty(y3, new Cons(v2.value0, v2.value1));
    };
  };

  // output/Data.String.CodeUnits/foreign.js
  var fromCharArray = function(a3) {
    return a3.join("");
  };
  var toCharArray = function(s2) {
    return s2.split("");
  };
  var _charAt = function(just) {
    return function(nothing) {
      return function(i2) {
        return function(s2) {
          return i2 >= 0 && i2 < s2.length ? just(s2.charAt(i2)) : nothing;
        };
      };
    };
  };
  var length3 = function(s2) {
    return s2.length;
  };
  var drop2 = function(n) {
    return function(s2) {
      return s2.substring(n);
    };
  };
  var splitAt = function(i2) {
    return function(s2) {
      return { before: s2.substring(0, i2), after: s2.substring(i2) };
    };
  };

  // output/Data.String.Unsafe/foreign.js
  var charAt = function(i2) {
    return function(s2) {
      if (i2 >= 0 && i2 < s2.length)
        return s2.charAt(i2);
      throw new Error("Data.String.Unsafe.charAt: Invalid index.");
    };
  };

  // output/Data.String.CodeUnits/index.js
  var stripPrefix = function(v2) {
    return function(str) {
      var v1 = splitAt(length3(v2))(str);
      var $20 = v1.before === v2;
      if ($20) {
        return new Just(v1.after);
      }
      ;
      return Nothing.value;
    };
  };
  var charAt2 = /* @__PURE__ */ function() {
    return _charAt(Just.create)(Nothing.value);
  }();

  // output/Foreign/index.js
  var show2 = /* @__PURE__ */ show(showString);
  var show1 = /* @__PURE__ */ show(showInt);
  var ForeignError = /* @__PURE__ */ function() {
    function ForeignError2(value0) {
      this.value0 = value0;
    }
    ;
    ForeignError2.create = function(value0) {
      return new ForeignError2(value0);
    };
    return ForeignError2;
  }();
  var TypeMismatch = /* @__PURE__ */ function() {
    function TypeMismatch2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    TypeMismatch2.create = function(value0) {
      return function(value1) {
        return new TypeMismatch2(value0, value1);
      };
    };
    return TypeMismatch2;
  }();
  var ErrorAtIndex = /* @__PURE__ */ function() {
    function ErrorAtIndex2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtIndex2.create = function(value0) {
      return function(value1) {
        return new ErrorAtIndex2(value0, value1);
      };
    };
    return ErrorAtIndex2;
  }();
  var ErrorAtProperty = /* @__PURE__ */ function() {
    function ErrorAtProperty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtProperty2.create = function(value0) {
      return function(value1) {
        return new ErrorAtProperty2(value0, value1);
      };
    };
    return ErrorAtProperty2;
  }();
  var unsafeToForeign = unsafeCoerce2;
  var unsafeFromForeign = unsafeCoerce2;
  var renderForeignError = function(v2) {
    if (v2 instanceof ForeignError) {
      return v2.value0;
    }
    ;
    if (v2 instanceof ErrorAtIndex) {
      return "Error at array index " + (show1(v2.value0) + (": " + renderForeignError(v2.value1)));
    }
    ;
    if (v2 instanceof ErrorAtProperty) {
      return "Error at property " + (show2(v2.value0) + (": " + renderForeignError(v2.value1)));
    }
    ;
    if (v2 instanceof TypeMismatch) {
      return "Type mismatch: expected " + (v2.value0 + (", found " + v2.value1));
    }
    ;
    throw new Error("Failed pattern match at Foreign (line 78, column 1 - line 78, column 45): " + [v2.constructor.name]);
  };
  var fail = function(dictMonad) {
    var $153 = throwError(monadThrowExceptT(dictMonad));
    return function($154) {
      return $153(singleton5($154));
    };
  };
  var unsafeReadTagged = function(dictMonad) {
    var pure110 = pure(applicativeExceptT(dictMonad));
    var fail1 = fail(dictMonad);
    return function(tag) {
      return function(value15) {
        if (tagOf(value15) === tag) {
          return pure110(unsafeFromForeign(value15));
        }
        ;
        if (otherwise) {
          return fail1(new TypeMismatch(tag, tagOf(value15)));
        }
        ;
        throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value15.constructor.name]);
      };
    };
  };
  var readString = function(dictMonad) {
    return unsafeReadTagged(dictMonad)("String");
  };

  // output/Foreign.Object/foreign.js
  var empty2 = {};
  function _lookup(no, yes, k, m2) {
    return k in m2 ? yes(m2[k]) : no;
  }
  function toArrayWithKey(f) {
    return function(m2) {
      var r2 = [];
      for (var k in m2) {
        if (hasOwnProperty.call(m2, k)) {
          r2.push(f(k)(m2[k]));
        }
      }
      return r2;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Data.Function.Uncurried/foreign.js
  var mkFn5 = function(fn) {
    return function(a3, b2, c2, d, e) {
      return fn(a3)(b2)(c2)(d)(e);
    };
  };
  var runFn3 = function(fn) {
    return function(a3) {
      return function(b2) {
        return function(c2) {
          return fn(a3, b2, c2);
        };
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a3) {
      return function(b2) {
        return function(c2) {
          return function(d) {
            return fn(a3, b2, c2, d);
          };
        };
      };
    };
  };

  // output/Foreign.Object/index.js
  var lookup = /* @__PURE__ */ function() {
    return runFn4(_lookup)(Nothing.value)(Just.create);
  }();

  // output/Web.Event.EventTarget/foreign.js
  function eventListener(fn) {
    return function() {
      return function(event) {
        return fn(event)();
      };
    };
  }
  function addEventListener2(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target6) {
          return function() {
            return target6.addEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }
  function removeEventListener2(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target6) {
          return function() {
            return target6.removeEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }

  // output/Halogen.VDom.DOM.Prop/index.js
  var $runtime_lazy3 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var Created = /* @__PURE__ */ function() {
    function Created2(value0) {
      this.value0 = value0;
    }
    ;
    Created2.create = function(value0) {
      return new Created2(value0);
    };
    return Created2;
  }();
  var Removed = /* @__PURE__ */ function() {
    function Removed2(value0) {
      this.value0 = value0;
    }
    ;
    Removed2.create = function(value0) {
      return new Removed2(value0);
    };
    return Removed2;
  }();
  var Attribute = /* @__PURE__ */ function() {
    function Attribute2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Attribute2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Attribute2(value0, value1, value22);
        };
      };
    };
    return Attribute2;
  }();
  var Property = /* @__PURE__ */ function() {
    function Property2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Property2.create = function(value0) {
      return function(value1) {
        return new Property2(value0, value1);
      };
    };
    return Property2;
  }();
  var Handler = /* @__PURE__ */ function() {
    function Handler2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Handler2.create = function(value0) {
      return function(value1) {
        return new Handler2(value0, value1);
      };
    };
    return Handler2;
  }();
  var Ref = /* @__PURE__ */ function() {
    function Ref2(value0) {
      this.value0 = value0;
    }
    ;
    Ref2.create = function(value0) {
      return new Ref2(value0);
    };
    return Ref2;
  }();
  var unsafeGetProperty = unsafeGetAny;
  var setProperty = unsafeSetAny;
  var removeProperty = function(key, el) {
    var v2 = hasAttribute(nullImpl, key, el);
    if (v2) {
      return removeAttribute(nullImpl, key, el);
    }
    ;
    var v1 = typeOf(unsafeGetAny(key, el));
    if (v1 === "string") {
      return unsafeSetAny(key, "", el);
    }
    ;
    if (key === "rowSpan") {
      return unsafeSetAny(key, 1, el);
    }
    ;
    if (key === "colSpan") {
      return unsafeSetAny(key, 1, el);
    }
    ;
    return unsafeSetAny(key, jsUndefined, el);
  };
  var propToStrKey = function(v2) {
    if (v2 instanceof Attribute && v2.value0 instanceof Just) {
      return "attr/" + (v2.value0.value0 + (":" + v2.value1));
    }
    ;
    if (v2 instanceof Attribute) {
      return "attr/:" + v2.value1;
    }
    ;
    if (v2 instanceof Property) {
      return "prop/" + v2.value0;
    }
    ;
    if (v2 instanceof Handler) {
      return "handler/" + v2.value0;
    }
    ;
    if (v2 instanceof Ref) {
      return "ref";
    }
    ;
    throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 182, column 16 - line 187, column 16): " + [v2.constructor.name]);
  };
  var propFromString = unsafeCoerce2;
  var propFromBoolean = unsafeCoerce2;
  var buildProp = function(emit) {
    return function(el) {
      var removeProp = function(prevEvents) {
        return function(v2, v1) {
          if (v1 instanceof Attribute) {
            return removeAttribute(toNullable(v1.value0), v1.value1, el);
          }
          ;
          if (v1 instanceof Property) {
            return removeProperty(v1.value0, el);
          }
          ;
          if (v1 instanceof Handler) {
            var handler3 = unsafeLookup(v1.value0, prevEvents);
            return removeEventListener(v1.value0, fst(handler3), el);
          }
          ;
          if (v1 instanceof Ref) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 169, column 5 - line 179, column 18): " + [v1.constructor.name]);
        };
      };
      var mbEmit = function(v2) {
        if (v2 instanceof Just) {
          return emit(v2.value0)();
        }
        ;
        return unit;
      };
      var haltProp = function(state3) {
        var v2 = lookup("ref")(state3.props);
        if (v2 instanceof Just && v2.value0 instanceof Ref) {
          return mbEmit(v2.value0.value0(new Removed(el)));
        }
        ;
        return unit;
      };
      var diffProp = function(prevEvents, events) {
        return function(v2, v1, v11, v22) {
          if (v11 instanceof Attribute && v22 instanceof Attribute) {
            var $65 = v11.value2 === v22.value2;
            if ($65) {
              return v22;
            }
            ;
            setAttribute(toNullable(v22.value0), v22.value1, v22.value2, el);
            return v22;
          }
          ;
          if (v11 instanceof Property && v22 instanceof Property) {
            var v4 = refEq2(v11.value1, v22.value1);
            if (v4) {
              return v22;
            }
            ;
            if (v22.value0 === "value") {
              var elVal = unsafeGetProperty("value", el);
              var $74 = refEq2(elVal, v22.value1);
              if ($74) {
                return v22;
              }
              ;
              setProperty(v22.value0, v22.value1, el);
              return v22;
            }
            ;
            setProperty(v22.value0, v22.value1, el);
            return v22;
          }
          ;
          if (v11 instanceof Handler && v22 instanceof Handler) {
            var handler3 = unsafeLookup(v22.value0, prevEvents);
            write(v22.value1)(snd(handler3))();
            pokeMutMap(v22.value0, handler3, events);
            return v22;
          }
          ;
          return v22;
        };
      };
      var applyProp = function(events) {
        return function(v2, v1, v22) {
          if (v22 instanceof Attribute) {
            setAttribute(toNullable(v22.value0), v22.value1, v22.value2, el);
            return v22;
          }
          ;
          if (v22 instanceof Property) {
            setProperty(v22.value0, v22.value1, el);
            return v22;
          }
          ;
          if (v22 instanceof Handler) {
            var v3 = unsafeGetAny(v22.value0, events);
            if (unsafeHasAny(v22.value0, events)) {
              write(v22.value1)(snd(v3))();
              return v22;
            }
            ;
            var ref2 = $$new(v22.value1)();
            var listener = eventListener(function(ev) {
              return function __do3() {
                var f$prime = read(ref2)();
                return mbEmit(f$prime(ev));
              };
            })();
            pokeMutMap(v22.value0, new Tuple(listener, ref2), events);
            addEventListener(v22.value0, listener, el);
            return v22;
          }
          ;
          if (v22 instanceof Ref) {
            mbEmit(v22.value0(new Created(el)));
            return v22;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 113, column 5 - line 135, column 15): " + [v22.constructor.name]);
        };
      };
      var $lazy_patchProp = $runtime_lazy3("patchProp", "Halogen.VDom.DOM.Prop", function() {
        return function(state3, ps2) {
          var events = newMutMap();
          var onThis = removeProp(state3.events);
          var onThese = diffProp(state3.events, events);
          var onThat = applyProp(events);
          var props = diffWithKeyAndIxE(state3.props, ps2, propToStrKey, onThese, onThis, onThat);
          var nextState = {
            events: unsafeFreeze2(events),
            props
          };
          return mkStep(new Step(unit, nextState, $lazy_patchProp(100), haltProp));
        };
      });
      var patchProp = $lazy_patchProp(87);
      var renderProp = function(ps1) {
        var events = newMutMap();
        var ps1$prime = strMapWithIxE(ps1, propToStrKey, applyProp(events));
        var state3 = {
          events: unsafeFreeze2(events),
          props: ps1$prime
        };
        return mkStep(new Step(unit, state3, patchProp, haltProp));
      };
      return renderProp;
    };
  };

  // output/Halogen.HTML.Core/index.js
  var HTML = function(x3) {
    return x3;
  };
  var widget = function($28) {
    return HTML(Widget.create($28));
  };
  var toPropValue = function(dict) {
    return dict.toPropValue;
  };
  var text = function($29) {
    return HTML(Text.create($29));
  };
  var prop = function(dictIsProp) {
    var toPropValue1 = toPropValue(dictIsProp);
    return function(v2) {
      var $31 = Property.create(v2);
      return function($32) {
        return $31(toPropValue1($32));
      };
    };
  };
  var isPropString = {
    toPropValue: propFromString
  };
  var isPropInputType = {
    toPropValue: function($45) {
      return propFromString(renderInputType($45));
    }
  };
  var isPropButtonType = {
    toPropValue: function($50) {
      return propFromString(renderButtonType($50));
    }
  };
  var isPropBoolean = {
    toPropValue: propFromBoolean
  };
  var handler = /* @__PURE__ */ function() {
    return Handler.create;
  }();
  var element = function(ns) {
    return function(name16) {
      return function(props) {
        return function(children2) {
          return new Elem(ns, name16, props, children2);
        };
      };
    };
  };
  var attr = function(ns) {
    return function(v2) {
      return Attribute.create(ns)(v2);
    };
  };

  // output/Halogen.HTML.Properties/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
  var prop2 = function(dictIsProp) {
    return prop(dictIsProp);
  };
  var prop1 = /* @__PURE__ */ prop2(isPropBoolean);
  var prop22 = /* @__PURE__ */ prop2(isPropString);
  var title = /* @__PURE__ */ prop22("title");
  var type_ = function(dictIsProp) {
    return prop2(dictIsProp)("type");
  };
  var value = function(dictIsProp) {
    return prop2(dictIsProp)("value");
  };
  var placeholder = /* @__PURE__ */ prop22("placeholder");
  var href = /* @__PURE__ */ prop22("href");
  var disabled = /* @__PURE__ */ prop1("disabled");
  var classes = /* @__PURE__ */ function() {
    var $32 = prop22("className");
    var $33 = joinWith(" ");
    var $34 = map(functorArray)(unwrap2);
    return function($35) {
      return $32($33($34($35)));
    };
  }();
  var class_ = /* @__PURE__ */ function() {
    var $36 = prop22("className");
    return function($37) {
      return $36(unwrap2($37));
    };
  }();
  var checked = /* @__PURE__ */ prop1("checked");
  var attr2 = /* @__PURE__ */ function() {
    return attr(Nothing.value);
  }();
  var style = /* @__PURE__ */ attr2("style");

  // output/Halogen.Svg.Attributes.Color/index.js
  var show3 = /* @__PURE__ */ show(showInt);
  var show12 = /* @__PURE__ */ show(showNumber);
  var RGB = /* @__PURE__ */ function() {
    function RGB2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    RGB2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new RGB2(value0, value1, value22);
        };
      };
    };
    return RGB2;
  }();
  var RGBA = /* @__PURE__ */ function() {
    function RGBA2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    RGBA2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new RGBA2(value0, value1, value22, value32);
          };
        };
      };
    };
    return RGBA2;
  }();
  var Named = /* @__PURE__ */ function() {
    function Named2(value0) {
      this.value0 = value0;
    }
    ;
    Named2.create = function(value0) {
      return new Named2(value0);
    };
    return Named2;
  }();
  var NoColor = /* @__PURE__ */ function() {
    function NoColor2() {
    }
    ;
    NoColor2.value = new NoColor2();
    return NoColor2;
  }();
  var printColor = function(v2) {
    if (v2 instanceof RGB) {
      return "rgb(" + (show3(v2.value0) + ("," + (show3(v2.value1) + ("," + (show3(v2.value2) + ")")))));
    }
    ;
    if (v2 instanceof RGBA) {
      return "rgba(" + (show3(v2.value0) + ("," + (show3(v2.value1) + ("," + (show3(v2.value2) + ("," + (show12(v2.value3) + ")")))))));
    }
    ;
    if (v2 instanceof Named) {
      return v2.value0;
    }
    ;
    if (v2 instanceof NoColor) {
      return "None";
    }
    ;
    throw new Error("Failed pattern match at Halogen.Svg.Attributes.Color (line 24, column 14 - line 28, column 20): " + [v2.constructor.name]);
  };

  // output/Halogen.Svg.Attributes/index.js
  var show4 = /* @__PURE__ */ show(showNumber);
  var map10 = /* @__PURE__ */ map(functorArray);
  var y2 = /* @__PURE__ */ function() {
    var $23 = attr2("y2");
    return function($24) {
      return $23(show4($24));
    };
  }();
  var y1 = /* @__PURE__ */ function() {
    var $25 = attr2("y1");
    return function($26) {
      return $25(show4($26));
    };
  }();
  var y = /* @__PURE__ */ function() {
    var $27 = attr2("y");
    return function($28) {
      return $27(show4($28));
    };
  }();
  var x2 = /* @__PURE__ */ function() {
    var $29 = attr2("x2");
    return function($30) {
      return $29(show4($30));
    };
  }();
  var x1 = /* @__PURE__ */ function() {
    var $31 = attr2("x1");
    return function($32) {
      return $31(show4($32));
    };
  }();
  var x = /* @__PURE__ */ function() {
    var $33 = attr2("x");
    return function($34) {
      return $33(show4($34));
    };
  }();
  var width = /* @__PURE__ */ function() {
    var $35 = attr2("width");
    return function($36) {
      return $35(show4($36));
    };
  }();
  var viewBox = function(x_) {
    return function(y_) {
      return function(w) {
        return function(h_) {
          return attr2("viewBox")(joinWith(" ")(map10(show4)([x_, y_, w, h_])));
        };
      };
    };
  };
  var strokeWidth = /* @__PURE__ */ function() {
    var $43 = attr2("stroke-width");
    return function($44) {
      return $43(show4($44));
    };
  }();
  var stroke = /* @__PURE__ */ function() {
    var $56 = attr2("stroke");
    return function($57) {
      return $56(printColor($57));
    };
  }();
  var r = /* @__PURE__ */ function() {
    var $69 = attr2("r");
    return function($70) {
      return $69(show4($70));
    };
  }();
  var height = /* @__PURE__ */ function() {
    var $92 = attr2("height");
    return function($93) {
      return $92(show4($93));
    };
  }();
  var fill = /* @__PURE__ */ function() {
    var $108 = attr2("fill");
    return function($109) {
      return $108(printColor($109));
    };
  }();
  var cy = /* @__PURE__ */ function() {
    var $117 = attr2("cy");
    return function($118) {
      return $117(show4($118));
    };
  }();
  var cx = /* @__PURE__ */ function() {
    var $119 = attr2("cx");
    return function($120) {
      return $119(show4($120));
    };
  }();

  // output/Halogen.HTML.Elements/index.js
  var pure2 = /* @__PURE__ */ pure(applicativeMaybe);
  var elementNS = function($15) {
    return element(pure2($15));
  };
  var element2 = /* @__PURE__ */ function() {
    return element(Nothing.value);
  }();
  var figure = /* @__PURE__ */ element2("figure");
  var form = /* @__PURE__ */ element2("form");
  var h1 = /* @__PURE__ */ element2("h1");
  var h1_ = /* @__PURE__ */ h1([]);
  var h2 = /* @__PURE__ */ element2("h2");
  var h2_ = /* @__PURE__ */ h2([]);
  var input = function(props) {
    return element2("input")(props)([]);
  };
  var label = /* @__PURE__ */ element2("label");
  var label_ = /* @__PURE__ */ label([]);
  var menu = /* @__PURE__ */ element2("menu");
  var p = /* @__PURE__ */ element2("p");
  var p_ = /* @__PURE__ */ p([]);
  var pre = /* @__PURE__ */ element2("pre");
  var pre_ = /* @__PURE__ */ pre([]);
  var span2 = /* @__PURE__ */ element2("span");
  var span_ = /* @__PURE__ */ span2([]);
  var strong = /* @__PURE__ */ element2("strong");
  var strong_ = /* @__PURE__ */ strong([]);
  var table = /* @__PURE__ */ element2("table");
  var table_ = /* @__PURE__ */ table([]);
  var td = /* @__PURE__ */ element2("td");
  var td_ = /* @__PURE__ */ td([]);
  var tr = /* @__PURE__ */ element2("tr");
  var $$var = /* @__PURE__ */ element2("var");
  var div2 = /* @__PURE__ */ element2("div");
  var div_ = /* @__PURE__ */ div2([]);
  var button = /* @__PURE__ */ element2("button");
  var a2 = /* @__PURE__ */ element2("a");

  // output/Halogen.Svg.Elements/index.js
  var element3 = /* @__PURE__ */ elementNS("http://www.w3.org/2000/svg");
  var g = /* @__PURE__ */ element3("g");
  var line = function(props) {
    return element3("line")(props)([]);
  };
  var svg = /* @__PURE__ */ element3("svg");
  var text2 = /* @__PURE__ */ element3("text");
  var circle = function(props) {
    return element3("circle")(props)([]);
  };

  // output/Charting.SparkLine/index.js
  var maximum2 = /* @__PURE__ */ maximum(ordNumber)(foldableList);
  var minimum2 = /* @__PURE__ */ minimum(ordNumber)(foldableList);
  var toUnfoldable3 = /* @__PURE__ */ toUnfoldable(unfoldableArray);
  var mapWithIndex2 = /* @__PURE__ */ mapWithIndex(functorWithIndexList);
  var renderSparkline = function(xs) {
    var reals = catMaybes(xs);
    var vmax = maximum2(reals);
    var vmin = minimum2(reals);
    var positionY = function(y3) {
      return 20 * (1 - y3);
    };
    var positionX = function(idx) {
      return toNumber(305 - (3 * idx | 0) | 0);
    };
    var normalize2 = function(v2) {
      var v1 = new Tuple(vmin, vmax);
      if (v1.value0 instanceof Just && v1.value1 instanceof Just) {
        var $17 = v1.value1.value0 === v1.value0.value0;
        if ($17) {
          return 0.5;
        }
        ;
        return (v2 - v1.value0.value0) / (v1.value1.value0 - v1.value0.value0);
      }
      ;
      return 0.5;
    };
    var mkVerticalBar = function(idx) {
      return line([x1(positionX(idx)), y1(0), x2(positionX(idx)), y2(20), stroke(new RGBA(120, 20, 20, 0.8)), strokeWidth(1)]);
    };
    var mkSegment = function(idx) {
      return function(v1) {
        return function(v2) {
          return line([x1(positionX(idx)), y1(positionY(normalize2(v1))), x2(positionX(idx + 1 | 0)), y2(positionY(normalize2(v2))), stroke(new RGBA(20, 20, 20, 0.8)), strokeWidth(1)]);
        };
      };
    };
    var render = function(idx) {
      return function(v2) {
        if (v2.value0 instanceof Just && (v2.value1 instanceof Just && (isFiniteImpl(v2.value0.value0) && isFiniteImpl(v2.value1.value0)))) {
          return mkSegment(idx)(v2.value0.value0)(v2.value1.value0);
        }
        ;
        return mkVerticalBar(idx);
      };
    };
    return svg([width(310), height(20), viewBox(0)(0)(310)(20)])(toUnfoldable3(mapWithIndex2(render)(zip(xs)(drop(1)(xs)))));
  };

  // output/Data.Enum/foreign.js
  function toCharCode(c2) {
    return c2.charCodeAt(0);
  }
  function fromCharCode(c2) {
    return String.fromCharCode(c2);
  }

  // output/Data.Enum/index.js
  var top2 = /* @__PURE__ */ top(boundedInt);
  var bottom2 = /* @__PURE__ */ bottom(boundedInt);
  var toEnum = function(dict) {
    return dict.toEnum;
  };
  var succ = function(dict) {
    return dict.succ;
  };
  var fromEnum = function(dict) {
    return dict.fromEnum;
  };
  var enumInt = {
    succ: function(n) {
      var $153 = n < top2;
      if ($153) {
        return new Just(n + 1 | 0);
      }
      ;
      return Nothing.value;
    },
    pred: function(n) {
      var $154 = n > bottom2;
      if ($154) {
        return new Just(n - 1 | 0);
      }
      ;
      return Nothing.value;
    },
    Ord0: function() {
      return ordInt;
    }
  };
  var defaultSucc = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a3) {
        return toEnum$prime(fromEnum$prime(a3) + 1 | 0);
      };
    };
  };
  var defaultPred = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a3) {
        return toEnum$prime(fromEnum$prime(a3) - 1 | 0);
      };
    };
  };
  var charToEnum = function(v2) {
    if (v2 >= bottom2 && v2 <= top2) {
      return new Just(fromCharCode(v2));
    }
    ;
    return Nothing.value;
  };
  var enumChar = {
    succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
    pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
    Ord0: function() {
      return ordChar;
    }
  };
  var boundedEnumChar = /* @__PURE__ */ function() {
    return {
      cardinality: toCharCode(top(boundedChar)) - toCharCode(bottom(boundedChar)) | 0,
      toEnum: charToEnum,
      fromEnum: toCharCode,
      Bounded0: function() {
        return boundedChar;
      },
      Enum1: function() {
        return enumChar;
      }
    };
  }();

  // output/Data.Lazy/foreign.js
  var defer2 = function(thunk) {
    var v2 = null;
    return function() {
      if (thunk === void 0)
        return v2;
      v2 = thunk();
      thunk = void 0;
      return v2;
    };
  };
  var force = function(l2) {
    return l2();
  };

  // output/Data.Map.Internal/index.js
  var identity8 = /* @__PURE__ */ identity(categoryFn);
  var Leaf = /* @__PURE__ */ function() {
    function Leaf2() {
    }
    ;
    Leaf2.value = new Leaf2();
    return Leaf2;
  }();
  var Two = /* @__PURE__ */ function() {
    function Two2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Two2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Two2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Two2;
  }();
  var Three = /* @__PURE__ */ function() {
    function Three2(value0, value1, value22, value32, value42, value52, value62) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
      this.value6 = value62;
    }
    ;
    Three2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return function(value62) {
                  return new Three2(value0, value1, value22, value32, value42, value52, value62);
                };
              };
            };
          };
        };
      };
    };
    return Three2;
  }();
  var TwoLeft = /* @__PURE__ */ function() {
    function TwoLeft2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    TwoLeft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new TwoLeft2(value0, value1, value22);
        };
      };
    };
    return TwoLeft2;
  }();
  var TwoRight = /* @__PURE__ */ function() {
    function TwoRight2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    TwoRight2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new TwoRight2(value0, value1, value22);
        };
      };
    };
    return TwoRight2;
  }();
  var ThreeLeft = /* @__PURE__ */ function() {
    function ThreeLeft2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeLeft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeLeft2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeLeft2;
  }();
  var ThreeMiddle = /* @__PURE__ */ function() {
    function ThreeMiddle2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeMiddle2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeMiddle2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeMiddle2;
  }();
  var ThreeRight = /* @__PURE__ */ function() {
    function ThreeRight2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeRight2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeRight2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeRight2;
  }();
  var KickUp = /* @__PURE__ */ function() {
    function KickUp2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    KickUp2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new KickUp2(value0, value1, value22, value32);
          };
        };
      };
    };
    return KickUp2;
  }();
  var size2 = function(v2) {
    if (v2 instanceof Leaf) {
      return 0;
    }
    ;
    if (v2 instanceof Two) {
      return (1 + size2(v2.value0) | 0) + size2(v2.value3) | 0;
    }
    ;
    if (v2 instanceof Three) {
      return ((2 + size2(v2.value0) | 0) + size2(v2.value3) | 0) + size2(v2.value6) | 0;
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 705, column 1 - line 705, column 35): " + [v2.constructor.name]);
  };
  var singleton7 = function(k) {
    return function(v2) {
      return new Two(Leaf.value, k, v2, Leaf.value);
    };
  };
  var toUnfoldableUnordered = function(dictUnfoldable) {
    var unfoldr2 = unfoldr(dictUnfoldable);
    return function(m2) {
      var go2 = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v2) {
          if (v2 instanceof Nil) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v2 instanceof Cons) {
            if (v2.value0 instanceof Leaf) {
              $copy_v = v2.value1;
              return;
            }
            ;
            if (v2.value0 instanceof Two) {
              $tco_done = true;
              return new Just(new Tuple(new Tuple(v2.value0.value1, v2.value0.value2), new Cons(v2.value0.value0, new Cons(v2.value0.value3, v2.value1))));
            }
            ;
            if (v2.value0 instanceof Three) {
              $tco_done = true;
              return new Just(new Tuple(new Tuple(v2.value0.value1, v2.value0.value2), new Cons(singleton7(v2.value0.value4)(v2.value0.value5), new Cons(v2.value0.value0, new Cons(v2.value0.value3, new Cons(v2.value0.value6, v2.value1))))));
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 645, column 18 - line 650, column 77): " + [v2.value0.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 644, column 3 - line 644, column 19): " + [v2.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return unfoldr2(go2)(new Cons(m2, Nil.value));
    };
  };
  var lookup2 = function(dictOrd) {
    var compare4 = compare(dictOrd);
    return function(k) {
      var go2 = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v2) {
          if (v2 instanceof Leaf) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v2 instanceof Two) {
            var v22 = compare4(k)(v2.value1);
            if (v22 instanceof EQ) {
              $tco_done = true;
              return new Just(v2.value2);
            }
            ;
            if (v22 instanceof LT) {
              $copy_v = v2.value0;
              return;
            }
            ;
            $copy_v = v2.value3;
            return;
          }
          ;
          if (v2 instanceof Three) {
            var v3 = compare4(k)(v2.value1);
            if (v3 instanceof EQ) {
              $tco_done = true;
              return new Just(v2.value2);
            }
            ;
            var v4 = compare4(k)(v2.value4);
            if (v4 instanceof EQ) {
              $tco_done = true;
              return new Just(v2.value5);
            }
            ;
            if (v3 instanceof LT) {
              $copy_v = v2.value0;
              return;
            }
            ;
            if (v4 instanceof GT) {
              $copy_v = v2.value6;
              return;
            }
            ;
            $copy_v = v2.value3;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 241, column 5 - line 241, column 22): " + [v2.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return go2;
    };
  };
  var functorMap = {
    map: function(v2) {
      return function(v1) {
        if (v1 instanceof Leaf) {
          return Leaf.value;
        }
        ;
        if (v1 instanceof Two) {
          return new Two(map(functorMap)(v2)(v1.value0), v1.value1, v2(v1.value2), map(functorMap)(v2)(v1.value3));
        }
        ;
        if (v1 instanceof Three) {
          return new Three(map(functorMap)(v2)(v1.value0), v1.value1, v2(v1.value2), map(functorMap)(v2)(v1.value3), v1.value4, v2(v1.value5), map(functorMap)(v2)(v1.value6));
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 116, column 1 - line 119, column 110): " + [v2.constructor.name, v1.constructor.name]);
      };
    }
  };
  var fromZipper = function($copy_dictOrd) {
    return function($copy_v) {
      return function($copy_tree) {
        var $tco_var_dictOrd = $copy_dictOrd;
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(dictOrd, v2, tree) {
          if (v2 instanceof Nil) {
            $tco_done = true;
            return tree;
          }
          ;
          if (v2 instanceof Cons) {
            if (v2.value0 instanceof TwoLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v2.value1;
              $copy_tree = new Two(tree, v2.value0.value0, v2.value0.value1, v2.value0.value2);
              return;
            }
            ;
            if (v2.value0 instanceof TwoRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v2.value1;
              $copy_tree = new Two(v2.value0.value0, v2.value0.value1, v2.value0.value2, tree);
              return;
            }
            ;
            if (v2.value0 instanceof ThreeLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v2.value1;
              $copy_tree = new Three(tree, v2.value0.value0, v2.value0.value1, v2.value0.value2, v2.value0.value3, v2.value0.value4, v2.value0.value5);
              return;
            }
            ;
            if (v2.value0 instanceof ThreeMiddle) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v2.value1;
              $copy_tree = new Three(v2.value0.value0, v2.value0.value1, v2.value0.value2, tree, v2.value0.value3, v2.value0.value4, v2.value0.value5);
              return;
            }
            ;
            if (v2.value0 instanceof ThreeRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v2.value1;
              $copy_tree = new Three(v2.value0.value0, v2.value0.value1, v2.value0.value2, v2.value0.value3, v2.value0.value4, v2.value0.value5, tree);
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 462, column 3 - line 467, column 88): " + [v2.value0.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 459, column 1 - line 459, column 80): " + [v2.constructor.name, tree.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_dictOrd, $tco_var_v, $copy_tree);
        }
        ;
        return $tco_result;
      };
    };
  };
  var insert = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare4 = compare(dictOrd);
    return function(k) {
      return function(v2) {
        var up = function($copy_v1) {
          return function($copy_v2) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v1, v22) {
              if (v1 instanceof Nil) {
                $tco_done = true;
                return new Two(v22.value0, v22.value1, v22.value2, v22.value3);
              }
              ;
              if (v1 instanceof Cons) {
                if (v1.value0 instanceof TwoLeft) {
                  $tco_done = true;
                  return fromZipper1(v1.value1)(new Three(v22.value0, v22.value1, v22.value2, v22.value3, v1.value0.value0, v1.value0.value1, v1.value0.value2));
                }
                ;
                if (v1.value0 instanceof TwoRight) {
                  $tco_done = true;
                  return fromZipper1(v1.value1)(new Three(v1.value0.value0, v1.value0.value1, v1.value0.value2, v22.value0, v22.value1, v22.value2, v22.value3));
                }
                ;
                if (v1.value0 instanceof ThreeLeft) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v22.value0, v22.value1, v22.value2, v22.value3), v1.value0.value0, v1.value0.value1, new Two(v1.value0.value2, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeMiddle) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v22.value0), v22.value1, v22.value2, new Two(v22.value3, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeRight) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v1.value0.value3), v1.value0.value4, v1.value0.value5, new Two(v22.value0, v22.value1, v22.value2, v22.value3));
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 5 - line 503, column 108): " + [v1.value0.constructor.name, v22.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 3 - line 495, column 56): " + [v1.constructor.name, v22.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v1, $copy_v2);
            }
            ;
            return $tco_result;
          };
        };
        var down = function($copy_ctx) {
          return function($copy_v1) {
            var $tco_var_ctx = $copy_ctx;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(ctx, v1) {
              if (v1 instanceof Leaf) {
                $tco_done1 = true;
                return up(ctx)(new KickUp(Leaf.value, k, v2, Leaf.value));
              }
              ;
              if (v1 instanceof Two) {
                var v22 = compare4(k)(v1.value1);
                if (v22 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(ctx)(new Two(v1.value0, k, v2, v1.value3));
                }
                ;
                if (v22 instanceof LT) {
                  $tco_var_ctx = new Cons(new TwoLeft(v1.value1, v1.value2, v1.value3), ctx);
                  $copy_v1 = v1.value0;
                  return;
                }
                ;
                $tco_var_ctx = new Cons(new TwoRight(v1.value0, v1.value1, v1.value2), ctx);
                $copy_v1 = v1.value3;
                return;
              }
              ;
              if (v1 instanceof Three) {
                var v3 = compare4(k)(v1.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(ctx)(new Three(v1.value0, k, v2, v1.value3, v1.value4, v1.value5, v1.value6));
                }
                ;
                var v4 = compare4(k)(v1.value4);
                if (v4 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(ctx)(new Three(v1.value0, v1.value1, v1.value2, v1.value3, k, v2, v1.value6));
                }
                ;
                if (v3 instanceof LT) {
                  $tco_var_ctx = new Cons(new ThreeLeft(v1.value1, v1.value2, v1.value3, v1.value4, v1.value5, v1.value6), ctx);
                  $copy_v1 = v1.value0;
                  return;
                }
                ;
                if (v3 instanceof GT && v4 instanceof LT) {
                  $tco_var_ctx = new Cons(new ThreeMiddle(v1.value0, v1.value1, v1.value2, v1.value4, v1.value5, v1.value6), ctx);
                  $copy_v1 = v1.value3;
                  return;
                }
                ;
                $tco_var_ctx = new Cons(new ThreeRight(v1.value0, v1.value1, v1.value2, v1.value3, v1.value4, v1.value5), ctx);
                $copy_v1 = v1.value6;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 478, column 3 - line 478, column 55): " + [ctx.constructor.name, v1.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_ctx, $copy_v1);
            }
            ;
            return $tco_result;
          };
        };
        return down(Nil.value);
      };
    };
  };
  var pop = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare4 = compare(dictOrd);
    return function(k) {
      var up = function($copy_ctxs) {
        return function($copy_tree) {
          var $tco_var_ctxs = $copy_ctxs;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(ctxs, tree) {
            if (ctxs instanceof Nil) {
              $tco_done = true;
              return tree;
            }
            ;
            if (ctxs instanceof Cons) {
              if (ctxs.value0 instanceof TwoLeft && (ctxs.value0.value2 instanceof Leaf && tree instanceof Leaf)) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && (ctxs.value0.value0 instanceof Leaf && tree instanceof Leaf)) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6)));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && (ctxs.value0.value2 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value3 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value4, ctxs.value0.value5, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0, ctxs.value0.value5.value1, ctxs.value0.value5.value2, ctxs.value0.value5.value3)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3, ctxs.value0.value4, ctxs.value0.value5, tree)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0), ctxs.value0.value5.value1, ctxs.value0.value5.value2, new Two(ctxs.value0.value5.value3, ctxs.value0.value5.value4, ctxs.value0.value5.value5, ctxs.value0.value5.value6)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3), ctxs.value0.value3.value4, ctxs.value0.value3.value5, new Two(ctxs.value0.value3.value6, ctxs.value0.value4, ctxs.value0.value5, tree)));
              }
              ;
              $tco_done = true;
              return unsafeCrashWith("The impossible happened in partial function `up`.");
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 552, column 5 - line 573, column 86): " + [ctxs.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_ctxs, $copy_tree);
          }
          ;
          return $tco_result;
        };
      };
      var removeMaxNode = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(ctx, m2) {
            if (m2 instanceof Two && (m2.value0 instanceof Leaf && m2.value3 instanceof Leaf)) {
              $tco_done1 = true;
              return up(ctx)(Leaf.value);
            }
            ;
            if (m2 instanceof Two) {
              $tco_var_ctx = new Cons(new TwoRight(m2.value0, m2.value1, m2.value2), ctx);
              $copy_m = m2.value3;
              return;
            }
            ;
            if (m2 instanceof Three && (m2.value0 instanceof Leaf && (m2.value3 instanceof Leaf && m2.value6 instanceof Leaf))) {
              $tco_done1 = true;
              return up(new Cons(new TwoRight(Leaf.value, m2.value1, m2.value2), ctx))(Leaf.value);
            }
            ;
            if (m2 instanceof Three) {
              $tco_var_ctx = new Cons(new ThreeRight(m2.value0, m2.value1, m2.value2, m2.value3, m2.value4, m2.value5), ctx);
              $copy_m = m2.value6;
              return;
            }
            ;
            $tco_done1 = true;
            return unsafeCrashWith("The impossible happened in partial function `removeMaxNode`.");
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_m);
          }
          ;
          return $tco_result;
        };
      };
      var maxNode = function($copy_m) {
        var $tco_done2 = false;
        var $tco_result;
        function $tco_loop(m2) {
          if (m2 instanceof Two && m2.value3 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m2.value1,
              value: m2.value2
            };
          }
          ;
          if (m2 instanceof Two) {
            $copy_m = m2.value3;
            return;
          }
          ;
          if (m2 instanceof Three && m2.value6 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m2.value4,
              value: m2.value5
            };
          }
          ;
          if (m2 instanceof Three) {
            $copy_m = m2.value6;
            return;
          }
          ;
          $tco_done2 = true;
          return unsafeCrashWith("The impossible happened in partial function `maxNode`.");
        }
        ;
        while (!$tco_done2) {
          $tco_result = $tco_loop($copy_m);
        }
        ;
        return $tco_result;
      };
      var down = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done3 = false;
          var $tco_result;
          function $tco_loop(ctx, m2) {
            if (m2 instanceof Leaf) {
              $tco_done3 = true;
              return Nothing.value;
            }
            ;
            if (m2 instanceof Two) {
              var v2 = compare4(k)(m2.value1);
              if (m2.value3 instanceof Leaf && v2 instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m2.value2, up(ctx)(Leaf.value)));
              }
              ;
              if (v2 instanceof EQ) {
                var max6 = maxNode(m2.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m2.value2, removeMaxNode(new Cons(new TwoLeft(max6.key, max6.value, m2.value3), ctx))(m2.value0)));
              }
              ;
              if (v2 instanceof LT) {
                $tco_var_ctx = new Cons(new TwoLeft(m2.value1, m2.value2, m2.value3), ctx);
                $copy_m = m2.value0;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new TwoRight(m2.value0, m2.value1, m2.value2), ctx);
              $copy_m = m2.value3;
              return;
            }
            ;
            if (m2 instanceof Three) {
              var leaves = function() {
                if (m2.value0 instanceof Leaf && (m2.value3 instanceof Leaf && m2.value6 instanceof Leaf)) {
                  return true;
                }
                ;
                return false;
              }();
              var v2 = compare4(k)(m2.value4);
              var v3 = compare4(k)(m2.value1);
              if (leaves && v3 instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m2.value2, fromZipper1(ctx)(new Two(Leaf.value, m2.value4, m2.value5, Leaf.value))));
              }
              ;
              if (leaves && v2 instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m2.value5, fromZipper1(ctx)(new Two(Leaf.value, m2.value1, m2.value2, Leaf.value))));
              }
              ;
              if (v3 instanceof EQ) {
                var max6 = maxNode(m2.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m2.value2, removeMaxNode(new Cons(new ThreeLeft(max6.key, max6.value, m2.value3, m2.value4, m2.value5, m2.value6), ctx))(m2.value0)));
              }
              ;
              if (v2 instanceof EQ) {
                var max6 = maxNode(m2.value3);
                $tco_done3 = true;
                return new Just(new Tuple(m2.value5, removeMaxNode(new Cons(new ThreeMiddle(m2.value0, m2.value1, m2.value2, max6.key, max6.value, m2.value6), ctx))(m2.value3)));
              }
              ;
              if (v3 instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeLeft(m2.value1, m2.value2, m2.value3, m2.value4, m2.value5, m2.value6), ctx);
                $copy_m = m2.value0;
                return;
              }
              ;
              if (v3 instanceof GT && v2 instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeMiddle(m2.value0, m2.value1, m2.value2, m2.value4, m2.value5, m2.value6), ctx);
                $copy_m = m2.value3;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new ThreeRight(m2.value0, m2.value1, m2.value2, m2.value3, m2.value4, m2.value5), ctx);
              $copy_m = m2.value6;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 525, column 16 - line 548, column 80): " + [m2.constructor.name]);
          }
          ;
          while (!$tco_done3) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_m);
          }
          ;
          return $tco_result;
        };
      };
      return down(Nil.value);
    };
  };
  var foldableMap = {
    foldr: function(f) {
      return function(z2) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return z2;
          }
          ;
          if (m2 instanceof Two) {
            return foldr(foldableMap)(f)(f(m2.value2)(foldr(foldableMap)(f)(z2)(m2.value3)))(m2.value0);
          }
          ;
          if (m2 instanceof Three) {
            return foldr(foldableMap)(f)(f(m2.value2)(foldr(foldableMap)(f)(f(m2.value5)(foldr(foldableMap)(f)(z2)(m2.value6)))(m2.value3)))(m2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 133, column 17 - line 136, column 85): " + [m2.constructor.name]);
        };
      };
    },
    foldl: function(f) {
      return function(z2) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return z2;
          }
          ;
          if (m2 instanceof Two) {
            return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z2)(m2.value0))(m2.value2))(m2.value3);
          }
          ;
          if (m2 instanceof Three) {
            return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z2)(m2.value0))(m2.value2))(m2.value3))(m2.value5))(m2.value6);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 137, column 17 - line 140, column 85): " + [m2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      var append22 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return mempty3;
          }
          ;
          if (m2 instanceof Two) {
            return append22(foldMap(foldableMap)(dictMonoid)(f)(m2.value0))(append22(f(m2.value2))(foldMap(foldableMap)(dictMonoid)(f)(m2.value3)));
          }
          ;
          if (m2 instanceof Three) {
            return append22(foldMap(foldableMap)(dictMonoid)(f)(m2.value0))(append22(f(m2.value2))(append22(foldMap(foldableMap)(dictMonoid)(f)(m2.value3))(append22(f(m2.value5))(foldMap(foldableMap)(dictMonoid)(f)(m2.value6)))));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 141, column 17 - line 144, column 93): " + [m2.constructor.name]);
        };
      };
    }
  };
  var foldableWithIndexMap = {
    foldrWithIndex: function(f) {
      return function(z2) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return z2;
          }
          ;
          if (m2 instanceof Two) {
            return foldrWithIndex(foldableWithIndexMap)(f)(f(m2.value1)(m2.value2)(foldrWithIndex(foldableWithIndexMap)(f)(z2)(m2.value3)))(m2.value0);
          }
          ;
          if (m2 instanceof Three) {
            return foldrWithIndex(foldableWithIndexMap)(f)(f(m2.value1)(m2.value2)(foldrWithIndex(foldableWithIndexMap)(f)(f(m2.value4)(m2.value5)(foldrWithIndex(foldableWithIndexMap)(f)(z2)(m2.value6)))(m2.value3)))(m2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 147, column 26 - line 150, column 120): " + [m2.constructor.name]);
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z2) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return z2;
          }
          ;
          if (m2 instanceof Two) {
            return foldlWithIndex(foldableWithIndexMap)(f)(f(m2.value1)(foldlWithIndex(foldableWithIndexMap)(f)(z2)(m2.value0))(m2.value2))(m2.value3);
          }
          ;
          if (m2 instanceof Three) {
            return foldlWithIndex(foldableWithIndexMap)(f)(f(m2.value4)(foldlWithIndex(foldableWithIndexMap)(f)(f(m2.value1)(foldlWithIndex(foldableWithIndexMap)(f)(z2)(m2.value0))(m2.value2))(m2.value3))(m2.value5))(m2.value6);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 151, column 26 - line 154, column 120): " + [m2.constructor.name]);
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      var append22 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return mempty3;
          }
          ;
          if (m2 instanceof Two) {
            return append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m2.value0))(append22(f(m2.value1)(m2.value2))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m2.value3)));
          }
          ;
          if (m2 instanceof Three) {
            return append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m2.value0))(append22(f(m2.value1)(m2.value2))(append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m2.value3))(append22(f(m2.value4)(m2.value5))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m2.value6)))));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 155, column 26 - line 158, column 128): " + [m2.constructor.name]);
        };
      };
    },
    Foldable0: function() {
      return foldableMap;
    }
  };
  var foldrWithIndex2 = /* @__PURE__ */ foldrWithIndex(foldableWithIndexMap);
  var foldlWithIndex2 = /* @__PURE__ */ foldlWithIndex(foldableWithIndexMap);
  var keys2 = /* @__PURE__ */ function() {
    return foldrWithIndex2(function(k) {
      return function(v2) {
        return function(acc) {
          return new Cons(k, acc);
        };
      };
    })(Nil.value);
  }();
  var traversableMap = {
    traverse: function(dictApplicative) {
      var pure110 = pure(dictApplicative);
      var Apply0 = dictApplicative.Apply0();
      var apply3 = apply(Apply0);
      var map114 = map(Apply0.Functor0());
      return function(v2) {
        return function(v1) {
          if (v1 instanceof Leaf) {
            return pure110(Leaf.value);
          }
          ;
          if (v1 instanceof Two) {
            return apply3(apply3(apply3(map114(Two.create)(traverse(traversableMap)(dictApplicative)(v2)(v1.value0)))(pure110(v1.value1)))(v2(v1.value2)))(traverse(traversableMap)(dictApplicative)(v2)(v1.value3));
          }
          ;
          if (v1 instanceof Three) {
            return apply3(apply3(apply3(apply3(apply3(apply3(map114(Three.create)(traverse(traversableMap)(dictApplicative)(v2)(v1.value0)))(pure110(v1.value1)))(v2(v1.value2)))(traverse(traversableMap)(dictApplicative)(v2)(v1.value3)))(pure110(v1.value4)))(v2(v1.value5)))(traverse(traversableMap)(dictApplicative)(v2)(v1.value6));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 160, column 1 - line 175, column 31): " + [v2.constructor.name, v1.constructor.name]);
        };
      };
    },
    sequence: function(dictApplicative) {
      return traverse(traversableMap)(dictApplicative)(identity8);
    },
    Functor0: function() {
      return functorMap;
    },
    Foldable1: function() {
      return foldableMap;
    }
  };
  var empty3 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var fromFoldable3 = function(dictOrd) {
    var insert13 = insert(dictOrd);
    return function(dictFoldable) {
      return foldl(dictFoldable)(function(m2) {
        return function(v2) {
          return insert13(v2.value0)(v2.value1)(m2);
        };
      })(empty3);
    };
  };
  var $$delete = function(dictOrd) {
    var pop12 = pop(dictOrd);
    return function(k) {
      return function(m2) {
        return maybe(m2)(snd)(pop12(k)(m2));
      };
    };
  };
  var alter = function(dictOrd) {
    var lookup13 = lookup2(dictOrd);
    var delete1 = $$delete(dictOrd);
    var insert13 = insert(dictOrd);
    return function(f) {
      return function(k) {
        return function(m2) {
          var v2 = f(lookup13(k)(m2));
          if (v2 instanceof Nothing) {
            return delete1(k)(m2);
          }
          ;
          if (v2 instanceof Just) {
            return insert13(k)(v2.value0)(m2);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 596, column 15 - line 598, column 25): " + [v2.constructor.name]);
        };
      };
    };
  };
  var fromFoldableWith = function(dictOrd) {
    var alter1 = alter(dictOrd);
    return function(dictFoldable) {
      var foldl12 = foldl(dictFoldable);
      return function(f) {
        var combine = function(v2) {
          return function(v1) {
            if (v1 instanceof Just) {
              return new Just(f(v2)(v1.value0));
            }
            ;
            if (v1 instanceof Nothing) {
              return new Just(v2);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 613, column 3 - line 613, column 38): " + [v2.constructor.name, v1.constructor.name]);
          };
        };
        return foldl12(function(m2) {
          return function(v2) {
            return alter1(combine(v2.value1))(v2.value0)(m2);
          };
        })(empty3);
      };
    };
  };
  var unionWith = function(dictOrd) {
    var alter1 = alter(dictOrd);
    return function(f) {
      return function(m1) {
        return function(m2) {
          var go2 = function(k) {
            return function(m3) {
              return function(v2) {
                return alter1(function() {
                  var $932 = maybe(v2)(f(v2));
                  return function($933) {
                    return Just.create($932($933));
                  };
                }())(k)(m3);
              };
            };
          };
          return foldlWithIndex2(go2)(m2)(m1);
        };
      };
    };
  };
  var union2 = function(dictOrd) {
    return unionWith(dictOrd)($$const);
  };

  // output/Data.Number.Format/foreign.js
  function wrap(method2) {
    return function(d) {
      return function(num) {
        return method2.apply(num, [d]);
      };
    };
  }
  var toPrecisionNative = wrap(Number.prototype.toPrecision);
  var toFixedNative = wrap(Number.prototype.toFixed);
  var toExponentialNative = wrap(Number.prototype.toExponential);
  function toString(num) {
    return num.toString();
  }

  // output/Data.Number.Format/index.js
  var clamp2 = /* @__PURE__ */ clamp(ordInt);
  var Precision = /* @__PURE__ */ function() {
    function Precision2(value0) {
      this.value0 = value0;
    }
    ;
    Precision2.create = function(value0) {
      return new Precision2(value0);
    };
    return Precision2;
  }();
  var Fixed = /* @__PURE__ */ function() {
    function Fixed2(value0) {
      this.value0 = value0;
    }
    ;
    Fixed2.create = function(value0) {
      return new Fixed2(value0);
    };
    return Fixed2;
  }();
  var Exponential = /* @__PURE__ */ function() {
    function Exponential2(value0) {
      this.value0 = value0;
    }
    ;
    Exponential2.create = function(value0) {
      return new Exponential2(value0);
    };
    return Exponential2;
  }();
  var toStringWith = function(v2) {
    if (v2 instanceof Precision) {
      return toPrecisionNative(v2.value0);
    }
    ;
    if (v2 instanceof Fixed) {
      return toFixedNative(v2.value0);
    }
    ;
    if (v2 instanceof Exponential) {
      return toExponentialNative(v2.value0);
    }
    ;
    throw new Error("Failed pattern match at Data.Number.Format (line 59, column 1 - line 59, column 43): " + [v2.constructor.name]);
  };
  var fixed = /* @__PURE__ */ function() {
    var $9 = clamp2(0)(20);
    return function($10) {
      return Fixed.create($9($10));
    };
  }();

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler2(error4) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error4) {
        setTimeout(function() {
          throw error4;
        }, 0);
      }
    }
    function runSync(left, right, eff) {
      try {
        return right(eff());
      } catch (error4) {
        return left(error4);
      }
    }
    function runAsync(left, eff, k) {
      try {
        return eff(k)();
      } catch (error4) {
        k(left(error4))();
        return nonCanceler2;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size6 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size6 !== 0) {
          size6--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i2, tmp;
          if (size6 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size6) % limit] = cb;
          size6++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill2(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill2(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error4) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status = SUSPENDED;
      var step4 = aff;
      var fail4 = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run3(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status) {
            case STEP_BIND:
              status = CONTINUE;
              try {
                step4 = bhead(step4);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status = RETURN;
                fail4 = util.left(e);
                step4 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step4)) {
                status = RETURN;
                fail4 = step4;
                step4 = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step4 = util.fromRight(step4);
              }
              break;
            case CONTINUE:
              switch (step4.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step4._2;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step4 = util.right(step4._1);
                  } else {
                    status = STEP_BIND;
                    step4 = step4._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step4 = runSync(util.left, util.right, step4._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step4 = runAsync(util.left, step4._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status = STEP_RESULT;
                        step4 = result2;
                        run3(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail4 = util.left(step4._1);
                  step4 = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step4, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step4, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step4._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step4._1) {
                    tmp.run();
                  }
                  step4 = util.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step4 = sequential3(util, supervisor, step4._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step4 = interrupt || fail4 || step4;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status = RETURN;
                    } else if (fail4) {
                      status = CONTINUE;
                      step4 = attempt._2(util.fromLeft(fail4));
                      fail4 = null;
                    }
                    break;
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail4) {
                      status = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status = STEP_BIND;
                      step4 = util.fromRight(step4);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail4 === null) {
                      result = util.fromRight(step4);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step4 = attempt._3(result);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail4), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step4 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail4) {
                      step4 = attempt._1.failed(util.fromLeft(fail4))(attempt._2);
                    } else {
                      step4 = attempt._1.completed(util.fromRight(step4))(attempt._2);
                    }
                    fail4 = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail4), attempts, interrupt);
                    status = CONTINUE;
                    step4 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step4 = attempt._1;
                    fail4 = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step4));
                }
              }
              joins = null;
              if (interrupt && fail4) {
                setTimeout(function() {
                  throw util.fromLeft(fail4);
                }, 0);
              } else if (util.isLeft(step4) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step4);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join4) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join4.rethrow;
            join4.handler(step4)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join4;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill2(error4, cb) {
        return function() {
          if (status === COMPLETED) {
            cb(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util.right(void 0));
            }
          })();
          switch (status) {
            case SUSPENDED:
              interrupt = util.left(error4);
              status = COMPLETED;
              step4 = interrupt;
              run3(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error4);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step4(error4)), attempts, interrupt);
                }
                status = RETURN;
                step4 = null;
                fail4 = null;
                run3(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error4);
              }
              if (bracketCount === 0) {
                status = RETURN;
                step4 = null;
                fail4 = null;
              }
          }
          return canceler;
        };
      }
      function join3(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status === SUSPENDED) {
            run3(runTick);
          }
          return canceler;
        };
      }
      return {
        kill: kill2,
        join: join3,
        onComplete,
        isSuspended: function() {
          return status === SUSPENDED;
        },
        run: function() {
          if (status === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run3(runTick);
              });
            } else {
              run3(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root = EMPTY;
      function kill2(error4, par2, cb2) {
        var step4 = par2;
        var head6 = null;
        var tail2 = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step4.tag) {
              case FORKED:
                if (step4._3 === EMPTY) {
                  tmp = fibers[step4._1];
                  kills2[count++] = tmp.kill(error4, function(result) {
                    return function() {
                      count--;
                      if (count === 0) {
                        cb2(result)();
                      }
                    };
                  });
                }
                if (head6 === null) {
                  break loop;
                }
                step4 = head6._2;
                if (tail2 === null) {
                  head6 = null;
                } else {
                  head6 = tail2._1;
                  tail2 = tail2._2;
                }
                break;
              case MAP:
                step4 = step4._2;
                break;
              case APPLY:
              case ALT:
                if (head6) {
                  tail2 = new Aff2(CONS, head6, tail2);
                }
                head6 = step4;
                step4 = step4._1;
                break;
            }
          }
        if (count === 0) {
          cb2(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join3(result, head6, tail2) {
        var fail4, step4, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail4 = result;
          step4 = null;
        } else {
          step4 = result;
          fail4 = null;
        }
        loop:
          while (true) {
            lhs = null;
            rhs = null;
            tmp = null;
            kid = null;
            if (interrupt !== null) {
              return;
            }
            if (head6 === null) {
              cb(fail4 || step4)();
              return;
            }
            if (head6._3 !== EMPTY) {
              return;
            }
            switch (head6.tag) {
              case MAP:
                if (fail4 === null) {
                  head6._3 = util.right(head6._1(util.fromRight(step4)));
                  step4 = head6._3;
                } else {
                  head6._3 = fail4;
                }
                break;
              case APPLY:
                lhs = head6._1._3;
                rhs = head6._2._3;
                if (fail4) {
                  head6._3 = fail4;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill2(early, fail4 === lhs ? head6._2 : head6._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail2 === null) {
                        join3(fail4, null, null);
                      } else {
                        join3(fail4, tail2._1, tail2._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                } else if (lhs === EMPTY || rhs === EMPTY) {
                  return;
                } else {
                  step4 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                  head6._3 = step4;
                }
                break;
              case ALT:
                lhs = head6._1._3;
                rhs = head6._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail4 = step4 === lhs ? rhs : lhs;
                  step4 = null;
                  head6._3 = fail4;
                } else {
                  head6._3 = step4;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill2(early, step4 === lhs ? head6._2 : head6._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail2 === null) {
                        join3(step4, null, null);
                      } else {
                        join3(step4, tail2._1, tail2._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                }
                break;
            }
            if (tail2 === null) {
              head6 = null;
            } else {
              head6 = tail2._1;
              tail2 = tail2._2;
            }
          }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join3(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run3() {
        var status = CONTINUE;
        var step4 = par;
        var head6 = null;
        var tail2 = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status) {
              case CONTINUE:
                switch (step4.tag) {
                  case MAP:
                    if (head6) {
                      tail2 = new Aff2(CONS, head6, tail2);
                    }
                    head6 = new Aff2(MAP, step4._1, EMPTY, EMPTY);
                    step4 = step4._2;
                    break;
                  case APPLY:
                    if (head6) {
                      tail2 = new Aff2(CONS, head6, tail2);
                    }
                    head6 = new Aff2(APPLY, EMPTY, step4._2, EMPTY);
                    step4 = step4._1;
                    break;
                  case ALT:
                    if (head6) {
                      tail2 = new Aff2(CONS, head6, tail2);
                    }
                    head6 = new Aff2(ALT, EMPTY, step4._2, EMPTY);
                    step4 = step4._1;
                    break;
                  default:
                    fid = fiberId++;
                    status = RETURN;
                    tmp = step4;
                    step4 = new Aff2(FORKED, fid, new Aff2(CONS, head6, tail2), EMPTY);
                    tmp = Fiber(util, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve(step4)
                    })();
                    fibers[fid] = tmp;
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                }
                break;
              case RETURN:
                if (head6 === null) {
                  break loop;
                }
                if (head6._1 === EMPTY) {
                  head6._1 = step4;
                  status = CONTINUE;
                  step4 = head6._2;
                  head6._2 = EMPTY;
                } else {
                  head6._2 = step4;
                  step4 = head6;
                  if (tail2 === null) {
                    head6 = null;
                  } else {
                    head6 = tail2._1;
                    tail2 = tail2._2;
                  }
                }
            }
          }
        root = step4;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error4, cb2) {
        interrupt = util.left(error4);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill2(error4, root, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler2;
            };
          });
        };
      }
      run3();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential3(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler2;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _catchError(aff) {
    return function(k) {
      return Aff.Catch(aff, k);
    };
  }
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value15) {
          return Aff.Pure(f(value15));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  function _fork(immediate) {
    return function(aff) {
      return Aff.Fork(immediate, aff);
    };
  }
  var _liftEffect = Aff.Sync;
  function _parAffMap(f) {
    return function(aff) {
      return Aff.ParMap(f, aff);
    };
  }
  function _parAffApply(aff1) {
    return function(aff2) {
      return Aff.ParApply(aff1, aff2);
    };
  }
  var makeAff = Aff.Async;
  function generalBracket(acquire) {
    return function(options2) {
      return function(k) {
        return Aff.Bracket(acquire, options2, k);
      };
    };
  }
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var _delay = function() {
    function setDelay(n, k) {
      if (n === 0 && typeof setImmediate !== "undefined") {
        return setImmediate(k);
      } else {
        return setTimeout(k, n);
      }
    }
    function clearDelay(n, t2) {
      if (n === 0 && typeof clearImmediate !== "undefined") {
        return clearImmediate(t2);
      } else {
        return clearTimeout(t2);
      }
    }
    return function(right, ms) {
      return Aff.Async(function(cb) {
        return function() {
          var timer = setDelay(ms, cb(right()));
          return function() {
            return Aff.Sync(function() {
              return right(clearDelay(ms, timer));
            });
          };
        };
      });
    };
  }();
  var _sequential = Aff.Seq;

  // output/Control.Parallel.Class/index.js
  var sequential = function(dict) {
    return dict.sequential;
  };
  var parallel = function(dict) {
    return dict.parallel;
  };

  // output/Control.Parallel/index.js
  var identity9 = /* @__PURE__ */ identity(categoryFn);
  var parTraverse_ = function(dictParallel) {
    var sequential3 = sequential(dictParallel);
    var traverse_8 = traverse_(dictParallel.Applicative1());
    var parallel3 = parallel(dictParallel);
    return function(dictFoldable) {
      var traverse_14 = traverse_8(dictFoldable);
      return function(f) {
        var $48 = traverse_14(function($50) {
          return parallel3(f($50));
        });
        return function($49) {
          return sequential3($48($49));
        };
      };
    };
  };
  var parSequence_ = function(dictParallel) {
    var parTraverse_1 = parTraverse_(dictParallel);
    return function(dictFoldable) {
      return parTraverse_1(dictFoldable)(identity9);
    };
  };

  // output/Effect.Unsafe/foreign.js
  var unsafePerformEffect = function(f) {
    return f();
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy4 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var pure3 = /* @__PURE__ */ pure(applicativeEffect);
  var $$void3 = /* @__PURE__ */ $$void(functorEffect);
  var map11 = /* @__PURE__ */ map(functorEffect);
  var Canceler = function(x3) {
    return x3;
  };
  var suspendAff = /* @__PURE__ */ _fork(false);
  var functorParAff = {
    map: _parAffMap
  };
  var functorAff = {
    map: _map
  };
  var map12 = /* @__PURE__ */ map(functorAff);
  var forkAff = /* @__PURE__ */ _fork(true);
  var ffiUtil = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v2) {
      if (v2 instanceof Right) {
        return v2.value0;
      }
      ;
      if (v2 instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 21 - line 409, column 54): " + [v2.constructor.name]);
    };
    var unsafeFromLeft = function(v2) {
      if (v2 instanceof Left) {
        return v2.value0;
      }
      ;
      if (v2 instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 20 - line 404, column 55): " + [v2.constructor.name]);
    };
    var isLeft = function(v2) {
      if (v2 instanceof Left) {
        return true;
      }
      ;
      if (v2 instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 397, column 12 - line 399, column 21): " + [v2.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  }();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do3() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var delay = function(v2) {
    return _delay(Right.create, v2);
  };
  var bracket = function(acquire) {
    return function(completed) {
      return generalBracket(acquire)({
        killed: $$const(completed),
        failed: $$const(completed),
        completed: $$const(completed)
      });
    };
  };
  var applyParAff = {
    apply: _parAffApply,
    Functor0: function() {
      return functorParAff;
    }
  };
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy4("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var pure22 = /* @__PURE__ */ pure(applicativeAff);
  var bind1 = /* @__PURE__ */ bind(bindAff);
  var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindAff);
  var $$finally = function(fin) {
    return function(a3) {
      return bracket(pure22(unit))($$const(fin))($$const(a3));
    };
  };
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var effectCanceler = function($74) {
    return Canceler($$const(liftEffect2($74)));
  };
  var joinFiber = function(v2) {
    return makeAff(function(k) {
      return map11(effectCanceler)(v2.join(k));
    });
  };
  var functorFiber = {
    map: function(f) {
      return function(t2) {
        return unsafePerformEffect(makeFiber(map12(f)(joinFiber(t2))));
      };
    }
  };
  var killFiber = function(e) {
    return function(v2) {
      return bind1(liftEffect2(v2.isSuspended))(function(suspended) {
        if (suspended) {
          return liftEffect2($$void3(v2.kill(e, $$const(pure3(unit)))));
        }
        ;
        return makeAff(function(k) {
          return map11(effectCanceler)(v2.kill(e, k));
        });
      });
    };
  };
  var monadThrowAff = {
    throwError: _throwError,
    Monad0: function() {
      return monadAff;
    }
  };
  var monadErrorAff = {
    catchError: _catchError,
    MonadThrow0: function() {
      return monadThrowAff;
    }
  };
  var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
  var runAff = function(k) {
    return function(aff) {
      return launchAff(bindFlipped3(function($77) {
        return liftEffect2(k($77));
      })($$try2(aff)));
    };
  };
  var runAff_ = function(k) {
    return function(aff) {
      return $$void3(runAff(k)(aff));
    };
  };
  var parallelAff = {
    parallel: unsafeCoerce2,
    sequential: _sequential,
    Monad0: function() {
      return monadAff;
    },
    Applicative1: function() {
      return $lazy_applicativeParAff(0);
    }
  };
  var $lazy_applicativeParAff = /* @__PURE__ */ $runtime_lazy4("applicativeParAff", "Effect.Aff", function() {
    return {
      pure: function() {
        var $79 = parallel(parallelAff);
        return function($80) {
          return $79(pure22($80));
        };
      }(),
      Apply0: function() {
        return applyParAff;
      }
    };
  });
  var applicativeParAff = /* @__PURE__ */ $lazy_applicativeParAff(131);
  var monadRecAff = {
    tailRecM: function(k) {
      var go2 = function(a3) {
        return bind1(k(a3))(function(res) {
          if (res instanceof Done) {
            return pure22(res.value0);
          }
          ;
          if (res instanceof Loop) {
            return go2(res.value0);
          }
          ;
          throw new Error("Failed pattern match at Effect.Aff (line 102, column 7 - line 104, column 23): " + [res.constructor.name]);
        });
      };
      return go2;
    },
    Monad0: function() {
      return monadAff;
    }
  };
  var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure22(unit));

  // output/Effect.Aff.Class/index.js
  var monadAffAff = {
    liftAff: /* @__PURE__ */ identity(categoryFn),
    MonadEffect0: function() {
      return monadEffectAff;
    }
  };
  var liftAff = function(dict) {
    return dict.liftAff;
  };

  // output/Affjax/foreign.js
  function _ajax(platformSpecificDriver, timeoutErrorMessageIdent, requestFailedMessageIdent, mkHeader, options2) {
    return function(errback, callback) {
      var xhr = platformSpecificDriver.newXHR();
      var fixedUrl = platformSpecificDriver.fixupUrl(options2.url, xhr);
      xhr.open(options2.method || "GET", fixedUrl, true, options2.username, options2.password);
      if (options2.headers) {
        try {
          for (var i2 = 0, header2; (header2 = options2.headers[i2]) != null; i2++) {
            xhr.setRequestHeader(header2.field, header2.value);
          }
        } catch (e) {
          errback(e);
        }
      }
      var onerror = function(msgIdent) {
        return function() {
          errback(new Error(msgIdent));
        };
      };
      xhr.onerror = onerror(requestFailedMessageIdent);
      xhr.ontimeout = onerror(timeoutErrorMessageIdent);
      xhr.onload = function() {
        callback({
          status: xhr.status,
          statusText: xhr.statusText,
          headers: xhr.getAllResponseHeaders().split("\r\n").filter(function(header3) {
            return header3.length > 0;
          }).map(function(header3) {
            var i3 = header3.indexOf(":");
            return mkHeader(header3.substring(0, i3))(header3.substring(i3 + 2));
          }),
          body: xhr.response
        });
      };
      xhr.responseType = options2.responseType;
      xhr.withCredentials = options2.withCredentials;
      xhr.timeout = options2.timeout;
      xhr.send(options2.content);
      return function(error4, cancelErrback, cancelCallback) {
        try {
          xhr.abort();
        } catch (e) {
          return cancelErrback(e);
        }
        return cancelCallback();
      };
    };
  }

  // output/Data.MediaType.Common/index.js
  var applicationJSON = "application/json";
  var applicationFormURLEncoded = "application/x-www-form-urlencoded";

  // output/Affjax.RequestBody/index.js
  var ArrayView = /* @__PURE__ */ function() {
    function ArrayView2(value0) {
      this.value0 = value0;
    }
    ;
    ArrayView2.create = function(value0) {
      return new ArrayView2(value0);
    };
    return ArrayView2;
  }();
  var Blob = /* @__PURE__ */ function() {
    function Blob3(value0) {
      this.value0 = value0;
    }
    ;
    Blob3.create = function(value0) {
      return new Blob3(value0);
    };
    return Blob3;
  }();
  var Document = /* @__PURE__ */ function() {
    function Document3(value0) {
      this.value0 = value0;
    }
    ;
    Document3.create = function(value0) {
      return new Document3(value0);
    };
    return Document3;
  }();
  var $$String = /* @__PURE__ */ function() {
    function $$String3(value0) {
      this.value0 = value0;
    }
    ;
    $$String3.create = function(value0) {
      return new $$String3(value0);
    };
    return $$String3;
  }();
  var FormData = /* @__PURE__ */ function() {
    function FormData2(value0) {
      this.value0 = value0;
    }
    ;
    FormData2.create = function(value0) {
      return new FormData2(value0);
    };
    return FormData2;
  }();
  var FormURLEncoded = /* @__PURE__ */ function() {
    function FormURLEncoded2(value0) {
      this.value0 = value0;
    }
    ;
    FormURLEncoded2.create = function(value0) {
      return new FormURLEncoded2(value0);
    };
    return FormURLEncoded2;
  }();
  var Json = /* @__PURE__ */ function() {
    function Json3(value0) {
      this.value0 = value0;
    }
    ;
    Json3.create = function(value0) {
      return new Json3(value0);
    };
    return Json3;
  }();
  var toMediaType = function(v2) {
    if (v2 instanceof FormURLEncoded) {
      return new Just(applicationFormURLEncoded);
    }
    ;
    if (v2 instanceof Json) {
      return new Just(applicationJSON);
    }
    ;
    return Nothing.value;
  };

  // output/Affjax.RequestHeader/index.js
  var unwrap3 = /* @__PURE__ */ unwrap();
  var Accept = /* @__PURE__ */ function() {
    function Accept2(value0) {
      this.value0 = value0;
    }
    ;
    Accept2.create = function(value0) {
      return new Accept2(value0);
    };
    return Accept2;
  }();
  var ContentType = /* @__PURE__ */ function() {
    function ContentType2(value0) {
      this.value0 = value0;
    }
    ;
    ContentType2.create = function(value0) {
      return new ContentType2(value0);
    };
    return ContentType2;
  }();
  var RequestHeader = /* @__PURE__ */ function() {
    function RequestHeader2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RequestHeader2.create = function(value0) {
      return function(value1) {
        return new RequestHeader2(value0, value1);
      };
    };
    return RequestHeader2;
  }();
  var value2 = function(v2) {
    if (v2 instanceof Accept) {
      return unwrap3(v2.value0);
    }
    ;
    if (v2 instanceof ContentType) {
      return unwrap3(v2.value0);
    }
    ;
    if (v2 instanceof RequestHeader) {
      return v2.value1;
    }
    ;
    throw new Error("Failed pattern match at Affjax.RequestHeader (line 26, column 1 - line 26, column 33): " + [v2.constructor.name]);
  };
  var name2 = function(v2) {
    if (v2 instanceof Accept) {
      return "Accept";
    }
    ;
    if (v2 instanceof ContentType) {
      return "Content-Type";
    }
    ;
    if (v2 instanceof RequestHeader) {
      return v2.value0;
    }
    ;
    throw new Error("Failed pattern match at Affjax.RequestHeader (line 21, column 1 - line 21, column 32): " + [v2.constructor.name]);
  };

  // output/Affjax.ResponseFormat/index.js
  var identity10 = /* @__PURE__ */ identity(categoryFn);
  var $$ArrayBuffer = /* @__PURE__ */ function() {
    function $$ArrayBuffer2(value0) {
      this.value0 = value0;
    }
    ;
    $$ArrayBuffer2.create = function(value0) {
      return new $$ArrayBuffer2(value0);
    };
    return $$ArrayBuffer2;
  }();
  var Blob2 = /* @__PURE__ */ function() {
    function Blob3(value0) {
      this.value0 = value0;
    }
    ;
    Blob3.create = function(value0) {
      return new Blob3(value0);
    };
    return Blob3;
  }();
  var Document2 = /* @__PURE__ */ function() {
    function Document3(value0) {
      this.value0 = value0;
    }
    ;
    Document3.create = function(value0) {
      return new Document3(value0);
    };
    return Document3;
  }();
  var Json2 = /* @__PURE__ */ function() {
    function Json3(value0) {
      this.value0 = value0;
    }
    ;
    Json3.create = function(value0) {
      return new Json3(value0);
    };
    return Json3;
  }();
  var $$String2 = /* @__PURE__ */ function() {
    function $$String3(value0) {
      this.value0 = value0;
    }
    ;
    $$String3.create = function(value0) {
      return new $$String3(value0);
    };
    return $$String3;
  }();
  var Ignore = /* @__PURE__ */ function() {
    function Ignore2(value0) {
      this.value0 = value0;
    }
    ;
    Ignore2.create = function(value0) {
      return new Ignore2(value0);
    };
    return Ignore2;
  }();
  var toResponseType = function(v2) {
    if (v2 instanceof $$ArrayBuffer) {
      return "arraybuffer";
    }
    ;
    if (v2 instanceof Blob2) {
      return "blob";
    }
    ;
    if (v2 instanceof Document2) {
      return "document";
    }
    ;
    if (v2 instanceof Json2) {
      return "text";
    }
    ;
    if (v2 instanceof $$String2) {
      return "text";
    }
    ;
    if (v2 instanceof Ignore) {
      return "";
    }
    ;
    throw new Error("Failed pattern match at Affjax.ResponseFormat (line 44, column 3 - line 50, column 19): " + [v2.constructor.name]);
  };
  var toMediaType2 = function(v2) {
    if (v2 instanceof Json2) {
      return new Just(applicationJSON);
    }
    ;
    return Nothing.value;
  };
  var string = /* @__PURE__ */ function() {
    return new $$String2(identity10);
  }();
  var ignore = /* @__PURE__ */ function() {
    return new Ignore(identity10);
  }();

  // output/Affjax.ResponseHeader/index.js
  var ResponseHeader = /* @__PURE__ */ function() {
    function ResponseHeader2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ResponseHeader2.create = function(value0) {
      return function(value1) {
        return new ResponseHeader2(value0, value1);
      };
    };
    return ResponseHeader2;
  }();

  // output/Control.Monad.Except/index.js
  var unwrap4 = /* @__PURE__ */ unwrap();
  var runExcept = function($3) {
    return unwrap4(runExceptT($3));
  };

  // output/Data.Argonaut.Core/foreign.js
  function id2(x3) {
    return x3;
  }
  function stringify(j) {
    return JSON.stringify(j);
  }

  // output/Data.Argonaut.Core/index.js
  var jsonEmptyObject = /* @__PURE__ */ id2(empty2);

  // output/Data.Argonaut.Parser/foreign.js
  function _jsonParser(fail4, succ3, s2) {
    try {
      return succ3(JSON.parse(s2));
    } catch (e) {
      return fail4(e.message);
    }
  }

  // output/Data.Argonaut.Parser/index.js
  var jsonParser = function(j) {
    return _jsonParser(Left.create, Right.create, j);
  };

  // output/JSURI/foreign.js
  function toRFC3896(input3) {
    return input3.replace(/[!'()*]/g, function(c2) {
      return "%" + c2.charCodeAt(0).toString(16);
    });
  }
  var _encodeFormURLComponent = function encode(fail4, succeed, input3) {
    try {
      return succeed(toRFC3896(encodeURIComponent(input3)).replace(/%20/g, "+"));
    } catch (err) {
      return fail4(err);
    }
  };

  // output/JSURI/index.js
  var encodeFormURLComponent = /* @__PURE__ */ function() {
    return runFn3(_encodeFormURLComponent)($$const(Nothing.value))(Just.create);
  }();

  // output/Data.FormURLEncoded/index.js
  var apply2 = /* @__PURE__ */ apply(applyMaybe);
  var map13 = /* @__PURE__ */ map(functorMaybe);
  var traverse2 = /* @__PURE__ */ traverse(traversableArray)(applicativeMaybe);
  var toArray = function(v2) {
    return v2;
  };
  var encode2 = /* @__PURE__ */ function() {
    var encodePart = function(v2) {
      if (v2.value1 instanceof Nothing) {
        return encodeFormURLComponent(v2.value0);
      }
      ;
      if (v2.value1 instanceof Just) {
        return apply2(map13(function(key) {
          return function(val) {
            return key + ("=" + val);
          };
        })(encodeFormURLComponent(v2.value0)))(encodeFormURLComponent(v2.value1.value0));
      }
      ;
      throw new Error("Failed pattern match at Data.FormURLEncoded (line 37, column 16 - line 39, column 114): " + [v2.constructor.name]);
    };
    var $37 = map13(joinWith("&"));
    var $38 = traverse2(encodePart);
    return function($39) {
      return $37($38(toArray($39)));
    };
  }();

  // output/Data.HTTP.Method/index.js
  var OPTIONS = /* @__PURE__ */ function() {
    function OPTIONS2() {
    }
    ;
    OPTIONS2.value = new OPTIONS2();
    return OPTIONS2;
  }();
  var GET2 = /* @__PURE__ */ function() {
    function GET3() {
    }
    ;
    GET3.value = new GET3();
    return GET3;
  }();
  var HEAD = /* @__PURE__ */ function() {
    function HEAD2() {
    }
    ;
    HEAD2.value = new HEAD2();
    return HEAD2;
  }();
  var POST2 = /* @__PURE__ */ function() {
    function POST3() {
    }
    ;
    POST3.value = new POST3();
    return POST3;
  }();
  var PUT = /* @__PURE__ */ function() {
    function PUT2() {
    }
    ;
    PUT2.value = new PUT2();
    return PUT2;
  }();
  var DELETE = /* @__PURE__ */ function() {
    function DELETE2() {
    }
    ;
    DELETE2.value = new DELETE2();
    return DELETE2;
  }();
  var TRACE = /* @__PURE__ */ function() {
    function TRACE2() {
    }
    ;
    TRACE2.value = new TRACE2();
    return TRACE2;
  }();
  var CONNECT = /* @__PURE__ */ function() {
    function CONNECT2() {
    }
    ;
    CONNECT2.value = new CONNECT2();
    return CONNECT2;
  }();
  var PROPFIND = /* @__PURE__ */ function() {
    function PROPFIND2() {
    }
    ;
    PROPFIND2.value = new PROPFIND2();
    return PROPFIND2;
  }();
  var PROPPATCH = /* @__PURE__ */ function() {
    function PROPPATCH2() {
    }
    ;
    PROPPATCH2.value = new PROPPATCH2();
    return PROPPATCH2;
  }();
  var MKCOL = /* @__PURE__ */ function() {
    function MKCOL2() {
    }
    ;
    MKCOL2.value = new MKCOL2();
    return MKCOL2;
  }();
  var COPY = /* @__PURE__ */ function() {
    function COPY2() {
    }
    ;
    COPY2.value = new COPY2();
    return COPY2;
  }();
  var MOVE = /* @__PURE__ */ function() {
    function MOVE2() {
    }
    ;
    MOVE2.value = new MOVE2();
    return MOVE2;
  }();
  var LOCK = /* @__PURE__ */ function() {
    function LOCK2() {
    }
    ;
    LOCK2.value = new LOCK2();
    return LOCK2;
  }();
  var UNLOCK = /* @__PURE__ */ function() {
    function UNLOCK2() {
    }
    ;
    UNLOCK2.value = new UNLOCK2();
    return UNLOCK2;
  }();
  var PATCH = /* @__PURE__ */ function() {
    function PATCH2() {
    }
    ;
    PATCH2.value = new PATCH2();
    return PATCH2;
  }();
  var unCustomMethod = function(v2) {
    return v2;
  };
  var showMethod = {
    show: function(v2) {
      if (v2 instanceof OPTIONS) {
        return "OPTIONS";
      }
      ;
      if (v2 instanceof GET2) {
        return "GET";
      }
      ;
      if (v2 instanceof HEAD) {
        return "HEAD";
      }
      ;
      if (v2 instanceof POST2) {
        return "POST";
      }
      ;
      if (v2 instanceof PUT) {
        return "PUT";
      }
      ;
      if (v2 instanceof DELETE) {
        return "DELETE";
      }
      ;
      if (v2 instanceof TRACE) {
        return "TRACE";
      }
      ;
      if (v2 instanceof CONNECT) {
        return "CONNECT";
      }
      ;
      if (v2 instanceof PROPFIND) {
        return "PROPFIND";
      }
      ;
      if (v2 instanceof PROPPATCH) {
        return "PROPPATCH";
      }
      ;
      if (v2 instanceof MKCOL) {
        return "MKCOL";
      }
      ;
      if (v2 instanceof COPY) {
        return "COPY";
      }
      ;
      if (v2 instanceof MOVE) {
        return "MOVE";
      }
      ;
      if (v2 instanceof LOCK) {
        return "LOCK";
      }
      ;
      if (v2 instanceof UNLOCK) {
        return "UNLOCK";
      }
      ;
      if (v2 instanceof PATCH) {
        return "PATCH";
      }
      ;
      throw new Error("Failed pattern match at Data.HTTP.Method (line 43, column 1 - line 59, column 23): " + [v2.constructor.name]);
    }
  };
  var print = /* @__PURE__ */ either(/* @__PURE__ */ show(showMethod))(unCustomMethod);

  // output/Effect.Aff.Compat/index.js
  var fromEffectFnAff = function(v2) {
    return makeAff(function(k) {
      return function __do3() {
        var v1 = v2(function($9) {
          return k(Left.create($9))();
        }, function($10) {
          return k(Right.create($10))();
        });
        return function(e) {
          return makeAff(function(k2) {
            return function __do4() {
              v1(e, function($11) {
                return k2(Left.create($11))();
              }, function($12) {
                return k2(Right.create($12))();
              });
              return nonCanceler;
            };
          });
        };
      };
    });
  };

  // output/Affjax/index.js
  var pure4 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeExceptT(monadIdentity));
  var fail2 = /* @__PURE__ */ fail(monadIdentity);
  var unsafeReadTagged2 = /* @__PURE__ */ unsafeReadTagged(monadIdentity);
  var alt2 = /* @__PURE__ */ alt(/* @__PURE__ */ altExceptT(semigroupNonEmptyList)(monadIdentity));
  var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(/* @__PURE__ */ bindExceptT(monadIdentity));
  var map14 = /* @__PURE__ */ map(functorMaybe);
  var any3 = /* @__PURE__ */ any(foldableArray)(heytingAlgebraBoolean);
  var eq3 = /* @__PURE__ */ eq(eqString);
  var bindFlipped4 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var map15 = /* @__PURE__ */ map(functorArray);
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorAff);
  var $$try3 = /* @__PURE__ */ $$try(monadErrorAff);
  var pure1 = /* @__PURE__ */ pure(applicativeAff);
  var RequestContentError = /* @__PURE__ */ function() {
    function RequestContentError2(value0) {
      this.value0 = value0;
    }
    ;
    RequestContentError2.create = function(value0) {
      return new RequestContentError2(value0);
    };
    return RequestContentError2;
  }();
  var ResponseBodyError = /* @__PURE__ */ function() {
    function ResponseBodyError2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ResponseBodyError2.create = function(value0) {
      return function(value1) {
        return new ResponseBodyError2(value0, value1);
      };
    };
    return ResponseBodyError2;
  }();
  var TimeoutError = /* @__PURE__ */ function() {
    function TimeoutError2() {
    }
    ;
    TimeoutError2.value = new TimeoutError2();
    return TimeoutError2;
  }();
  var RequestFailedError = /* @__PURE__ */ function() {
    function RequestFailedError2() {
    }
    ;
    RequestFailedError2.value = new RequestFailedError2();
    return RequestFailedError2;
  }();
  var XHROtherError = /* @__PURE__ */ function() {
    function XHROtherError2(value0) {
      this.value0 = value0;
    }
    ;
    XHROtherError2.create = function(value0) {
      return new XHROtherError2(value0);
    };
    return XHROtherError2;
  }();
  var request = function(driver2) {
    return function(req) {
      var parseJSON = function(v3) {
        if (v3 === "") {
          return pure4(jsonEmptyObject);
        }
        ;
        return either(function($74) {
          return fail2(ForeignError.create($74));
        })(pure4)(jsonParser(v3));
      };
      var fromResponse = function() {
        if (req.responseFormat instanceof $$ArrayBuffer) {
          return unsafeReadTagged2("ArrayBuffer");
        }
        ;
        if (req.responseFormat instanceof Blob2) {
          return unsafeReadTagged2("Blob");
        }
        ;
        if (req.responseFormat instanceof Document2) {
          return function(x3) {
            return alt2(unsafeReadTagged2("Document")(x3))(alt2(unsafeReadTagged2("XMLDocument")(x3))(unsafeReadTagged2("HTMLDocument")(x3)));
          };
        }
        ;
        if (req.responseFormat instanceof Json2) {
          return composeKleisliFlipped2(function($75) {
            return req.responseFormat.value0(parseJSON($75));
          })(unsafeReadTagged2("String"));
        }
        ;
        if (req.responseFormat instanceof $$String2) {
          return unsafeReadTagged2("String");
        }
        ;
        if (req.responseFormat instanceof Ignore) {
          return $$const(req.responseFormat.value0(pure4(unit)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 274, column 18 - line 283, column 57): " + [req.responseFormat.constructor.name]);
      }();
      var extractContent = function(v3) {
        if (v3 instanceof ArrayView) {
          return new Right(v3.value0(unsafeToForeign));
        }
        ;
        if (v3 instanceof Blob) {
          return new Right(unsafeToForeign(v3.value0));
        }
        ;
        if (v3 instanceof Document) {
          return new Right(unsafeToForeign(v3.value0));
        }
        ;
        if (v3 instanceof $$String) {
          return new Right(unsafeToForeign(v3.value0));
        }
        ;
        if (v3 instanceof FormData) {
          return new Right(unsafeToForeign(v3.value0));
        }
        ;
        if (v3 instanceof FormURLEncoded) {
          return note("Body contains values that cannot be encoded as application/x-www-form-urlencoded")(map14(unsafeToForeign)(encode2(v3.value0)));
        }
        ;
        if (v3 instanceof Json) {
          return new Right(unsafeToForeign(stringify(v3.value0)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 235, column 20 - line 250, column 69): " + [v3.constructor.name]);
      };
      var addHeader = function(mh) {
        return function(hs) {
          if (mh instanceof Just && !any3(on(eq3)(name2)(mh.value0))(hs)) {
            return snoc(hs)(mh.value0);
          }
          ;
          return hs;
        };
      };
      var headers = function(reqContent) {
        return addHeader(map14(ContentType.create)(bindFlipped4(toMediaType)(reqContent)))(addHeader(map14(Accept.create)(toMediaType2(req.responseFormat)))(req.headers));
      };
      var ajaxRequest = function(v3) {
        return {
          method: print(req.method),
          url: req.url,
          headers: map15(function(h7) {
            return {
              field: name2(h7),
              value: value2(h7)
            };
          })(headers(req.content)),
          content: v3,
          responseType: toResponseType(req.responseFormat),
          username: toNullable(req.username),
          password: toNullable(req.password),
          withCredentials: req.withCredentials,
          timeout: fromMaybe(0)(map14(function(v1) {
            return v1;
          })(req.timeout))
        };
      };
      var send = function(content3) {
        return mapFlipped2($$try3(fromEffectFnAff(_ajax(driver2, "AffjaxTimeoutErrorMessageIdent", "AffjaxRequestFailedMessageIdent", ResponseHeader.create, ajaxRequest(content3)))))(function(v3) {
          if (v3 instanceof Right) {
            var v1 = runExcept(fromResponse(v3.value0.body));
            if (v1 instanceof Left) {
              return new Left(new ResponseBodyError(head(v1.value0), v3.value0));
            }
            ;
            if (v1 instanceof Right) {
              return new Right({
                body: v1.value0,
                headers: v3.value0.headers,
                status: v3.value0.status,
                statusText: v3.value0.statusText
              });
            }
            ;
            throw new Error("Failed pattern match at Affjax (line 209, column 9 - line 211, column 52): " + [v1.constructor.name]);
          }
          ;
          if (v3 instanceof Left) {
            return new Left(function() {
              var message3 = message(v3.value0);
              var $61 = message3 === "AffjaxTimeoutErrorMessageIdent";
              if ($61) {
                return TimeoutError.value;
              }
              ;
              var $62 = message3 === "AffjaxRequestFailedMessageIdent";
              if ($62) {
                return RequestFailedError.value;
              }
              ;
              return new XHROtherError(v3.value0);
            }());
          }
          ;
          throw new Error("Failed pattern match at Affjax (line 207, column 144 - line 219, column 28): " + [v3.constructor.name]);
        });
      };
      if (req.content instanceof Nothing) {
        return send(toNullable(Nothing.value));
      }
      ;
      if (req.content instanceof Just) {
        var v2 = extractContent(req.content.value0);
        if (v2 instanceof Right) {
          return send(toNullable(new Just(v2.value0)));
        }
        ;
        if (v2 instanceof Left) {
          return pure1(new Left(new RequestContentError(v2.value0)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 199, column 7 - line 203, column 48): " + [v2.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Affjax (line 195, column 3 - line 203, column 48): " + [req.content.constructor.name]);
    };
  };
  var printError = function(v2) {
    if (v2 instanceof RequestContentError) {
      return "There was a problem with the request content: " + v2.value0;
    }
    ;
    if (v2 instanceof ResponseBodyError) {
      return "There was a problem with the response body: " + renderForeignError(v2.value0);
    }
    ;
    if (v2 instanceof TimeoutError) {
      return "There was a problem making the request: timeout";
    }
    ;
    if (v2 instanceof RequestFailedError) {
      return "There was a problem making the request: request failed";
    }
    ;
    if (v2 instanceof XHROtherError) {
      return "There was a problem making the request: " + message(v2.value0);
    }
    ;
    throw new Error("Failed pattern match at Affjax (line 113, column 14 - line 123, column 66): " + [v2.constructor.name]);
  };
  var defaultRequest = /* @__PURE__ */ function() {
    return {
      method: new Left(GET2.value),
      url: "/",
      headers: [],
      content: Nothing.value,
      username: Nothing.value,
      password: Nothing.value,
      withCredentials: false,
      responseFormat: ignore,
      timeout: Nothing.value
    };
  }();

  // output/Affjax.Web/foreign.js
  var driver = {
    newXHR: function() {
      return new XMLHttpRequest();
    },
    fixupUrl: function(url) {
      return url || "/";
    }
  };

  // output/Affjax.Web/index.js
  var request2 = /* @__PURE__ */ request(driver);

  // output/Data.Set/index.js
  var foldMap2 = /* @__PURE__ */ foldMap(foldableList);
  var foldl4 = /* @__PURE__ */ foldl(foldableList);
  var foldr3 = /* @__PURE__ */ foldr(foldableList);
  var identity11 = /* @__PURE__ */ identity(categoryFn);
  var $$Set = function(x3) {
    return x3;
  };
  var union3 = function(dictOrd) {
    var union1 = union2(dictOrd);
    return function(v2) {
      return function(v1) {
        return union1(v2)(v1);
      };
    };
  };
  var toList3 = function(v2) {
    return keys2(v2);
  };
  var toUnfoldable4 = function(dictUnfoldable) {
    var $127 = toUnfoldable(dictUnfoldable);
    return function($128) {
      return $127(toList3($128));
    };
  };
  var size3 = function(v2) {
    return size2(v2);
  };
  var insert2 = function(dictOrd) {
    var insert13 = insert(dictOrd);
    return function(a3) {
      return function(v2) {
        return insert13(a3)(unit)(v2);
      };
    };
  };
  var fromMap = $$Set;
  var foldableSet = {
    foldMap: function(dictMonoid) {
      var foldMap12 = foldMap2(dictMonoid);
      return function(f) {
        var $129 = foldMap12(f);
        return function($130) {
          return $129(toList3($130));
        };
      };
    },
    foldl: function(f) {
      return function(x3) {
        var $131 = foldl4(f)(x3);
        return function($132) {
          return $131(toList3($132));
        };
      };
    },
    foldr: function(f) {
      return function(x3) {
        var $133 = foldr3(f)(x3);
        return function($134) {
          return $133(toList3($134));
        };
      };
    }
  };
  var foldr1 = /* @__PURE__ */ foldr(foldableSet);
  var empty4 = empty3;
  var fromFoldable4 = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(dictOrd) {
      var insert13 = insert2(dictOrd);
      return foldl22(function(m2) {
        return function(a3) {
          return insert13(a3)(m2);
        };
      })(empty4);
    };
  };
  var mapMaybe3 = function(dictOrd) {
    var insert13 = insert2(dictOrd);
    return function(f) {
      return foldr1(function(a3) {
        return function(acc) {
          return maybe(acc)(function(b2) {
            return insert13(b2)(acc);
          })(f(a3));
        };
      })(empty4);
    };
  };
  var catMaybes3 = function(dictOrd) {
    return mapMaybe3(dictOrd)(identity11);
  };

  // output/Data.String.Utils/foreign.js
  function linesImpl(str) {
    return str.split(/\r\n|[\n\v\f\r\u0085\u2028\u2029]/);
  }
  function startsWithImpl(searchString, s2) {
    return s2.startsWith(searchString);
  }

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";
  var _unsafeCodePointAt0 = function(fallback) {
    return hasCodePointAt ? function(str) {
      return str.codePointAt(0);
    } : fallback;
  };
  var _codePointAt = function(fallback) {
    return function(Just2) {
      return function(Nothing2) {
        return function(unsafeCodePointAt02) {
          return function(index4) {
            return function(str) {
              var length10 = str.length;
              if (index4 < 0 || index4 >= length10)
                return Nothing2;
              if (hasStringIterator) {
                var iter = str[Symbol.iterator]();
                for (var i2 = index4; ; --i2) {
                  var o = iter.next();
                  if (o.done)
                    return Nothing2;
                  if (i2 === 0)
                    return Just2(unsafeCodePointAt02(o.value));
                }
              }
              return fallback(index4)(str);
            };
          };
        };
      };
    };
  };

  // output/Data.String.CodePoints/index.js
  var $runtime_lazy5 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumChar);
  var compare2 = /* @__PURE__ */ compare(ordInt);
  var unsurrogate = function(lead) {
    return function(trail) {
      return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
    };
  };
  var isTrail = function(cu) {
    return 56320 <= cu && cu <= 57343;
  };
  var isLead = function(cu) {
    return 55296 <= cu && cu <= 56319;
  };
  var uncons2 = function(s2) {
    var v2 = length3(s2);
    if (v2 === 0) {
      return Nothing.value;
    }
    ;
    if (v2 === 1) {
      return new Just({
        head: fromEnum2(charAt(0)(s2)),
        tail: ""
      });
    }
    ;
    var cu1 = fromEnum2(charAt(1)(s2));
    var cu0 = fromEnum2(charAt(0)(s2));
    var $42 = isLead(cu0) && isTrail(cu1);
    if ($42) {
      return new Just({
        head: unsurrogate(cu0)(cu1),
        tail: drop2(2)(s2)
      });
    }
    ;
    return new Just({
      head: cu0,
      tail: drop2(1)(s2)
    });
  };
  var unsafeCodePointAt0Fallback = function(s2) {
    var cu0 = fromEnum2(charAt(0)(s2));
    var $46 = isLead(cu0) && length3(s2) > 1;
    if ($46) {
      var cu1 = fromEnum2(charAt(1)(s2));
      var $47 = isTrail(cu1);
      if ($47) {
        return unsurrogate(cu0)(cu1);
      }
      ;
      return cu0;
    }
    ;
    return cu0;
  };
  var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
  var eqCodePoint = {
    eq: function(x3) {
      return function(y3) {
        return x3 === y3;
      };
    }
  };
  var ordCodePoint = {
    compare: function(x3) {
      return function(y3) {
        return compare2(x3)(y3);
      };
    },
    Eq0: function() {
      return eqCodePoint;
    }
  };
  var codePointAtFallback = function($copy_n) {
    return function($copy_s) {
      var $tco_var_n = $copy_n;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(n, s2) {
        var v2 = uncons2(s2);
        if (v2 instanceof Just) {
          var $65 = n === 0;
          if ($65) {
            $tco_done = true;
            return new Just(v2.value0.head);
          }
          ;
          $tco_var_n = n - 1 | 0;
          $copy_s = v2.value0.tail;
          return;
        }
        ;
        $tco_done = true;
        return Nothing.value;
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_n, $copy_s);
      }
      ;
      return $tco_result;
    };
  };
  var codePointAt = function(v2) {
    return function(v1) {
      if (v2 < 0) {
        return Nothing.value;
      }
      ;
      if (v2 === 0 && v1 === "") {
        return Nothing.value;
      }
      ;
      if (v2 === 0) {
        return new Just(unsafeCodePointAt0(v1));
      }
      ;
      return _codePointAt(codePointAtFallback)(Just.create)(Nothing.value)(unsafeCodePointAt0)(v2)(v1);
    };
  };
  var boundedCodePoint = {
    bottom: 0,
    top: 1114111,
    Ord0: function() {
      return ordCodePoint;
    }
  };
  var boundedEnumCodePoint = /* @__PURE__ */ function() {
    return {
      cardinality: 1114111 + 1 | 0,
      fromEnum: function(v2) {
        return v2;
      },
      toEnum: function(n) {
        if (n >= 0 && n <= 1114111) {
          return new Just(n);
        }
        ;
        if (otherwise) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.String.CodePoints (line 63, column 1 - line 68, column 26): " + [n.constructor.name]);
      },
      Bounded0: function() {
        return boundedCodePoint;
      },
      Enum1: function() {
        return $lazy_enumCodePoint(0);
      }
    };
  }();
  var $lazy_enumCodePoint = /* @__PURE__ */ $runtime_lazy5("enumCodePoint", "Data.String.CodePoints", function() {
    return {
      succ: defaultSucc(toEnum(boundedEnumCodePoint))(fromEnum(boundedEnumCodePoint)),
      pred: defaultPred(toEnum(boundedEnumCodePoint))(fromEnum(boundedEnumCodePoint)),
      Ord0: function() {
        return ordCodePoint;
      }
    };
  });

  // output/Data.String.Utils/index.js
  var startsWith = function(searchString) {
    return function(s2) {
      return startsWithImpl(searchString, s2);
    };
  };
  var lines = function(s2) {
    return linesImpl(s2);
  };

  // output/Data.Exists/index.js
  var runExists = unsafeCoerce2;
  var mkExists = unsafeCoerce2;

  // output/Data.Coyoneda/index.js
  var CoyonedaF = /* @__PURE__ */ function() {
    function CoyonedaF2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CoyonedaF2.create = function(value0) {
      return function(value1) {
        return new CoyonedaF2(value0, value1);
      };
    };
    return CoyonedaF2;
  }();
  var unCoyoneda = function(f) {
    return function(v2) {
      return runExists(function(v1) {
        return f(v1.value0)(v1.value1);
      })(v2);
    };
  };
  var coyoneda = function(k) {
    return function(fi) {
      return mkExists(new CoyonedaF(k, fi));
    };
  };
  var functorCoyoneda = {
    map: function(f) {
      return function(v2) {
        return runExists(function(v1) {
          return coyoneda(function($180) {
            return f(v1.value0($180));
          })(v1.value1);
        })(v2);
      };
    }
  };
  var liftCoyoneda = /* @__PURE__ */ coyoneda(/* @__PURE__ */ identity(categoryFn));

  // output/Halogen.Data.OrdBox/index.js
  var OrdBox = /* @__PURE__ */ function() {
    function OrdBox2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    OrdBox2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new OrdBox2(value0, value1, value22);
        };
      };
    };
    return OrdBox2;
  }();
  var mkOrdBox = function(dictOrd) {
    return OrdBox.create(eq(dictOrd.Eq0()))(compare(dictOrd));
  };
  var eqOrdBox = {
    eq: function(v2) {
      return function(v1) {
        return v2.value0(v2.value2)(v1.value2);
      };
    }
  };
  var ordOrdBox = {
    compare: function(v2) {
      return function(v1) {
        return v2.value1(v2.value2)(v1.value2);
      };
    },
    Eq0: function() {
      return eqOrdBox;
    }
  };

  // output/Halogen.Data.Slot/index.js
  var ordTuple2 = /* @__PURE__ */ ordTuple(ordString)(ordOrdBox);
  var pop1 = /* @__PURE__ */ pop(ordTuple2);
  var lookup1 = /* @__PURE__ */ lookup2(ordTuple2);
  var insert1 = /* @__PURE__ */ insert(ordTuple2);
  var pop2 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key) {
            return function(v2) {
              return pop1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key)))(v2);
            };
          };
        };
      };
    };
  };
  var lookup3 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key) {
            return function(v2) {
              return lookup1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key)))(v2);
            };
          };
        };
      };
    };
  };
  var insert3 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key) {
            return function(val) {
              return function(v2) {
                return insert1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key)))(val)(v2);
              };
            };
          };
        };
      };
    };
  };
  var foreachSlot = function(dictApplicative) {
    var traverse_8 = traverse_(dictApplicative)(foldableMap);
    return function(v2) {
      return function(k) {
        return traverse_8(function($54) {
          return k($54);
        })(v2);
      };
    };
  };
  var empty5 = empty3;

  // output/Control.Applicative.Free/index.js
  var identity12 = /* @__PURE__ */ identity(categoryFn);
  var Pure = /* @__PURE__ */ function() {
    function Pure2(value0) {
      this.value0 = value0;
    }
    ;
    Pure2.create = function(value0) {
      return new Pure2(value0);
    };
    return Pure2;
  }();
  var Lift = /* @__PURE__ */ function() {
    function Lift4(value0) {
      this.value0 = value0;
    }
    ;
    Lift4.create = function(value0) {
      return new Lift4(value0);
    };
    return Lift4;
  }();
  var Ap = /* @__PURE__ */ function() {
    function Ap2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Ap2.create = function(value0) {
      return function(value1) {
        return new Ap2(value0, value1);
      };
    };
    return Ap2;
  }();
  var mkAp = function(fba) {
    return function(fb) {
      return new Ap(fba, fb);
    };
  };
  var liftFreeAp = /* @__PURE__ */ function() {
    return Lift.create;
  }();
  var goLeft = function(dictApplicative) {
    var pure21 = pure(dictApplicative);
    return function(fStack) {
      return function(valStack) {
        return function(nat) {
          return function(func) {
            return function(count) {
              if (func instanceof Pure) {
                return new Tuple(new Cons({
                  func: pure21(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Lift) {
                return new Tuple(new Cons({
                  func: nat(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Ap) {
                return goLeft(dictApplicative)(fStack)(cons3(func.value1)(valStack))(nat)(func.value0)(count + 1 | 0);
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 102, column 41 - line 105, column 81): " + [func.constructor.name]);
            };
          };
        };
      };
    };
  };
  var goApply = function(dictApplicative) {
    var apply3 = apply(dictApplicative.Apply0());
    return function(fStack) {
      return function(vals) {
        return function(gVal) {
          if (fStack instanceof Nil) {
            return new Left(gVal);
          }
          ;
          if (fStack instanceof Cons) {
            var gRes = apply3(fStack.value0.func)(gVal);
            var $31 = fStack.value0.count === 1;
            if ($31) {
              if (fStack.value1 instanceof Nil) {
                return new Left(gRes);
              }
              ;
              return goApply(dictApplicative)(fStack.value1)(vals)(gRes);
            }
            ;
            if (vals instanceof Nil) {
              return new Left(gRes);
            }
            ;
            if (vals instanceof Cons) {
              return new Right(new Tuple(new Cons({
                func: gRes,
                count: fStack.value0.count - 1 | 0
              }, fStack.value1), new NonEmpty(vals.value0, vals.value1)));
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 83, column 11 - line 88, column 50): " + [vals.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Control.Applicative.Free (line 72, column 3 - line 88, column 50): " + [fStack.constructor.name]);
        };
      };
    };
  };
  var functorFreeAp = {
    map: function(f) {
      return function(x3) {
        return mkAp(new Pure(f))(x3);
      };
    }
  };
  var foldFreeAp = function(dictApplicative) {
    var goApply1 = goApply(dictApplicative);
    var pure21 = pure(dictApplicative);
    var goLeft1 = goLeft(dictApplicative);
    return function(nat) {
      return function(z2) {
        var go2 = function($copy_v) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v2) {
            if (v2.value1.value0 instanceof Pure) {
              var v1 = goApply1(v2.value0)(v2.value1.value1)(pure21(v2.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 54, column 17 - line 56, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v2.value1.value0 instanceof Lift) {
              var v1 = goApply1(v2.value0)(v2.value1.value1)(nat(v2.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 57, column 17 - line 59, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v2.value1.value0 instanceof Ap) {
              var nextVals = new NonEmpty(v2.value1.value0.value1, v2.value1.value1);
              $copy_v = goLeft1(v2.value0)(nextVals)(nat)(v2.value1.value0.value0)(1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 53, column 5 - line 62, column 47): " + [v2.value1.value0.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
          }
          ;
          return $tco_result;
        };
        return go2(new Tuple(Nil.value, singleton5(z2)));
      };
    };
  };
  var retractFreeAp = function(dictApplicative) {
    return foldFreeAp(dictApplicative)(identity12);
  };
  var applyFreeAp = {
    apply: function(fba) {
      return function(fb) {
        return mkAp(fba)(fb);
      };
    },
    Functor0: function() {
      return functorFreeAp;
    }
  };
  var applicativeFreeAp = /* @__PURE__ */ function() {
    return {
      pure: Pure.create,
      Apply0: function() {
        return applyFreeAp;
      }
    };
  }();
  var foldFreeAp1 = /* @__PURE__ */ foldFreeAp(applicativeFreeAp);
  var hoistFreeAp = function(f) {
    return foldFreeAp1(function($54) {
      return liftFreeAp(f($54));
    });
  };

  // output/Data.CatQueue/index.js
  var CatQueue = /* @__PURE__ */ function() {
    function CatQueue2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatQueue2.create = function(value0) {
      return function(value1) {
        return new CatQueue2(value0, value1);
      };
    };
    return CatQueue2;
  }();
  var uncons3 = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v2) {
      if (v2.value0 instanceof Nil && v2.value1 instanceof Nil) {
        $tco_done = true;
        return Nothing.value;
      }
      ;
      if (v2.value0 instanceof Nil) {
        $copy_v = new CatQueue(reverse(v2.value1), Nil.value);
        return;
      }
      ;
      if (v2.value0 instanceof Cons) {
        $tco_done = true;
        return new Just(new Tuple(v2.value0.value0, new CatQueue(v2.value0.value1, v2.value1)));
      }
      ;
      throw new Error("Failed pattern match at Data.CatQueue (line 82, column 1 - line 82, column 63): " + [v2.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var snoc3 = function(v2) {
    return function(a3) {
      return new CatQueue(v2.value0, new Cons(a3, v2.value1));
    };
  };
  var $$null4 = function(v2) {
    if (v2.value0 instanceof Nil && v2.value1 instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var empty6 = /* @__PURE__ */ function() {
    return new CatQueue(Nil.value, Nil.value);
  }();

  // output/Data.CatList/index.js
  var CatNil = /* @__PURE__ */ function() {
    function CatNil2() {
    }
    ;
    CatNil2.value = new CatNil2();
    return CatNil2;
  }();
  var CatCons = /* @__PURE__ */ function() {
    function CatCons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatCons2.create = function(value0) {
      return function(value1) {
        return new CatCons2(value0, value1);
      };
    };
    return CatCons2;
  }();
  var link = function(v2) {
    return function(v1) {
      if (v2 instanceof CatNil) {
        return v1;
      }
      ;
      if (v1 instanceof CatNil) {
        return v2;
      }
      ;
      if (v2 instanceof CatCons) {
        return new CatCons(v2.value0, snoc3(v2.value1)(v1));
      }
      ;
      throw new Error("Failed pattern match at Data.CatList (line 108, column 1 - line 108, column 54): " + [v2.constructor.name, v1.constructor.name]);
    };
  };
  var foldr4 = function(k) {
    return function(b2) {
      return function(q3) {
        var foldl5 = function($copy_v) {
          return function($copy_c) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_var_c = $copy_c;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v2, c2, v1) {
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return c2;
                }
                ;
                if (v1 instanceof Cons) {
                  $tco_var_v = v2;
                  $tco_var_c = v2(c2)(v1.value0);
                  $copy_v1 = v1.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.CatList (line 124, column 3 - line 124, column 59): " + [v2.constructor.name, c2.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $tco_var_c, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
        };
        var go2 = function($copy_xs) {
          return function($copy_ys) {
            var $tco_var_xs = $copy_xs;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(xs, ys) {
              var v2 = uncons3(xs);
              if (v2 instanceof Nothing) {
                $tco_done1 = true;
                return foldl5(function(x3) {
                  return function(i2) {
                    return i2(x3);
                  };
                })(b2)(ys);
              }
              ;
              if (v2 instanceof Just) {
                $tco_var_xs = v2.value0.value1;
                $copy_ys = new Cons(k(v2.value0.value0), ys);
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.CatList (line 120, column 14 - line 122, column 67): " + [v2.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_xs, $copy_ys);
            }
            ;
            return $tco_result;
          };
        };
        return go2(q3)(Nil.value);
      };
    };
  };
  var uncons4 = function(v2) {
    if (v2 instanceof CatNil) {
      return Nothing.value;
    }
    ;
    if (v2 instanceof CatCons) {
      return new Just(new Tuple(v2.value0, function() {
        var $65 = $$null4(v2.value1);
        if ($65) {
          return CatNil.value;
        }
        ;
        return foldr4(link)(CatNil.value)(v2.value1);
      }()));
    }
    ;
    throw new Error("Failed pattern match at Data.CatList (line 99, column 1 - line 99, column 61): " + [v2.constructor.name]);
  };
  var empty7 = /* @__PURE__ */ function() {
    return CatNil.value;
  }();
  var append4 = link;
  var semigroupCatList = {
    append: append4
  };
  var snoc4 = function(cat) {
    return function(a3) {
      return append4(cat)(new CatCons(a3, empty6));
    };
  };

  // output/Control.Monad.Free/index.js
  var $runtime_lazy6 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var append5 = /* @__PURE__ */ append(semigroupCatList);
  var Free = /* @__PURE__ */ function() {
    function Free2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Free2.create = function(value0) {
      return function(value1) {
        return new Free2(value0, value1);
      };
    };
    return Free2;
  }();
  var Return = /* @__PURE__ */ function() {
    function Return2(value0) {
      this.value0 = value0;
    }
    ;
    Return2.create = function(value0) {
      return new Return2(value0);
    };
    return Return2;
  }();
  var Bind = /* @__PURE__ */ function() {
    function Bind2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Bind2.create = function(value0) {
      return function(value1) {
        return new Bind2(value0, value1);
      };
    };
    return Bind2;
  }();
  var toView = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v2) {
      var runExpF = function(v23) {
        return v23;
      };
      var concatF = function(v23) {
        return function(r2) {
          return new Free(v23.value0, append5(v23.value1)(r2));
        };
      };
      if (v2.value0 instanceof Return) {
        var v22 = uncons4(v2.value1);
        if (v22 instanceof Nothing) {
          $tco_done = true;
          return new Return(v2.value0.value0);
        }
        ;
        if (v22 instanceof Just) {
          $copy_v = concatF(runExpF(v22.value0.value0)(v2.value0.value0))(v22.value0.value1);
          return;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 227, column 7 - line 231, column 64): " + [v22.constructor.name]);
      }
      ;
      if (v2.value0 instanceof Bind) {
        $tco_done = true;
        return new Bind(v2.value0.value0, function(a3) {
          return concatF(v2.value0.value1(a3))(v2.value1);
        });
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Free (line 225, column 3 - line 233, column 56): " + [v2.value0.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var fromView = function(f) {
    return new Free(f, empty7);
  };
  var freeMonad = {
    Applicative0: function() {
      return freeApplicative;
    },
    Bind1: function() {
      return freeBind;
    }
  };
  var freeFunctor = {
    map: function(k) {
      return function(f) {
        return bindFlipped(freeBind)(function() {
          var $189 = pure(freeApplicative);
          return function($190) {
            return $189(k($190));
          };
        }())(f);
      };
    }
  };
  var freeBind = {
    bind: function(v2) {
      return function(k) {
        return new Free(v2.value0, snoc4(v2.value1)(k));
      };
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var freeApplicative = {
    pure: function($191) {
      return fromView(Return.create($191));
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var $lazy_freeApply = /* @__PURE__ */ $runtime_lazy6("freeApply", "Control.Monad.Free", function() {
    return {
      apply: ap(freeMonad),
      Functor0: function() {
        return freeFunctor;
      }
    };
  });
  var freeApply = /* @__PURE__ */ $lazy_freeApply(77);
  var pure5 = /* @__PURE__ */ pure(freeApplicative);
  var liftF = function(f) {
    return fromView(new Bind(f, function($192) {
      return pure5($192);
    }));
  };
  var foldFree = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var map114 = map(Monad0.Bind1().Apply0().Functor0());
    var pure110 = pure(Monad0.Applicative0());
    var tailRecM5 = tailRecM(dictMonadRec);
    return function(k) {
      var go2 = function(f) {
        var v2 = toView(f);
        if (v2 instanceof Return) {
          return map114(Done.create)(pure110(v2.value0));
        }
        ;
        if (v2 instanceof Bind) {
          return map114(function($199) {
            return Loop.create(v2.value1($199));
          })(k(v2.value0));
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 158, column 10 - line 160, column 37): " + [v2.constructor.name]);
      };
      return tailRecM5(go2);
    };
  };

  // output/Halogen.Query.ChildQuery/index.js
  var ChildQuery = /* @__PURE__ */ function() {
    function ChildQuery3(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    ChildQuery3.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new ChildQuery3(value0, value1, value22);
        };
      };
    };
    return ChildQuery3;
  }();
  var unChildQueryBox = unsafeCoerce2;
  var mkChildQueryBox = unsafeCoerce2;

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a3) {
    return function(b2) {
      return a3 === b2;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/Halogen.Subscription/index.js
  var $$void4 = /* @__PURE__ */ $$void(functorEffect);
  var bind3 = /* @__PURE__ */ bind(bindEffect);
  var append6 = /* @__PURE__ */ append(semigroupArray);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_1 = /* @__PURE__ */ traverse_2(foldableArray);
  var unsubscribe = function(v2) {
    return v2;
  };
  var subscribe = function(v2) {
    return function(k) {
      return v2(function($76) {
        return $$void4(k($76));
      });
    };
  };
  var notify = function(v2) {
    return function(a3) {
      return v2(a3);
    };
  };
  var create = function __do() {
    var subscribers = $$new([])();
    return {
      emitter: function(k) {
        return function __do3() {
          modify_(function(v2) {
            return append6(v2)([k]);
          })(subscribers)();
          return modify_(deleteBy(unsafeRefEq)(k))(subscribers);
        };
      },
      listener: function(a3) {
        return bind3(read(subscribers))(traverse_1(function(k) {
          return k(a3);
        }));
      }
    };
  };

  // output/Halogen.Query.HalogenM/index.js
  var identity13 = /* @__PURE__ */ identity(categoryFn);
  var lookup4 = /* @__PURE__ */ lookup3();
  var SubscriptionId = function(x3) {
    return x3;
  };
  var ForkId = function(x3) {
    return x3;
  };
  var State = /* @__PURE__ */ function() {
    function State2(value0) {
      this.value0 = value0;
    }
    ;
    State2.create = function(value0) {
      return new State2(value0);
    };
    return State2;
  }();
  var Subscribe = /* @__PURE__ */ function() {
    function Subscribe2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Subscribe2.create = function(value0) {
      return function(value1) {
        return new Subscribe2(value0, value1);
      };
    };
    return Subscribe2;
  }();
  var Unsubscribe = /* @__PURE__ */ function() {
    function Unsubscribe2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Unsubscribe2.create = function(value0) {
      return function(value1) {
        return new Unsubscribe2(value0, value1);
      };
    };
    return Unsubscribe2;
  }();
  var Lift2 = /* @__PURE__ */ function() {
    function Lift4(value0) {
      this.value0 = value0;
    }
    ;
    Lift4.create = function(value0) {
      return new Lift4(value0);
    };
    return Lift4;
  }();
  var ChildQuery2 = /* @__PURE__ */ function() {
    function ChildQuery3(value0) {
      this.value0 = value0;
    }
    ;
    ChildQuery3.create = function(value0) {
      return new ChildQuery3(value0);
    };
    return ChildQuery3;
  }();
  var Raise = /* @__PURE__ */ function() {
    function Raise2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Raise2.create = function(value0) {
      return function(value1) {
        return new Raise2(value0, value1);
      };
    };
    return Raise2;
  }();
  var Par = /* @__PURE__ */ function() {
    function Par2(value0) {
      this.value0 = value0;
    }
    ;
    Par2.create = function(value0) {
      return new Par2(value0);
    };
    return Par2;
  }();
  var Fork = /* @__PURE__ */ function() {
    function Fork2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Fork2.create = function(value0) {
      return function(value1) {
        return new Fork2(value0, value1);
      };
    };
    return Fork2;
  }();
  var Join = /* @__PURE__ */ function() {
    function Join2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Join2.create = function(value0) {
      return function(value1) {
        return new Join2(value0, value1);
      };
    };
    return Join2;
  }();
  var Kill = /* @__PURE__ */ function() {
    function Kill2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Kill2.create = function(value0) {
      return function(value1) {
        return new Kill2(value0, value1);
      };
    };
    return Kill2;
  }();
  var GetRef = /* @__PURE__ */ function() {
    function GetRef2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    GetRef2.create = function(value0) {
      return function(value1) {
        return new GetRef2(value0, value1);
      };
    };
    return GetRef2;
  }();
  var HalogenM = function(x3) {
    return x3;
  };
  var unsubscribe2 = function(sid) {
    return liftF(new Unsubscribe(sid, unit));
  };
  var subscribe2 = function(es) {
    return liftF(new Subscribe(function(v2) {
      return es;
    }, identity13));
  };
  var raise = function(o) {
    return liftF(new Raise(o, unit));
  };
  var query = function() {
    return function(dictIsSymbol) {
      var lookup13 = lookup4(dictIsSymbol);
      return function(dictOrd) {
        var lookup23 = lookup13(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(q3) {
              return liftF(new ChildQuery2(mkChildQueryBox(new ChildQuery(function(dictApplicative) {
                var pure110 = pure(dictApplicative);
                return function(k) {
                  var $177 = maybe(pure110(Nothing.value))(k);
                  var $178 = lookup23(label5)(p2);
                  return function($179) {
                    return $177($178($179));
                  };
                };
              }, q3, identity13))));
            };
          };
        };
      };
    };
  };
  var ordSubscriptionId = ordInt;
  var ordForkId = ordInt;
  var monadHalogenM = freeMonad;
  var monadStateHalogenM = {
    state: function($181) {
      return HalogenM(liftF(State.create($181)));
    },
    Monad0: function() {
      return monadHalogenM;
    }
  };
  var monadEffectHalogenM = function(dictMonadEffect) {
    return {
      liftEffect: function() {
        var $186 = liftEffect(dictMonadEffect);
        return function($187) {
          return HalogenM(liftF(Lift2.create($186($187))));
        };
      }(),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };
  var monadAffHalogenM = function(dictMonadAff) {
    var monadEffectHalogenM1 = monadEffectHalogenM(dictMonadAff.MonadEffect0());
    return {
      liftAff: function() {
        var $188 = liftAff(dictMonadAff);
        return function($189) {
          return HalogenM(liftF(Lift2.create($188($189))));
        };
      }(),
      MonadEffect0: function() {
        return monadEffectHalogenM1;
      }
    };
  };
  var functorHalogenM = freeFunctor;
  var bindHalogenM = freeBind;
  var applyHalogenM = freeApply;
  var applicativeHalogenM = freeApplicative;

  // output/Halogen.Query.HalogenQ/index.js
  var Initialize = /* @__PURE__ */ function() {
    function Initialize2(value0) {
      this.value0 = value0;
    }
    ;
    Initialize2.create = function(value0) {
      return new Initialize2(value0);
    };
    return Initialize2;
  }();
  var Finalize = /* @__PURE__ */ function() {
    function Finalize2(value0) {
      this.value0 = value0;
    }
    ;
    Finalize2.create = function(value0) {
      return new Finalize2(value0);
    };
    return Finalize2;
  }();
  var Receive = /* @__PURE__ */ function() {
    function Receive2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Receive2.create = function(value0) {
      return function(value1) {
        return new Receive2(value0, value1);
      };
    };
    return Receive2;
  }();
  var Action2 = /* @__PURE__ */ function() {
    function Action3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Action3.create = function(value0) {
      return function(value1) {
        return new Action3(value0, value1);
      };
    };
    return Action3;
  }();
  var Query = /* @__PURE__ */ function() {
    function Query2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Query2.create = function(value0) {
      return function(value1) {
        return new Query2(value0, value1);
      };
    };
    return Query2;
  }();

  // output/Halogen.VDom.Thunk/index.js
  var $runtime_lazy7 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var unsafeEqThunk = function(v2, v1) {
    return refEq2(v2.value0, v1.value0) && (refEq2(v2.value1, v1.value1) && v2.value1(v2.value3, v1.value3));
  };
  var runThunk = function(v2) {
    return v2.value2(v2.value3);
  };
  var buildThunk = function(toVDom) {
    var haltThunk = function(state3) {
      return halt(state3.vdom);
    };
    var $lazy_patchThunk = $runtime_lazy7("patchThunk", "Halogen.VDom.Thunk", function() {
      return function(state3, t2) {
        var $48 = unsafeEqThunk(state3.thunk, t2);
        if ($48) {
          return mkStep(new Step(extract2(state3.vdom), state3, $lazy_patchThunk(112), haltThunk));
        }
        ;
        var vdom = step(state3.vdom, toVDom(runThunk(t2)));
        return mkStep(new Step(extract2(vdom), {
          vdom,
          thunk: t2
        }, $lazy_patchThunk(115), haltThunk));
      };
    });
    var patchThunk = $lazy_patchThunk(108);
    var renderThunk = function(spec) {
      return function(t2) {
        var vdom = buildVDom(spec)(toVDom(runThunk(t2)));
        return mkStep(new Step(extract2(vdom), {
          thunk: t2,
          vdom
        }, patchThunk, haltThunk));
      };
    };
    return renderThunk;
  };

  // output/Halogen.Component/index.js
  var voidLeft2 = /* @__PURE__ */ voidLeft(functorHalogenM);
  var traverse_3 = /* @__PURE__ */ traverse_(applicativeHalogenM)(foldableMaybe);
  var map16 = /* @__PURE__ */ map(functorHalogenM);
  var pure6 = /* @__PURE__ */ pure(applicativeHalogenM);
  var lookup5 = /* @__PURE__ */ lookup3();
  var pop3 = /* @__PURE__ */ pop2();
  var insert4 = /* @__PURE__ */ insert3();
  var ComponentSlot = /* @__PURE__ */ function() {
    function ComponentSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ComponentSlot2.create = function(value0) {
      return new ComponentSlot2(value0);
    };
    return ComponentSlot2;
  }();
  var ThunkSlot = /* @__PURE__ */ function() {
    function ThunkSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ThunkSlot2.create = function(value0) {
      return new ThunkSlot2(value0);
    };
    return ThunkSlot2;
  }();
  var unComponentSlot = unsafeCoerce2;
  var unComponent = unsafeCoerce2;
  var mkEval = function(args) {
    return function(v2) {
      if (v2 instanceof Initialize) {
        return voidLeft2(traverse_3(args.handleAction)(args.initialize))(v2.value0);
      }
      ;
      if (v2 instanceof Finalize) {
        return voidLeft2(traverse_3(args.handleAction)(args.finalize))(v2.value0);
      }
      ;
      if (v2 instanceof Receive) {
        return voidLeft2(traverse_3(args.handleAction)(args.receive(v2.value0)))(v2.value1);
      }
      ;
      if (v2 instanceof Action2) {
        return voidLeft2(args.handleAction(v2.value0))(v2.value1);
      }
      ;
      if (v2 instanceof Query) {
        return unCoyoneda(function(g2) {
          var $45 = map16(maybe(v2.value1(unit))(g2));
          return function($46) {
            return $45(args.handleQuery($46));
          };
        })(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Halogen.Component (line 182, column 15 - line 192, column 71): " + [v2.constructor.name]);
    };
  };
  var mkComponentSlot = unsafeCoerce2;
  var mkComponent = unsafeCoerce2;
  var defaultEval = /* @__PURE__ */ function() {
    return {
      handleAction: $$const(pure6(unit)),
      handleQuery: $$const(pure6(Nothing.value)),
      receive: $$const(Nothing.value),
      initialize: Nothing.value,
      finalize: Nothing.value
    };
  }();
  var componentSlot = function() {
    return function(dictIsSymbol) {
      var lookup13 = lookup5(dictIsSymbol);
      var pop12 = pop3(dictIsSymbol);
      var insert13 = insert4(dictIsSymbol);
      return function(dictOrd) {
        var lookup23 = lookup13(dictOrd);
        var pop22 = pop12(dictOrd);
        var insert22 = insert13(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(comp) {
              return function(input3) {
                return function(output2) {
                  return mkComponentSlot({
                    get: lookup23(label5)(p2),
                    pop: pop22(label5)(p2),
                    set: insert22(label5)(p2),
                    component: comp,
                    input: input3,
                    output: output2
                  });
                };
              };
            };
          };
        };
      };
    };
  };

  // output/Foreign.Index/foreign.js
  function unsafeReadPropImpl(f, s2, key, value15) {
    return value15 == null ? f : s2(value15[key]);
  }

  // output/Foreign.Index/index.js
  var unsafeReadProp = function(dictMonad) {
    var fail4 = fail(dictMonad);
    var pure21 = pure(applicativeExceptT(dictMonad));
    return function(k) {
      return function(value15) {
        return unsafeReadPropImpl(fail4(new TypeMismatch("object", typeOf(value15))), pure21, k, value15);
      };
    };
  };
  var readProp = function(dictMonad) {
    return unsafeReadProp(dictMonad);
  };

  // output/Web.Event.Event/foreign.js
  function _currentTarget(e) {
    return e.currentTarget;
  }
  function preventDefault(e) {
    return function() {
      return e.preventDefault();
    };
  }

  // output/Web.Event.Event/index.js
  var currentTarget = function($5) {
    return toMaybe(_currentTarget($5));
  };

  // output/Web.HTML.Event.EventTypes/index.js
  var input2 = "input";
  var domcontentloaded = "DOMContentLoaded";

  // output/Web.UIEvent.MouseEvent.EventTypes/index.js
  var click = "click";

  // output/Halogen.HTML.Events/index.js
  var map17 = /* @__PURE__ */ map(functorMaybe);
  var composeKleisli2 = /* @__PURE__ */ composeKleisli(bindMaybe);
  var composeKleisliFlipped3 = /* @__PURE__ */ composeKleisliFlipped(/* @__PURE__ */ bindExceptT(monadIdentity));
  var readProp2 = /* @__PURE__ */ readProp(monadIdentity);
  var readString2 = /* @__PURE__ */ readString(monadIdentity);
  var mouseHandler = unsafeCoerce2;
  var handler$prime = function(et) {
    return function(f) {
      return handler(et)(function(ev) {
        return map17(Action.create)(f(ev));
      });
    };
  };
  var handler2 = function(et) {
    return function(f) {
      return handler(et)(function(ev) {
        return new Just(new Action(f(ev)));
      });
    };
  };
  var onClick = /* @__PURE__ */ function() {
    var $15 = handler2(click);
    return function($16) {
      return $15(mouseHandler($16));
    };
  }();
  var addForeignPropHandler = function(key) {
    return function(prop3) {
      return function(reader) {
        return function(f) {
          var go2 = function(a3) {
            return composeKleisliFlipped3(reader)(readProp2(prop3))(unsafeToForeign(a3));
          };
          return handler$prime(key)(composeKleisli2(currentTarget)(function(e) {
            return either($$const(Nothing.value))(function($85) {
              return Just.create(f($85));
            })(runExcept(go2(e)));
          }));
        };
      };
    };
  };
  var onValueInput = /* @__PURE__ */ addForeignPropHandler(input2)("value")(readString2);

  // output/Charting.TimeSeries/index.js
  var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
  var identity14 = /* @__PURE__ */ identity(categoryFn);
  var toUnfoldable5 = /* @__PURE__ */ toUnfoldable(unfoldableArray);
  var mapWithIndex3 = /* @__PURE__ */ mapWithIndex(functorWithIndexList);
  var maximum3 = /* @__PURE__ */ maximum(ordNumber)(foldableList);
  var minimum3 = /* @__PURE__ */ minimum(ordNumber)(foldableList);
  var append7 = /* @__PURE__ */ append(/* @__PURE__ */ semigroupFn(/* @__PURE__ */ semigroupFn(semigroupArray)));
  var renderVerticalBar = function(pref) {
    return function(idx) {
      return function(v2) {
        return line([x1(pref.positionX(idx)), x2(pref.positionX(idx)), y1(pref.positionY(pref.normalize(v2.value0))), y2(pref.positionY(pref.normalize(v2.value1))), stroke(pref.color(idx)), strokeWidth(pref.width(idx))]);
      };
    };
  };
  var renderSegment = function(pref) {
    return function(idx) {
      return function(v2) {
        return g([])([line([x1(pref.positionX(idx)), x2(pref.positionX(idx + 1 | 0)), y1(pref.positionY(pref.normalize(v2.value0))), y2(pref.positionY(pref.normalize(v2.value1))), stroke(pref.color(idx)), strokeWidth(1)])]);
      };
    };
  };
  var renderPoint = function(pref) {
    return function(idx) {
      return function(v2) {
        return g([])([circle([cx(pref.positionX(idx)), cy(pref.positionY(pref.normalize(v2))), r(pref.radius(idx)), fill(pref.color(idx))])]);
      };
    };
  };
  var redlightA = /* @__PURE__ */ function() {
    return new RGBA(200, 20, 20, 0.2);
  }();
  var redlight = /* @__PURE__ */ function() {
    return new RGB(200, 20, 20);
  }();
  var greylightA = /* @__PURE__ */ function() {
    return new RGBA(20, 20, 20, 0.2);
  }();
  var greylight = /* @__PURE__ */ function() {
    return new RGB(20, 20, 20);
  }();
  var bluelightA = /* @__PURE__ */ function() {
    return new RGBA(20, 20, 200, 0.2);
  }();
  var paletteA = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v2) {
      if (v2 === 0) {
        $tco_done = true;
        return greylightA;
      }
      ;
      if (v2 === 1) {
        $tco_done = true;
        return redlightA;
      }
      ;
      if (v2 === 2) {
        $tco_done = true;
        return bluelightA;
      }
      ;
      $copy_v = mod2(v2)(3);
      return;
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var bluelight = /* @__PURE__ */ function() {
    return new RGB(20, 20, 200);
  }();
  var palette = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v2) {
      if (v2 === 0) {
        $tco_done = true;
        return greylight;
      }
      ;
      if (v2 === 1) {
        $tco_done = true;
        return redlight;
      }
      ;
      if (v2 === 2) {
        $tco_done = true;
        return bluelight;
      }
      ;
      $copy_v = mod2(v2)(3);
      return;
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var renderMultiChartTimeseries = function(xxs) {
    var yAxis = function(xval) {
      return line([x1(xval), x2(xval), y1(0), y2(250), stroke(palette(0)), strokeWidth(3)]);
    };
    var xAxis = function(yval) {
      return line([x1(0), x2(620), y1(yval), y2(yval), stroke(palette(0)), strokeWidth(3)]);
    };
    var radius = function(v2) {
      if (v2 === 0) {
        return 6;
      }
      ;
      if (v2 === 1) {
        return 4;
      }
      ;
      if (v2 === 2) {
        return 3;
      }
      ;
      return 2.4;
    };
    var positionY = function(y3) {
      return 250 * (1 - y3);
    };
    var positionX = function(idx) {
      return toNumber(610 - (6 * idx | 0) | 0);
    };
    var pref3 = function(idx) {
      return {
        positionX,
        positionY: identity14,
        normalize: identity14,
        color: $$const(paletteA(idx)),
        width: $$const(3)
      };
    };
    var renderMaybeOutage = function(tsIdx) {
      return function(ptIdx) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return new Just(renderVerticalBar(pref3(tsIdx))(ptIdx)(new Tuple(0, 250)));
          }
          ;
          return Nothing.value;
        };
      };
    };
    var outagebars = function(tsIdx) {
      return function(mreals) {
        return toUnfoldable5(catMaybes(mapWithIndex3(renderMaybeOutage(tsIdx))(mreals)));
      };
    };
    var allReals = catMaybes(concat(xxs));
    var vmax = maximum3(allReals);
    var yLabelMax = text2([x(3), y(15)])([text(maybe(".")(toString)(vmax))]);
    var vmin = minimum3(allReals);
    var normalize2 = function(v2) {
      var v1 = new Tuple(vmin, vmax);
      if (v1.value0 instanceof Just && v1.value1 instanceof Just) {
        var $53 = v1.value1.value0 === v1.value0.value0;
        if ($53) {
          return 0.5;
        }
        ;
        return (v2 - v1.value0.value0) / (v1.value1.value0 - v1.value0.value0);
      }
      ;
      return 0.5;
    };
    var pref1 = function(idx) {
      return {
        positionX,
        positionY,
        normalize: normalize2,
        color: $$const(palette(idx)),
        width: $$const(1)
      };
    };
    var renderMaybeSegment = function(v2) {
      return function(v1) {
        return function(v22) {
          if (v22.value0 instanceof Just && (v22.value1 instanceof Just && (isFiniteImpl(v22.value0.value0) && isFiniteImpl(v22.value1.value0)))) {
            return new Just(renderSegment(pref1(v2))(v1)(new Tuple(v22.value0.value0, v22.value1.value0)));
          }
          ;
          return Nothing.value;
        };
      };
    };
    var segments = function(tsIdx) {
      return function(mreals) {
        return toUnfoldable5(catMaybes(mapWithIndex3(renderMaybeSegment(tsIdx))(zip(mreals)(drop(1)(mreals)))));
      };
    };
    var pref2 = function(idx) {
      return {
        positionX,
        positionY,
        normalize: normalize2,
        radius,
        color: $$const(palette(idx))
      };
    };
    var renderMaybePoint = function(v2) {
      return function(v1) {
        return function(v22) {
          if (v22 instanceof Just && isFiniteImpl(v22.value0)) {
            return new Just(renderPoint(pref2(v2))(v1)(v22.value0));
          }
          ;
          return Nothing.value;
        };
      };
    };
    var points = function(tsIdx) {
      return function(mreals) {
        return toUnfoldable5(catMaybes(mapWithIndex3(renderMaybePoint(tsIdx))(mreals)));
      };
    };
    var oneTimeseries = function(tsIdx) {
      return function(xs) {
        return g([])(append7(segments)(append7(points)(outagebars))(tsIdx)(xs));
      };
    };
    var timeseries = mapWithIndex3(oneTimeseries)(xxs);
    var yLabelMin = text2([x(3), y(235)])([text(maybe(".")(toString)(vmin))]);
    return svg([width(620), height(250), viewBox(0)(0)(620)(250)])([g([])(toUnfoldable5(timeseries)), g([])([xAxis(250), yAxis(0), yLabelMax, yLabelMin])]);
  };
  var renderChartTimeseries = function(xs) {
    return renderMultiChartTimeseries(singleton3(xs));
  };
  var renderChartDiffTimeseries = function(xs) {
    var f = function(v2) {
      return function(v1) {
        if (v2 instanceof Just && v1 instanceof Just) {
          return new Just(v1.value0 - v2.value0);
        }
        ;
        return Nothing.value;
      };
    };
    var ys = zipWith(f)(drop(1)(xs))(xs);
    return renderChartTimeseries(ys);
  };

  // output/Data.Map/index.js
  var keys3 = /* @__PURE__ */ function() {
    var $38 = $$void(functorMap);
    return function($39) {
      return fromMap($38($39));
    };
  }();

  // output/Parsing/index.js
  var $runtime_lazy8 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var show5 = /* @__PURE__ */ show(showString);
  var unwrap5 = /* @__PURE__ */ unwrap();
  var ParseState = /* @__PURE__ */ function() {
    function ParseState2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    ParseState2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new ParseState2(value0, value1, value22);
        };
      };
    };
    return ParseState2;
  }();
  var ParseError = /* @__PURE__ */ function() {
    function ParseError2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ParseError2.create = function(value0) {
      return function(value1) {
        return new ParseError2(value0, value1);
      };
    };
    return ParseError2;
  }();
  var More = /* @__PURE__ */ function() {
    function More2(value0) {
      this.value0 = value0;
    }
    ;
    More2.create = function(value0) {
      return new More2(value0);
    };
    return More2;
  }();
  var Lift3 = /* @__PURE__ */ function() {
    function Lift4(value0) {
      this.value0 = value0;
    }
    ;
    Lift4.create = function(value0) {
      return new Lift4(value0);
    };
    return Lift4;
  }();
  var Stop = /* @__PURE__ */ function() {
    function Stop2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Stop2.create = function(value0) {
      return function(value1) {
        return new Stop2(value0, value1);
      };
    };
    return Stop2;
  }();
  var lazyParserT = {
    defer: function(f) {
      var m2 = defer2(f);
      return function(state1, more, lift1, $$throw2, done) {
        var v2 = force(m2);
        return v2(state1, more, lift1, $$throw2, done);
      };
    }
  };
  var genericPosition_ = {
    to: function(x3) {
      return x3;
    },
    from: function(x3) {
      return x3;
    }
  };
  var genericShow2 = /* @__PURE__ */ genericShow(genericPosition_)(/* @__PURE__ */ genericShowConstructor(/* @__PURE__ */ genericShowArgsArgument(/* @__PURE__ */ showRecord()()(/* @__PURE__ */ showRecordFieldsCons({
    reflectSymbol: function() {
      return "column";
    }
  })(/* @__PURE__ */ showRecordFieldsCons({
    reflectSymbol: function() {
      return "index";
    }
  })(/* @__PURE__ */ showRecordFieldsCons({
    reflectSymbol: function() {
      return "line";
    }
  })(showRecordFieldsNil)(showInt))(showInt))(showInt))))({
    reflectSymbol: function() {
      return "Position";
    }
  }));
  var showPosition = {
    show: function(x3) {
      return genericShow2(x3);
    }
  };
  var show13 = /* @__PURE__ */ show(showPosition);
  var functorParserT = {
    map: function(f) {
      return function(v2) {
        return function(state1, more, lift1, $$throw2, done) {
          return more(function(v1) {
            return v2(state1, more, lift1, $$throw2, function(state22, a3) {
              return more(function(v22) {
                return done(state22, f(a3));
              });
            });
          });
        };
      };
    }
  };
  var applyParserT = {
    apply: function(v2) {
      return function(v1) {
        return function(state1, more, lift1, $$throw2, done) {
          return more(function(v22) {
            return v2(state1, more, lift1, $$throw2, function(state22, f) {
              return more(function(v3) {
                return v1(state22, more, lift1, $$throw2, function(state3, a3) {
                  return more(function(v4) {
                    return done(state3, f(a3));
                  });
                });
              });
            });
          });
        };
      };
    },
    Functor0: function() {
      return functorParserT;
    }
  };
  var bindParserT = {
    bind: function(v2) {
      return function(next) {
        return function(state1, more, lift1, $$throw2, done) {
          return more(function(v1) {
            return v2(state1, more, lift1, $$throw2, function(state22, a3) {
              return more(function(v22) {
                var v3 = next(a3);
                return v3(state22, more, lift1, $$throw2, done);
              });
            });
          });
        };
      };
    },
    Apply0: function() {
      return applyParserT;
    }
  };
  var bindFlipped5 = /* @__PURE__ */ bindFlipped(bindParserT);
  var applicativeParserT = {
    pure: function(a3) {
      return function(state1, v2, v1, v22, done) {
        return done(state1, a3);
      };
    },
    Apply0: function() {
      return applyParserT;
    }
  };
  var monadParserT = {
    Applicative0: function() {
      return applicativeParserT;
    },
    Bind1: function() {
      return bindParserT;
    }
  };
  var monadRecParserT = {
    tailRecM: function(next) {
      return function(initArg) {
        return function(state1, more, lift1, $$throw2, done) {
          var $lazy_loop = $runtime_lazy8("loop", "Parsing", function() {
            return function(state22, arg, gas) {
              var v2 = next(arg);
              return v2(state22, more, lift1, $$throw2, function(state3, step4) {
                if (step4 instanceof Loop) {
                  var $188 = gas === 0;
                  if ($188) {
                    return more(function(v1) {
                      return $lazy_loop(269)(state3, step4.value0, 30);
                    });
                  }
                  ;
                  return $lazy_loop(271)(state3, step4.value0, gas - 1 | 0);
                }
                ;
                if (step4 instanceof Done) {
                  return done(state3, step4.value0);
                }
                ;
                throw new Error("Failed pattern match at Parsing (line 265, column 39 - line 273, column 43): " + [step4.constructor.name]);
              });
            };
          });
          var loop2 = $lazy_loop(262);
          return loop2(state1, initArg, 30);
        };
      };
    },
    Monad0: function() {
      return monadParserT;
    }
  };
  var monadThrowParseErrorParse = {
    throwError: function(err) {
      return function(state1, v2, v1, $$throw2, v22) {
        return $$throw2(state1, err);
      };
    },
    Monad0: function() {
      return monadParserT;
    }
  };
  var throwError2 = /* @__PURE__ */ throwError(monadThrowParseErrorParse);
  var altParserT = {
    alt: function(v2) {
      return function(v1) {
        return function(v22, more, lift1, $$throw2, done) {
          return more(function(v3) {
            return v2(new ParseState(v22.value0, v22.value1, false), more, lift1, function(v4, err) {
              return more(function(v5) {
                if (v4.value2) {
                  return $$throw2(v4, err);
                }
                ;
                return v1(v22, more, lift1, $$throw2, done);
              });
            }, done);
          });
        };
      };
    },
    Functor0: function() {
      return functorParserT;
    }
  };
  var stateParserT = function(k) {
    return function(state1, v2, v1, v22, done) {
      var v3 = k(state1);
      return done(v3.value1, v3.value0);
    };
  };
  var showParseError = {
    show: function(v2) {
      return "(ParseError " + (show5(v2.value0) + (" " + (show13(v2.value1) + ")")));
    }
  };
  var runParserT$prime = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var map34 = map(Monad0.Bind1().Apply0().Functor0());
    var pure110 = pure(Monad0.Applicative0());
    var tailRecM5 = tailRecM(dictMonadRec);
    return function(state1) {
      return function(v2) {
        var go2 = function($copy_step) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(step4) {
            var v1 = step4(unit);
            if (v1 instanceof More) {
              $copy_step = v1.value0;
              return;
            }
            ;
            if (v1 instanceof Lift3) {
              $tco_done = true;
              return map34(Loop.create)(v1.value0);
            }
            ;
            if (v1 instanceof Stop) {
              $tco_done = true;
              return pure110(new Done(new Tuple(v1.value1, v1.value0)));
            }
            ;
            throw new Error("Failed pattern match at Parsing (line 144, column 13 - line 150, column 32): " + [v1.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_step);
          }
          ;
          return $tco_result;
        };
        return tailRecM5(go2)(function(v1) {
          return v2(state1, More.create, Lift3.create, function(state22, err) {
            return new Stop(state22, new Left(err));
          }, function(state22, res) {
            return new Stop(state22, new Right(res));
          });
        });
      };
    };
  };
  var position = /* @__PURE__ */ stateParserT(function(v2) {
    return new Tuple(v2.value1, v2);
  });
  var initialPos = {
    index: 0,
    line: 1,
    column: 1
  };
  var runParserT = function(dictMonadRec) {
    var map34 = map(dictMonadRec.Monad0().Bind1().Apply0().Functor0());
    var runParserT$prime1 = runParserT$prime(dictMonadRec);
    return function(s2) {
      return function(p2) {
        var initialState = new ParseState(s2, initialPos, false);
        return map34(fst)(runParserT$prime1(initialState)(p2));
      };
    };
  };
  var runParserT1 = /* @__PURE__ */ runParserT(monadRecIdentity);
  var runParser = function(s2) {
    var $253 = runParserT1(s2);
    return function($254) {
      return unwrap5($253($254));
    };
  };
  var failWithPosition = function(message3) {
    return function(pos) {
      return throwError2(new ParseError(message3, pos));
    };
  };
  var fail3 = function(message3) {
    return bindFlipped5(failWithPosition(message3))(position);
  };
  var plusParserT = {
    empty: /* @__PURE__ */ fail3("No alternative"),
    Alt0: function() {
      return altParserT;
    }
  };
  var alternativeParserT = {
    Applicative0: function() {
      return applicativeParserT;
    },
    Plus1: function() {
      return plusParserT;
    }
  };

  // output/Parsing.Combinators/index.js
  var alt4 = /* @__PURE__ */ alt(altParserT);
  var defer3 = /* @__PURE__ */ defer(lazyParserT);
  var voidLeft3 = /* @__PURE__ */ voidLeft(functorParserT);
  var pure7 = /* @__PURE__ */ pure(applicativeParserT);
  var applySecond2 = /* @__PURE__ */ applySecond(applyParserT);
  var tailRecM3 = /* @__PURE__ */ tailRecM(monadRecParserT);
  var bind4 = /* @__PURE__ */ bind(bindParserT);
  var mapFlipped3 = /* @__PURE__ */ mapFlipped(functorParserT);
  var map18 = /* @__PURE__ */ map(functorParserT);
  var withLazyErrorMessage = function(p2) {
    return function(msg) {
      return alt4(p2)(defer3(function(v2) {
        return fail3("Expected " + msg(unit));
      }));
    };
  };
  var withErrorMessage = function(p2) {
    return function(msg) {
      return alt4(p2)(fail3("Expected " + msg));
    };
  };
  var skipMany1 = function(p2) {
    var go2 = function(v2) {
      return alt4(voidLeft3(p2)(new Loop(unit)))(pure7(new Done(unit)));
    };
    return applySecond2(p2)(tailRecM3(go2)(unit));
  };
  var sepEndBy1 = function(p2) {
    return function(sep) {
      var go2 = function(acc) {
        var done = defer3(function(v2) {
          return pure7(new Done(reverse(acc)));
        });
        var nextOne = bind4(sep)(function() {
          return alt4(mapFlipped3(p2)(function(a3) {
            return new Loop(new Cons(a3, acc));
          }))(done);
        });
        return alt4(nextOne)(done);
      };
      return bind4(p2)(function(a3) {
        return alt4(map18(cons$prime(a3))(tailRecM3(go2)(Nil.value)))(pure7(singleton5(a3)));
      });
    };
  };
  var sepEndBy = function(p2) {
    return function(sep) {
      return alt4(map18(toList2)(sepEndBy1(p2)(sep)))(pure7(Nil.value));
    };
  };
  var option = function(a3) {
    return function(p2) {
      return alt4(p2)(pure7(a3));
    };
  };
  var optionMaybe = function(p2) {
    return option(Nothing.value)(map18(Just.create)(p2));
  };

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var traverse1Impl = function() {
    function Cont(fn) {
      this.fn = fn;
    }
    var emptyList = {};
    var ConsCell = function(head6, tail2) {
      this.head = head6;
      this.tail = tail2;
    };
    function finalCell(head6) {
      return new ConsCell(head6, emptyList);
    }
    function consList(x3) {
      return function(xs) {
        return new ConsCell(x3, xs);
      };
    }
    function listToArray(list) {
      var arr = [];
      var xs = list;
      while (xs !== emptyList) {
        arr.push(xs.head);
        xs = xs.tail;
      }
      return arr;
    }
    return function(apply3) {
      return function(map34) {
        return function(f) {
          var buildFrom = function(x3, ys) {
            return apply3(map34(consList)(f(x3)))(ys);
          };
          var go2 = function(acc, currentLen, xs) {
            if (currentLen === 0) {
              return acc;
            } else {
              var last3 = xs[currentLen - 1];
              return new Cont(function() {
                var built = go2(buildFrom(last3, acc), currentLen - 1, xs);
                return built;
              });
            }
          };
          return function(array) {
            var acc = map34(finalCell)(f(array[array.length - 1]));
            var result = go2(acc, array.length - 1, array);
            while (result instanceof Cont) {
              result = result.fn();
            }
            return map34(listToArray)(result);
          };
        };
      };
    };
  }();

  // output/Parsing.String/index.js
  var fromEnum3 = /* @__PURE__ */ fromEnum(boundedEnumCodePoint);
  var mod3 = /* @__PURE__ */ mod(euclideanRingInt);
  var fromJust5 = /* @__PURE__ */ fromJust();
  var toEnum2 = /* @__PURE__ */ toEnum(boundedEnumChar);
  var show6 = /* @__PURE__ */ show(showString);
  var show22 = /* @__PURE__ */ show(showChar);
  var updatePosSingle = function(v2) {
    return function(cp) {
      return function(after) {
        var v1 = fromEnum3(cp);
        if (v1 === 10) {
          return {
            index: v2.index + 1 | 0,
            line: v2.line + 1 | 0,
            column: 1
          };
        }
        ;
        if (v1 === 13) {
          var v22 = codePointAt(0)(after);
          if (v22 instanceof Just && fromEnum3(v22.value0) === 10) {
            return {
              index: v2.index + 1 | 0,
              line: v2.line,
              column: v2.column
            };
          }
          ;
          return {
            index: v2.index + 1 | 0,
            line: v2.line + 1 | 0,
            column: 1
          };
        }
        ;
        if (v1 === 9) {
          return {
            index: v2.index + 1 | 0,
            line: v2.line,
            column: (v2.column + 8 | 0) - mod3(v2.column - 1 | 0)(8) | 0
          };
        }
        ;
        return {
          index: v2.index + 1 | 0,
          line: v2.line,
          column: v2.column + 1 | 0
        };
      };
    };
  };
  var updatePosString = function($copy_pos) {
    return function($copy_before) {
      return function($copy_after) {
        var $tco_var_pos = $copy_pos;
        var $tco_var_before = $copy_before;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(pos, before, after) {
          var v2 = uncons2(before);
          if (v2 instanceof Nothing) {
            $tco_done = true;
            return pos;
          }
          ;
          if (v2 instanceof Just) {
            var newPos = function() {
              if ($$null3(v2.value0.tail)) {
                return updatePosSingle(pos)(v2.value0.head)(after);
              }
              ;
              if (otherwise) {
                return updatePosSingle(pos)(v2.value0.head)(v2.value0.tail);
              }
              ;
              throw new Error("Failed pattern match at Parsing.String (line 160, column 7 - line 162, column 52): " + []);
            }();
            $tco_var_pos = newPos;
            $tco_var_before = v2.value0.tail;
            $copy_after = after;
            return;
          }
          ;
          throw new Error("Failed pattern match at Parsing.String (line 156, column 36 - line 163, column 38): " + [v2.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_pos, $tco_var_before, $copy_after);
        }
        ;
        return $tco_result;
      };
    };
  };
  var satisfy = function(f) {
    return mkFn5(function(v2) {
      return function(v1) {
        return function(v22) {
          return function($$throw2) {
            return function(done) {
              var v3 = uncons2(v2.value0);
              if (v3 instanceof Nothing) {
                return $$throw2(v2, new ParseError("Unexpected EOF", v2.value1));
              }
              ;
              if (v3 instanceof Just) {
                var cp = fromEnum3(v3.value0.head);
                var $74 = cp < 0 || cp > 65535;
                if ($74) {
                  return $$throw2(v2, new ParseError("Expected Char", v2.value1));
                }
                ;
                var ch = fromJust5(toEnum2(cp));
                var $75 = f(ch);
                if ($75) {
                  return done(new ParseState(v3.value0.tail, updatePosSingle(v2.value1)(v3.value0.head)(v3.value0.tail), true), ch);
                }
                ;
                return $$throw2(v2, new ParseError("Predicate unsatisfied", v2.value1));
              }
              ;
              throw new Error("Failed pattern match at Parsing.String (line 109, column 7 - line 124, column 75): " + [v3.constructor.name]);
            };
          };
        };
      };
    });
  };
  var consumeWith = function(f) {
    return mkFn5(function(v2) {
      return function(v1) {
        return function(v22) {
          return function($$throw2) {
            return function(done) {
              var v3 = f(v2.value0);
              if (v3 instanceof Left) {
                return $$throw2(v2, new ParseError(v3.value0, v2.value1));
              }
              ;
              if (v3 instanceof Right) {
                return done(new ParseState(v3.value0.remainder, updatePosString(v2.value1)(v3.value0.consumed)(v3.value0.remainder), true), v3.value0.value);
              }
              ;
              throw new Error("Failed pattern match at Parsing.String (line 280, column 7 - line 284, column 97): " + [v3.constructor.name]);
            };
          };
        };
      };
    });
  };
  var string2 = function(str) {
    return consumeWith(function(input3) {
      var v2 = stripPrefix(str)(input3);
      if (v2 instanceof Just) {
        return new Right({
          value: str,
          consumed: str,
          remainder: v2.value0
        });
      }
      ;
      return new Left("Expected " + show6(str));
    });
  };
  var $$char = function(c2) {
    return withErrorMessage(satisfy(function(v2) {
      return v2 === c2;
    }))(show22(c2));
  };

  // output/Parsing.String.Basic/index.js
  var elem1 = /* @__PURE__ */ elem2(eqChar);
  var show14 = /* @__PURE__ */ show(/* @__PURE__ */ showArray(showChar));
  var notElem1 = /* @__PURE__ */ notElem2(eqChar);
  var oneOf2 = function(ss) {
    return withLazyErrorMessage(satisfy(flip(elem1)(ss)))(function(v2) {
      return "one of " + show14(ss);
    });
  };
  var noneOf = function(ss) {
    return withLazyErrorMessage(satisfy(flip(notElem1)(ss)))(function(v2) {
      return "none of " + show14(ss);
    });
  };

  // output/Parsing.Prometheus/index.js
  var map19 = /* @__PURE__ */ map(functorParserT);
  var manyRec2 = /* @__PURE__ */ manyRec(monadRecParserT)(alternativeParserT);
  var applySecond3 = /* @__PURE__ */ applySecond(applyParserT);
  var alt5 = /* @__PURE__ */ alt(altParserT);
  var bind5 = /* @__PURE__ */ bind(bindParserT);
  var pure8 = /* @__PURE__ */ pure(applicativeParserT);
  var mempty2 = /* @__PURE__ */ mempty(monoidList);
  var MetricLine = /* @__PURE__ */ function() {
    function MetricLine2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    MetricLine2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new MetricLine2(value0, value1, value22, value32);
          };
        };
      };
    };
    return MetricLine2;
  }();
  var HelpLine = /* @__PURE__ */ function() {
    function HelpLine2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    HelpLine2.create = function(value0) {
      return function(value1) {
        return new HelpLine2(value0, value1);
      };
    };
    return HelpLine2;
  }();
  var spacing = /* @__PURE__ */ skipMany1(/* @__PURE__ */ $$char(" "));
  var pairValue = snd;
  var pairName = fst;
  var otherChar = /* @__PURE__ */ noneOf(/* @__PURE__ */ toCharArray('"'));
  var fromCharList = /* @__PURE__ */ function() {
    var $102 = fromFoldable2(foldableList);
    return function($103) {
      return fromCharArray($102($103));
    };
  }();
  var restOfLine = /* @__PURE__ */ map19(fromCharList)(/* @__PURE__ */ manyRec2(/* @__PURE__ */ noneOf(["\n"])));
  var fromArray = /* @__PURE__ */ fromFoldable(foldableArray);
  var escapedChar = /* @__PURE__ */ applySecond3(/* @__PURE__ */ $$char("\\"))(/* @__PURE__ */ oneOf2(/* @__PURE__ */ toCharArray('\\"\n')));
  var promQuotedString = /* @__PURE__ */ manyRec2(/* @__PURE__ */ alt5(escapedChar)(otherChar));
  var labelValue = /* @__PURE__ */ map19(fromCharList)(promQuotedString);
  var allowedTimestampChars = /* @__PURE__ */ toCharArray("1234567890-");
  var metricTimestamp = /* @__PURE__ */ map19(fromCharList)(/* @__PURE__ */ manyRec2(/* @__PURE__ */ oneOf2(allowedTimestampChars)));
  var allowedNameChars = /* @__PURE__ */ toCharArray("QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm_1234567890");
  var promBasicName = /* @__PURE__ */ manyRec2(/* @__PURE__ */ oneOf2(allowedNameChars));
  var labelName = /* @__PURE__ */ map19(fromCharList)(promBasicName);
  var labelPair = /* @__PURE__ */ bind5(labelName)(function(n) {
    return bind5($$char("="))(function() {
      return bind5($$char('"'))(function() {
        return bind5(labelValue)(function(v2) {
          return bind5($$char('"'))(function() {
            return pure8(new Tuple(n, v2));
          });
        });
      });
    });
  });
  var labelsList = /* @__PURE__ */ sepEndBy(labelPair)(/* @__PURE__ */ string2(","));
  var labels2 = /* @__PURE__ */ applyFirst(applyParserT)(/* @__PURE__ */ applySecond3(/* @__PURE__ */ $$char("{"))(labelsList))(/* @__PURE__ */ $$char("}"));
  var metricName = /* @__PURE__ */ map19(fromCharList)(promBasicName);
  var allowedFloatChars = /* @__PURE__ */ toCharArray("01234567890-e.");
  var boundedFloat = /* @__PURE__ */ bind5(/* @__PURE__ */ map19(fromCharList)(/* @__PURE__ */ manyRec2(/* @__PURE__ */ oneOf2(allowedFloatChars))))(function(val) {
    var v2 = fromString(val);
    if (v2 instanceof Just) {
      return pure8(v2.value0);
    }
    ;
    return fail3("could not parse float from val: " + val);
  });
  var metricValue = /* @__PURE__ */ function() {
    return alt5(boundedFloat)(alt5(applySecond3(string2("NaN"))(pure8(nan)))(alt5(applySecond3(string2("+Inf"))(pure8(infinity)))(applySecond3(string2("-Inf"))(pure8(-infinity)))));
  }();
  var metric = /* @__PURE__ */ bind5(metricName)(function(n) {
    return bind5(option(mempty2)(labels2))(function(pairs) {
      return bind5(spacing)(function() {
        return bind5(metricValue)(function(val) {
          return bind5(optionMaybe(applySecond3(spacing)(metricTimestamp)))(function(tst) {
            return bind5(restOfLine)(function() {
              return pure8(new MetricLine(n, pairs, val, tst));
            });
          });
        });
      });
    });
  });

  // output/Data.ArrayBuffer.Typed/foreign.js
  function lengthImpl2(v2) {
    return v2.length;
  }
  function newArray(f) {
    return function newArray_(a3, mb, mc) {
      if (mb === null)
        return new f(a3);
      var l2 = a3.byteLength;
      var eb = f.BYTES_PER_ELEMENT;
      var off = Math.min(l2, mb >>> 0);
      if (mc === null)
        return new f(a3, off);
      var len = Math.min((l2 - off) / eb, mc);
      return new f(a3, off, len);
    };
  }
  var newUint8ClampedArray = newArray(Uint8ClampedArray);
  var newUint32Array = newArray(Uint32Array);
  var newUint16Array = newArray(Uint16Array);
  var newUint8Array = newArray(Uint8Array);
  var newInt32Array = newArray(Int32Array);
  var newInt16Array = newArray(Int16Array);
  var newInt8Array = newArray(Int8Array);
  var newFloat32Array = newArray(Float32Array);
  var newFloat64Array = newArray(Float64Array);
  function setImpl(a3, off, b2) {
    a3.set(b2, off);
  }
  function unsafeAtImpl(a3, i2) {
    return a3[i2];
  }

  // output/Data.ArrayBuffer.Typed/index.js
  var pure9 = /* @__PURE__ */ pure(applicativeEffect);
  var applySecond4 = /* @__PURE__ */ applySecond(applyEffect);
  var unsafeAt = function(dictTypedArray) {
    return function() {
      return function(a3) {
        return function(o) {
          return function() {
            return unsafeAtImpl(a3, o);
          };
        };
      };
    };
  };
  var typedArrayUint8 = {
    create: newUint8Array,
    BinaryValue0: function() {
      return void 0;
    }
  };
  var typedArrayFloat64 = {
    create: newFloat64Array,
    BinaryValue0: function() {
      return void 0;
    }
  };
  var length7 = lengthImpl2;
  var setInternal = function(lenfn) {
    return function(a3) {
      return function(mo) {
        return function(b2) {
          var o = fromMaybe(0)(mo);
          var $105 = o >= 0 && lenfn(b2) <= (length7(a3) - o | 0);
          if ($105) {
            return applySecond4(function() {
              return setImpl(a3, o, b2);
            })(pure9(true));
          }
          ;
          return pure9(false);
        };
      };
    };
  };
  var set = function(dictTypedArray) {
    return setInternal(length2);
  };
  var create2 = function(dict) {
    return dict.create;
  };
  var empty8 = function(dictTypedArray) {
    var create1 = create2(dictTypedArray);
    return function(n) {
      return function() {
        return create1(n, nullImpl, nullImpl);
      };
    };
  };

  // output/Data.UInt/foreign.js
  function from3(val) {
    return val >>> 0;
  }
  function uintEq(x3) {
    return function(y3) {
      return x3 == y3;
    };
  }

  // output/Data.UInt/index.js
  var uintEqInstance = {
    eq: uintEq
  };
  var fromInt = from3;

  // output/HistoryPacked/index.js
  var unsafeAt2 = /* @__PURE__ */ unsafeAt(typedArrayUint8)();
  var mod4 = /* @__PURE__ */ mod(euclideanRingInt);
  var eq4 = /* @__PURE__ */ eq(uintEqInstance);
  var unsafeAt1 = /* @__PURE__ */ unsafeAt(typedArrayFloat64)();
  var pure10 = /* @__PURE__ */ pure(applicativeEffect);
  var traverse3 = /* @__PURE__ */ traverse(traversableMap)(applicativeEffect);
  var ordTuple3 = /* @__PURE__ */ ordTuple(ordString);
  var ordTuple1 = /* @__PURE__ */ ordTuple3(/* @__PURE__ */ ordList(/* @__PURE__ */ ordTuple3(ordString)));
  var lookup6 = /* @__PURE__ */ lookup2(ordTuple1);
  var set2 = /* @__PURE__ */ set(typedArrayFloat64);
  var set1 = /* @__PURE__ */ set(typedArrayUint8);
  var insert6 = /* @__PURE__ */ insert(ordTuple1);
  var union4 = /* @__PURE__ */ union3(ordTuple1);
  var foldM4 = /* @__PURE__ */ foldM(foldableSet)(monadEffect);
  var fromFoldable5 = /* @__PURE__ */ fromFoldable3(ordTuple1)(foldableList);
  var map20 = /* @__PURE__ */ map(functorList);
  var fromFoldable1 = /* @__PURE__ */ fromFoldable3(ordString)(foldableList);
  var historyLen = 100;
  var newBuf = /* @__PURE__ */ function() {
    return apply(applyEffect)(map(functorEffect)(Tuple.create)(empty8(typedArrayFloat64)(historyLen)))(empty8(typedArrayUint8)(historyLen));
  }();
  var toArrayMap = function(h7) {
    var unfoldQuery = function(buf) {
      return function(mask) {
        return function(i2) {
          return function(ret) {
            if (i2 < (h7.ptr + historyLen | 0)) {
              return function __do3() {
                var k = unsafeAt2(mask)(mod4(i2)(historyLen))();
                var $45 = eq4(fromInt(0))(k);
                if ($45) {
                  return unfoldQuery(buf)(mask)(i2 + 1 | 0)(new Cons(Nothing.value, ret))();
                }
                ;
                var v2 = unsafeAt1(buf)(mod4(i2)(historyLen))();
                return unfoldQuery(buf)(mask)(i2 + 1 | 0)(new Cons(new Just(v2), ret))();
              };
            }
            ;
            if (otherwise) {
              return pure10(ret);
            }
            ;
            throw new Error("Failed pattern match at HistoryPacked (line 71, column 5 - line 80, column 29): " + [buf.constructor.name, mask.constructor.name, i2.constructor.name, ret.constructor.name]);
          };
        };
      };
    };
    var adapt = function(v2) {
      return unfoldQuery(v2.value0)(v2.value1)(h7.ptr)(Nil.value);
    };
    return traverse3(adapt)(h7.timeseriesData);
  };
  var updateHistory$prime = function(v2) {
    return function(h7) {
      if (v2 instanceof Nothing) {
        return pure10(h7);
      }
      ;
      if (v2 instanceof Just) {
        var runUpdate = function(map0) {
          return function(key) {
            var v1 = new Tuple(lookup6(key)(v2.value0.metrics), lookup6(key)(h7.timeseriesData));
            if (v1.value0 instanceof Nothing && v1.value1 instanceof Nothing) {
              return pure10(map0);
            }
            ;
            if (v1.value0 instanceof Nothing && v1.value1 instanceof Just) {
              return function __do3() {
                set2(v1.value1.value0.value0)(new Just(h7.ptr))([0])();
                set1(v1.value1.value0.value1)(new Just(h7.ptr))([fromInt(0)])();
                return map0;
              };
            }
            ;
            if (v1.value0 instanceof Just && v1.value1 instanceof Nothing) {
              return function __do3() {
                var v22 = newBuf();
                set2(v22.value0)(new Just(h7.ptr))([v1.value0.value0])();
                set1(v22.value1)(new Just(h7.ptr))([fromInt(1)])();
                return insert6(key)(v22)(map0);
              };
            }
            ;
            if (v1.value0 instanceof Just && v1.value1 instanceof Just) {
              return function __do3() {
                set2(v1.value1.value0.value0)(new Just(h7.ptr))([v1.value0.value0])();
                set1(v1.value1.value0.value1)(new Just(h7.ptr))([fromInt(1)])();
                return map0;
              };
            }
            ;
            throw new Error("Failed pattern match at HistoryPacked (line 99, column 7 - line 117, column 20): " + [v1.constructor.name]);
          };
        };
        var recentKeys = keys3(v2.value0.metrics);
        var allKeys = union4(h7.knownKeys)(recentKeys);
        var updateWhole = foldM4(runUpdate)(h7.timeseriesData)(allKeys);
        return function __do3() {
          var wholeData = updateWhole();
          return {
            knownKeys: allKeys,
            timeseriesData: wholeData,
            ptr: mod4(h7.ptr + 1 | 0)(historyLen)
          };
        };
      }
      ;
      throw new Error("Failed pattern match at HistoryPacked (line 82, column 1 - line 82, column 62): " + [v2.constructor.name, h7.constructor.name]);
    };
  };
  var historyKeys = function(dictUnfoldable) {
    var toUnfoldable11 = toUnfoldable4(dictUnfoldable);
    return function(h7) {
      return toUnfoldable11(h7.knownKeys);
    };
  };
  var fromPromDoc = function(metrics) {
    var toMetric = function(v2) {
      if (v2 instanceof MetricLine) {
        var key = new Tuple(v2.value0, v2.value1);
        return new Just(new Tuple(key, v2.value2));
      }
      ;
      return Nothing.value;
    };
    var toHelp = function(v2) {
      if (v2 instanceof HelpLine) {
        return new Just(new Tuple(v2.value0, v2.value1));
      }
      ;
      return Nothing.value;
    };
    return {
      metrics: fromFoldable5(catMaybes(map20(toMetric)(metrics))),
      helps: fromFoldable1(catMaybes(map20(toHelp)(metrics)))
    };
  };
  var emptyHistory = {
    knownKeys: empty4,
    timeseriesData: empty3,
    ptr: 0
  };

  // output/Monitor/index.js
  var toUnfoldable7 = /* @__PURE__ */ toUnfoldable(unfoldableArray);
  var map21 = /* @__PURE__ */ map(functorList);
  var renderLabelPair = function(pair) {
    return span_([strong_([text(pairName(pair))]), text(": "), text(pairValue(pair))]);
  };
  var renderLabels = function(labels10) {
    return div_(toUnfoldable7(map21(renderLabelPair)(labels10)));
  };

  // output/Tracer/index.js
  var trace = function(dictMonadEffect) {
    var liftEffect8 = liftEffect(dictMonadEffect);
    return function(f) {
      return function(a3) {
        return liftEffect8(f(a3));
      };
    };
  };
  var comap = function(f) {
    return function(g2) {
      return function($3) {
        return g2(f($3));
      };
    };
  };

  // output/UIComponents/index.js
  var $$Error = /* @__PURE__ */ function() {
    function $$Error2() {
    }
    ;
    $$Error2.value = new $$Error2();
    return $$Error2;
  }();
  var Notice = /* @__PURE__ */ function() {
    function Notice2() {
    }
    ;
    Notice2.value = new Notice2();
    return Notice2;
  }();
  var Success = /* @__PURE__ */ function() {
    function Success2() {
    }
    ;
    Success2.value = new Success2();
    return Success2;
  }();
  var message2 = function(lvl) {
    return function(msg) {
      var mainMessage = p_([text(msg.main)]);
      var lvlClass = function() {
        if (lvl instanceof $$Error) {
          return "error";
        }
        ;
        if (lvl instanceof Notice) {
          return "notice";
        }
        ;
        if (lvl instanceof Success) {
          return "success";
        }
        ;
        throw new Error("Failed pattern match at UIComponents (line 46, column 16 - line 49, column 27): " + [lvl.constructor.name]);
      }();
      var detailsMessage = function(dtls) {
        return p_([text(dtls)]);
      };
      var children2 = function() {
        if (msg.details instanceof Nothing) {
          return [mainMessage];
        }
        ;
        if (msg.details instanceof Just) {
          return [mainMessage, detailsMessage(msg.details.value0)];
        }
        ;
        throw new Error("Failed pattern match at UIComponents (line 43, column 16 - line 45, column 54): " + [msg.details.constructor.name]);
      }();
      return div2([classes(["message", lvlClass])])(children2);
    };
  };

  // output/Web.UIEvent.MouseEvent/index.js
  var toEvent = unsafeCoerce2;

  // output/Exporter/index.js
  var show15 = /* @__PURE__ */ show(showInt);
  var notEq2 = /* @__PURE__ */ notEq(/* @__PURE__ */ eqMaybe(eqChar));
  var map22 = /* @__PURE__ */ map(functorEither);
  var sequence2 = /* @__PURE__ */ sequence(traversableArray)(applicativeEither);
  var map110 = /* @__PURE__ */ map(functorArray);
  var value4 = /* @__PURE__ */ value(isPropString);
  var catMaybes5 = /* @__PURE__ */ catMaybes3(ordString);
  var fromFoldable6 = /* @__PURE__ */ fromFoldable4(foldableList)(/* @__PURE__ */ ordMaybe(ordString));
  var map23 = /* @__PURE__ */ map(functorList);
  var type_4 = /* @__PURE__ */ type_(isPropButtonType);
  var discard2 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var trace2 = /* @__PURE__ */ trace(monadEffectEffect);
  var modify_3 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var bind6 = /* @__PURE__ */ bind(bindHalogenM);
  var get3 = /* @__PURE__ */ get(monadStateHalogenM);
  var put3 = /* @__PURE__ */ put(monadStateHalogenM);
  var when2 = /* @__PURE__ */ when(applicativeHalogenM);
  var pure11 = /* @__PURE__ */ pure(applicativeHalogenM);
  var toUnfoldable8 = /* @__PURE__ */ toUnfoldable(unfoldableArray);
  var show32 = /* @__PURE__ */ show(showParseError);
  var NotRequested = /* @__PURE__ */ function() {
    function NotRequested2() {
    }
    ;
    NotRequested2.value = new NotRequested2();
    return NotRequested2;
  }();
  var FetchError = /* @__PURE__ */ function() {
    function FetchError2(value0) {
      this.value0 = value0;
    }
    ;
    FetchError2.create = function(value0) {
      return new FetchError2(value0);
    };
    return FetchError2;
  }();
  var ParseDocError = /* @__PURE__ */ function() {
    function ParseDocError2(value0) {
      this.value0 = value0;
    }
    ;
    ParseDocError2.create = function(value0) {
      return new ParseDocError2(value0);
    };
    return ParseDocError2;
  }();
  var Alright = /* @__PURE__ */ function() {
    function Alright2(value0) {
      this.value0 = value0;
    }
    ;
    Alright2.create = function(value0) {
      return new Alright2(value0);
    };
    return Alright2;
  }();
  var ExporterSaved = /* @__PURE__ */ function() {
    function ExporterSaved2(value0) {
      this.value0 = value0;
    }
    ;
    ExporterSaved2.create = function(value0) {
      return new ExporterSaved2(value0);
    };
    return ExporterSaved2;
  }();
  var SetSeqnum = /* @__PURE__ */ function() {
    function SetSeqnum3(value0) {
      this.value0 = value0;
    }
    ;
    SetSeqnum3.create = function(value0) {
      return new SetSeqnum3(value0);
    };
    return SetSeqnum3;
  }();
  var SetUrl = /* @__PURE__ */ function() {
    function SetUrl2(value0) {
      this.value0 = value0;
    }
    ;
    SetUrl2.create = function(value0) {
      return new SetUrl2(value0);
    };
    return SetUrl2;
  }();
  var SetFilterPrefix = /* @__PURE__ */ function() {
    function SetFilterPrefix2(value0) {
      this.value0 = value0;
    }
    ;
    SetFilterPrefix2.create = function(value0) {
      return new SetFilterPrefix2(value0);
    };
    return SetFilterPrefix2;
  }();
  var Fetch = /* @__PURE__ */ function() {
    function Fetch2(value0) {
      this.value0 = value0;
    }
    ;
    Fetch2.create = function(value0) {
      return new Fetch2(value0);
    };
    return Fetch2;
  }();
  var Save = /* @__PURE__ */ function() {
    function Save2() {
    }
    ;
    Save2.value = new Save2();
    return Save2;
  }();
  var TraceAction = /* @__PURE__ */ function() {
    function TraceAction3(value0) {
      this.value0 = value0;
    }
    ;
    TraceAction3.create = function(value0) {
      return new TraceAction3(value0);
    };
    return TraceAction3;
  }();
  var runFilter = function(f) {
    return function(str) {
      return filter(f)(lines(str));
    };
  };
  var parsePromDoc = function(obj) {
    var parseLine = flip(runParser)(metric);
    var interesting = function(str) {
      var c2 = charAt2(0)(str);
      return notEq2(c2)(new Just("#")) && notEq2(c2)(Nothing.value);
    };
    return map22(fromArray)(sequence2(map110(parseLine)(filter(interesting)(obj))));
  };
  var makeFilter = function(s2) {
    return startsWith(s2);
  };
  var fields = function(v2) {
    return v2;
  };
  var fetchRaw = function(dictMonadAff) {
    var liftAff2 = liftAff(dictMonadAff);
    return function(url) {
      var req = {
        url,
        responseFormat: string,
        timeout: new Just(250),
        content: defaultRequest.content,
        headers: defaultRequest.headers,
        method: defaultRequest.method,
        password: defaultRequest.password,
        username: defaultRequest.username,
        withCredentials: defaultRequest.withCredentials
      };
      return liftAff2(request2(req));
    };
  };
  var blocks = function(xs) {
    var block = function(x3) {
      return div2([class_("block")])([h1_([text(x3.title)]), div_([x3.block])]);
    };
    return div2([class_("blocks")])(map110(block)(xs));
  };
  var newExporter = function(dictMonadAff) {
    var liftEffect8 = liftEffect(monadEffectHalogenM(dictMonadAff.MonadEffect0()));
    var fetchRaw1 = fetchRaw(monadAffHalogenM(dictMonadAff));
    return function(tracer) {
      var url = function(state3) {
        return input([class_("input"), onValueInput(SetUrl.create), value4(state3.url), placeholder("http://.../metrics")]);
      };
      var stats = function(promdoc) {
        var metricName2 = function(v2) {
          if (v2 instanceof MetricLine) {
            return new Just(v2.value0);
          }
          ;
          return Nothing.value;
        };
        var kpi = function(name16) {
          return function(val) {
            return div2([classes(["kpi", "grid-item"])])([p_([text(name16)]), p_([text(show15(val))])]);
          };
        };
        return div2([classes(["kpis", "grid"])])([kpi("rows")(length(promdoc)), kpi("metrics")(size3(catMaybes5(fromFoldable6(map23(metricName2)(promdoc)))))]);
      };
      var saveButton = function(state3) {
        var btnInfo = function() {
          if (state3.preview instanceof Alright) {
            return {
              class_: "trigger",
              disabled: false
            };
          }
          ;
          return {
            class_: "disabled",
            disabled: true
          };
        }();
        return button([class_(btnInfo.class_), disabled(btnInfo.disabled), type_4(ButtonButton.value), onClick($$const(Save.value))])([text("Save")]);
      };
      var saveCallOut = function(state3) {
        return function(v2) {
          return div2([class_("call-out")])([saveButton(state3)]);
        };
      };
      var renderRaw = function(txt) {
        return pre_([text(txt)]);
      };
      var rawFiltered = function(filtered) {
        var $100 = $$null2(filtered);
        if ($100) {
          return div_([message2(Notice.value)({
            main: "no matching data",
            details: new Just("your filter is probably too strict and no data is available")
          })]);
        }
        ;
        return pre_([text(joinWith("\n")(filtered))]);
      };
      var promLine = function(v2) {
        if (v2 instanceof MetricLine) {
          return div_([span_([text(v2.value0)]), renderLabels(v2.value1)]);
        }
        ;
        return text("");
      };
      var makePreview = function(f) {
        return function(raw) {
          var filtered = runFilter(f)(raw);
          var v2 = parsePromDoc(filtered);
          if (v2 instanceof Left) {
            return new ParseDocError({
              raw,
              filtered,
              error: "failed to parse",
              errorDetail: v2.value0
            });
          }
          ;
          if (v2 instanceof Right) {
            return new Alright({
              raw,
              filtered,
              promdoc: v2.value0
            });
          }
          ;
          throw new Error("Failed pattern match at Exporter (line 131, column 7 - line 133, column 84): " + [v2.constructor.name]);
        };
      };
      var initialState = function(i2) {
        return {
          seqnum: i2,
          url: "/metrics",
          filterPrefix: "",
          preview: NotRequested.value
        };
      };
      var handleInput = function(i2) {
        return new Just(new SetSeqnum(i2));
      };
      var handleAction = function(dictMonadAff1) {
        return function(act) {
          return discard2(liftEffect8(trace2(tracer)(new TraceAction(act))))(function() {
            if (act instanceof SetSeqnum) {
              return modify_3(function(v2) {
                var $110 = {};
                for (var $111 in v2) {
                  if ({}.hasOwnProperty.call(v2, $111)) {
                    $110[$111] = v2[$111];
                  }
                  ;
                }
                ;
                $110.seqnum = act.value0;
                return $110;
              });
            }
            ;
            if (act instanceof SetUrl) {
              return modify_3(function(v2) {
                var $114 = {};
                for (var $115 in v2) {
                  if ({}.hasOwnProperty.call(v2, $115)) {
                    $114[$115] = v2[$115];
                  }
                  ;
                }
                ;
                $114.url = act.value0;
                $114.preview = NotRequested.value;
                return $114;
              });
            }
            ;
            if (act instanceof SetFilterPrefix) {
              return bind6(get3)(function(state3) {
                if (state3.preview instanceof ParseDocError) {
                  return put3(function() {
                    var $119 = {};
                    for (var $120 in state3) {
                      if ({}.hasOwnProperty.call(state3, $120)) {
                        $119[$120] = state3[$120];
                      }
                      ;
                    }
                    ;
                    $119.filterPrefix = act.value0;
                    $119.preview = makePreview(makeFilter(act.value0))(state3.preview.value0.raw);
                    return $119;
                  }());
                }
                ;
                if (state3.preview instanceof Alright) {
                  return put3(function() {
                    var $123 = {};
                    for (var $124 in state3) {
                      if ({}.hasOwnProperty.call(state3, $124)) {
                        $123[$124] = state3[$124];
                      }
                      ;
                    }
                    ;
                    $123.filterPrefix = act.value0;
                    $123.preview = makePreview(makeFilter(act.value0))(state3.preview.value0.raw);
                    return $123;
                  }());
                }
                ;
                return discard2(modify_3(function(v2) {
                  var $127 = {};
                  for (var $128 in v2) {
                    if ({}.hasOwnProperty.call(v2, $128)) {
                      $127[$128] = v2[$128];
                    }
                    ;
                  }
                  ;
                  $127.filterPrefix = act.value0;
                  return $127;
                }))(function() {
                  return when2(state3.filterPrefix === "")(handleAction(dictMonadAff)(new Fetch(Nothing.value)));
                });
              });
            }
            ;
            if (act instanceof Save) {
              return bind6(get3)(function(state3) {
                return raise(new ExporterSaved({
                  seqnum: state3.seqnum,
                  url: state3.url,
                  preFilter: makeFilter(state3.filterPrefix)
                }));
              });
            }
            ;
            if (act instanceof Fetch) {
              return discard2(maybe(pure11(unit))(function($146) {
                return liftEffect8(preventDefault(toEvent($146)));
              })(act.value0))(function() {
                return bind6(get3)(function(state3) {
                  return bind6(fetchRaw1(state3.url))(function(ret) {
                    if (ret instanceof Left) {
                      return modify_3(function(v2) {
                        var $132 = {};
                        for (var $133 in v2) {
                          if ({}.hasOwnProperty.call(v2, $133)) {
                            $132[$133] = v2[$133];
                          }
                          ;
                        }
                        ;
                        $132.preview = new FetchError({
                          error: "failed to fetch",
                          errorDetail: ret.value0
                        });
                        return $132;
                      });
                    }
                    ;
                    if (ret instanceof Right) {
                      return modify_3(function(v2) {
                        var $136 = {};
                        for (var $137 in v2) {
                          if ({}.hasOwnProperty.call(v2, $137)) {
                            $136[$137] = v2[$137];
                          }
                          ;
                        }
                        ;
                        $136.preview = makePreview(makeFilter(state3.filterPrefix))(ret.value0.body);
                        return $136;
                      });
                    }
                    ;
                    throw new Error("Failed pattern match at Exporter (line 166, column 11 - line 169, column 93): " + [ret.constructor.name]);
                  });
                });
              });
            }
            ;
            throw new Error("Failed pattern match at Exporter (line 143, column 7 - line 169, column 93): " + [act.constructor.name]);
          });
        };
      };
      var filterString = function(state3) {
        return input([class_("input"), onValueInput(SetFilterPrefix.create), value4(state3.filterPrefix), placeholder("filter by prefix")]);
      };
      var doc = function(promdoc) {
        var $141 = $$null(promdoc);
        if ($141) {
          return div_([message2(Notice.value)({
            main: "no matching data",
            details: new Just("your filter is probably too strict and no data is available")
          })]);
        }
        ;
        return div_(toUnfoldable8(map23(promLine)(promdoc)));
      };
      var previewContents = function(state3) {
        if (state3.preview instanceof NotRequested) {
          return [message2(Notice.value)({
            main: "you need to enter a URL first",
            details: Nothing.value
          })];
        }
        ;
        if (state3.preview instanceof FetchError) {
          return [message2($$Error.value)({
            main: state3.preview.value0.error,
            details: new Just(printError(state3.preview.value0.errorDetail))
          })];
        }
        ;
        if (state3.preview instanceof ParseDocError) {
          return [message2($$Error.value)({
            main: state3.preview.value0.error,
            details: new Just(show32(state3.preview.value0.errorDetail))
          }), blocks([{
            title: "filtered",
            block: rawFiltered(state3.preview.value0.filtered)
          }, {
            title: "raw",
            block: renderRaw(state3.preview.value0.raw)
          }])];
        }
        ;
        if (state3.preview instanceof Alright) {
          return [stats(state3.preview.value0.promdoc), saveCallOut(state3)(state3.preview.value0.promdoc), blocks([{
            title: "prometheus data",
            block: doc(state3.preview.value0.promdoc)
          }, {
            title: "filtered",
            block: rawFiltered(state3.preview.value0.filtered)
          }, {
            title: "raw",
            block: renderRaw(state3.preview.value0.raw)
          }])];
        }
        ;
        throw new Error("Failed pattern match at Exporter (line 213, column 29 - line 232, column 10): " + [state3.preview.constructor.name]);
      };
      var preview = function(state3) {
        return div2([class_("preview")])(previewContents(state3));
      };
      var checkButton = function(v2) {
        return button([class_("trigger"), type_4(ButtonButton.value), onClick(function($147) {
          return Fetch.create(Just.create($147));
        })])([text("\u21B5")]);
      };
      var form2 = function(state3) {
        return div_([form([class_("form")])([button([style("display:none;"), onClick(function($148) {
          return Fetch.create(Just.create($148));
        })])([]), div2([class_("form-block")])([label_([span_([text("URL")]), span_([text("Prometheus metrics endpoint")])]), div2([class_("form-pair")])([url(state3), div_([checkButton(state3)])])]), div2([class_("form-block")])([label_([span_([text("Prefix")]), span_([text("Filter by prefix for better performance")])]), div2([class_("form-pair")])([filterString(state3)])])])]);
      };
      var render = function(state3) {
        return div2([class_("add-exporter-pane")])([form2(state3), h2_([text("preview")]), preview(state3)]);
      };
      return mkComponent({
        initialState,
        render,
        "eval": mkEval({
          handleAction: handleAction(dictMonadAff),
          handleQuery: defaultEval.handleQuery,
          receive: handleInput,
          initialize: defaultEval.initialize,
          finalize: defaultEval.finalize
        })
      });
    };
  };

  // output/Halogen.HTML/index.js
  var componentSlot2 = /* @__PURE__ */ componentSlot();
  var slot_ = function() {
    return function(dictIsSymbol) {
      var componentSlot1 = componentSlot2(dictIsSymbol);
      return function(dictOrd) {
        var componentSlot22 = componentSlot1(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(component2) {
              return function(input3) {
                return widget(new ComponentSlot(componentSlot22(label5)(p2)(component2)(input3)($$const(Nothing.value))));
              };
            };
          };
        };
      };
    };
  };
  var slot = function() {
    return function(dictIsSymbol) {
      var componentSlot1 = componentSlot2(dictIsSymbol);
      return function(dictOrd) {
        var componentSlot22 = componentSlot1(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(component2) {
              return function(input3) {
                return function(outputQuery) {
                  return widget(new ComponentSlot(componentSlot22(label5)(p2)(component2)(input3)(function($11) {
                    return Just.create(outputQuery($11));
                  })));
                };
              };
            };
          };
        };
      };
    };
  };

  // output/Web.HTML.HTMLElement/foreign.js
  function _read(nothing, just, value15) {
    var tag = Object.prototype.toString.call(value15);
    if (tag.indexOf("[object HTML") === 0 && tag.indexOf("Element]") === tag.length - 8) {
      return just(value15);
    } else {
      return nothing;
    }
  }

  // output/Web.HTML.HTMLElement/index.js
  var toNode2 = unsafeCoerce2;
  var fromElement = function(x3) {
    return _read(Nothing.value, Just.create, x3);
  };

  // output/Halogen.Query/index.js
  var $$void5 = /* @__PURE__ */ $$void(functorHalogenM);
  var query2 = /* @__PURE__ */ query();
  var tell2 = function() {
    return function(dictIsSymbol) {
      var query1 = query2(dictIsSymbol);
      return function(dictOrd) {
        var query22 = query1(dictOrd);
        return function(slot3) {
          return function(label5) {
            return function(req) {
              return $$void5(query22(slot3)(label5)(req(unit)));
            };
          };
        };
      };
    };
  };

  // output/Perspective/index.js
  var toUnfoldable9 = /* @__PURE__ */ toUnfoldable(unfoldableArray);
  var map25 = /* @__PURE__ */ map(functorList);
  var type_5 = /* @__PURE__ */ type_(isPropInputType);
  var map111 = /* @__PURE__ */ map(functorMaybe);
  var fromFoldable7 = /* @__PURE__ */ fromFoldable(foldableList);
  var eq5 = /* @__PURE__ */ eq(eqChartDisplayMode);
  var bind7 = /* @__PURE__ */ bind(bindHalogenM);
  var get4 = /* @__PURE__ */ get(monadStateHalogenM);
  var eq14 = /* @__PURE__ */ eq(/* @__PURE__ */ eqMaybe(eqInt));
  var ordTuple4 = /* @__PURE__ */ ordTuple(ordString);
  var lookup7 = /* @__PURE__ */ lookup2(/* @__PURE__ */ ordTuple4(/* @__PURE__ */ ordList(/* @__PURE__ */ ordTuple4(ordString))));
  var bindFlipped6 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var discard3 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var put4 = /* @__PURE__ */ put(monadStateHalogenM);
  var pure12 = /* @__PURE__ */ pure(applicativeHalogenM);
  var modify_4 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var type_1 = /* @__PURE__ */ type_(isPropButtonType);
  var SetSpec = /* @__PURE__ */ function() {
    function SetSpec2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    SetSpec2.create = function(value0) {
      return function(value1) {
        return new SetSpec2(value0, value1);
      };
    };
    return SetSpec2;
  }();
  var PassData = /* @__PURE__ */ function() {
    function PassData2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    PassData2.create = function(value0) {
      return function(value1) {
        return new PassData2(value0, value1);
      };
    };
    return PassData2;
  }();
  var PerspectiveSaved = /* @__PURE__ */ function() {
    function PerspectiveSaved2(value0) {
      this.value0 = value0;
    }
    ;
    PerspectiveSaved2.create = function(value0) {
      return new PerspectiveSaved2(value0);
    };
    return PerspectiveSaved2;
  }();
  var SetSeqnum2 = /* @__PURE__ */ function() {
    function SetSeqnum3(value0) {
      this.value0 = value0;
    }
    ;
    SetSeqnum3.create = function(value0) {
      return new SetSeqnum3(value0);
    };
    return SetSeqnum3;
  }();
  var UpdateChartSpec = /* @__PURE__ */ function() {
    function UpdateChartSpec2(value0) {
      this.value0 = value0;
    }
    ;
    UpdateChartSpec2.create = function(value0) {
      return new UpdateChartSpec2(value0);
    };
    return UpdateChartSpec2;
  }();
  var PinPerspective = /* @__PURE__ */ function() {
    function PinPerspective2(value0) {
      this.value0 = value0;
    }
    ;
    PinPerspective2.create = function(value0) {
      return new PinPerspective2(value0);
    };
    return PinPerspective2;
  }();
  var showDisplayMode = function(v2) {
    if (v2 instanceof Samples) {
      return "raw";
    }
    ;
    if (v2 instanceof DiffSamples) {
      return "delta";
    }
    ;
    throw new Error("Failed pattern match at Perspective (line 252, column 19 - line 254, column 25): " + [v2.constructor.name]);
  };
  var renderLabelPair2 = function(pair) {
    return span_([strong_([text(pairName(pair))]), text(": "), text(pairValue(pair))]);
  };
  var renderLabels2 = function(labels10) {
    return div_(toUnfoldable9(map25(renderLabelPair2)(labels10)));
  };
  var perspective = function(dictMonadAff) {
    return function(spec) {
      var radio = function(label5) {
        return function(checked3) {
          return function(onClick2) {
            return label([classes(["radio", "labeled-radio-button", function() {
              if (checked3) {
                return "checked";
              }
              ;
              return "unchecked";
            }()])])([text(label5), input([type_5(InputRadio.value), checked(checked3), onClick(onClick2)])]);
          };
        };
      };
      var renderChart = function(st) {
        return function(v2) {
          var timeseries = fromMaybe(Nil.value)(map111(fromFoldable7)(st.timeseries));
          var key = new Tuple(v2.value2, v2.value3);
          return figure([classes(["perspective-card-content"])])([function() {
            if (v2.value1 instanceof Samples) {
              return renderChartTimeseries(take(100)(timeseries));
            }
            ;
            if (v2.value1 instanceof DiffSamples) {
              return renderChartDiffTimeseries(take(100)(timeseries));
            }
            ;
            throw new Error("Failed pattern match at Perspective (line 226, column 11 - line 228, column 80): " + [v2.value1.constructor.name]);
          }(), div2([classes(["radio-buttons"])])([radio("raw")(eq5(v2.value1)(Samples.value))(function(v1) {
            return new UpdateChartSpec(new TimeSeries(v2.value0, Samples.value, v2.value2, v2.value3));
          }), radio("diff")(eq5(v2.value1)(DiffSamples.value))(function(v1) {
            return new UpdateChartSpec(new TimeSeries(v2.value0, DiffSamples.value, v2.value2, v2.value3));
          })]), p_([renderLabels2(v2.value3)])]);
        };
      };
      var render = function(state3) {
        return div_([function() {
          if (state3.spec instanceof Just) {
            return renderChart(state3)(state3.spec.value0);
          }
          ;
          if (state3.spec instanceof Nothing) {
            return text("no chart");
          }
          ;
          throw new Error("Failed pattern match at Perspective (line 212, column 9 - line 214, column 40): " + [state3.spec.constructor.name]);
        }()]);
      };
      var initialState = function(i2) {
        return {
          seqnum: -1 | 0,
          spec: new Just(spec),
          timeseries: Nothing.value
        };
      };
      var handleQuery = function(v2) {
        if (v2 instanceof PassData) {
          return bind7(get4)(function(st0) {
            var getseqnum = function(v1) {
              return v1.value0;
            };
            var $63 = eq14(map111(getseqnum)(st0.spec))(new Just(v2.value0.seqnum));
            if ($63) {
              var ts = function(key) {
                return map111(fromFoldable7)(lookup7(key)(v2.value0.historyData));
              };
              var timeseries = bindFlipped6(ts)(map111(specKey)(st0.spec));
              return discard3(put4(function() {
                var $64 = {};
                for (var $65 in st0) {
                  if ({}.hasOwnProperty.call(st0, $65)) {
                    $64[$65] = st0[$65];
                  }
                  ;
                }
                ;
                $64.timeseries = timeseries;
                return $64;
              }()))(function() {
                return pure12(new Just(v2.value1));
              });
            }
            ;
            return pure12(new Just(v2.value1));
          });
        }
        ;
        return pure12(Nothing.value);
      };
      var handleAction = function(v2) {
        if (v2 instanceof UpdateChartSpec) {
          return modify_4(function(v1) {
            var $70 = {};
            for (var $71 in v1) {
              if ({}.hasOwnProperty.call(v1, $71)) {
                $70[$71] = v1[$71];
              }
              ;
            }
            ;
            $70.spec = new Just(v2.value0);
            return $70;
          });
        }
        ;
        return pure12(unit);
      };
      return mkComponent({
        initialState,
        render,
        "eval": mkEval({
          handleAction,
          handleQuery,
          receive: defaultEval.receive,
          initialize: defaultEval.initialize,
          finalize: defaultEval.finalize
        })
      });
    };
  };
  var newPerspective = function(dictMonadAff) {
    var renderChart = function(st) {
      return function(v2) {
        var timeseries = fromMaybe(Nil.value)(map111(fromFoldable7)(st.timeseries));
        var key = new Tuple(v2.value2, v2.value3);
        return div2([classes(["perspective-card"])])([p_([text(v2.value2), button([type_1(ButtonSubmit.value), onClick(function(v1) {
          return new PinPerspective(v2);
        })])([text("pin")]), text(showDisplayMode(v2.value1)), button([type_1(ButtonSubmit.value), onClick(function(v1) {
          return new UpdateChartSpec(new TimeSeries(v2.value0, cycleDisplayMode(v2.value1), v2.value2, v2.value3));
        })])([text(showDisplayMode(cycleDisplayMode(v2.value1)))])]), div2([class_("perspective-card-content")])([p_([renderLabels2(v2.value3)]), function() {
          if (v2.value1 instanceof Samples) {
            return renderChartTimeseries(take(100)(timeseries));
          }
          ;
          if (v2.value1 instanceof DiffSamples) {
            return renderChartDiffTimeseries(take(100)(timeseries));
          }
          ;
          throw new Error("Failed pattern match at Perspective (line 162, column 13 - line 164, column 82): " + [v2.value1.constructor.name]);
        }()])]);
      };
    };
    var render = function(state3) {
      return div_([function() {
        if (state3.spec instanceof Just) {
          return renderChart(state3)(state3.spec.value0);
        }
        ;
        if (state3.spec instanceof Nothing) {
          return text("no chart");
        }
        ;
        throw new Error("Failed pattern match at Perspective (line 130, column 9 - line 132, column 40): " + [state3.spec.constructor.name]);
      }()]);
    };
    var initialState = function(i2) {
      return {
        seqnum: i2,
        spec: Nothing.value,
        timeseries: Nothing.value
      };
    };
    var handleQuery = function(v2) {
      if (v2 instanceof SetSpec) {
        return discard3(modify_4(function(v1) {
          var $84 = {};
          for (var $85 in v1) {
            if ({}.hasOwnProperty.call(v1, $85)) {
              $84[$85] = v1[$85];
            }
            ;
          }
          ;
          $84.spec = new Just(v2.value0.spec);
          $84.timeseries = new Just(v2.value0.timeseries);
          return $84;
        }))(function() {
          return pure12(new Just(v2.value1));
        });
      }
      ;
      if (v2 instanceof PassData) {
        return bind7(get4)(function(st0) {
          var getseqnum = function(v1) {
            return v1.value0;
          };
          var $94 = eq14(map111(getseqnum)(st0.spec))(new Just(v2.value0.seqnum));
          if ($94) {
            var ts = function(key) {
              return map111(fromFoldable7)(lookup7(key)(v2.value0.historyData));
            };
            var timeseries = bindFlipped6(ts)(map111(specKey)(st0.spec));
            return discard3(put4(function() {
              var $95 = {};
              for (var $96 in st0) {
                if ({}.hasOwnProperty.call(st0, $96)) {
                  $95[$96] = st0[$96];
                }
                ;
              }
              ;
              $95.timeseries = timeseries;
              return $95;
            }()))(function() {
              return pure12(new Just(v2.value1));
            });
          }
          ;
          return pure12(new Just(v2.value1));
        });
      }
      ;
      throw new Error("Failed pattern match at Perspective (line 111, column 19 - line 125, column 24): " + [v2.constructor.name]);
    };
    var handleInput = function(i2) {
      return new Just(new SetSeqnum2(i2));
    };
    var handleAction = function(v2) {
      if (v2 instanceof SetSeqnum2) {
        return modify_4(function(v1) {
          var $101 = {};
          for (var $102 in v1) {
            if ({}.hasOwnProperty.call(v1, $102)) {
              $101[$102] = v1[$102];
            }
            ;
          }
          ;
          $101.seqnum = v2.value0;
          return $101;
        });
      }
      ;
      if (v2 instanceof UpdateChartSpec) {
        return modify_4(function(v1) {
          var $105 = {};
          for (var $106 in v1) {
            if ({}.hasOwnProperty.call(v1, $106)) {
              $105[$106] = v1[$106];
            }
            ;
          }
          ;
          $105.spec = new Just(v2.value0);
          return $105;
        });
      }
      ;
      if (v2 instanceof PinPerspective) {
        return bind7(get4)(function(state3) {
          return raise(new PerspectiveSaved({
            seqnum: state3.seqnum,
            spec: v2.value0
          }));
        });
      }
      ;
      throw new Error("Failed pattern match at Perspective (line 100, column 20 - line 108, column 12): " + [v2.constructor.name]);
    };
    return mkComponent({
      initialState,
      render,
      "eval": mkEval({
        handleAction,
        handleQuery,
        receive: handleInput,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize
      })
    });
  };

  // output/Dashboard/index.js
  var type_6 = /* @__PURE__ */ type_(isPropButtonType);
  var toUnfoldable10 = /* @__PURE__ */ toUnfoldable(unfoldableArray);
  var map26 = /* @__PURE__ */ map(functorList);
  var show7 = /* @__PURE__ */ show(showNumber);
  var map112 = /* @__PURE__ */ map(functorMaybe);
  var fromFoldable8 = /* @__PURE__ */ fromFoldable(foldableList);
  var ordTuple5 = /* @__PURE__ */ ordTuple(ordString);
  var lookup8 = /* @__PURE__ */ lookup2(/* @__PURE__ */ ordTuple5(/* @__PURE__ */ ordList(/* @__PURE__ */ ordTuple5(ordString))));
  var map27 = /* @__PURE__ */ map(functorArray);
  var historyKeys2 = /* @__PURE__ */ historyKeys(unfoldableArray);
  var forever2 = /* @__PURE__ */ forever(monadRecAff);
  var discard4 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard4(bindAff);
  var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var trace3 = /* @__PURE__ */ trace(monadEffectEffect);
  var perspectiveIsSymbol = {
    reflectSymbol: function() {
      return "perspective";
    }
  };
  var slot_2 = /* @__PURE__ */ slot_()(perspectiveIsSymbol)(ordInt);
  var discard32 = /* @__PURE__ */ discard4(bindHalogenM);
  var bind8 = /* @__PURE__ */ bind(bindHalogenM);
  var pure13 = /* @__PURE__ */ pure(applicativeHalogenM);
  var modify_5 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var succ2 = /* @__PURE__ */ succ(enumInt);
  var get5 = /* @__PURE__ */ get(monadStateHalogenM);
  var toUnfoldableUnordered2 = /* @__PURE__ */ toUnfoldableUnordered(unfoldableList);
  var fromFoldableWith2 = /* @__PURE__ */ fromFoldableWith(ordString)(foldableArray);
  var append12 = /* @__PURE__ */ append(semigroupArray);
  var tell3 = /* @__PURE__ */ tell2();
  var newPerspectiveIsSymbol = {
    reflectSymbol: function() {
      return "newPerspective";
    }
  };
  var tell1 = /* @__PURE__ */ tell3(newPerspectiveIsSymbol)(ordInt);
  var traverse_4 = /* @__PURE__ */ traverse_(applicativeHalogenM)(foldableArray);
  var tell22 = /* @__PURE__ */ tell3(perspectiveIsSymbol)(ordInt);
  var $$for2 = /* @__PURE__ */ $$for(applicativeHalogenM)(traversableList);
  var traverse4 = /* @__PURE__ */ traverse(traversableArray)(applicativeHalogenM);
  var compare3 = /* @__PURE__ */ compare(ordInt);
  var fold3 = /* @__PURE__ */ fold(foldableList)(monoidArray);
  var put5 = /* @__PURE__ */ put(monadStateHalogenM);
  var slot2 = /* @__PURE__ */ slot();
  var slot1 = /* @__PURE__ */ slot2(newPerspectiveIsSymbol)(ordInt);
  var slot22 = /* @__PURE__ */ slot2({
    reflectSymbol: function() {
      return "newExporter";
    }
  })(ordInt);
  var applySecond5 = /* @__PURE__ */ applySecond(applyHalogenM);
  var Overview = /* @__PURE__ */ function() {
    function Overview2() {
    }
    ;
    Overview2.value = new Overview2();
    return Overview2;
  }();
  var AddExporterMenu = /* @__PURE__ */ function() {
    function AddExporterMenu2() {
    }
    ;
    AddExporterMenu2.value = new AddExporterMenu2();
    return AddExporterMenu2;
  }();
  var AddPerspectiveMenu = /* @__PURE__ */ function() {
    function AddPerspectiveMenu2() {
    }
    ;
    AddPerspectiveMenu2.value = new AddPerspectiveMenu2();
    return AddPerspectiveMenu2;
  }();
  var SetActiveMenu = /* @__PURE__ */ function() {
    function SetActiveMenu2(value0) {
      this.value0 = value0;
    }
    ;
    SetActiveMenu2.create = function(value0) {
      return new SetActiveMenu2(value0);
    };
    return SetActiveMenu2;
  }();
  var RegisterExporter = /* @__PURE__ */ function() {
    function RegisterExporter2(value0) {
      this.value0 = value0;
    }
    ;
    RegisterExporter2.create = function(value0) {
      return new RegisterExporter2(value0);
    };
    return RegisterExporter2;
  }();
  var RegisterPerspective = /* @__PURE__ */ function() {
    function RegisterPerspective2(value0) {
      this.value0 = value0;
    }
    ;
    RegisterPerspective2.create = function(value0) {
      return new RegisterPerspective2(value0);
    };
    return RegisterPerspective2;
  }();
  var UnregisterExporter = /* @__PURE__ */ function() {
    function UnregisterExporter2(value0) {
      this.value0 = value0;
    }
    ;
    UnregisterExporter2.create = function(value0) {
      return new UnregisterExporter2(value0);
    };
    return UnregisterExporter2;
  }();
  var UnregisterPerspective = /* @__PURE__ */ function() {
    function UnregisterPerspective2(value0) {
      this.value0 = value0;
    }
    ;
    UnregisterPerspective2.create = function(value0) {
      return new UnregisterPerspective2(value0);
    };
    return UnregisterPerspective2;
  }();
  var TriggerFetches = /* @__PURE__ */ function() {
    function TriggerFetches2() {
    }
    ;
    TriggerFetches2.value = new TriggerFetches2();
    return TriggerFetches2;
  }();
  var StartPolling = /* @__PURE__ */ function() {
    function StartPolling2(value0) {
      this.value0 = value0;
    }
    ;
    StartPolling2.create = function(value0) {
      return new StartPolling2(value0);
    };
    return StartPolling2;
  }();
  var StopPolling = /* @__PURE__ */ function() {
    function StopPolling2() {
    }
    ;
    StopPolling2.value = new StopPolling2();
    return StopPolling2;
  }();
  var AddToPerspective = /* @__PURE__ */ function() {
    function AddToPerspective2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    AddToPerspective2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new AddToPerspective2(value0, value1, value22);
        };
      };
    };
    return AddToPerspective2;
  }();
  var TracePolling = /* @__PURE__ */ function() {
    function TracePolling2(value0) {
      this.value0 = value0;
    }
    ;
    TracePolling2.create = function(value0) {
      return new TracePolling2(value0);
    };
    return TracePolling2;
  }();
  var TraceAction2 = /* @__PURE__ */ function() {
    function TraceAction3(value0) {
      this.value0 = value0;
    }
    ;
    TraceAction3.create = function(value0) {
      return new TraceAction3(value0);
    };
    return TraceAction3;
  }();
  var TraceExporter = /* @__PURE__ */ function() {
    function TraceExporter2(value0) {
      this.value0 = value0;
    }
    ;
    TraceExporter2.create = function(value0) {
      return new TraceExporter2(value0);
    };
    return TraceExporter2;
  }();
  var renderPaceButtons = function(state3) {
    var unpause = button([type_6(ButtonSubmit.value), onClick(function(v2) {
      return new StartPolling(state3.pollingPeriod);
    })])([text("\u25B6\uFE0F")]);
    var slowdown = button([type_6(ButtonSubmit.value), onClick(function(v2) {
      return new StartPolling(state3.pollingPeriod * 2);
    })])([text("\u{1F422}")]);
    var pause2 = button([type_6(ButtonSubmit.value), onClick(function(v2) {
      return StopPolling.value;
    })])([text("\u23F8")]);
    var hasten = button([type_6(ButtonSubmit.value), onClick(function(v2) {
      return new StartPolling(state3.pollingPeriod / 2);
    })])([text("\u{1F407}")]);
    if (state3.polling instanceof Nothing) {
      return div_([unpause]);
    }
    ;
    if (state3.polling instanceof Just) {
      return div2([class_("buttons")])([pause2, hasten, slowdown]);
    }
    ;
    throw new Error("Failed pattern match at Dashboard (line 433, column 3 - line 443, column 8): " + [state3.polling.constructor.name]);
  };
  var renderLabelPair3 = function(pair) {
    return span_([strong_([text(pairName(pair))]), text(": "), text(pairValue(pair))]);
  };
  var renderLabels3 = function(labels10) {
    return div_(toUnfoldable10(map26(renderLabelPair3)(labels10)));
  };
  var renderSparkTable = function(exporter) {
    var renderValues = function(xs) {
      return div_(toUnfoldable10(map26(function(v2) {
        return span_([text(v2 + " ")]);
      })(map26(maybe("NA")(show7))(xs))));
    };
    var addToPerspectiveButton = function(spec) {
      return function(timeseries) {
        return div_([button([onClick(function(v2) {
          return new AddToPerspective(exporter.definition, spec, timeseries);
        })])([text("\u{1F52C}")])]);
      };
    };
    var renderPromLine = function(v2) {
      var timeseries = fromMaybe(Nil.value)(map112(fromFoldable8)(lookup8(v2)(exporter.historyData)));
      var spec = new TimeSeries(exporter.definition.seqnum, Samples.value, v2.value0, v2.value1);
      return tr([class_("spark-table")])([td_([text(v2.value0)]), td_([addToPerspectiveButton(spec)(timeseries)]), td_([renderLabels3(v2.value1)]), td_([renderSparkline(timeseries)]), td_([renderValues(take(1)(timeseries))])]);
    };
    return table_(map27(function(key) {
      return renderPromLine(key);
    })(historyKeys2(exporter.history)));
  };
  var menuName = function(v2) {
    if (v2 instanceof Overview) {
      return "Overview";
    }
    ;
    if (v2 instanceof AddExporterMenu) {
      return "Add Exporter";
    }
    ;
    if (v2 instanceof AddPerspectiveMenu) {
      return "Add Graph";
    }
    ;
    throw new Error("Failed pattern match at Dashboard (line 63, column 12 - line 66, column 36): " + [v2.constructor.name]);
  };
  var eqActiveMenu = {
    eq: function(x3) {
      return function(y3) {
        if (x3 instanceof Overview && y3 instanceof Overview) {
          return true;
        }
        ;
        if (x3 instanceof AddExporterMenu && y3 instanceof AddExporterMenu) {
          return true;
        }
        ;
        if (x3 instanceof AddPerspectiveMenu && y3 instanceof AddPerspectiveMenu) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eq6 = /* @__PURE__ */ eq(eqActiveMenu);
  var _perspective = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _newPerspective = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _newExporter = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var dashboard = function(dictMonadAff) {
    var perspective2 = perspective(dictMonadAff);
    var monadAffHalogenM2 = monadAffHalogenM(dictMonadAff);
    var liftAff2 = liftAff(monadAffHalogenM2);
    var liftEffect12 = liftEffect(monadEffectHalogenM(dictMonadAff.MonadEffect0()));
    var fetchRaw2 = fetchRaw(monadAffHalogenM2);
    var newPerspective2 = newPerspective(dictMonadAff);
    var newExporter2 = newExporter(dictMonadAff);
    return function(tracer) {
      var pollForever = function(seqnum) {
        return function(ms) {
          return function(listener) {
            return forever2(discard1(liftEffect3(function __do3() {
              trace3(tracer)(new TracePolling(seqnum))();
              return notify(listener)(TriggerFetches.value)();
            }))(function() {
              return delay(ms);
            }));
          };
        };
      };
      var perspectivesListItem = function(persp) {
        return div2([classes(["grid-item", "perspective-card"])])([p_([text(persp.definition.spec.value2), button([onClick(function(v2) {
          return new UnregisterPerspective(persp.definition);
        })])([text("\u{1F5D1}")])]), div2([class_("exporter-card-content")])([slot_2(_perspective)(persp.definition.seqnum)(perspective2(persp.definition.spec))(unit)])]);
      };
      var perspectivesList = function(state3) {
        return div_([div2([class_("grid")])(map27(perspectivesListItem)(state3.perspectives))]);
      };
      var messageBox = function(state3) {
        var messages = [function() {
          var $304 = $$null2(state3.perspectives) && $$null2(state3.exporters);
          if ($304) {
            return new Just({
              main: "no exporters configured",
              details: new Just("Add a new exporter to get started.")
            });
          }
          ;
          return Nothing.value;
        }()];
        var $305 = $$null2(messages);
        if ($305) {
          return text("");
        }
        ;
        return div2([class_("message-box")])(map27(message2(Success.value))(catMaybes2(messages)));
      };
      var menuLink = function(menu2) {
        return function(state3) {
          var elems = function() {
            var $306 = eq6(menu2)(state3.menu);
            if ($306) {
              return {
                menuClass: "current"
              };
            }
            ;
            return {
              menuClass: ""
            };
          }();
          return a2([href("#"), class_(elems.menuClass), onClick($$const(new SetActiveMenu(menu2))), title(menuName(menu2))])([text(menuName(menu2))]);
        };
      };
      var killPoller = function(poller) {
        return discard32(unsubscribe2(poller.sub))(function() {
          return liftAff2(killFiber(error("Event source finalized"))(poller.fiber));
        });
      };
      var handleNewPerspectiveOutput = function(v2) {
        return new RegisterPerspective(v2.value0);
      };
      var handleNewExporterOutput = function(v2) {
        return new RegisterExporter(v2.value0);
      };
      var forkPoller = function(seqnum) {
        return function(ms) {
          return bind8(liftEffect12(create))(function(v2) {
            return bind8(liftAff2(forkAff(pollForever(seqnum)(ms)(v2.listener))))(function(fiber) {
              return bind8(subscribe2(v2.emitter))(function(sub3) {
                return pure13({
                  sub: sub3,
                  fiber
                });
              });
            });
          });
        };
      };
      var handleAction = function(v2) {
        if (v2 instanceof SetActiveMenu) {
          return modify_5(function(v1) {
            var $315 = {};
            for (var $316 in v1) {
              if ({}.hasOwnProperty.call(v1, $316)) {
                $315[$316] = v1[$316];
              }
              ;
            }
            ;
            $315.menu = v2.value0;
            return $315;
          });
        }
        ;
        if (v2 instanceof RegisterExporter) {
          var e = {
            definition: v2.value0,
            history: emptyHistory,
            historyData: empty3
          };
          return modify_5(function(state3) {
            var $319 = {};
            for (var $320 in state3) {
              if ({}.hasOwnProperty.call(state3, $320)) {
                $319[$320] = state3[$320];
              }
              ;
            }
            ;
            $319.seqnum = fromMaybe(0)(succ2(state3.seqnum));
            $319.exporters = cons2(e)(state3.exporters);
            $319.menu = Overview.value;
            return $319;
          });
        }
        ;
        if (v2 instanceof RegisterPerspective) {
          var e = {
            definition: v2.value0
          };
          return modify_5(function(state3) {
            var $323 = {};
            for (var $324 in state3) {
              if ({}.hasOwnProperty.call(state3, $324)) {
                $323[$324] = state3[$324];
              }
              ;
            }
            ;
            $323.seqnum = fromMaybe(0)(succ2(state3.seqnum));
            $323.perspectives = cons2(e)(state3.perspectives);
            return $323;
          });
        }
        ;
        if (v2 instanceof UnregisterExporter) {
          var s2 = function(x3) {
            return fields(x3).seqnum;
          };
          var keep = function(e2) {
            return s2(v2.value0) !== s2(e2.definition);
          };
          return modify_5(function(state3) {
            var $327 = {};
            for (var $328 in state3) {
              if ({}.hasOwnProperty.call(state3, $328)) {
                $327[$328] = state3[$328];
              }
              ;
            }
            ;
            $327.exporters = filter(keep)(state3.exporters);
            return $327;
          });
        }
        ;
        if (v2 instanceof UnregisterPerspective) {
          var s2 = function(x3) {
            return x3.seqnum;
          };
          var keep = function(p2) {
            return s2(v2.value0) !== s2(p2.definition);
          };
          return modify_5(function(state3) {
            var $331 = {};
            for (var $332 in state3) {
              if ({}.hasOwnProperty.call(state3, $332)) {
                $331[$332] = state3[$332];
              }
              ;
            }
            ;
            $331.perspectives = filter(keep)(state3.perspectives);
            return $331;
          });
        }
        ;
        if (v2 instanceof StopPolling) {
          return bind8(get5)(function(state3) {
            return discard32(maybe(pure13(unit))(killPoller)(state3.polling))(function() {
              return modify_5(function(v1) {
                var $335 = {};
                for (var $336 in v1) {
                  if ({}.hasOwnProperty.call(v1, $336)) {
                    $335[$336] = v1[$336];
                  }
                  ;
                }
                ;
                $335.polling = Nothing.value;
                return $335;
              });
            });
          });
        }
        ;
        if (v2 instanceof StartPolling) {
          return bind8(get5)(function(state3) {
            return discard32(maybe(pure13(unit))(killPoller)(state3.polling))(function() {
              return bind8(forkPoller(state3.seqnum)(v2.value0))(function(poller) {
                return modify_5(function(v1) {
                  var $338 = {};
                  for (var $339 in v1) {
                    if ({}.hasOwnProperty.call(v1, $339)) {
                      $338[$339] = v1[$339];
                    }
                    ;
                  }
                  ;
                  $338.polling = new Just(poller);
                  $338.pollingPeriod = v2.value0;
                  return $338;
                });
              });
            });
          });
        }
        ;
        if (v2 instanceof TriggerFetches) {
          return bind8(get5)(function(state3) {
            var groups = toUnfoldableUnordered2(fromFoldableWith2(append12)(map27(function(e2) {
              return new Tuple(fields(e2.definition).url, [e2]);
            })(state3.exporters)));
            var handlePromDoc = function(prom) {
              return function(e2) {
                return bind8(liftEffect12(updateHistory$prime(map112(fromPromDoc)(prom))(e2.history)))(function(history2) {
                  return bind8(liftEffect12(toArrayMap(history2)))(function(historyData) {
                    var dat = PassData.create({
                      seqnum: e2.definition.seqnum,
                      historyData
                    });
                    return discard32(tell1(_newPerspective)(0)(dat))(function() {
                      return discard32(traverse_4(function(x3) {
                        return tell22(_perspective)(x3.definition.seqnum)(dat);
                      })(state3.perspectives))(function() {
                        return pure13({
                          history: history2,
                          historyData,
                          definition: e2.definition
                        });
                      });
                    });
                  });
                });
              };
            };
            var handleResponse = function(v1) {
              return function(e2) {
                if (v1 instanceof Left) {
                  return handlePromDoc(Nothing.value)(e2);
                }
                ;
                if (v1 instanceof Right) {
                  var prom = hush(parsePromDoc(runFilter(fields(e2.definition).preFilter)(v1.value0.body)));
                  return handlePromDoc(prom)(e2);
                }
                ;
                throw new Error("Failed pattern match at Dashboard (line 224, column 13 - line 225, column 40): " + [v1.constructor.name, e2.constructor.name]);
              };
            };
            return bind8($$for2(groups)(function(v1) {
              return bind8(fetchRaw2(v1.value0))(function(ret) {
                return traverse4(handleResponse(ret))(v1.value1);
              });
            }))(function(updated) {
              var g2 = function(e1) {
                return function(e2) {
                  return compare3(fields(e2.definition).seqnum)(fields(e1.definition).seqnum);
                };
              };
              var exporters = sortBy(g2)(fold3(updated));
              return put5(function() {
                var $350 = {};
                for (var $351 in state3) {
                  if ({}.hasOwnProperty.call(state3, $351)) {
                    $350[$351] = state3[$351];
                  }
                  ;
                }
                ;
                $350.exporters = exporters;
                return $350;
              }());
            });
          });
        }
        ;
        if (v2 instanceof AddToPerspective) {
          return bind8(get5)(function(state3) {
            var act = new RegisterPerspective({
              spec: v2.value1,
              seqnum: state3.seqnum
            });
            return discard32(liftEffect12(trace3(tracer)(new TraceAction2(act))))(function() {
              return handleAction(act);
            });
          });
        }
        ;
        throw new Error("Failed pattern match at Dashboard (line 169, column 20 - line 243, column 27): " + [v2.constructor.name]);
      };
      var exportersListItem = function(exporter) {
        return div2([classes(["grid-item", "exporter-card"])])([p_([text(exporter.definition.url), button([onClick(function(v2) {
          return new UnregisterExporter(exporter.definition);
        })])([text("\u{1F5D1}")])]), div2([class_("exporter-card-content")])([renderSparkTable(exporter)])]);
      };
      var exportersList = function(state3) {
        return div_([div2([class_("grid")])(map27(exportersListItem)(state3.exporters))]);
      };
      var initialState = function(v2) {
        return {
          menu: AddExporterMenu.value,
          seqnum: 0,
          exporters: [],
          perspectives: [],
          pollingPeriod: 1e3,
          polling: Nothing.value
        };
      };
      var currentPeriod = function(state3) {
        var display = function(v2) {
          if (v2 < 1e3) {
            return {
              value: v2,
              unit: "ms"
            };
          }
          ;
          if (v2 < 6e4) {
            return {
              value: v2 / 1e3,
              unit: "s"
            };
          }
          ;
          if (v2 < 3600 * 1e3) {
            return {
              value: v2 / (1e3 * 60),
              unit: "min"
            };
          }
          ;
          if (otherwise) {
            return {
              value: v2 / (1e3 * 3600),
              unit: "h"
            };
          }
          ;
          throw new Error("Failed pattern match at Dashboard (line 413, column 9 - line 417, column 67): " + [v2.constructor.name]);
        };
        return p_([$$var([classes(["gauge", "tag"])])([text("\u23F1"), text(" "), text(toStringWith(fixed(2))(display(state3.pollingPeriod).value)), text(display(state3.pollingPeriod).unit)])]);
      };
      var appTitle = function(v2) {
        return div2([class_("app-title")])([h1_([text("Prometheus-Monitor")]), p_([text('"action-item: add monitoring"')])]);
      };
      var addPerspective = function(state3) {
        return div_([h1([])([text("edit display")]), slot1(_newPerspective)(0)(newPerspective2)(state3.seqnum)(handleNewPerspectiveOutput)]);
      };
      var addExporter = function(state3) {
        return div2([class_("add-exporter")])([slot22(_newExporter)(0)(newExporter2(comap(TraceExporter.create)(tracer)))(state3.seqnum)(handleNewExporterOutput)]);
      };
      var render = function(state3) {
        var div1 = function(k) {
          return function(xs) {
            return div2([class_(k)])(xs);
          };
        };
        return div2([class_("dashboard")])([menu([class_("control-bar")])([div1("app-title")([appTitle(state3)]), renderPaceButtons(state3), div1("current-pace")([currentPeriod(state3)]), div2([class_("links")])([menuLink(AddExporterMenu.value)(state3), menuLink(Overview.value)(state3)])]), div1("main-monitor")([messageBox(state3), function() {
          if (state3.menu instanceof AddExporterMenu) {
            return addExporter(state3);
          }
          ;
          if (state3.menu instanceof AddPerspectiveMenu) {
            return addPerspective(state3);
          }
          ;
          return div_([div1("known-exporters")([perspectivesList(state3)]), div1("pinned-graphs")([exportersList(state3)])]);
        }()])]);
      };
      return mkComponent({
        initialState,
        render,
        "eval": mkEval({
          handleAction: function(act) {
            return applySecond5(liftEffect12(trace3(tracer)(new TraceAction2(act))))(handleAction(act));
          },
          handleQuery: defaultEval.handleQuery,
          receive: defaultEval.receive,
          initialize: new Just(new StartPolling(1e3)),
          finalize: defaultEval.finalize
        })
      });
    };
  };

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _readyState(doc) {
    return function() {
      return doc.readyState;
    };
  }

  // output/Web.HTML.HTMLDocument.ReadyState/index.js
  var Loading = /* @__PURE__ */ function() {
    function Loading2() {
    }
    ;
    Loading2.value = new Loading2();
    return Loading2;
  }();
  var Interactive = /* @__PURE__ */ function() {
    function Interactive2() {
    }
    ;
    Interactive2.value = new Interactive2();
    return Interactive2;
  }();
  var Complete = /* @__PURE__ */ function() {
    function Complete2() {
    }
    ;
    Complete2.value = new Complete2();
    return Complete2;
  }();
  var parse = function(v2) {
    if (v2 === "loading") {
      return new Just(Loading.value);
    }
    ;
    if (v2 === "interactive") {
      return new Just(Interactive.value);
    }
    ;
    if (v2 === "complete") {
      return new Just(Complete.value);
    }
    ;
    return Nothing.value;
  };

  // output/Web.HTML.HTMLDocument/index.js
  var map28 = /* @__PURE__ */ map(functorEffect);
  var toParentNode = unsafeCoerce2;
  var toDocument = unsafeCoerce2;
  var readyState = /* @__PURE__ */ function() {
    var $2 = map28(function() {
      var $4 = fromMaybe(Loading.value);
      return function($5) {
        return $4(parse($5));
      };
    }());
    return function($3) {
      return $2(_readyState($3));
    };
  }();

  // output/Web.HTML.Window/foreign.js
  function document(window2) {
    return function() {
      return window2.document;
    };
  }

  // output/Web.HTML.Window/index.js
  var toEventTarget = unsafeCoerce2;

  // output/Halogen.Aff.Util/index.js
  var bind9 = /* @__PURE__ */ bind(bindAff);
  var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var bindFlipped7 = /* @__PURE__ */ bindFlipped(bindEffect);
  var composeKleisliFlipped4 = /* @__PURE__ */ composeKleisliFlipped(bindEffect);
  var pure14 = /* @__PURE__ */ pure(applicativeAff);
  var bindFlipped1 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var pure15 = /* @__PURE__ */ pure(applicativeEffect);
  var map29 = /* @__PURE__ */ map(functorEffect);
  var discard5 = /* @__PURE__ */ discard(discardUnit);
  var throwError3 = /* @__PURE__ */ throwError(monadThrowAff);
  var selectElement = function(query3) {
    return bind9(liftEffect4(bindFlipped7(composeKleisliFlipped4(function() {
      var $16 = querySelector(query3);
      return function($17) {
        return $16(toParentNode($17));
      };
    }())(document))(windowImpl)))(function(mel) {
      return pure14(bindFlipped1(fromElement)(mel));
    });
  };
  var runHalogenAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure15(unit))));
  var awaitLoad = /* @__PURE__ */ makeAff(function(callback) {
    return function __do3() {
      var rs = bindFlipped7(readyState)(bindFlipped7(document)(windowImpl))();
      if (rs instanceof Loading) {
        var et = map29(toEventTarget)(windowImpl)();
        var listener = eventListener(function(v2) {
          return callback(new Right(unit));
        })();
        addEventListener2(domcontentloaded)(listener)(false)(et)();
        return effectCanceler(removeEventListener2(domcontentloaded)(listener)(false)(et));
      }
      ;
      callback(new Right(unit))();
      return nonCanceler;
    };
  });
  var awaitBody = /* @__PURE__ */ discard5(bindAff)(awaitLoad)(function() {
    return bind9(selectElement("body"))(function(body2) {
      return maybe(throwError3(error("Could not find body")))(pure14)(body2);
    });
  });

  // output/Control.Monad.Fork.Class/index.js
  var monadForkAff = {
    suspend: suspendAff,
    fork: forkAff,
    join: joinFiber,
    Monad0: function() {
      return monadAff;
    },
    Functor1: function() {
      return functorFiber;
    }
  };
  var fork2 = function(dict) {
    return dict.fork;
  };

  // output/Effect.Console/foreign.js
  var warn = function(s2) {
    return function() {
      console.warn(s2);
    };
  };

  // output/Halogen.Aff.Driver.State/index.js
  var unRenderStateX = unsafeCoerce2;
  var unDriverStateX = unsafeCoerce2;
  var renderStateX_ = function(dictApplicative) {
    var traverse_8 = traverse_(dictApplicative)(foldableMaybe);
    return function(f) {
      return unDriverStateX(function(st) {
        return traverse_8(f)(st.rendering);
      });
    };
  };
  var mkRenderStateX = unsafeCoerce2;
  var renderStateX = function(dictFunctor) {
    return function(f) {
      return unDriverStateX(function(st) {
        return mkRenderStateX(f(st.rendering));
      });
    };
  };
  var mkDriverStateXRef = unsafeCoerce2;
  var mapDriverState = function(f) {
    return function(v2) {
      return f(v2);
    };
  };
  var initDriverState = function(component2) {
    return function(input3) {
      return function(handler3) {
        return function(lchs) {
          return function __do3() {
            var selfRef = $$new({})();
            var childrenIn = $$new(empty5)();
            var childrenOut = $$new(empty5)();
            var handlerRef = $$new(handler3)();
            var pendingQueries = $$new(new Just(Nil.value))();
            var pendingOuts = $$new(new Just(Nil.value))();
            var pendingHandlers = $$new(Nothing.value)();
            var fresh2 = $$new(1)();
            var subscriptions = $$new(new Just(empty3))();
            var forks = $$new(empty3)();
            var ds = {
              component: component2,
              state: component2.initialState(input3),
              refs: empty3,
              children: empty5,
              childrenIn,
              childrenOut,
              selfRef,
              handlerRef,
              pendingQueries,
              pendingOuts,
              pendingHandlers,
              rendering: Nothing.value,
              fresh: fresh2,
              subscriptions,
              forks,
              lifecycleHandlers: lchs
            };
            write(ds)(selfRef)();
            return mkDriverStateXRef(selfRef);
          };
        };
      };
    };
  };

  // output/Halogen.Aff.Driver.Eval/index.js
  var traverse_5 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var bindFlipped8 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var lookup9 = /* @__PURE__ */ lookup2(ordSubscriptionId);
  var bind12 = /* @__PURE__ */ bind(bindAff);
  var liftEffect5 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var discard6 = /* @__PURE__ */ discard(discardUnit);
  var discard12 = /* @__PURE__ */ discard6(bindAff);
  var traverse_12 = /* @__PURE__ */ traverse_(applicativeAff);
  var traverse_22 = /* @__PURE__ */ traverse_12(foldableList);
  var fork3 = /* @__PURE__ */ fork2(monadForkAff);
  var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(foldableList);
  var pure16 = /* @__PURE__ */ pure(applicativeAff);
  var map30 = /* @__PURE__ */ map(functorCoyoneda);
  var parallel2 = /* @__PURE__ */ parallel(parallelAff);
  var map113 = /* @__PURE__ */ map(functorAff);
  var sequential2 = /* @__PURE__ */ sequential(parallelAff);
  var map210 = /* @__PURE__ */ map(functorMaybe);
  var insert7 = /* @__PURE__ */ insert(ordSubscriptionId);
  var retractFreeAp2 = /* @__PURE__ */ retractFreeAp(applicativeParAff);
  var $$delete4 = /* @__PURE__ */ $$delete(ordForkId);
  var unlessM2 = /* @__PURE__ */ unlessM(monadEffect);
  var insert12 = /* @__PURE__ */ insert(ordForkId);
  var traverse_32 = /* @__PURE__ */ traverse_12(foldableMaybe);
  var lookup12 = /* @__PURE__ */ lookup2(ordForkId);
  var lookup22 = /* @__PURE__ */ lookup2(ordString);
  var foldFree2 = /* @__PURE__ */ foldFree(monadRecAff);
  var alter2 = /* @__PURE__ */ alter(ordString);
  var unsubscribe3 = function(sid) {
    return function(ref2) {
      return function __do3() {
        var v2 = read(ref2)();
        var subs = read(v2.subscriptions)();
        return traverse_5(unsubscribe)(bindFlipped8(lookup9(sid))(subs))();
      };
    };
  };
  var queueOrRun = function(ref2) {
    return function(au) {
      return bind12(liftEffect5(read(ref2)))(function(v2) {
        if (v2 instanceof Nothing) {
          return au;
        }
        ;
        if (v2 instanceof Just) {
          return liftEffect5(write(new Just(new Cons(au, v2.value0)))(ref2));
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 188, column 33 - line 190, column 57): " + [v2.constructor.name]);
      });
    };
  };
  var handleLifecycle = function(lchs) {
    return function(f) {
      return discard12(liftEffect5(write({
        initializers: Nil.value,
        finalizers: Nil.value
      })(lchs)))(function() {
        return bind12(liftEffect5(f))(function(result) {
          return bind12(liftEffect5(read(lchs)))(function(v2) {
            return discard12(traverse_22(fork3)(v2.finalizers))(function() {
              return discard12(parSequence_2(v2.initializers))(function() {
                return pure16(result);
              });
            });
          });
        });
      });
    };
  };
  var handleAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure(applicativeEffect)(unit))));
  var fresh = function(f) {
    return function(ref2) {
      return bind12(liftEffect5(read(ref2)))(function(v2) {
        return liftEffect5(modify$prime(function(i2) {
          return {
            state: i2 + 1 | 0,
            value: f(i2)
          };
        })(v2.fresh));
      });
    };
  };
  var evalQ = function(render) {
    return function(ref2) {
      return function(q3) {
        return bind12(liftEffect5(read(ref2)))(function(v2) {
          return evalM(render)(ref2)(v2["component"]["eval"](new Query(map30(Just.create)(liftCoyoneda(q3)), $$const(Nothing.value))));
        });
      };
    };
  };
  var evalM = function(render) {
    return function(initRef) {
      return function(v2) {
        var evalChildQuery = function(ref2) {
          return function(cqb) {
            return bind12(liftEffect5(read(ref2)))(function(v1) {
              return unChildQueryBox(function(v22) {
                var evalChild = function(v3) {
                  return parallel2(bind12(liftEffect5(read(v3)))(function(dsx) {
                    return unDriverStateX(function(ds) {
                      return evalQ(render)(ds.selfRef)(v22.value1);
                    })(dsx);
                  }));
                };
                return map113(v22.value2)(sequential2(v22.value0(applicativeParAff)(evalChild)(v1.children)));
              })(cqb);
            });
          };
        };
        var go2 = function(ref2) {
          return function(v1) {
            if (v1 instanceof State) {
              return bind12(liftEffect5(read(ref2)))(function(v22) {
                var v3 = v1.value0(v22.state);
                if (unsafeRefEq(v22.state)(v3.value1)) {
                  return pure16(v3.value0);
                }
                ;
                if (otherwise) {
                  return discard12(liftEffect5(write({
                    component: v22.component,
                    state: v3.value1,
                    refs: v22.refs,
                    children: v22.children,
                    childrenIn: v22.childrenIn,
                    childrenOut: v22.childrenOut,
                    selfRef: v22.selfRef,
                    handlerRef: v22.handlerRef,
                    pendingQueries: v22.pendingQueries,
                    pendingOuts: v22.pendingOuts,
                    pendingHandlers: v22.pendingHandlers,
                    rendering: v22.rendering,
                    fresh: v22.fresh,
                    subscriptions: v22.subscriptions,
                    forks: v22.forks,
                    lifecycleHandlers: v22.lifecycleHandlers
                  })(ref2)))(function() {
                    return discard12(handleLifecycle(v22.lifecycleHandlers)(render(v22.lifecycleHandlers)(ref2)))(function() {
                      return pure16(v3.value0);
                    });
                  });
                }
                ;
                throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 86, column 7 - line 92, column 21): " + [v3.constructor.name]);
              });
            }
            ;
            if (v1 instanceof Subscribe) {
              return bind12(fresh(SubscriptionId)(ref2))(function(sid) {
                return bind12(liftEffect5(subscribe(v1.value0(sid))(function(act) {
                  return handleAff(evalF(render)(ref2)(new Action(act)));
                })))(function(finalize) {
                  return bind12(liftEffect5(read(ref2)))(function(v22) {
                    return discard12(liftEffect5(modify_(map210(insert7(sid)(finalize)))(v22.subscriptions)))(function() {
                      return pure16(v1.value1(sid));
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Unsubscribe) {
              return discard12(liftEffect5(unsubscribe3(v1.value0)(ref2)))(function() {
                return pure16(v1.value1);
              });
            }
            ;
            if (v1 instanceof Lift2) {
              return v1.value0;
            }
            ;
            if (v1 instanceof ChildQuery2) {
              return evalChildQuery(ref2)(v1.value0);
            }
            ;
            if (v1 instanceof Raise) {
              return bind12(liftEffect5(read(ref2)))(function(v22) {
                return bind12(liftEffect5(read(v22.handlerRef)))(function(handler3) {
                  return discard12(queueOrRun(v22.pendingOuts)(handler3(v1.value0)))(function() {
                    return pure16(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Par) {
              return sequential2(retractFreeAp2(hoistFreeAp(function() {
                var $118 = evalM(render)(ref2);
                return function($119) {
                  return parallel2($118($119));
                };
              }())(v1.value0)));
            }
            ;
            if (v1 instanceof Fork) {
              return bind12(fresh(ForkId)(ref2))(function(fid) {
                return bind12(liftEffect5(read(ref2)))(function(v22) {
                  return bind12(liftEffect5($$new(false)))(function(doneRef) {
                    return bind12(fork3($$finally(liftEffect5(function __do3() {
                      modify_($$delete4(fid))(v22.forks)();
                      return write(true)(doneRef)();
                    }))(evalM(render)(ref2)(v1.value0))))(function(fiber) {
                      return discard12(liftEffect5(unlessM2(read(doneRef))(modify_(insert12(fid)(fiber))(v22.forks))))(function() {
                        return pure16(v1.value1(fid));
                      });
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Join) {
              return bind12(liftEffect5(read(ref2)))(function(v22) {
                return bind12(liftEffect5(read(v22.forks)))(function(forkMap) {
                  return discard12(traverse_32(joinFiber)(lookup12(v1.value0)(forkMap)))(function() {
                    return pure16(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Kill) {
              return bind12(liftEffect5(read(ref2)))(function(v22) {
                return bind12(liftEffect5(read(v22.forks)))(function(forkMap) {
                  return discard12(traverse_32(killFiber(error("Cancelled")))(lookup12(v1.value0)(forkMap)))(function() {
                    return pure16(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof GetRef) {
              return bind12(liftEffect5(read(ref2)))(function(v22) {
                return pure16(v1.value1(lookup22(v1.value0)(v22.refs)));
              });
            }
            ;
            throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 83, column 12 - line 139, column 33): " + [v1.constructor.name]);
          };
        };
        return foldFree2(go2(initRef))(v2);
      };
    };
  };
  var evalF = function(render) {
    return function(ref2) {
      return function(v2) {
        if (v2 instanceof RefUpdate) {
          return liftEffect5(flip(modify_)(ref2)(mapDriverState(function(st) {
            return {
              component: st.component,
              state: st.state,
              refs: alter2($$const(v2.value1))(v2.value0)(st.refs),
              children: st.children,
              childrenIn: st.childrenIn,
              childrenOut: st.childrenOut,
              selfRef: st.selfRef,
              handlerRef: st.handlerRef,
              pendingQueries: st.pendingQueries,
              pendingOuts: st.pendingOuts,
              pendingHandlers: st.pendingHandlers,
              rendering: st.rendering,
              fresh: st.fresh,
              subscriptions: st.subscriptions,
              forks: st.forks,
              lifecycleHandlers: st.lifecycleHandlers
            };
          })));
        }
        ;
        if (v2 instanceof Action) {
          return bind12(liftEffect5(read(ref2)))(function(v1) {
            return evalM(render)(ref2)(v1["component"]["eval"](new Action2(v2.value0, unit)));
          });
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 52, column 20 - line 58, column 62): " + [v2.constructor.name]);
      };
    };
  };

  // output/Halogen.Aff.Driver/index.js
  var bind10 = /* @__PURE__ */ bind(bindEffect);
  var discard7 = /* @__PURE__ */ discard(discardUnit);
  var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var traverse_6 = /* @__PURE__ */ traverse_(applicativeAff)(foldableList);
  var fork4 = /* @__PURE__ */ fork2(monadForkAff);
  var bindFlipped9 = /* @__PURE__ */ bindFlipped(bindEffect);
  var traverse_13 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_23 = /* @__PURE__ */ traverse_13(foldableMaybe);
  var traverse_33 = /* @__PURE__ */ traverse_13(foldableMap);
  var discard22 = /* @__PURE__ */ discard7(bindAff);
  var parSequence_3 = /* @__PURE__ */ parSequence_(parallelAff)(foldableList);
  var liftEffect6 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var pure17 = /* @__PURE__ */ pure(applicativeEffect);
  var map31 = /* @__PURE__ */ map(functorEffect);
  var pure18 = /* @__PURE__ */ pure(applicativeAff);
  var when3 = /* @__PURE__ */ when(applicativeEffect);
  var renderStateX2 = /* @__PURE__ */ renderStateX(functorEffect);
  var $$void6 = /* @__PURE__ */ $$void(functorAff);
  var foreachSlot2 = /* @__PURE__ */ foreachSlot(applicativeEffect);
  var renderStateX_2 = /* @__PURE__ */ renderStateX_(applicativeEffect);
  var tailRecM4 = /* @__PURE__ */ tailRecM(monadRecEffect);
  var voidLeft4 = /* @__PURE__ */ voidLeft(functorEffect);
  var bind13 = /* @__PURE__ */ bind(bindAff);
  var liftEffect1 = /* @__PURE__ */ liftEffect(monadEffectEffect);
  var newLifecycleHandlers = /* @__PURE__ */ function() {
    return $$new({
      initializers: Nil.value,
      finalizers: Nil.value
    });
  }();
  var handlePending = function(ref2) {
    return function __do3() {
      var queue = read(ref2)();
      write(Nothing.value)(ref2)();
      return for_2(queue)(function() {
        var $58 = traverse_6(fork4);
        return function($59) {
          return handleAff($58(reverse($59)));
        };
      }())();
    };
  };
  var cleanupSubscriptionsAndForks = function(v2) {
    return function __do3() {
      bindFlipped9(traverse_23(traverse_33(unsubscribe)))(read(v2.subscriptions))();
      write(Nothing.value)(v2.subscriptions)();
      bindFlipped9(traverse_33(function() {
        var $60 = killFiber(error("finalized"));
        return function($61) {
          return handleAff($60($61));
        };
      }()))(read(v2.forks))();
      return write(empty3)(v2.forks)();
    };
  };
  var runUI = function(renderSpec2) {
    return function(component2) {
      return function(i2) {
        var squashChildInitializers = function(lchs) {
          return function(preInits) {
            return unDriverStateX(function(st) {
              var parentInitializer = evalM(render)(st.selfRef)(st["component"]["eval"](new Initialize(unit)));
              return modify_(function(handlers) {
                return {
                  initializers: new Cons(discard22(parSequence_3(reverse(handlers.initializers)))(function() {
                    return discard22(parentInitializer)(function() {
                      return liftEffect6(function __do3() {
                        handlePending(st.pendingQueries)();
                        return handlePending(st.pendingOuts)();
                      });
                    });
                  }), preInits),
                  finalizers: handlers.finalizers
                };
              })(lchs);
            });
          };
        };
        var runComponent = function(lchs) {
          return function(handler3) {
            return function(j) {
              return unComponent(function(c2) {
                return function __do3() {
                  var lchs$prime = newLifecycleHandlers();
                  var $$var2 = initDriverState(c2)(j)(handler3)(lchs$prime)();
                  var pre2 = read(lchs)();
                  write({
                    initializers: Nil.value,
                    finalizers: pre2.finalizers
                  })(lchs)();
                  bindFlipped9(unDriverStateX(function() {
                    var $62 = render(lchs);
                    return function($63) {
                      return $62(function(v2) {
                        return v2.selfRef;
                      }($63));
                    };
                  }()))(read($$var2))();
                  bindFlipped9(squashChildInitializers(lchs)(pre2.initializers))(read($$var2))();
                  return $$var2;
                };
              });
            };
          };
        };
        var renderChild = function(lchs) {
          return function(handler3) {
            return function(childrenInRef) {
              return function(childrenOutRef) {
                return unComponentSlot(function(slot3) {
                  return function __do3() {
                    var childrenIn = map31(slot3.pop)(read(childrenInRef))();
                    var $$var2 = function() {
                      if (childrenIn instanceof Just) {
                        write(childrenIn.value0.value1)(childrenInRef)();
                        var dsx = read(childrenIn.value0.value0)();
                        unDriverStateX(function(st) {
                          return function __do4() {
                            flip(write)(st.handlerRef)(function() {
                              var $64 = maybe(pure18(unit))(handler3);
                              return function($65) {
                                return $64(slot3.output($65));
                              };
                            }())();
                            return handleAff(evalM(render)(st.selfRef)(st["component"]["eval"](new Receive(slot3.input, unit))))();
                          };
                        })(dsx)();
                        return childrenIn.value0.value0;
                      }
                      ;
                      if (childrenIn instanceof Nothing) {
                        return runComponent(lchs)(function() {
                          var $66 = maybe(pure18(unit))(handler3);
                          return function($67) {
                            return $66(slot3.output($67));
                          };
                        }())(slot3.input)(slot3.component)();
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 213, column 14 - line 222, column 98): " + [childrenIn.constructor.name]);
                    }();
                    var isDuplicate = map31(function($68) {
                      return isJust(slot3.get($68));
                    })(read(childrenOutRef))();
                    when3(isDuplicate)(warn("Halogen: Duplicate slot address was detected during rendering, unexpected results may occur"))();
                    modify_(slot3.set($$var2))(childrenOutRef)();
                    return bind10(read($$var2))(renderStateX2(function(v2) {
                      if (v2 instanceof Nothing) {
                        return $$throw("Halogen internal error: child was not initialized in renderChild");
                      }
                      ;
                      if (v2 instanceof Just) {
                        return pure17(renderSpec2.renderChild(v2.value0));
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 227, column 37 - line 229, column 50): " + [v2.constructor.name]);
                    }))();
                  };
                });
              };
            };
          };
        };
        var render = function(lchs) {
          return function($$var2) {
            return function __do3() {
              var v2 = read($$var2)();
              var shouldProcessHandlers = map31(isNothing)(read(v2.pendingHandlers))();
              when3(shouldProcessHandlers)(write(new Just(Nil.value))(v2.pendingHandlers))();
              write(empty5)(v2.childrenOut)();
              write(v2.children)(v2.childrenIn)();
              var handler3 = function() {
                var $69 = queueOrRun(v2.pendingHandlers);
                var $70 = evalF(render)(v2.selfRef);
                return function($71) {
                  return $69($$void6($70($71)));
                };
              }();
              var childHandler = function() {
                var $72 = queueOrRun(v2.pendingQueries);
                return function($73) {
                  return $72(handler3(Action.create($73)));
                };
              }();
              var rendering = renderSpec2.render(function($74) {
                return handleAff(handler3($74));
              })(renderChild(lchs)(childHandler)(v2.childrenIn)(v2.childrenOut))(v2.component.render(v2.state))(v2.rendering)();
              var children2 = read(v2.childrenOut)();
              var childrenIn = read(v2.childrenIn)();
              foreachSlot2(childrenIn)(function(v1) {
                return function __do4() {
                  var childDS = read(v1)();
                  renderStateX_2(renderSpec2.removeChild)(childDS)();
                  return finalize(lchs)(childDS)();
                };
              })();
              flip(modify_)(v2.selfRef)(mapDriverState(function(ds$prime) {
                return {
                  component: ds$prime.component,
                  state: ds$prime.state,
                  refs: ds$prime.refs,
                  children: children2,
                  childrenIn: ds$prime.childrenIn,
                  childrenOut: ds$prime.childrenOut,
                  selfRef: ds$prime.selfRef,
                  handlerRef: ds$prime.handlerRef,
                  pendingQueries: ds$prime.pendingQueries,
                  pendingOuts: ds$prime.pendingOuts,
                  pendingHandlers: ds$prime.pendingHandlers,
                  rendering: new Just(rendering),
                  fresh: ds$prime.fresh,
                  subscriptions: ds$prime.subscriptions,
                  forks: ds$prime.forks,
                  lifecycleHandlers: ds$prime.lifecycleHandlers
                };
              }))();
              return when3(shouldProcessHandlers)(flip(tailRecM4)(unit)(function(v1) {
                return function __do4() {
                  var handlers = read(v2.pendingHandlers)();
                  write(new Just(Nil.value))(v2.pendingHandlers)();
                  traverse_23(function() {
                    var $75 = traverse_6(fork4);
                    return function($76) {
                      return handleAff($75(reverse($76)));
                    };
                  }())(handlers)();
                  var mmore = read(v2.pendingHandlers)();
                  var $51 = maybe(false)($$null)(mmore);
                  if ($51) {
                    return voidLeft4(write(Nothing.value)(v2.pendingHandlers))(new Done(unit))();
                  }
                  ;
                  return new Loop(unit);
                };
              }))();
            };
          };
        };
        var finalize = function(lchs) {
          return unDriverStateX(function(st) {
            return function __do3() {
              cleanupSubscriptionsAndForks(st)();
              var f = evalM(render)(st.selfRef)(st["component"]["eval"](new Finalize(unit)));
              modify_(function(handlers) {
                return {
                  initializers: handlers.initializers,
                  finalizers: new Cons(f, handlers.finalizers)
                };
              })(lchs)();
              return foreachSlot2(st.children)(function(v2) {
                return function __do4() {
                  var dsx = read(v2)();
                  return finalize(lchs)(dsx)();
                };
              })();
            };
          });
        };
        var evalDriver = function(disposed) {
          return function(ref2) {
            return function(q3) {
              return bind13(liftEffect6(read(disposed)))(function(v2) {
                if (v2) {
                  return pure18(Nothing.value);
                }
                ;
                return evalQ(render)(ref2)(q3);
              });
            };
          };
        };
        var dispose = function(disposed) {
          return function(lchs) {
            return function(dsx) {
              return handleLifecycle(lchs)(function __do3() {
                var v2 = read(disposed)();
                if (v2) {
                  return unit;
                }
                ;
                write(true)(disposed)();
                finalize(lchs)(dsx)();
                return unDriverStateX(function(v1) {
                  return function __do4() {
                    var v22 = liftEffect1(read(v1.selfRef))();
                    return for_2(v22.rendering)(renderSpec2.dispose)();
                  };
                })(dsx)();
              });
            };
          };
        };
        return bind13(liftEffect6(newLifecycleHandlers))(function(lchs) {
          return bind13(liftEffect6($$new(false)))(function(disposed) {
            return handleLifecycle(lchs)(function __do3() {
              var sio = create();
              var dsx = bindFlipped9(read)(runComponent(lchs)(function() {
                var $77 = notify(sio.listener);
                return function($78) {
                  return liftEffect6($77($78));
                };
              }())(i2)(component2))();
              return unDriverStateX(function(st) {
                return pure17({
                  query: evalDriver(disposed)(st.selfRef),
                  messages: sio.emitter,
                  dispose: dispose(disposed)(lchs)(dsx)
                });
              })(dsx)();
            });
          });
        });
      };
    };
  };

  // output/Web.DOM.Node/foreign.js
  var getEffProp2 = function(name16) {
    return function(node) {
      return function() {
        return node[name16];
      };
    };
  };
  var baseURI = getEffProp2("baseURI");
  var _ownerDocument = getEffProp2("ownerDocument");
  var _parentNode = getEffProp2("parentNode");
  var _parentElement = getEffProp2("parentElement");
  var childNodes = getEffProp2("childNodes");
  var _firstChild = getEffProp2("firstChild");
  var _lastChild = getEffProp2("lastChild");
  var _previousSibling = getEffProp2("previousSibling");
  var _nextSibling = getEffProp2("nextSibling");
  var _nodeValue = getEffProp2("nodeValue");
  var textContent = getEffProp2("textContent");
  function insertBefore(node1) {
    return function(node2) {
      return function(parent2) {
        return function() {
          parent2.insertBefore(node1, node2);
        };
      };
    };
  }
  function appendChild(node) {
    return function(parent2) {
      return function() {
        parent2.appendChild(node);
      };
    };
  }
  function removeChild2(node) {
    return function(parent2) {
      return function() {
        parent2.removeChild(node);
      };
    };
  }

  // output/Web.DOM.Node/index.js
  var map32 = /* @__PURE__ */ map(functorEffect);
  var parentNode2 = /* @__PURE__ */ function() {
    var $6 = map32(toMaybe);
    return function($7) {
      return $6(_parentNode($7));
    };
  }();
  var nextSibling = /* @__PURE__ */ function() {
    var $15 = map32(toMaybe);
    return function($16) {
      return $15(_nextSibling($16));
    };
  }();

  // output/Halogen.VDom.Driver/index.js
  var $runtime_lazy9 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var $$void7 = /* @__PURE__ */ $$void(functorEffect);
  var pure19 = /* @__PURE__ */ pure(applicativeEffect);
  var traverse_7 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var unwrap6 = /* @__PURE__ */ unwrap();
  var when4 = /* @__PURE__ */ when(applicativeEffect);
  var not2 = /* @__PURE__ */ not(/* @__PURE__ */ heytingAlgebraFunction(/* @__PURE__ */ heytingAlgebraFunction(heytingAlgebraBoolean)));
  var identity15 = /* @__PURE__ */ identity(categoryFn);
  var bind14 = /* @__PURE__ */ bind(bindAff);
  var liftEffect7 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var map33 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped10 = /* @__PURE__ */ bindFlipped(bindEffect);
  var substInParent = function(v2) {
    return function(v1) {
      return function(v22) {
        if (v1 instanceof Just && v22 instanceof Just) {
          return $$void7(insertBefore(v2)(v1.value0)(v22.value0));
        }
        ;
        if (v1 instanceof Nothing && v22 instanceof Just) {
          return $$void7(appendChild(v2)(v22.value0));
        }
        ;
        return pure19(unit);
      };
    };
  };
  var removeChild3 = function(v2) {
    return function __do3() {
      var npn = parentNode2(v2.node)();
      return traverse_7(function(pn) {
        return removeChild2(v2.node)(pn);
      })(npn)();
    };
  };
  var mkSpec = function(handler3) {
    return function(renderChildRef) {
      return function(document2) {
        var getNode = unRenderStateX(function(v2) {
          return v2.node;
        });
        var done = function(st) {
          if (st instanceof Just) {
            return halt(st.value0);
          }
          ;
          return unit;
        };
        var buildWidget2 = function(spec) {
          var buildThunk2 = buildThunk(unwrap6)(spec);
          var $lazy_patch = $runtime_lazy9("patch", "Halogen.VDom.Driver", function() {
            return function(st, slot3) {
              if (st instanceof Just) {
                if (slot3 instanceof ComponentSlot) {
                  halt(st.value0);
                  return $lazy_renderComponentSlot(100)(slot3.value0);
                }
                ;
                if (slot3 instanceof ThunkSlot) {
                  var step$prime = step(st.value0, slot3.value0);
                  return mkStep(new Step(extract2(step$prime), new Just(step$prime), $lazy_patch(103), done));
                }
                ;
                throw new Error("Failed pattern match at Halogen.VDom.Driver (line 97, column 22 - line 103, column 79): " + [slot3.constructor.name]);
              }
              ;
              return $lazy_render(104)(slot3);
            };
          });
          var $lazy_render = $runtime_lazy9("render", "Halogen.VDom.Driver", function() {
            return function(slot3) {
              if (slot3 instanceof ComponentSlot) {
                return $lazy_renderComponentSlot(86)(slot3.value0);
              }
              ;
              if (slot3 instanceof ThunkSlot) {
                var step4 = buildThunk2(slot3.value0);
                return mkStep(new Step(extract2(step4), new Just(step4), $lazy_patch(89), done));
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 84, column 7 - line 89, column 75): " + [slot3.constructor.name]);
            };
          });
          var $lazy_renderComponentSlot = $runtime_lazy9("renderComponentSlot", "Halogen.VDom.Driver", function() {
            return function(cs) {
              var renderChild = read(renderChildRef)();
              var rsx = renderChild(cs)();
              var node = getNode(rsx);
              return mkStep(new Step(node, Nothing.value, $lazy_patch(117), done));
            };
          });
          var patch2 = $lazy_patch(91);
          var render = $lazy_render(82);
          var renderComponentSlot = $lazy_renderComponentSlot(109);
          return render;
        };
        var buildAttributes = buildProp(handler3);
        return {
          buildWidget: buildWidget2,
          buildAttributes,
          document: document2
        };
      };
    };
  };
  var renderSpec = function(document2) {
    return function(container) {
      var render = function(handler3) {
        return function(child) {
          return function(v2) {
            return function(v1) {
              if (v1 instanceof Nothing) {
                return function __do3() {
                  var renderChildRef = $$new(child)();
                  var spec = mkSpec(handler3)(renderChildRef)(document2);
                  var machine = buildVDom(spec)(v2);
                  var node = extract2(machine);
                  $$void7(appendChild(node)(toNode2(container)))();
                  return {
                    machine,
                    node,
                    renderChildRef
                  };
                };
              }
              ;
              if (v1 instanceof Just) {
                return function __do3() {
                  write(child)(v1.value0.renderChildRef)();
                  var parent2 = parentNode2(v1.value0.node)();
                  var nextSib = nextSibling(v1.value0.node)();
                  var machine$prime = step(v1.value0.machine, v2);
                  var newNode = extract2(machine$prime);
                  when4(not2(unsafeRefEq)(v1.value0.node)(newNode))(substInParent(newNode)(nextSib)(parent2))();
                  return {
                    machine: machine$prime,
                    node: newNode,
                    renderChildRef: v1.value0.renderChildRef
                  };
                };
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 157, column 5 - line 173, column 80): " + [v1.constructor.name]);
            };
          };
        };
      };
      return {
        render,
        renderChild: identity15,
        removeChild: removeChild3,
        dispose: removeChild3
      };
    };
  };
  var runUI2 = function(component2) {
    return function(i2) {
      return function(element4) {
        return bind14(liftEffect7(map33(toDocument)(bindFlipped10(document)(windowImpl))))(function(document2) {
          return runUI(renderSpec(document2)(element4))(component2)(i2);
        });
      };
    };
  };

  // output/Main/index.js
  var pure20 = /* @__PURE__ */ pure(applicativeEffect);
  var bind11 = /* @__PURE__ */ bind(bindAff);
  var component = function(dictMonadAff) {
    var dashboard2 = dashboard(dictMonadAff);
    return function(v2) {
      return dashboard2($$const(pure20(unit)));
    };
  };
  var component1 = /* @__PURE__ */ component(monadAffAff);
  var main2 = function __do2() {
    var ref2 = $$new("")();
    tabUrl(function(url) {
      return write(url)(ref2);
    })();
    return runHalogenAff(bind11(awaitBody)(function(body2) {
      return bind11(selectElement("#metrics"))(function(elem3) {
        var tgt = fromMaybe(body2)(elem3);
        return runUI2(component1(ref2))(unit)(tgt);
      });
    }))();
  };

  // <stdin>
  main2();
})();
