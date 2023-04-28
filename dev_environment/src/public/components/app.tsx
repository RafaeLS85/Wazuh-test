import React, { useState, useEffect } from "react";
import { i18n } from "@osd/i18n";
import { FormattedMessage, I18nProvider } from "@osd/i18n/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  DashboardContainerInput,
  DashboardStart,
} from "../../../../src/plugins/dashboard/public";
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
} from "@elastic/eui";

import { CoreStart } from "../../../../src/core/public";
import { NavigationPublicPluginStart } from "../../../../src/plugins/navigation/public";
import { PLUGIN_ID, PLUGIN_NAME } from "../../common";
import TodoApp from "./todo/todo-app";
import { TodoService } from '../../services/todos'
import { useTodos } from '../../hooks/useTodos'
import Input from "./todo/input";


interface CustomPluginAppDeps {
  basename: string;
  navigation: NavigationPublicPluginStart;
  notifications: CoreStart["notifications"];
  http: CoreStart["http"];
}

export const CustomPluginApp = ({
  basename,
  navigation,
  http,
  notifications

}: CustomPluginAppDeps) => {
  // Use React hooks to manage state.
 
  const { items } = useTodos(http, notifications)
 

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
                <EuiPageContentBody>
                  
                  {/* <EuiButton type="primary" size="s" onClick={onClickHandler}>
                    <FormattedMessage
                      id="customPlugin.buttonText"
                      defaultMessage="POST"
                    />
                  </EuiButton> */}
                  {/* <EuiButton type="primary" size="s" onClick={getAll}>
                    <FormattedMessage
                      id="customPlugin.buttonText"
                      defaultMessage="GET"
                    />
                  </EuiButton> */}
                  {/* <EuiButton type="primary" size="s" onClick={onClickHandler3}>
                    <FormattedMessage
                      id="customPlugin.buttonText"
                      defaultMessage="GET By Name"
                    />
                  </EuiButton> */}

                  <Input http={http} notifications={notifications}  />

                   {!items && <p>Loading...</p> }

                   {items && <TodoApp todos={items} />} 
                  
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </>
      </I18nProvider>
    </Router>
  );
};
