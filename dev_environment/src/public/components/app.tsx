import React, { useState } from 'react';
import { i18n } from '@osd/i18n';
import { FormattedMessage, I18nProvider } from '@osd/i18n/react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  EuiButton,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageHeader,
  EuiTitle,
  EuiText,
} from '@elastic/eui';

import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

import { PLUGIN_ID, PLUGIN_NAME, TODO_PLUGIN_ROUTES } from '../../common';

interface CustomPluginAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}

export const CustomPluginApp = ({
  basename,
  notifications,
  http,
  navigation,
}: CustomPluginAppDeps) => {
  // Use React hooks to manage state.
  const [timestamp, setTimestamp] = useState<string | undefined>();

  const onClickHandler = () => {
    // Use the core http service to make a response to the server API.

    const body = {id: '3', title: 'learn python', completed: false}
    http.post(TODO_PLUGIN_ROUTES.CREATE, { body: JSON.stringify(body) }).then((res) => {
      console.log({res})
      // Use the core notifications service to display a success message.
      notifications.toasts.addSuccess(
        i18n.translate('customPlugin.dataUpdated', {
          defaultMessage: 'Data updated',
        })
      );
    });
  };
  const onClickHandler2 = () => {
    // Use the core http service to make a response to the server API.

    http.get(TODO_PLUGIN_ROUTES.GET).then((res) => {
      console.log({res})
      // Use the core notifications service to display a success message.
      notifications.toasts.addSuccess(
        i18n.translate('customPlugin.dataUpdated', {
          defaultMessage: 'Data updated',
        })
      );
    });
  };

  const onClickHandler3 = () => {
    // Use the core http service to make a response to the server API.

    const title = "python"
    http.get(`${TODO_PLUGIN_ROUTES.GET}/${title}`).then((res) => {
      console.log({res})
      // Use the core notifications service to display a success message.
      notifications.toasts.addSuccess(
        i18n.translate('customPlugin.dataUpdated', {
          defaultMessage: 'Data updated',
        })
      );
    });
  };

  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
          <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
          <EuiPage restrictWidth="1000px">
            <EuiPageBody component="main">
              <EuiPageHeader>
                <EuiTitle size="l">
                  <h1>
                    <FormattedMessage
                      id="customPlugin.helloWorldText"
                      defaultMessage="{name}"
                      values={{ name: PLUGIN_NAME }}
                    />
                  </h1>
                </EuiTitle>
              </EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentHeader>
                  <EuiTitle>
                    <h2>
                      <FormattedMessage
                        id="customPlugin.congratulationsTitle"
                        defaultMessage="Congratulations, you have successfully created a new OpenSearch Dashboards Plugin!"
                      />
                    </h2>
                  </EuiTitle>
                </EuiPageContentHeader>
                <EuiPageContentBody>
                  <EuiText>
                    <p>
                      <FormattedMessage
                        id="customPlugin.content"
                        defaultMessage="Look through the generated code and check out the plugin development documentation."
                      />
                    </p>
                    <EuiHorizontalRule />
                    <p>
                      <FormattedMessage
                        id="customPlugin.timestampText"
                        defaultMessage="Last timestamp: {todo_items}"
                        values={{ todo_items: timestamp ? timestamp : 'Unknown' }}
                      />
                    </p>
                    <EuiButton type="primary" size="s" onClick={onClickHandler}>
                      <FormattedMessage id="customPlugin.buttonText" defaultMessage="POST" />
                    </EuiButton>
                    <EuiButton type="primary" size="s" onClick={onClickHandler2}>
                      <FormattedMessage id="customPlugin.buttonText" defaultMessage="GET" />
                    </EuiButton>
                    <EuiButton type="primary" size="s" onClick={onClickHandler3}>
                      <FormattedMessage id="customPlugin.buttonText" defaultMessage="GET By Name" />
                    </EuiButton>
                  </EuiText>
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </>
      </I18nProvider>
    </Router>
  );
};
