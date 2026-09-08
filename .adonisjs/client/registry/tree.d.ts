/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  register: {
    create: typeof routes['register.create']
    store: typeof routes['register.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  accountRecovery: {
    create: typeof routes['account_recovery.create']
    store: typeof routes['account_recovery.store']
  }
  onboardings: {
    show: typeof routes['onboardings.show']
    destroy: typeof routes['onboardings.destroy']
  }
  media: {
    show: typeof routes['media.show']
  }
}
