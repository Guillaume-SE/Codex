import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'register.create': { paramsTuple?: []; params?: {} }
    'register.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'account_recovery.create': { paramsTuple?: []; params?: {} }
    'account_recovery.store': { paramsTuple?: []; params?: {} }
    'onboardings.show': { paramsTuple?: []; params?: {} }
    'onboardings.destroy': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'media.show': { paramsTuple: [ParamValue,ParamValue]; params: {'category': ParamValue,'apiId': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'register.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'account_recovery.create': { paramsTuple?: []; params?: {} }
    'onboardings.show': { paramsTuple?: []; params?: {} }
    'media.show': { paramsTuple: [ParamValue,ParamValue]; params: {'category': ParamValue,'apiId': ParamValue} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'register.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'account_recovery.create': { paramsTuple?: []; params?: {} }
    'onboardings.show': { paramsTuple?: []; params?: {} }
    'media.show': { paramsTuple: [ParamValue,ParamValue]; params: {'category': ParamValue,'apiId': ParamValue} }
  }
  POST: {
    'register.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'account_recovery.store': { paramsTuple?: []; params?: {} }
    'onboardings.destroy': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}