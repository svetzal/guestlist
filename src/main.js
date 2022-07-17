import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { Amplify } from 'aws-amplify';
import AmplifyVue from '@aws-amplify/ui-vue';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

createApp(App)
    .use(router)
    .use(AmplifyVue)
    .mount('#app')
