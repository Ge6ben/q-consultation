---
sidebar_label: 'Integration pages'
sidebar_position: 3
---

# Integration pages

Integration pages are examples of how your application/website can interact with the Q-Consultation application.
Now the integration pages use links that lead to the provider's profile.

Link: `https://localhost:3001/providers/[provider_id]`

In this link, you need to replace `[provider_id]` with the id of the previously created provider.

To run the integration pages locally, you need to run the command: `yarn pages`.

This command will run integration pages on <http://localhost:8000> .

:::tip
Currently, there are available two integration examples. The source code can be found in the 'apps' folder >> 'integration-pages' ([/apps/integration-pages](https://github.com/QuickBlox/q-consultation/blob/master/apps/integration-pages)).
:::


<br/>
<br/>

# How do you integrate your existing project with q-consultations ?
 
 To use the application you need to have a user. You can use [Custom Identity Provider](https://docs.quickblox.com/docs/custom-identity-provider) to combine your own users and QuickBlox users, or you can create users in QConsultation yourself using API.
 
 API: https://quickblox.github.io/q-consultation/api
 
 Once you have logged in using the API, and have your QuickBlox session token, you can pass it to the QConsultation application URL and thus log in to the application without having to re-enter your email address and password.
 
 Routes:
 
 * `https://client-qc-website.com/[pathname]?token=[session_token]`
 * `https://provider-qc-website.com/[pathname]?token=[session_token]`
 
 
>  `[pathname]` is the path to a specific Q-Consultation page <br/>
>   `[session_token]` is the token from session ([Session Model](https://docs.quickblox.com/reference/session-model))

