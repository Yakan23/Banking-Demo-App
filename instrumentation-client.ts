// This file configures the initialization of Sentry on the client. 
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/       

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://12de3036b1c678bf5964650928680027@o4509141000388608.ingest.de.sentry.io/4509141003403344",

  // Add optional integrations for additional features
  integrations: [
    Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia:false,
    }),
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production        
  replaysSessionSampleRate: 1.0,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
